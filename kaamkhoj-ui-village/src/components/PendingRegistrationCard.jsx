import React from "react";

export default function PendingRegistrationCard({ registration, onApprove, onReject }) {
  const { uid, name, location, skills, contact } = registration;

  return (
    <div className="worker-card">
      <h4>{name} (ID: {uid})</h4>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Skills:</strong> {skills.join(", ")}</p>
      <p><strong>Contact:</strong> {contact}</p>

      <div className="admin-buttons">
        <button onClick={() => onApprove(uid)} className="btn-approve">Approve</button>
        <button onClick={() => onReject(uid)} className="btn-reject">Reject</button>
      </div>
    </div>
  );
}
