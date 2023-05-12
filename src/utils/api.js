import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    "access-control-allow-origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
});


export const getCommunities = (query) => api.get(`communities/${query ? `?${query}` : ``}`);

export const getCommunityById = (id) => api.get(`communities/${id}`);

export const createCommunity = (data) => api.post('communities', data);


export const getAppointmentRequests = (query) => api.get(`/appointment/requests/${query ? `?${query}` : ``}`);

export const getAppointmentRequestById = (id) => api.get(`/appointment/requests/${id}`);

export const updateAppointmentRequest = (id, data) => api.patch(`/appointment/requests/${id}`, data);


export const getComplaints = (query) => api.get(`/complaints/${query ? `?${query}` : ``}`);

export const getComplaintById = (id) => api.get(`/complaints/${id}`);

export const updateComplaint = (id, data) => api.patch(`/complaints/${id}`, data);


export const getDashboardData = () => api.get(`/admin/dashboard-stats`);

export const getAllUsers = (query) => api.get(`/admin/all-users/${query ? `?${query}` : ``}`);

export const getDoctorData = (id) => api.get(`/admin/doctor-data/${id}`);


