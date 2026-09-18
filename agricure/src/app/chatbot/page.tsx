"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Mic, ImageIcon, Paperclip } from "lucide-react";

export default function AIChatbot() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hello! I am AGRI AI, your personal farming assistant. How can I help you today? You can ask me about crop diseases, weather, or organic farming.",
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "bot", 
        content: "That's a great question! Based on current agricultural data, I recommend testing your soil pH first. Would you like me to guide you through the process?" 
      }]);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-6 py-24 min-h-screen flex flex-col max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-heading font-bold text-foreground flex items-center justify-center gap-3">
          <Bot className="w-10 h-10 text-primary" /> AGRI AI Assistant
        </h1>
        <p className="text-foreground/60 mt-2">Ask me anything about farming in your preferred language!</p>
      </div>

      <div className="glass rounded-3xl flex flex-col flex-grow overflow-hidden border border-glass-border shadow-lg bg-white/50" style={{ maxHeight: "70vh" }}>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-gray-100 text-foreground" : "bg-primary text-white"}`}>
                {msg.role === "user" ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`p-4 rounded-2xl max-w-[80%] shadow-sm ${
                msg.role === "user" 
                  ? "bg-white text-foreground border border-gray-100 rounded-tr-none" 
                  : "bg-primary text-white rounded-tl-none"
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center gap-2">
            <button className="p-3 text-gray-400 hover:text-primary transition-colors rounded-full hover:bg-gray-100">
              <Paperclip size={20} />
            </button>
            <button className="p-3 text-gray-400 hover:text-primary transition-colors rounded-full hover:bg-gray-100">
              <ImageIcon size={20} />
            </button>
            <button className="p-3 text-gray-400 hover:text-primary transition-colors rounded-full hover:bg-gray-100">
              <Mic size={20} />
            </button>
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about crop diseases, weather, or farming tips..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-6 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground"
            />
            
            <button 
              onClick={handleSend}
              className="p-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors shadow-md flex items-center justify-center"
            >
              <Send size={20} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
