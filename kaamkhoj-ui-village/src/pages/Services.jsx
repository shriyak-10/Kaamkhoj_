import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLang } from "../context/LanguageContext";
import VoiceBotAssistant from "../components/VoiceBotAssistant";
import { useNavigate } from "react-router-dom";
import "../styles/village-theme.css";

export default function Services() {
  const { t, lang } = useLang();
  const navigate = useNavigate();

  const services = [
    { label: t.menuRegisterWorker, route: "/register-worker" },
    { label: t.menuRegisterEmployer, route: "/register-employer" },
    { label: t.menuFindWorker, route: "/find-worker" },
    { label: t.menuPostJob, route: "/post-job" },
  ];
  const botFields = [
    ...services.map(s => ({ label: s.label })),
    { label: lang === "en" ?
        "Now say the service name to open it." :
      lang === "hi"
        ? "सेवा का नाम बोलें।" :
        "सेवेचे नाव बोला."
    }
  ];

  function voiceServiceHandler(spokenText) {
    const txt = (spokenText || "").toLowerCase();
    const found = services.find(s =>
      s.label && s.label.toLowerCase().includes(txt)
    );
    if (found) navigate(found.route);
  }

  return (
    <>
      <Header />
      <main className="services-section" style={{ maxWidth: 580, margin: "2.5rem auto" }}>
        <h2 style={{ textAlign: "center", color: "#7b5c26" }}>{t.services}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.7rem", alignItems: "center", marginTop: "2.5rem" }}>
          {services.map(({ label, route }) => (
            <a key={route}
              href={route}
              className="service-btn"
              style={{
                minWidth: 280,
                fontWeight: 600,
                fontSize: "1.13rem",
                borderRadius: "22px",
                background: "#ffe0a6",
                margin: 0,
                boxShadow: "0px 2px 12px #eddbaf",
                padding: "1rem 0",
                border: "none",
                color: "#86631b",
                textAlign: "center"
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </main>
      <VoiceBotAssistant
        fields={botFields}
        form={{}}
        setForm={voiceServiceHandler}
        mode="page"
      />
      <Footer />
    </>
  );
}
