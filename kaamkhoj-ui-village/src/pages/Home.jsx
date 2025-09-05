import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/village-theme.css";
import { useLang } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom"; // <-- Imported for redirect

export default function Home() {
  const { t } = useLang();
  const navigate = useNavigate(); // <-- Hook for navigation

  return (
    <div style={{ background: "#fcf8e3", minHeight: "100vh" }}>
      <Header />
      <main className="home-main" style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "4rem 0", maxWidth: "580px", margin: "0 auto"
      }}>
        <h2 style={{ color: "#755b2f", marginBottom: "2rem", fontSize: "2.1rem", textAlign: "center" }}>
          {t.homeTitle}
        </h2>
        <p style={{ fontSize: "1.2rem", color: "#4e4127", marginBottom: "2.4rem", textAlign: "center" }}>
          {t.homeTag}
        </p>
        <button
          type="button"
          onClick={() => navigate("/dashboard")} // <-- SPA redirect
          className="btn-primary"
          style={{
            background: "#b88a60",
            color: "white",
            padding: "0.85rem 2.2rem",
            borderRadius: "14px",
            fontWeight: 600,
            fontSize: "1.18rem",
            textDecoration: "none",
            boxShadow: "0 0 8px #e2d0ad",
            border: "none", // improved for button
            cursor: "pointer"
          }}
        >
          {t.homeStart} →
        </button>
      </main>
      <Footer />
    </div>
  );
}
