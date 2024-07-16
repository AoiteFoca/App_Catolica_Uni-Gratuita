import axios from 'axios';

const API_BASE_URL = 'https://localhost:3030';

// Função para buscar os dados para os campos relacionais
export const fetchData = async () => {
  try {
    const estadoCivilResponse = await axios.get(`${API_BASE_URL}/estadoCivil`);
    const corRacaResponse = await axios.get(`${API_BASE_URL}/corRaca`);
    const sexoResponse = await axios.get(`${API_BASE_URL}/sexo`);
    const tipoMoradiaResponse = await axios.get(`${API_BASE_URL}/tipoMoradia`);
    const graduacaoResponse = await axios.get(`${API_BASE_URL}/graduacao`);

    return {
      estadoCivil: estadoCivilResponse.data,
      corRaca: corRacaResponse.data,
      sexo: sexoResponse.data,
      tipoMoradia: tipoMoradiaResponse.data,
      graduacao: graduacaoResponse.data,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      estadoCivil: [],
      corRaca: [],
      sexo: [],
      tipoMoradia: [],
      graduacao: [],
    };
  }
};

// Função para enviar os dados do formulário para o backend
export const submitForm = async (formData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/submitForm`, formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};
