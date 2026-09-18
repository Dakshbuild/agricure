"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default marker icons for Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const farmPoints = [
  { lat: 20.5937, lng: 78.9629, label: "Your Farm", color: "#22c55e", health: "91% Healthy" },
  { lat: 20.62, lng: 79.0, label: "Disease Alert", color: "#ef4444", health: "Late Blight Detected" },
  { lat: 20.57, lng: 78.93, label: "Nearby Farm", color: "#3b82f6", health: "85% Healthy" },
];

export default function LeafletMap() {
  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={10}
      style={{ height: "100%", width: "100%", minHeight: "400px" }}
      zoomControl={true}
    >
      {/* OpenStreetMap Satellite-like tile */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {farmPoints.map((point, i) => (
        <div key={i}>
          <Marker position={[point.lat, point.lng]}>
            <Popup className="farm-popup">
              <div className="p-2">
                <strong className="text-gray-900">{point.label}</strong>
                <p className="text-gray-600 text-xs mt-1">{point.health}</p>
              </div>
            </Popup>
          </Marker>
          <Circle
            center={[point.lat, point.lng]}
            radius={3000}
            pathOptions={{ color: point.color, fillColor: point.color, fillOpacity: 0.15, weight: 2 }}
          />
        </div>
      ))}
    </MapContainer>
  );
}
