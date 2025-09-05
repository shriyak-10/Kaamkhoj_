// src/api/kaamkhoj.js
import axios from "axios";
const BASE = "http://127.0.0.1:8000";

export const registerWorker = data => axios.post(`${BASE}/pre-register-worker`, data);
export const postJob = data => axios.post(`${BASE}/employer`, data);
export const getWorkers = () => axios.get(`${BASE}/workers`);
export const updateWorker = (id, data) => axios.put(`${BASE}/worker/${id}`, data);
export const matchWorkers = (skill, location) => axios.get(`${BASE}/match`, { params: { skill, location } });
// src/api/kaamkhoj.js (append these)




export const fetchPendingRegistrations = () => axios.get(`${BASE}/admin/pending-registrations`);

export const approveRegistration = (uid) =>
  axios.post(`${BASE}/admin/approve-registration/${uid}`);

export const rejectRegistration = (uid, reason = "") =>
  axios.post(`${BASE}/admin/reject-registration/${uid}`, null, { params: { reason } });
