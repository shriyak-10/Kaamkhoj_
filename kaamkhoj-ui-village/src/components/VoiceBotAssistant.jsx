import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../context/LanguageContext";

export default function VoiceBotAssistant({
  fields,
  form,
  setForm,
  mode = "form",
  onSelection
}) {
  const { lang } = useLang();

  // CRITICAL: Always use correct langCode for both TTS and SpeechRecognition!
  const langCode =
    lang === "hi" ? "hi-IN"
    : lang === "mr" ? "mr-IN"
    : "en-US";

  const [active, setActive] = useState(false);
  const [step, setStep] = useState(-1);
  const recognitionRef = useRef(null);

  // ... [PROMPTS definition unchanged] ...

  const PROMPTS = {
    en: {
      intro: mode === "form"
        ? "Welcome. I will help you fill the form. When I ask for a detail, say your answer."
        : "Let me read out the page for you.",
      ask: field => `Please say your ${field} now.`,
      confirm: (field, val) => `You said: ${val}. Thank you!`,
      end: mode === "form"
        ? "All details received. You can now review and submit the form."
        : "Page reading complete.",
      select: "Now say the name of the service you want."
    },
    hi: {
      intro: mode === "form"
        ? "स्वागत है। मैं आपके साथ फॉर्म भरूँगा। मैं जब पूछूं, अपना जवाब बोलें।"
        : "मैं आपके लिए पेज पढ़ रहा हूँ।",
      ask: field => `कृपया अपना ${field} बताएँ।`,
      confirm: (field, val) => `आपने कहा: ${val}। धन्यवाद!`,
      end: mode === "form"
        ? "सारे विवरण मिल गए। अब आप फॉर्म को जाँच कर सबमिट कर सकते हैं।"
        : "पृष्ठ पढ़ना पूरा।",
      select: "अब सेवा का नाम बोलिए।"
    },
    mr: {
      intro: mode === "form"
        ? "स्वागत आहे. मी फॉर्म भरण्यात मदत करीन. जेव्हा मी विचारतो, तुमचे उत्तर बोला."
        : "मी पृष्ठ वाचतोय.",
      ask: field => `कृपया तुमचे ${field} सांगा.`,
      confirm: (field, val) => `तुम्ही सांगितले: ${val}. धन्यवाद!`,
      end: mode === "form"
        ? "सर्व माहिती मिळाली. आता फॉर्म तपासा आणि सबमिट करा."
        : "पृष्ठ वाचन पूर्ण.",
      select: "आता सेवेला नाव सांगा."
    }
  };

  // -- CRITICAL: PASS langCode always to TTS! --
  function speak(text, cb) {
    if (window.speechSynthesis) {
      const msg = new window.SpeechSynthesisUtterance(text);
      msg.lang = langCode; // This is what makes Marathi work!
      msg.onend = cb;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(msg);
    } else if (cb) {
      cb();
    }
  }

  function startAssistant() {
    setActive(true);
    setStep(0);
    speak(PROMPTS[lang].intro, () => {
      if (mode === "form") {
        askField(0);
      } else {
        readPage(0);
      }
    });
  }

  function askField(idx) {
    if (idx >= fields.length) {
      speak(PROMPTS[lang].end, () => setActive(false));
      setActive(false);
      setStep(-1);
      return;
    }
    setStep(idx);
    const f = fields[idx];
    speak(PROMPTS[lang].ask(f.label), () => listenForInput(f, idx));
  }

  // -- CRITICAL: Always pass langCode to SpeechRecognition! --
  function listenForInput(fieldObj, idx) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input not available for your browser—type manually.");
      askField(idx + 1);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = langCode; // This is what makes Marathi input work!
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = event => {
      const text = event.results[0][0].transcript;
      setForm(prev => ({ ...prev, [fieldObj.name]: text }));
      speak(PROMPTS[lang].confirm(fieldObj.label, text), () => askField(idx + 1));
    };
    recognition.onerror = () => {
      speak(lang === "en"
        ? "Didn't catch that, please try again or type."
        : lang === "hi"
        ? "फिर से बोलें या खुद लिखें।"
        : "पुन्हा सांगा किंवा स्वतः लिहा.",
        () => askField(idx));
    };
    recognition.start();
    recognitionRef.current = recognition;
  }

  function readPage(idx) {
    if (idx >= fields.length) {
      if (typeof onSelection === "function" || typeof setForm === "function") {
        speak(PROMPTS[lang].select, () => listenForSelection());
      } else {
        speak(PROMPTS[lang].end, () => setActive(false));
        setActive(false);
        setStep(-1);
      }
      return;
    }
    setStep(idx);
    const f = fields[idx];
    speak(f.label, () => readPage(idx + 1));
  }

  function listenForSelection() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input not supported on your browser. Try Chrome.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = langCode; // This is what makes Marathi input work!
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = event => {
      const text = event.results[0][0].transcript;
      if (typeof onSelection === "function") {
        onSelection(text);
      } else if (typeof setForm === "function") {
        setForm(text);
      }
      stopBot();
    };
    recognition.onerror = () => {
      speak(lang === "en"
        ? "Didn't catch that, please try again or use buttons."
        : lang === "hi"
        ? "फिर से बोलें या बटन दबाएँ।"
        : "पुन्हा सांगा किंवा बटन वापरा.",
        () => listenForSelection());
    };
    recognition.start();
    recognitionRef.current = recognition;
  }

  function stopBot() {
    setActive(false);
    setStep(-1);
    window.speechSynthesis.cancel();
    if (recognitionRef.current) recognitionRef.current.stop();
  }

  useEffect(() => { stopBot(); /*eslint-disable-next-line*/ }, [lang]);

  return (
    <>
      <button
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          background: "#ffe08c",
          color: "#624000",
          boxShadow: "0 2px 10px #dec8a1",
          padding: "1.15em 2.25em",
          borderRadius: "62px",
          fontSize: "1.22em",
          border: "none",
          zIndex: 1800,
          cursor: "pointer",
          fontWeight: 700
        }}
        onClick={active ? stopBot : startAssistant}
      >
        🤖 {active ? (lang === "en" ? "Stop VoiceBot" : lang === "hi" ? "वॉइसबोट बंद करें" : "व्हॉइसबोट बंद करा") :
            (lang === "en" ? "Start VoiceBot" : lang === "hi" ? "वॉइसबोट शुरू करें" : "व्हॉइसबोट सुरू करा")}
      </button>
      {active && step !== -1 && (
        <div style={{
          position: "fixed",
          bottom: "7.7rem",
          right: "2rem",
          background: "#fff8e4",
          color: "#8a5417",
          border: "2px solid #d9cb99",
          borderRadius: "15px",
          padding: "1em 2em",
          fontSize: "1.09em",
          fontWeight: 600,
          zIndex: 1900
        }}>
          {mode === "form"
            ? (lang === "en" ? "Filling: " : lang === "hi" ? "भरना: " : "भरतोय:") + fields[step]?.label
            : (lang === "en" ? "Reading: " : lang === "hi" ? "पढ़ना: " : "वाचतोय:") + fields[step]?.label}
        </div>
      )}
    </>
  );
}
