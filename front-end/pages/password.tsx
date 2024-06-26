import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import * as Yup from "yup";

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
          // Lógica de envio do formulário (a ser implementada)
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
        }) => (
          <View className="flex-row items-center border-b border-[#676767] mt-5 mb-3 w-full pb-2">
            <Icon name="envelope" size={20} color="#8B0000" className="mr-2" />
            <TextInput
              placeholder="E-mail"
              className="flex-1 ml-2 h-10"
              onFocus={() => setFieldTouched("email", true, false)}
              onChangeText={(text) => {
                handleChange("email")(text);
                setFieldTouched("email", true, false);
              }}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors.email && touched.email ? (
              <Text className="text-red-500">{errors.email}</Text>
            ) : null}
          </View>
        )}
      </Formik>

      <TouchableOpacity
        className="rounded-full flex-row justify-between items-center bg-red-800 px-4 m-12 py-3"
        onPress={() => {}}
      >
        <Text className="w-full text-white text-lg text-center font-bold">
          ENVIAR CÓDIGO
        </Text>
        <Text className="text-white right-6">
          <Icon name="arrow-right" size={18} />
        </Text>
      </TouchableOpacity>

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
