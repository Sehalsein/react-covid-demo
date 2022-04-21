import axiosInstance from 'axios'

const axios = axiosInstance.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
})

// axios.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const token = localStorage.getItem('token');
//     if (token && error.response.status === 401) {
//       return axios.post('/refresh', {
//         accessToken: token,
//       });
//     }
//     return Promise.reject(error);
//   },
// );

export default axios
