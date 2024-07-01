import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import * as Yup from "yup";
import StyledInput from "../components/styledInput";

const RecuperationSchema = Yup.object().shape({
  email: Yup.string()
    .required("E-mail é obrigatório")
    .email("Digite um e-mail válido"),
});

const RePasswordPage = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-white items-center px-10 pt-40">
      <StatusBar
        style="dark"
        translucent={true}
        backgroundColor="rgba(0, 0, 0, 0.2)"
      />
      <View>
        <Text className="text-3xl font-bold text-[#8B0000] m-8 text-center">
          RECUPERAÇÃO DE SENHA
        </Text>
        <Text className="text-2xl text-[#282828] mb-5 text-center">
          Preencha com os dados vinculados à conta
        </Text>
      </View>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={RecuperationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldTouched,
        }: any) => (
          <>
            <StyledInput
              icon="envelope"
              placeholder="E-mail"
              value={values.email}
              onChangeText={handleChange("email")}
              onFocus={() => setFieldTouched("email", true, false)}
              onBlur={handleBlur("email")}
              keyboardType="email-address"
              error={errors.email}
              touched={touched.email}
            />
            <TouchableOpacity
              className="rounded-full flex-row justify-between items-center bg-red-800 px-4 m-12 py-3"
              onPress={handleSubmit}
            >
              <Text className="w-full text-white text-lg text-center font-bold">
                ENVIAR CÓDIGO
              </Text>
              <Text className="text-white right-6">
                <Icon name="arrow-right" size={18} />
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <TouchableOpacity onPress={handleGoBack} style={{ marginTop: 20 }}>
        <Text>
          <Icon name="arrow-left" size={20} color="#8B0000" /> Voltar
        </Text>
      </TouchableOpacity>
      <View className="absolute bottom-0 left-0 right-0 h-10 bg-red-900"></View>
    </View>
  );
};

export default RePasswordPage;
