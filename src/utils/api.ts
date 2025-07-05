import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API functions
export const adminAPI = {
  login: (credentials: { username: string; password: string }) =>
    api.post('/admin/login.php', credentials),
  
  getSettings: () => api.get('/admin/settings.php'),
  updateSettings: (data: any) => api.post('/admin/settings.php', data),
  
  getCountries: () => api.get('/admin/countries.php'),
  addCountry: (data: any) => api.post('/admin/countries.php', data),
  updateCountry: (id: number, data: any) => api.put(`/admin/countries.php?id=${id}`, data),
  deleteCountry: (id: number) => api.delete(`/admin/countries.php?id=${id}`),
  
  getVisaDetails: (countryId: number) => api.get(`/admin/visa-details.php?country_id=${countryId}`),
  updateVisaDetails: (data: any) => api.post('/admin/visa-details.php', data),
  
  getPackages: () => api.get('/admin/packages.php'),
  addPackage: (data: any) => api.post('/admin/packages.php', data),
  updatePackage: (id: number, data: any) => api.put(`/admin/packages.php?id=${id}`, data),
  deletePackage: (id: number) => api.delete(`/admin/packages.php?id=${id}`),
  
  getUmrahPackages: () => api.get('/admin/umrah.php'),
  updateUmrahPackages: (data: any) => api.post('/admin/umrah.php', data),
  
  getEnquiries: () => api.get('/admin/enquiries.php'),
  updateEnquiryStatus: (id: number, status: string) => 
    api.put(`/admin/enquiries.php?id=${id}`, { status }),
};

export const publicAPI = {
  getCountries: () => api.get('/countries.php'),
  getCountryDetails: (slug: string) => api.get(`/country-details.php?slug=${slug}`),
  getVisaCountries: (visaType: string) => api.get(`/visa-countries.php?type=${visaType}`),
  getVisaDetails: (countryId: number, visaType: string) => api.get(`/visa-details.php?country_id=${countryId}&type=${visaType}`),
  getPackages: (category?: string) => api.get(`/packages.php${category ? `?category=${category}` : ''}`),
  getPackageDetails: (id: number) => api.get(`/package-details.php?id=${id}`),
  getUmrahPackages: () => api.get('/umrah.php'),
  submitEnquiry: (data: any) => api.post('/enquiry.php', data),
  uploadDocument: (formData: FormData) => api.post('/upload-document.php', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export default api;