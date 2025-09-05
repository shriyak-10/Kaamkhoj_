import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/village-theme.css";
import { useLang, LANGUAGES } from "../context/LanguageContext";
import VoiceBotAssistant from "./VoiceBotAssistant";

export default function Header() {
  const { lang, setLang, t } = useLang();
  const navigate = useNavigate();

  // Define all menu options for both reading and navigation
  const menuOptions = [
    { label: t.menuDashboard, route: "/dashboard" },
    { label: t.menuServices, route: "/services" },
    { label: t.menuContact, route: "/contact" },
    { label: t.menuAbout, route: "/about" }
  ];

  // What fields will be read by the bot
  const botFields = menuOptions.map(opt => ({ label: opt.label }));

  // Handler to navigate to menu option based on voice
  function onTaskbarVoiceSelection(spokenText) {
    const cmd = (spokenText || "").toLowerCase();
    const found = menuOptions.find(opt =>
      opt.label && opt.label.toLowerCase().includes(cmd)
    );
    if (found) navigate(found.route);
  }

  return (
    <>
      <header className="village-header no-slideshow" style={{ position: "relative" }}>
        <div className="header-top">
          <img src="/assets/kaamkhoj-logo.png" alt="KaamKhoj Logo" className="logo" />
          <nav className="taskbar">
            <Link to="/dashboard">{t.menuDashboard}</Link>
            <Link to="/services">{t.menuServices}</Link>
            <Link to="/contact">{t.menuContact}</Link>
            <Link to="/about">{t.menuAbout}</Link>
          </nav>
          <div style={{ position: "absolute", right: 10, top: 16 }}>
            <select
              value={lang}
              onChange={e => setLang(e.target.value)}
              style={{
                padding: "6px 12px",
                borderRadius: 7,
                background: "#f8f6f0",
                fontWeight: "bold"
              }}
            >
              {Object.entries(LANGUAGES).map(([code, item]) => (
                <option key={code} value={code}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>
      </header>
      {/* The universal floating VoiceBot—always on the page, works for navbar */}
      <VoiceBotAssistant
        fields={botFields}
        mode="page"
        onSelection={onTaskbarVoiceSelection}
        form={{}}
        setForm={() => {}}
      />
    </>
  );
}
