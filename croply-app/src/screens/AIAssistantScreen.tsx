import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, TextInput,
  TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StatusBar,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../theme/colors';
import { sendAssistantMessage } from '../services/api';
import { useAppStore } from '../store/useAppStore';
import * as Speech from 'expo-speech';
import { useTranslation } from 'react-i18next';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function AIAssistantScreen({ navigation }: any) {
  const { language } = useAppStore();
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: t('assistant.welcome', 'Hello! I am your CroPly AI Assistant. You can ask me about crop diseases, farming techniques, or weather advice.'),
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const response = await sendAssistantMessage(userMsg.text, i18n.language);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      
      // Text-to-Speech in the selected language
      Speech.speak(response.message, { language: i18n.language });
      
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting to the server. Please check your network and try again.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    return (
      <View style={[styles.messageBubble, item.isBot ? styles.botBubble : styles.userBubble]}>
        <Text style={[styles.messageText, item.isBot ? styles.botText : styles.userText]}>
          {item.text}
        </Text>
        <Text style={[styles.timeText, item.isBot ? styles.botTime : styles.userTime]}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>{t('assistant.title', 'AI Assistant')}</Text>
          <Text style={styles.headerStatus}>🟢 {t('assistant.online', 'Online')}</Text>
        </View>
        <TouchableOpacity style={styles.clearBtn} onPress={() => setMessages([messages[0]])}>
          <Text style={styles.clearIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>

      {/* Chat Area */}
      <KeyboardAvoidingView 
        style={styles.chatArea} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Typing Indicator */}
        {loading && (
          <View style={styles.typingIndicator}>
            <Text style={styles.typingText}>AI is typing...</Text>
          </View>
        )}

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.voiceBtn}>
            <Text style={styles.voiceIcon}>🎤</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder={t('assistant.placeholder', 'Ask anything...')}
            value={inputText}
            onChangeText={setInputText}
            placeholderTextColor={COLORS.textMuted}
            multiline
            maxLength={200}
          />
          <TouchableOpacity 
            style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]} 
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendIcon}>↗</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SIZES.padding, paddingVertical: 12, backgroundColor: COLORS.surface, ...SHADOWS.sm, zIndex: 10 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.surfaceDim, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  headerTitleWrap: { alignItems: 'center' },
  headerTitle: { fontSize: SIZES.fontLg, fontWeight: '800', color: COLORS.textPrimary },
  headerStatus: { fontSize: SIZES.fontXs, color: COLORS.success, fontWeight: '600', marginTop: 2 },
  clearBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  clearIcon: { fontSize: 18 },

  chatArea: { flex: 1 },
  listContent: { padding: SIZES.padding, paddingBottom: 20 },

  messageBubble: { maxWidth: '80%', padding: 14, borderRadius: 16, marginBottom: 12, ...SHADOWS.sm },
  userBubble: { alignSelf: 'flex-end', backgroundColor: COLORS.primary, borderBottomRightRadius: 4 },
  botBubble: { alignSelf: 'flex-start', backgroundColor: COLORS.surface, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: COLORS.borderLight },
  
  messageText: { fontSize: SIZES.fontMd, lineHeight: 22 },
  userText: { color: '#FFF' },
  botText: { color: COLORS.textPrimary },
  
  timeText: { fontSize: 10, marginTop: 6, alignSelf: 'flex-end' },
  userTime: { color: 'rgba(255,255,255,0.7)' },
  botTime: { color: COLORS.textMuted },

  typingIndicator: { paddingHorizontal: SIZES.padding, paddingBottom: 10, alignSelf: 'flex-start' },
  typingText: { fontSize: SIZES.fontSm, color: COLORS.textMuted, fontStyle: 'italic' },

  inputContainer: { flexDirection: 'row', alignItems: 'flex-end', padding: SIZES.padding, backgroundColor: COLORS.surface, borderTopWidth: 1, borderTopColor: COLORS.borderLight },
  voiceBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginRight: 8, backgroundColor: COLORS.surfaceDim, borderRadius: 22 },
  voiceIcon: { fontSize: 20 },
  input: { flex: 1, backgroundColor: COLORS.surfaceDim, borderRadius: 20, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12, fontSize: SIZES.fontMd, color: COLORS.textPrimary, maxHeight: 100 },
  sendBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginLeft: 8, backgroundColor: COLORS.primary, borderRadius: 22, ...SHADOWS.sm },
  sendBtnDisabled: { backgroundColor: COLORS.textMuted },
  sendIcon: { fontSize: 20, color: '#FFF', fontWeight: '800' },
});
