import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

// api.interceptors.request.use(config => {
//   if (config.url === '/signup') {
//     config.headers['Content-Type'] = 'multipart/form-data';
//   }
//   return config;
// });
export default api;