import React, { useState } from "react";
import { registerWorker } from "../api/kaamkhoj";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLang } from "../context/LanguageContext";
import VoiceInput from "../components/VoiceInput";
import ContactSupport from "../components/ContactSupport";
import VoiceBotAssistant from "../components/VoiceBotAssistant";

export default function RegisterWorker() {
  const { t, lang } = useLang();
  const langCode = lang === "hi" ? "hi-IN" : lang === "mr" ? "mr-IN" : "en-US";
  const fields = [
    { name: "uid", label: "UID" },
    { name: "name", label: t.contact.name },
    { name: "location", label: "Village/Town" },
    { name: "skills", label: t.menuRegisterWorker + " / Skill" },
    { name: "contact", label: t.contact.whatsapp + " / Mobile" },
  ];

  const [form, setForm] = useState({
    uid: "",
    name: "",
    location: "",
    skills: "",
    contact: "",
    available: true,
    document: null,
  });
  const [message, setMessage] = useState("");

  function updateField(field, value) {
    setForm({ ...form, [field]: value });
  }
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleFile(e) {
    const file = e.target.files[0];
    setForm({ ...form, document: file });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("uid", form.uid);
    data.append("name", form.name);
    data.append("location", form.location);
    data.append("skills", form.skills);
    data.append("contact", form.contact);
    data.append("available", form.available ? "true" : "false");
    if (form.document) data.append("document", form.document);
    try {
      const res = await registerWorker(data);
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  }
  return (
    <>
      <Header />
      <form className="village-form" onSubmit={handleSubmit}
        style={{ maxWidth: 500, margin: "2rem auto", background: "#fffdfa", boxShadow: "0 0 20px #eedbb3", borderRadius: "20px", padding: "2.2rem" }}>
        <h3 style={{ textAlign: "center", color: "#7b5c26", marginBottom: "1.6rem" }}>
          {t.menuRegisterWorker}
        </h3>
        {/* Each field (no speaker) */}
        {fields.map(field => (
          <div key={field.name} style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: 600, color: "#6c4a23" }}>{field.label}</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input name={field.name} value={form[field.name]} onChange={handleChange} required />
              <VoiceInput onInput={value => updateField(field.name, value)} langCode={langCode} />
            </div>
          </div>
        ))}
        {/* Document field */}
        <label style={{ fontWeight: 600, color: "#6c4a23" }}>
          Document (optional)
        </label>
        <input type="file" name="document" onChange={handleFile} style={{ marginBottom: "1.2rem" }} />
        <button type="submit" style={{
          background: "#b88a60", color: "white", fontWeight: 700,
          padding: "0.85rem 2rem", borderRadius: "11px", border: "none",
          fontSize: "1.07rem", margin: "1.2rem 0", boxShadow: "0 2px 8px #dec8a1"
        }}>
          {t.menuRegisterWorker}
        </button>
        <div aria-live="polite" style={{ color: "#8a2b0a", marginBottom: "0.7rem" }}>{message}</div>
        <ContactSupport />
      </form>
      <VoiceBotAssistant fields={fields} form={form} setForm={setForm} />
      <Footer />
    </>
  );
}
