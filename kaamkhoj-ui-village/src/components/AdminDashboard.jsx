import React, { useEffect, useState } from "react";
import {
  fetchPendingRegistrations,
  approveRegistration,
  rejectRegistration,
} from "../api/kaamkhoj";
import PendingRegistrationCard from "./PendingRegistrationCard";

export default function AdminDashboard() {
  const [pendingRegs, setPendingRegs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch pending registrations
  async function loadPending() {
    setLoading(true);
    try {
      const res = await fetchPendingRegistrations();
      setPendingRegs(res.data);
    } catch (error) {
      setMessage("Failed to load pending registrations.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPending();
  }, []);

  // Approve handler
  async function handleApprove(uid) {
    try {
      await approveRegistration(uid);
      setMessage(`User ${uid} approved.`);
      await loadPending();
    } catch {
      setMessage(`Failed to approve ${uid}.`);
    }
  }

  // Reject handler (with simple prompt)
  async function handleReject(uid) {
    const reason = prompt(`Provide reason for rejecting user ${uid}:`, "");
    if (reason === null) return; // Cancelled
    try {
      await rejectRegistration(uid, reason);
      setMessage(`User ${uid} rejected.`);
      await loadPending();
    } catch {
      setMessage(`Failed to reject ${uid}.`);
    }
  }

  return (
    <div>
      <h2>Admin Dashboard - Pending Registrations</h2>
      {message && <p className="message">{message}</p>}
      {loading ? (
        <p>Loading registrations...</p>
      ) : pendingRegs.length === 0 ? (
        <p>No pending registrations.</p>
      ) : (
        pendingRegs.map((reg) => (
          <PendingRegistrationCard
            key={reg.uid}
            registration={reg}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))
      )}
    </div>
  );
}
