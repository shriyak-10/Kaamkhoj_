import React from "react";
export default function WorkerCard({ worker }) {
  return (
    <div className="worker-card">
      <h4>{worker.name}</h4>
      <p>Location: {worker.location}</p>
      <p>Skills: {worker.skills.join(", ")}</p>
      <p>Contact: {worker.contact}</p>
      <p>Available: {worker.available ? "Yes" : "No"}</p>
      {worker.document_url && <a href={worker.document_url}>Document</a>}
    </div>
  );
}
