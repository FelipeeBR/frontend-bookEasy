import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const tokenData = JSON.parse(localStorage.getItem('token') || '{}');
  if (tokenData?.accessToken) {
    config.headers.Authorization = `Bearer ${tokenData.accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const tokenData = JSON.parse(localStorage.getItem('token') || '{}');
        const refreshRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {
          refreshToken: tokenData.refreshToken,
        });

        const newTokenData = {
          accessToken: refreshRes.data.token.accessToken,
          refreshToken: refreshRes.data.token.refreshToken,
        };

        localStorage.setItem('token', JSON.stringify(newTokenData));

        api.defaults.headers.common['Authorization'] = `Bearer ${newTokenData.accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newTokenData.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
