import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Dashboard from "./pages/Dashboard";
import RegisterWorker from "./pages/RegisterWorker";
import RegisterEmployer from "./pages/RegisterEmployer";
import FindWorker from "./pages/FindWorker";
import PostJob from "./pages/PostJob";
import AdminPage from "./pages/AdminPage";
import Contact from "./pages/Contact";
import About from "./pages/About";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/register-worker" element={<RegisterWorker />} />
          <Route path="/register-employer" element={<RegisterEmployer />} />
          <Route path="/find-worker" element={<FindWorker />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
