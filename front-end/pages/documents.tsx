import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Layout from "../components/layout";
import StyledInput from "../components/styledInput";

const Documents: React.FC = () => {
  const initialDocuments = [
    {
      id: 1,
      title: "Meus dados",
      status: "OK",
    },
    {
      id: 2,
      title: "Da universidade",
      status: "OK",
    },
    {
      id: 3,
      title: "Comprovante de residência",
      status: "Pendente",
    },
    {
      id: 4,
      title: "Histórico escolar",
      status: "Pendente",
    },
    {
      id: 5,
      title: "Comprovante de matrícula",
      status: "Pendente",
    },
    {
      id: 6,
      title: "Comprovante de renda",
      status: "Pendente",
    },
    {
      id: 7,
      title: "Carta de recomendação",
      status: "OK",
    },
    {
      id: 8,
      title: "Certidão de nascimento",
      status: "Pendente",
    },
    {
      id: 9,
      title: "Passaporte",
      status: "OK",
    },
    {
      id: 10,
      title: "Contrato de aluguel",
      status: "Pendente",
    },
    {
      id: 11,
      title: "Certificado de conclusão",
      status: "OK",
    },
    {
      id: 12,
      title: "Carta de motivação",
      status: "Pendente",
    },
    {
      id: 13,
      title: "Foto 3x4",
      status: "OK",
    },
    {
      id: 14,
      title: "Comprovante de pagamento",
      status: "Pendente",
    },
    {
      id: 15,
      title: "Certificado de vacinação",
      status: "OK",
    },
  ];

  const [documents, setDocuments] = useState(initialDocuments);
  const [documentsPending, setDocumentsPending] = useState<any>([]);
  const [documentsOK, setDocumentsOK] = useState<any>([]);

  useEffect(() => {
    updateDocumentStatus();
  }, [documents]);

  const updateDocumentStatus = () => {
    const documentosPending = documents.filter(
      (document) => document.status === "Pendente"
    );
    const documentosOK = documents.filter(
      (document) => document.status === "OK"
    );
    setDocumentsOK(documentosOK);
    setDocumentsPending(documentosPending);
  };

  const handleChangeStatus = (id: number, newStatus: string) => {
    const updatedDocuments = documents.map((document) => {
      if (document.id === id) {
        return { ...document, status: newStatus };
      }
      return document;
    });
    setDocuments(updatedDocuments);
  };

  return (
    <Layout currentTab="Documents">
      <View className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          className="p-4 mt-10"
        >
          <Text className="text-center text-xl font-bold mb-4">
            Meus Documentos
          </Text>
          {/* <StyledInput /> */}

          <View className="mb-4 p-4 border-2 border-maroon rounded-md">
            <View className="flex-row justify-between mb-2">
              <Text className="text-lg font-semibold">Enviados</Text>
              <Text className="text-lg">
                {documentsOK.length} / {documents.length}
              </Text>
            </View>
            {documentsOK.map((document: any) => (
              <View
                key={document.id}
                className="mb-2 p-4 bg-gray-200 rounded-md flex-row justify-between items-center"
              >
                <Text className="text-lg">{document.title}</Text>
                <TouchableOpacity
                  className="bg-blue-500 px-2 py-1 rounded-full"
                  onPress={() => handleChangeStatus(document.id, "Pendente")}
                >
                  <Text className="text-white text-sm">{document.status}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View className="mb-4 p-4 border-2 border-maroon rounded-md">
            <View className="flex-row justify-between mb-2">
              <Text className="text-lg font-semibold">Pendentes</Text>
              <Text className="text-lg">
                {documentsPending.length} / {documents.length}
              </Text>
            </View>
            {documentsPending.map((document: any) => (
              <TouchableOpacity
                key={document.id}
                className="mb-2 p-4 bg-gray-200 rounded-md flex-row justify-between items-center"
                onPress={() => handleChangeStatus(document.id, "OK")}
              >
                <Text className="text-lg">{document.title}</Text>
                <View className="bg-blue-500 px-2 py-1 rounded-full">
                  <Text className="text-white text-sm">{document.status}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View className="absolute bottom-5 w-full flex items-center">
          <TouchableOpacity
            onPress={() => {
              /* Função para continuar enviando documentos */
            }}
            className="w-[300px] bg-blue-500 py-3 rounded-full flex-row justify-center items-center"
          >
            <Text className="text-white font-bold text-lg">
              CONTINUAR ENVIANDO
            </Text>
            <Text className="text-white font-bold text-lg ml-2">→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default Documents;
