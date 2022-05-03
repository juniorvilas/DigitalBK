import axios from 'axios';

const apiCep = axios.create({
  baseURL: 'https://brasilapi.com.br/api/cep/v1'
});

export default apiCep;