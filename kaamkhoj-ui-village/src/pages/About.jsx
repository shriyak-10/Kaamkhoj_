import React from "react";
import "../styles/village-theme.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLang } from "../context/LanguageContext";
import VoiceBotAssistant from "../components/VoiceBotAssistant";

export default function About() {
  const { t } = useLang();

  // Prepare voice bot fields inside the function, using translation
  const aboutFields = [
    { label: t.aboutTitle },
    ...t.about.map(text => ({ label: text })),
    { label: `${t.aboutContact}: support@kaamkhoj.com. WhatsApp +91-88888-88888. Website www.kaamkhoj.com` }
  ];

  return (
    <>
      <Header />
      <main>
        <div className="village-form" style={{
          maxWidth: '540px',
          lineHeight: '1.7',
          background: "#fff6e6",
          boxShadow: "0 0 16px #efd3af",
          padding: "2rem",
          borderRadius: "18px"
        }}>
          <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#785b25" }}>{t.aboutTitle}</h2>
          {t.about.map((p, i) => (
            <p key={i} style={{ fontSize: i === 0 ? "1.09rem" : i === 1 ? "1.05rem" : "1.02rem" }}>{p}</p>
          ))}
          <hr style={{ margin: "2rem 0" }} />
          <div style={{ textAlign: "center" }}>
            <strong>{t.aboutContact}:</strong> support@kaamkhoj.com<br />
            <strong>WhatsApp:</strong> +91-88888-88888<br />
            <strong>Website:</strong> <a href="https://www.kaamkhoj.com">www.kaamkhoj.com</a>
          </div>
        </div>
      </main>
      {/* Now, VoiceBotAssistant here, INSIDE the component */}
      <VoiceBotAssistant fields={aboutFields} form={{}} setForm={() => {}} mode="page" />
      <Footer />
    </>
  );
}
