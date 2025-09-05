import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import "../styles/village-theme.css";
import { useLang } from "../context/LanguageContext";
import VoiceBotAssistant from "../components/VoiceBotAssistant";

const images = [
  "/assets/home1.png",
  "/assets/home2.jpg",
  "/assets/home3.png",
  "/assets/home4.png",
];

export default function Dashboard() {
  const [current, setCurrent] = useState(0);
  const { t, lang } = useLang();
  const navigate = useNavigate();

  // Main navigation options (for speech redirection)
  const NAV_OPTIONS = [
    { label: t.menuDashboard, route: "/dashboard" },
    { label: t.menuServices, route: "/services" },
    { label: t.menuContact, route: "/contact" },
    { label: t.menuAbout, route: "/about" }
  ];

  // Bot reads nav options, and asks
  const botFields = [
    { label: t.title },
    ...NAV_OPTIONS.map(opt => ({ label: opt.label })),
    { label:
      lang === "en"
        ? "Say which page to open: Dashboard, Services, Contact, or About."
        : lang === "hi"
          ? "कृपया जिस पेज का नाम बोलें: डैशबोर्ड, सेवाएँ, संपर्क, या हमारे बारे में।"
          : "कोणत्या पेजवर जायचंय ते सांगा: डॅशबोर्ड, सेवा, संपर्क, किंवा आमच्याबद्दल."
    }
  ];

  function handleVoiceNav(spoken) {
    const txt = (spoken || "").toLowerCase();
    const found = NAV_OPTIONS.find(opt => opt.label && opt.label.toLowerCase().includes(txt));
    if (found) navigate(found.route);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Header />
      <div className="header-slideshow">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className={`header-img${i === current ? " visible" : ""}`}
            alt="KaamKhoj slideshow"
            style={{ opacity: i === current ? 1 : 0, transition: "opacity 1.2s" }}
          />
        ))}
        <div className="header-title">
          <h1>{t.title}</h1>
        </div>
      </div>
      <main className="services-section" style={{ marginTop: "2rem", maxWidth: 580, margin: "2.5rem auto" }}>
        <h2 style={{ textAlign: "center", color: "#7b5c26" }}>{t.services}</h2>
        <Link to="/register-worker" className="service-btn">{t.menuRegisterWorker}</Link>
        <Link to="/register-employer" className="service-btn">{t.menuRegisterEmployer}</Link>
        <Link to="/find-worker" className="service-btn">{t.menuFindWorker}</Link>
        <Link to="/post-job" className="service-btn">{t.menuPostJob}</Link>
      </main>
      <VoiceBotAssistant
        fields={botFields}
        mode="page"
        onSelection={handleVoiceNav}
        form={{}}
        setForm={() => {}}
      />
      <Footer />
    </>
  );
}
