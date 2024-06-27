import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Alert, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/navigationTypes';
import AppBottomBar from '../components/appBar';
import Icon from 'react-native-vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system';

interface Document {
  uri: string;
  name: string;
}

interface CustomImagePickerResult {
  uri: string;
  cancelled: boolean;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Document3'>;

const Document3: React.FC<Props> = ({ navigation }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const { uri: originalUri, name } = result.assets[0];
        const uri = Platform.OS === 'android' ? originalUri : `file://${originalUri}`;
        const limitedName = name.length > 20 ? `${name.substring(0, 20)}...` : name;
        setDocuments(prevDocuments => [...prevDocuments, { uri, name: limitedName }]);
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
      }) as unknown as CustomImagePickerResult;
      if (pickerResult.cancelled === true) {
        console.log('Captura de imagem cancelada');
        return;
      }
  
      if (!pickerResult.uri) {
        console.log('URI da imagem não está disponível');
        return;
      }
  
      const { uri: imageUri } = pickerResult;
      const name = imageUri.split('/').pop() || 'image.jpg'; //nome arquivo
      setDocuments(prevDocuments => [...prevDocuments, { uri: imageUri, name }]);
      
    } catch (err) {
      console.error('Erro ao escolher a imagem:', err);
    }
  };

  const deleteDocument = (index: number) => {
    setDocuments(prevDocuments => prevDocuments.filter((_, i) => i !== index));
  };

  const downloadDocument = async (uri: string, name: string) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) {
        Alert.alert('Erro', `O arquivo não existe: ${name}`);
        return;
      }
  
      const downloadResumable = FileSystem.createDownloadResumable(
        uri,
        `${FileSystem.documentDirectory}${name}`
      );
  
      const downloadResult = await downloadResumable.downloadAsync();
  
      if (downloadResult && downloadResult.uri) {
        const { uri: fileUri } = downloadResult;
        Alert.alert('Download', `Arquivo baixado com sucesso: ${name}`);
      } else {
        Alert.alert('Erro', `Falha ao baixar o arquivo: ${name}`);
      }
    } catch (err) {
      console.error('Erro ao baixar o arquivo:', err);
      Alert.alert('Erro', `Falha ao baixar o arquivo: ${name}`);
    }
  };

  const showOptions = (index: number) => {
    const document = documents[index];
    Alert.alert(
      'Opções',
      `O que deseja fazer com ${document.name}?`,
      [
        {
          text: 'Download',
          onPress: () => downloadDocument(document.uri, document.name),
        },
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

  const renderDocument = ({ item, index }: { item: Document; index: number }) => (
    <View style={styles.document}>
      <Text numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
      <Image source={{ uri: item.uri }} style={styles.documentImage} />
      <TouchableOpacity onPress={() => showOptions(index)}>
        <Icon name="ellipsis-vertical" size={24} color="#7d0a16" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Documentos - Passo 2</Text>
      <View style={styles.progressContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={28} color="#7d0a16" />
        </TouchableOpacity>
        <View style={styles.progressLine} />
        {[...Array(6)].map((_, index) => (
          <View key={index} style={styles.progressStepContainer}>
          <View style={[styles.progressStep, index === 2 && styles.activeStep]}>
            <Text style={[styles.progressText, index === 2 && styles.activeProgressText]}>{index + 1}</Text>
          </View>
        </View>
        ))}
        <TouchableOpacity onPress={() => navigation.navigate('Document3')}>
          <Icon name="chevron-forward" size={28} color="#7d0a16" />
        </TouchableOpacity>
      </View>

      <View style={styles.documentationInfo}>
        <Text style={styles.subtitle}>Comprovante de inscrição/recadastro</Text>
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon name="chevron-back" size={28} color="#7d0a16" />
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Próximo</Text>
            <Icon name="chevron-forward" size={28} color="#7d0a16" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomBarContainer}>
        <AppBottomBar currentTab="Document2" />
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
    marginTop: 70,
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
  activeStepContainer: {
    position: 'relative',
  },
  progressStep: {
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStep: {
    backgroundColor: '#7d0a16',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
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
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginTop: 20,
    },
    subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    },
    explanation: {
    fontSize: 16,
    marginTop: 5,
    color: '#333',
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
    marginBottom: 100,
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
    
    export default Document3;
