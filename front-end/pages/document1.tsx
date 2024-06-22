import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface Document {
  uri: string;
  name: string;
}

const DocumentScreen = () => {
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
        <TouchableOpacity>
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
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  progressStep: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
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
    alignItems: 'center',
    marginBottom: 10,
  },
  documentImage: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#0000FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#800000',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default DocumentScreen;
