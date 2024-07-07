import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Alert, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigationTypes';
import AppBottomBar from '../../components/appBar';
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

type Props = NativeStackScreenProps<RootStackParamList, 'Document4'>;

const Document4: React.FC<Props> = ({ navigation }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const { uri: originalUri, name } = result.assets[0];
        const uri = Platform.OS === 'android' ? originalUri : originalUri;
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
          <View style={[styles.progressStep, index === 3 && styles.activeStep]}>
            <Text style={[styles.progressText, index === 3 && styles.activeProgressText]}>{index + 1}</Text>
          </View>
        </View>
        ))}
        <TouchableOpacity onPress={() => navigation.navigate('Document5')}>
          <Icon name="chevron-forward" size={28} color="#7d0a16" />
        </TouchableOpacity>
      </View>

      <View style={styles.documentationInfo}>
        <Text style={styles.subtitle}>Comprovante de renda familiar e carteira de trabalho digital</Text>
        <Text style={styles.explanation}>
        Envie abaixo os comprovantes de renda familiar de cada membro da sua família e a sua carteira de trabalho digital. (Veja no ícone de ajuda quais serão os documentos aceitos como comprovantes de renda)
        </Text>
        <TouchableOpacity
    style={styles.helpIcon}
    onPress={() => {
      Alert.alert('Ajuda', 'Referente a renda Bruta familiar mensal, seguem os tipos de comprovantes aceitos abaixo descritos \n \nI - Assalariado: (folha de pagamento, holerite, contracheque, recibo de pagamento, proventos de pagamento etc.) \n - Os três últimos demonstrativos de pagamento no caso de renda fixa. \n - Os seis últimos no caso de renda variável (comissão, gratificação, hora extra, etc..). \n \nII - Autônomo ou Profissional Liberal: \n - Decore emitida por contador; \n - CND – Certidão Negativa de Débito Estadual. \n - Guia de Recolhimento de INSS dos três últimos meses. \n - Extrato bancário dos últimos três meses; \n - Notas fiscais de serviço; \n \nIII - Trabalhador Informal ou Eventual (“bicos”): \n - Declaração de rendimentos, conforme modelo em anexo, com média dos três últimos meses, com assinatura reconhecida em cartório. \n - Extrato bancário dos últimos três meses; \n - Guia de Recolhimento de INSS dos três últimos meses. \n \nIV - Proprietário Individual ou Sócio Proprietário de Empresa Ativa: \n - Pró-labore e Decore assinado por contador responsável; \n - CND - Certidão Negativa de Débito Estadual e Municipal. \n - Imposto de Renda completo de Pessoa Jurídica. \n - Contrato social atualizado; \n - Balanço financeiro da empresa; \n(Documentos devem ser emitidos pelo Contador da Empresa e assinados por ele como responsável). \n \nV - Proprietário Individual ou Sócio Proprietário de Empresa Inativa: \n - Protocolo de baixa em uma das esferas: municipal, estadual ou federal, ou \n - Declaração de Imposto de Renda de Pessoa Jurídica de Inatividade. \n \nVI - Microempreendedor Individual \n - Declaração Anual do Simples Nacional do MEI (DASN-SIMEI). \n - Certificado do MEI – CCMEI. \n - Cartão CNPJ. \n - Declaração de Faturamento dos últimos 12 meses assinada por contador ou DECORE – Declaração Comprobatória de Percepção de Rendimentos, emitida por Contador - como o MEI não tem obrigatoriedade legal de ter um contador cuidando do CNPJ, ele poderá emitir e assinar a declaração com o faturamento da empresa onde conste valor de entradas “bruto”, valor de saídas, pagamentos, e valor que o microempreendedor recebe mensalmente pelos trabalhos/serviço prestados; \n \nVII - Aposentado, Pensionista ou Beneficiário Auxílio-Doença ou outros auxílios do INSS: \n - Extrato obtido via site do INSS, ou comprovante de rendimento que contenha o número do benefício recebido, o nome do beneficiário e o valor recebido mensalmente. \n - Mesmo no caso de aposentadoria ou recebimento de pensão por morte, a apresentação da Carteira de Trabalho Digital é indispensável. \n \nVIII - Produtor Rural/Pescadores \n - Declaração do Sindicato dos Produtores Rurais, Colônia de Pescadores ou do próprio agricultor/pescador com assinatura reconhecida em cartório, conforme modelo disponível em anexo, constando a atividade rural/pesqueira desenvolvida e a remuneração bruta (média mensal). \n - Caso as atividades rurais sejam realizadas em terras de terceiros, apresentar o contrato de arrendamento. \n \nIX - Estagiário: \n - Termo de Compromisso de Estágio/Contrato de Estágio, indicando o valor mensal recebido; ou declaração do supervisor de estágio constando o valor mensal recebido pelo estagiário (com assinatura); ou ainda comprovante de recebimento dos valores de bolsa-auxílio fornecido pela empresa ou órgão público (se for o caso). \n \nX - Desempregado: \n - Cópia do último comprovante de seguro-desemprego (se estiver recebendo). \n - Rescisão contratual. \n - Comprovante do saque do Fundo de Garantia por Tempo de Serviço – FGTS. \n - Declaração de não exercício de atividade remunerada, se estiver desempregado a mais de 06 meses e/ou não estiver recebendo seguro-desemprego. \n \nXI - Recebimento de Pensão Alimentícia: \n - Declaração constando o valor da pensão alimentícia, com a assinatura de quem paga reconhecida em cartório, no caso de não haver decisão judicial de pagamento de pensão alimentícia ou; \n - Decisão judicial de pagamento da pensão e últimas três folhas de pagamento de quem paga a pensão alimentícia (no caso da decisão judicial da pensão alimentícia, fazer menção ao salário-mínimo nacional, não é necessária apresentação das folhas de pagamento de quem paga a pensão). \n \nXII - Receber Aluguel de Imóveis: \n - Declaração constando o valor recebido mensalmente, com assinatura reconhecida em cartório, conforme modelo disponível em anexo, ou os contratos de locação com os inquilinos devidamente assinados e registrados em cartório. \n \n XIII - Não exercício de atividade remunerada (exemplo: “Do Lar”): \n - Declaração do não exercício de atividade remunerada, conforme modelo disponível em anexo. \n - Esta declaração é necessária para todos os desempregados a mais de 06 meses e que não estiverem recebendo seguro-desemprego e para os que não exercem atividade remunerada. \n \nA Carteira de Trabalho Digital de todos os integrantes do grupo familiar, maiores de 14 anos, que deverá ser cadastrada no Portal Emprega Brasil, do Governo Federal. O PDF deverá ser emitido pelo aplicativo da Carteira de Trabalho Digital com data de no mínimo 5 dias antes da entrega dos documentos.');
    }}
  >
    <Icon name="help-circle-outline" size={24} color="#7d0a16" />
  </TouchableOpacity>
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
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Document3')}>
            <Icon name="chevron-back" size={28} color="#7d0a16" />
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Document5')}>
            <Text style={styles.buttonText}>Próximo</Text>
            <Icon name="chevron-forward" size={28} color="#7d0a16" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomBarContainer}>
        <AppBottomBar currentTab="Document3" />
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
    subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    },
    explanation: {
    fontSize: 15,
    marginTop: 5,
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
    
    export default Document4;
