import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styled } from "nativewind";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Layout from "../components/layout";

const Container = styled(View);
const SectionHeader = styled(Text);
const Card = styled(View);
const CardContent = styled(View);
const CardText = styled(Text);
const Divider = styled(View);
const Thumbnail = styled(Image);

const Avisos = () => {
  const navigation = useNavigation();

  return (
    <Layout currentTab="AvisosPage">
      <Container className="flex-1 bg-white p-4 mt-10">
        {/* Back Button */}
        <TouchableOpacity className="mb-5" onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Section: HOJE */}
        <SectionHeader className="text-lg font-bold mb-2">HOJE</SectionHeader>
        <Divider className="h-[1px] bg-gray-300 mb-4" />
        <Card className="flex-row items-start p-2 mb-4 bg-white rounded-lg shadow">
          <Thumbnail
            source={{ uri: "https://via.placeholder.com/50" }}
            className="w-12 h-12 bg-gray-200 rounded-lg"
          />
          <CardContent className="flex-1 ml-2">
            <CardText className="text-base font-bold">
              Ainda há documentos a enviar!
            </CardText>
            <CardText className="text-sm text-gray-500">
              Não se esqueça de terminar o...
            </CardText>
          </CardContent>
        </Card>

        {/* Section: ESSA SEMANA */}
        <Card className="border border-blue-400 rounded-lg p-2 mb-4">
          <SectionHeader className="text-lg font-bold mb-2">
            ESSA SEMANA
          </SectionHeader>
          <Divider className="h-[1px] bg-gray-300 mb-2" />
          <Card className="flex-row items-start p-2 bg-white rounded-lg">
            <Thumbnail
              source={{ uri: "https://via.placeholder.com/50" }}
              className="w-12 h-12 bg-gray-200 rounded-lg"
            />
            <CardContent className="flex-1 ml-2">
              <CardText className="text-base">
                Bem vindo(a) ao aplicativo!
              </CardText>
            </CardContent>
          </Card>
        </Card>
      </Container>
    </Layout>
  );
};

export default Avisos;