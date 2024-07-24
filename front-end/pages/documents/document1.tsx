import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Alert, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigationTypes';
import AppBottomBar from '../../components/appBar';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../../services/api';
import uploadDocuments from '../../services/uploadDocuments';

interface Document {
  uri: string;
  name: string;
  type?: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Document1'>;

const Document1: React.FC<Props> = ({ navigation }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  let personId = '';
  let category = 'inscricao';

  const pickDocument = async () => {
    try {
      const cache = await api.getItem("token") || "";
      const result = await DocumentPicker.getDocumentAsync({});
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const { uri: originalUri, name, mimeType } = result.assets[0];
        const uri = Platform.OS === 'android' ? originalUri : originalUri;
        const type = mimeType || 'application/pdf';
        const limitedName = name.length > 20 ? `${name.substring(0, 20)}...` : name;
        setDocuments(prevDocuments => [...prevDocuments, { uri, type, name: limitedName }]);
        await api.saveItem('token', cache);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert('Permissão negada', 'Você precisa conceder permissão para acessar a câmera.');
        return;
      }

      const pickerResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
        const { uri } = pickerResult.assets[0];
        let name = uri.split('/').pop() || 'image.jpg';
        name = name.length > 20 ? `${name.substring(0, 20)}...` : name;
        setDocuments(prevDocuments => [...prevDocuments, { uri, name }]);
      } else {
        console.log('Captura de imagem cancelada');
      }
    } catch (err) {
      console.error('Erro ao escolher a imagem:', err);
    }
  };

  const deleteDocument = (index: number) => {
    setDocuments(prevDocuments => prevDocuments.filter((_, i) => i !== index));
  };

  const showOptions = (index: number) => {
    const document = documents[index];
    Alert.alert(
      'Opções',
      `O que deseja fazer com ${document.name}?`,
      [
        {
          text: 'Excluir',
          onPress: () => deleteDocument(index),
          style: 'destructive',
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const handleUploadDocuments = async () => {
    const data = await api.getItem("token");
    personId = data.personId;
    category = 'inscricao';
    await uploadDocuments(personId, category, documents);
  };

  const renderDocument = ({ item, index }: { item: Document; index: number }) => (
    <View style={styles.document}>
      <Image source={{ uri: item.uri }} style={styles.documentImage} />
      <Text numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
      <TouchableOpacity onPress={() => showOptions(index)}>
        <Icon name="ellipsis-vertical" size={24} color="#7d0a16" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Documentos</Text>
      <View style={styles.progressContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={28} color="#7d0a16" />
        </TouchableOpacity>
        <View style={styles.progressLine} />
        {[...Array(5)].map((_, index) => (
          <View key={index} style={styles.progressStepContainer}>
            <View style={[styles.progressStep, index === 0 && styles.activeStep]}>
              <Text style={[styles.progressText, index === 0 && styles.activeProgressText]}>{index + 1}</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity onPress={() => navigation.navigate('Document2')}>
          <Icon name="chevron-forward" size={28} color="#7d0a16" />
        </TouchableOpacity>
      </View>

      <View style={styles.documentationInfo}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Comprovante de inscrição/recadastro</Text>
        </View>
        <Text style={styles.explanation}>
          Envie abaixo o comprovante de inscrição ou de recadastro referente ao cadastro preenchido no sistema informatizado do Estado de Santa Catarina
        </Text>
      </View>
      <View style={styles.documentContainer}>
        <Text style={styles.subtitle}>Enviados</Text>
        <FlatList
          data={documents}
          renderItem={renderDocument}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => {
          Alert.alert(
            'Escolha uma opção',
            'Você deseja tirar uma foto ou selecionar um arquivo existente?',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Selecionar arquivo', onPress: pickDocument },
              { text: 'Tirar foto', onPress: pickImage },
            ],
            { cancelable: true }
          );
        }}>
          <Text style={styles.addButtonText}>+ Adicionar novo arquivo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSend} onPress={handleUploadDocuments}>
          <Text style={styles.buttonText}>Enviar Documentos</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Document2')}>
            <Text style={styles.buttonText}>Próximo</Text>
            <Icon name="chevron-forward" size={28} color="#7d0a16" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomBarContainer}>
        <AppBottomBar currentTab="Document1" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginTop: 20,
  },
  progressStepContainer: {
    alignItems: 'center',
  },
  progressStep: {
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeStep: {
    backgroundColor: '#7d0a16',
  },
  activeProgressText: {
    color: 'white',
  },
  progressLine: {
    position: 'absolute',
    top: 15,
    left: 60,
    right: 60,
    height: 2,
    backgroundColor: '#7d0a16',
    zIndex: -1,
  },
  documentationInfo: {
    marginBottom: 0,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginTop: 5,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  explanation: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
    color: '#333',
  },
  helpIcon: {
    marginLeft: 310,
  },
  documentContainer: {
    flex: 1,
    marginBottom: 50,
    marginTop: 20,
  },
  document: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  documentImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#7d0a16',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 80,
    paddingHorizontal: 100,
    alignItems: 'center',
  },
  buttonSend: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    width: '54%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  buttonText: {
    color: '#7d0a16',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Document1;
