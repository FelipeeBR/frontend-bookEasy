import axios from 'axios';

const api_url = `${import.meta.env.VITE_API_URL}/api/auth/refresh`;

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(
      api_url,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    return response.data.token; // { accessToken, refreshToken }
  } catch (error: any) {
    throw new Error('Failed to refresh token');
  }
};