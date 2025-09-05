import React, { createContext, useState, useContext } from "react";

export const LANGUAGES = {
  en: { name: "English" },
  hi: { name: "हिन्दी" },
  mr: { name: "मराठी" }
};

export const TEXTS = {
  en: {
    menuDashboard: "Dashboard",
    menuServices: "Services",
    menuContact: "Contact",
    menuAbout: "About Us",
    menuFindWorker: "Find Worker",
    menuRegisterWorker: "Register as Worker",
    menuRegisterEmployer: "Register Employer/Business", // ADDED
    menuPostJob: "Post Requirement",                   // ADDED
    services: "Services",
    title: "KaamKhoj",
    footer: "© 2025 KaamKhoj • All rights reserved • Made for Bharat’s villages",
    homeTitle: "Village Jobs, Village People",
    homeTag: "Connect rural workers and job seekers directly. Easy registration, secure info, quick contact.",
    homeStart: "Get Started",
    contact: {
      title: "Contact Us",
      name: "Your Name",
      email: "Email Address",
      message: "Message",
      button: "Send Message",
      orEmail: "You can also email us at",
      whatsapp: "WhatsApp"
    },
    aboutTitle: "About KaamKhoj",
    about: [
      "KaamKhoj is a technology platform dedicated to connecting skilled workers, employers, and community opportunities in rural India.",
      "Our mission is to empower Bharat’s villages with a simple way to find jobs, hire help, and build livelihoods close to home.",
      "KaamKhoj is made with ❤️ by engineers and social entrepreneurs passionate about rural development. We believe technology must work for everyone, in every language, and every corner of India."
    ],
    aboutContact: "Contact",
    voiceExplainRegister: "Please fill your name, village, skill and contact. Use the mic to speak your answer out loud. You may also type manually."
  },
  hi: {
    menuDashboard: "डैशबोर्ड",
    menuServices: "सेवाएँ",
    menuContact: "संपर्क करें",
    menuAbout: "हमारे बारे में",
    menuFindWorker: "कर्मचारी खोजें",
    menuRegisterWorker: "कर्मचारी पंजीकरण",
    menuRegisterEmployer: "नियोक्ता/व्यवसाय पंजीकरण", // ADDED
    menuPostJob: "आवश्यकता दर्ज करें",                // ADDED
    services: "सेवाएँ",
    title: "कामखोज",
    footer: "© 2025 कामखोज • सर्वाधिकार सुरक्षित • भारत के गाँवों के लिए बनाया गया",
    homeTitle: "गाँव के काम, गाँव के लोग",
    homeTag: "सीधे कर्मचारी और काम ढूंढने वालों को जोड़ें। आसान पंजीकरण, सुरक्षित जानकारी, तेज संपर्क।",
    homeStart: "शुरू करें",
    contact: {
      title: "संपर्क करें",
      name: "आपका नाम",
      email: "ईमेल पता",
      message: "संदेश",
      button: "संदेश भेजें",
      orEmail: "आप हमें ईमेल भी कर सकते हैं",
      whatsapp: "व्हाट्सएप"
    },
    aboutTitle: "कामखोज के बारे में",
    about: [
      "कामखोज एक टेक्नोलॉजी प्लेटफॉर्म है जो ग्रामीण भारत के कुशल कामगारों और नियोक्ताओं को एकसाथ जोड़ता है।",
      "हमारा मिशन भारत के गाँवों को सशक्त बनाना है, जिससे वे घर के पास ही रोजगार, मदद, और आजीविका पा सकें।",
      "कामखोज को इंजीनियरों और सामाजिक उद्यमियों ने ❤️ से बनाया है, जो ग्रामीण विकास के लिए समर्पित हैं।"
    ],
    aboutContact: "संपर्क",
    voiceExplainRegister: "कृपया नाम, गाँव, कौशल और संपर्क भरें। बोलने के लिए माइक बटन का उपयोग करें। आप चाहें तो खुद भी लिख सकते हैं।"
  },
  mr: {
    menuDashboard: "डॅशबोर्ड",
    menuServices: "सेवा",
    menuContact: "संपर्क",
    menuAbout: "आमच्याबद्दल",
    menuFindWorker: "कामगार शोधा",
    menuRegisterWorker: "कामगार नोंदणी",
    menuRegisterEmployer: "नियोक्ता/व्यवसाय नोंदणी", // ADDED
    menuPostJob: "गरज नोंदवा",                        // ADDED
    services: "सेवा",
    title: "कामखोज",
    footer: "© 2025 कामखोज • सर्व हक्क सुरक्षित • भारताच्या गावांसाठी",
    homeTitle: "गावातील काम, गावातील लोक",
    homeTag: "कामगार व काम शोधणाऱ्यांना थेट जोडा. सोपी नोंदणी, सुरक्षित माहिती, जलद संपर्क.",
    homeStart: "सुरु करा",
    contact: {
      title: "संपर्क करा",
      name: "तुमचे नाव",
      email: "ईमेल पत्ता",
      message: "संदेश",
      button: "संदेश पाठवा",
      orEmail: "तुम्ही आम्हाला ईमेलही करू शकता",
      whatsapp: "व्हॉट्सॲप"
    },
    aboutTitle: "कामखोज बद्दल",
    about: [
      "कामखोज ही ग्रामीण भारतातील कुशल कामगार, नियोक्ते आणि संधी एकत्र आणणारी तंत्रज्ञान प्लॅटफॉर्म आहे.",
      "आमचे ध्येय गावांना सक्षम करणे आहे, जवळच नोकऱ्या व मदत मिळावी.",
      "कामखोजची निर्मिती ❤️ ने अभियंते व सामाजिक उद्योजकांनी केली आहे, जे ग्रामीण विकासासाठी उत्साही आहेत."
    ],
    aboutContact: "संपर्क",
    voiceExplainRegister: "कृपया तुमचे नाव, गाव, कौशल्य व संपर्क भरा. बोलण्यासाठी माइक वापरा. तुम्ही स्वतःही लिहू शकता."
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const t = TEXTS[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
