import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // URL do seu backend
});

export const getVisitas = async () => {
  const response = await api.get('/visitas');
  return response.data;
};

// Outros métodos de API conforme necessário
