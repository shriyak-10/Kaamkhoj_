import React from "react";
import "../styles/village-theme.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLang } from "../context/LanguageContext";
import VoiceInput from "../components/VoiceInput";
import ContactSupport from "../components/ContactSupport";
import VoiceBotAssistant from "../components/VoiceBotAssistant";

export default function Contact() {
  const { t, lang } = useLang();
  const langCode = lang === "hi" ? "hi-IN" : lang === "mr" ? "mr-IN" : "en-US";
  // Changed to mobile/phone instead of email
  const fields = [
    { name: "name", label: t.contact.name },
    { name: "contact", label: t.contact.whatsapp + " / Mobile" },
    { name: "message", label: t.contact.message }
  ];

  const [form, setForm] = React.useState({ name: "", contact: "", message: "" });

  function updateField(field, value) {
    setForm({ ...form, [field]: value });
  }
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    alert("Message sent!");  // Replace with backend call if connected
  }

  return (
    <>
      <Header />
      <main>
        <form
          className="village-form"
          onSubmit={handleSubmit}
          style={{
            maxWidth: '480px',
            boxShadow: "0 6px 32px #e5ceb3",
            background: "#fff8f2",
            padding: "2.3rem",
            borderRadius: "22px",
            margin: "3rem auto",
            fontSize: "1.05rem"
          }}
        >
          <h2 style={{
            textAlign: "center",
            marginBottom: "2.1rem",
            color: "#755b2e",
            letterSpacing: "1px"
          }}>
            {t.contact.title}
          </h2>
          {fields.map(field => (
            <div key={field.name} style={{ marginBottom: "1.1rem" }}>
              <label style={{ marginTop: "0.7rem", color: "#6c4a23", fontWeight: 600 }}>
                {field.label}
              </label>
              <div style={{ display: "flex", alignItems: "center" }}>
                {field.name === "message"
                  ?
                  <textarea
                    id={field.name}
                    name={field.name}
                    rows="4"
                    placeholder={field.label}
                    value={form[field.name]}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #eedbb3",
                      padding: "0.65rem",
                      background: "#fffefc"
                    }}
                  />
                  :
                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder={field.label}
                    value={form[field.name]}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #eedbb3",
                      padding: "0.65rem",
                      background: "#fffefc"
                    }}
                  />}
                <VoiceInput onInput={v => updateField(field.name, v)} langCode={langCode} />
              </div>
            </div>
          ))}
          <button type="submit" style={{
            background: "#b88a60",
            color: "white",
            fontWeight: 700,
            padding: "0.9rem 2.1rem",
            borderRadius: "11px",
            border: "none",
            fontSize: "1.07rem",
            margin: "1.3rem 0 0.6rem 0",
            boxShadow: "0 2px 8px #dec8a1"
          }}>
            {t.contact.button}
          </button>
          <ContactSupport />
          {/* Keep WhatsApp and call details below for further help */}
          <div style={{ marginTop: "1.3rem", textAlign: "center", fontSize: "1.05rem", color: "#82603d" }}>
            {t.contact.whatsapp}:{" "}
            <a href="https://wa.me/918888888888" style={{ color: "#b88a60", fontWeight: "500" }}>
              +91-88888-88888
            </a>
          </div>
        </form>
      </main>
      {/* Bot will voice-guide through all fields */}
      <VoiceBotAssistant fields={fields} form={form} setForm={setForm} />
      <Footer />
    </>
  );
}
