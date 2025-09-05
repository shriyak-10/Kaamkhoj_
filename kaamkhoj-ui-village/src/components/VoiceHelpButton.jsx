import React from "react";

// Usage: <VoiceHelpButton text={"Register by filling the fields below..."} langCode="en-US" />
export default function VoiceHelpButton({ text, langCode = "en-US", style = {} }) {
  function speakAll() {
    if ("speechSynthesis" in window) {
      const msg = new window.SpeechSynthesisUtterance(text);
      msg.lang = langCode;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(msg);
    } else {
      alert("Text-to-Speech is not supported.");
    }
  }
  return (
    <button
      type="button"
      aria-label="Play Help"
      onClick={speakAll}
      style={{
        background: "#c6ab77",
        color: "#372800",
        borderRadius: "12px",
        padding: "0.6em 1.2em",
        border: "none",
        margin: "2rem auto",
        fontWeight: 700,
        fontSize: "1.2em",
        display: "block",
        cursor: "pointer",
        boxShadow: "0 2px 10px #dec8a1",
        ...style
      }}>
      🔊 Listen to Page Instructions
    </button>
  );
}
