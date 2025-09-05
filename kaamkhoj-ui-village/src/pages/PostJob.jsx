import React, { useState } from "react";
import { postJob } from "../api/kaamkhoj";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLang } from "../context/LanguageContext";

export default function PostJob() {
  const { t } = useLang();
  const [form, setForm] = useState({ uid: "", name: "", organization: "", location: "", contact: "", active: true });
  const [message, setMessage] = useState("");
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await postJob(form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  }
  return (
    <>
      <Header />
      <form className="village-form" onSubmit={handleSubmit} style={{ maxWidth: "480px", margin: "2rem auto", background: "#fffdf6", boxShadow: "0 0 14px #e1c599", borderRadius: "16px", padding: "2rem" }}>
        <h3 style={{ textAlign: "center", color: "#785b25" }}>{t.menuRegisterEmployer} / {t.menuPostJob}</h3>
        <input name="uid" placeholder="Unique ID" onChange={handleChange} required />
        <input name="name" placeholder={t.menuRegisterEmployer} onChange={handleChange} required />
        <input name="organization" placeholder="Organization/Shop Name" onChange={handleChange} required />
        <input name="location" placeholder="Village/Town" onChange={handleChange} required />
        <input name="contact" placeholder="Contact Number" onChange={handleChange} />
        <button type="submit">{t.menuPostJob}</button>
        <div aria-live="polite">{message}</div>
      </form>
      <Footer />
    </>
  );
}
