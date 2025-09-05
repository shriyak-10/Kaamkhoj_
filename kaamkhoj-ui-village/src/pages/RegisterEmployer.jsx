import React, { useState } from "react";
import { postJob } from "../api/kaamkhoj";
export default function RegisterEmployer() {
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
    <form className="village-form" onSubmit={handleSubmit}>
      <h3>Employer Registration / Post Requirement</h3>
      <input name="uid" placeholder="Unique ID" onChange={handleChange} required/>
      <input name="name" placeholder="Name" onChange={handleChange} required/>
      <input name="organization" placeholder="Organization/Shop Name" onChange={handleChange} required/>
      <input name="location" placeholder="Village/Town" onChange={handleChange} required/>
      <input name="contact" placeholder="Contact Number" onChange={handleChange} />
      <button type="submit">Register/Post</button>
      <div aria-live="polite">{message}</div>
    </form>
  );
}
