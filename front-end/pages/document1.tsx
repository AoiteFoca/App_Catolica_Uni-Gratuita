import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/navigationTypes';

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
        const { uri, name } = result.assets[0];
        setDocuments(prevDocuments => [...prevDocuments, { uri, name }]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderDocument = ({ item }: { item: Document }) => (
    <View style={styles.document}>
      <Text>{item.name}</Text>
      <Image source={{ uri: item.uri }} style={styles.documentImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Documentos</Text>
      <View style={styles.progressContainer}>
        {[...Array(6)].map((_, index) => (
          <View key={index} style={styles.progressStep}>
            <Text style={styles.progressText}>{index + 1}</Text>
          </View>
        ))}
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
      </View>
      <View style={styles.navbar}>
        <TouchableOpacity>
          <Icon name="bell" size={24} color="white" />
          <Text style={styles.navText}>Avisos</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="file" size={24} color="white" />
          <Text style={styles.navText}>Documentos</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="home" size={24} color="white" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="user" size={24} color="white" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Document1')}>
          <Icon name="ellipsis-h" size={24} color="white" />
          <Text style={styles.navText}>Outros</Text>
        </TouchableOpacity>
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
    marginTop: 20,
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  progressStep: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  documentContainer: {
    flex: 1,
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
    backgroundColor: '#7d0a16',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#7d0a16',
  },
  navText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Document1;
