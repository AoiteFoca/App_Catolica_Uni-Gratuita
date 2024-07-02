import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigationTypes';
import AppBottomBar from '../../components/appBar';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = NativeStackScreenProps<RootStackParamList, 'DocumentFinish'>;

const DocumentFinish: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documentos Enviados</Text>
      <Text style={styles.message}>
        Seus documentos foram enviados para avaliação. Aguarde o retorno da equipe. Você pode acompanhar o status pela tela de documentos e avisos.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Landing')}
      >
        <Text style={styles.buttonText}>Voltar para a Página Inicial</Text>
        <Icon name="home-outline" size={24} color="#7d0a16" />
      </TouchableOpacity>
      <View style={styles.bottomBarContainer}>
        <AppBottomBar currentTab="DocumentFinish" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
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
    marginRight: 10,
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default DocumentFinish;
