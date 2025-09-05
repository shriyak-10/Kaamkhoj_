import React from "react";
import { useLang } from "../context/LanguageContext";

export default function ContactSupport({ style = {} }) {
  const { lang } = useLang();
  const callText = lang === "en" ? "Call Support" : lang === "hi" ? "सहायता कॉल करें" : "संपर्क करा";
  const whatsappText = lang === "en" ? "WhatsApp" : lang === "hi" ? "व्हाट्सएप" : "व्हॉट्सॲप";
  const phoneNumber = "+918888888888";
  const waLink = "https://wa.me/918888888888";

  return (
    <div style={{
      display: "flex",
      gap: "1.5rem",
      justifyContent: "center",
      margin: "1.5rem 0",
      ...style
    }}>
      <a
        href={`tel:${phoneNumber}`}
        className="call-btn"
        style={{
          background: "#b88a60",
          color: "#fff",
          borderRadius: "8px",
          padding: "0.85rem 2.1rem",
          fontWeight: 600,
          fontSize: "1.18rem",
          textDecoration: "none",
          boxShadow: "0 2px 8px #e2d0ad"
        }}
      >📞 {callText}</a>
      <a
        href={waLink}
        className="whatsapp-btn"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: "#25d366",
          color: "#fff",
          borderRadius: "8px",
          padding: "0.85rem 2.1rem",
          fontWeight: 600,
          fontSize: "1.18rem",
          textDecoration: "none",
          boxShadow: "0 2px 8px #c8efd3"
        }}
      >💬 {whatsappText}</a>
    </div>
  );
}
