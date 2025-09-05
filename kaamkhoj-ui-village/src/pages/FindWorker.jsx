import React, { useState } from "react";
import { matchWorkers } from "../api/kaamkhoj";
import WorkerCard from "../components/WorkerCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLang } from "../context/LanguageContext";
import VoiceInput from "../components/VoiceInput";
import VoiceBotAssistant from "../components/VoiceBotAssistant";

export default function FindWorker() {
  const { t, lang } = useLang();
  const langCode = lang === "hi" ? "hi-IN" : lang === "mr" ? "mr-IN" : "en-US";
  const fields = [
    { name: "skill", label: t.menuFindWorker + " / Skill" },
    { name: "location", label: "Village/Town" },
  ];
  const [criteria, setCriteria] = useState({ skill: "", location: "" });
  const [workers, setWorkers] = useState([]);
  function updateField(field, value) {
    setCriteria({ ...criteria, [field]: value });
  }
  function handleChange(e) {
    setCriteria({ ...criteria, [e.target.name]: e.target.value });
  }
  async function handleSearch(e) {
    e.preventDefault();
    try {
      const res = await matchWorkers(criteria.skill, criteria.location);
      setWorkers(res.data.data);
    } catch (err) { setWorkers([]); }
  }
  return (
    <>
      <Header />
      <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
        <form className="village-form" onSubmit={handleSearch} style={{ maxWidth: "400px", boxShadow: "0 0 16px #e3c08b", borderRadius: "16px", background: "#fffbe7" }}>
          <h3 style={{ textAlign: "center", color: "#785b25" }}>{t.menuFindWorker}</h3>
          {fields.map(field => (
            <div key={field.name} style={{ marginBottom: "1rem" }}>
              <label style={{ fontWeight: 600, color: "#6c4a23" }}>{field.label}</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input name={field.name} value={criteria[field.name]} onChange={handleChange} required />
                <VoiceInput onInput={value => updateField(field.name, value)} langCode={langCode} />
              </div>
            </div>
          ))}
          <button type="submit">{t.menuFindWorker}</button>
        </form>
      </div>
      <div className="worker-list" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {workers.map(w => <WorkerCard key={w.uid} worker={w} />)}
      </div>
      <VoiceBotAssistant fields={fields} form={criteria} setForm={setCriteria} />
      <Footer />
    </>
  );
}