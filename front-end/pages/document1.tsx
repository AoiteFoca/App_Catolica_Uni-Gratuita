import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Alert, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/navigationTypes';
import AppBottomBar from '../components/appBar';
import Icon from 'react-native-vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system';

interface Document {
  uri: string;
  name: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Document1'>;

const Document1: React.FC<Props> = ({ navigation }) => {
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
      <Text style={styles.title}>Meus Documentos</Text>
      <View style={styles.progressContainer}>
        <TouchableOpacity onPress={() => {/* Handle back action */}}>
          <Icon name="chevron-back" size={28} color="#7d0a16" />
        </TouchableOpacity>
        <View style={styles.progressLine} />
        {[...Array(6)].map((_, index) => (
          <View key={index} style={styles.progressStepContainer}>
            <View style={[styles.progressStep, index === 0 && styles.activeStep]}>
              <Text style={[styles.progressText, index === 0 && styles.activeProgressText]}>{index + 1}</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity onPress={() => {/* Handle next action */}}>
          <Icon name="chevron-forward" size={28} color="#7d0a16" />
        </TouchableOpacity>
      </View>
      <View style={styles.documentContainer}>
        <Text style={styles.subtitle}>DOCUMENTOS OBRIGATÓRIOS</Text>
        <FlatList
          data={documents}
          renderItem={renderDocument}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity style={styles.addButton} onPress={pickDocument}>
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
  documentContainer: {
    flex: 1,
    marginBottom: 50,
    marginTop: 50, // Move the document list further down
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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

export default Document1;
