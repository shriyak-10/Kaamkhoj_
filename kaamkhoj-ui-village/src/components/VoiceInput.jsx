import React from "react";
export default function VoiceInput({ onInput, langCode = "en-US" }) {
  function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input not supported on your browser. Try Chrome for best results.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = langCode;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      onInput(text);
    };
    recognition.onerror = (event) => {
      alert("Voice input error: " + event.error);
    };
    recognition.start();
  }
  return (
    <button
      type="button"
      aria-label="Speak"
      title="Speak"
      onClick={startListening}
      style={{
        background: "#ffc06d",
        border: "none",
        marginLeft: "0.4em",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "1.10em",
        padding: "0.25em 0.65em"
      }}>
      🎤
    </button>
  );
}
