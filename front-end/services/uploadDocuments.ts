import axios from 'axios';
import FormData from 'form-data';
import api from './api';
import { Alert } from 'react-native/Libraries/Alert/Alert';

interface Document {
  uri: string;
  name: string;
  type?: string;
}

const uploadDocuments = async (personId: string, category: string, documents: Document[]) => {
  const formData = new FormData();

  formData.append('personId', personId);
  formData.append('category', category);

  for (const document of documents) {
    formData.append('files', {
      uri: document.uri,
      type: document.type,
      name: document.name,
    });
  }

  try {
    const response = await api.post('/docs/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 201) {
      Alert.alert('Sucesso', 'Documentos enviados com sucesso!');
    } else {
      Alert.alert('Erro', 'Falha ao enviar documentos.');
    }
  } catch (error) {
    console.error('Erro ao enviar documentos:', error);
    Alert.alert('Erro', 'Ocorreu um erro ao enviar os documentos.');
  }
};

export default uploadDocuments;
