import React, { useState } from "react";

export default function VoiceBot() {
  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [botReply, setBotReply] = useState("");
  const [audioSrc, setAudioSrc] = useState(null);
  const [language, setLanguage] = useState("hi-IN");

  const startListening = () => {
    if (!window.webkitSpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setUserText(text);
      sendToBackend(text);
    };

    recognition.start();
  };

  const sendToBackend = async (text) => {
    try {
      // Call backend text-to-speech & transcription example
      const res = await fetch("http://localhost:5000/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, languageCode: language }),
      });
      const arrayBuffer = await res.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      setAudioSrc(url);

      // Set bot response text (for demo reuse input)
      setBotReply(text);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
        <option value="hi-IN">Hindi</option>
        <option value="en-US">English</option>
        <option value="mr-IN">Marathi</option>
      </select>
      <button onClick={startListening} disabled={listening}>
        {listening ? "Listening..." : "Speak"}
      </button>
      <p><strong>You said:</strong> {userText}</p>
      <p><strong>Bot says:</strong> {botReply}</p>
      {audioSrc && <audio src={audioSrc} controls autoPlay />}
    </div>
  );
}
