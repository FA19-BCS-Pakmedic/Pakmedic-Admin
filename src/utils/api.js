import axios from 'axios';


export const baseUrl = 'http://localhost:8000/api/v1/';

const token = localStorage.getItem('jwt');

export const api = axios.create({
    baseURL: baseUrl,
    "access-control-allow-origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
});

if(token)
    api.defaults.headers.common.authorization = `Bearer ${token}`;

export const getCommunities = (query) => api.get(`communities${query ? `?${query}` : ``}`);

export const getCommunityById = (id) => api.get(`communities/${id}`);

export const createCommunity = (data) => api.post('communities', data);

export const updateCommunity = (data, id) => api.patch(`communities/${id}`, data);

export const deleteCommunity = (id) => api.delete(`communities/${id}`);


export const getAppointmentRequests = (query) => api.get(`/appointments/requests${query ? `?${query}` : ``}`);

export const getAppointmentRequestById = (id) => api.get(`/appointments/requests/${id}`);

export const updateAppointmentRequest = (id, data) => api.patch(`/appointments/requests/${id}`, data);


export const getComplaints = (query) => api.get(`/complaints${query ? `?${query}` : ``}`);

export const getComplaintById = (id) => api.get(`/complaints/${id}`);

export const updateComplaint = (id, data) => api.patch(`/complaints/${id}`, data);


export const getDashboardData = () => api.get(`/admin/dashboard-stats`);

export const getAllUsers = (query) => api.get(`/admin/users/${query ? `?${query}` : ``}`);

export const updateUser = (id, data) => api.patch(`/admin/users/${id}`, data);

export const getDoctorData = (id) => api.get(`/admin/doctors/${id}`);

export const getAllDoctors = () => api.get(`/admin/doctors`);

export const loginAdmin = (data) => api.post(`/admin/login`, data);

export const getLoggedInAdmin = () => api.get(`/admin`);

export const getUnresolvedData = () => api.get(`/admin/unresolved-data`);


