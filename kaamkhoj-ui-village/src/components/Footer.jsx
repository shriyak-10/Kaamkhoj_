import React from "react";
import "../styles/village-theme.css";
import { useLang } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="village-footer">
      <p>{t.footer}</p>
    </footer>
  );
}
