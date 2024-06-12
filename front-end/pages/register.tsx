import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import * as Yup from "yup";
import { Formik } from "formik";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import * as Yup from "yup";

type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Register">;

const RegisterPage = () => {
  const navigation = useNavigation<NavigationProp>();

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Nome completo é obrigatório"),
    cpf: Yup.string()
      .required("CPF é obrigatório")
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    password: Yup.string()
      .required("Senha é obrigatória")
      .min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "As senhas devem corresponder")
      .required("Confirmação de senha é obrigatória"),
  });
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Nome completo é obrigatório"),
    cpf: Yup.string()
      .required("CPF é obrigatório")
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    password: Yup.string()
      .required("Senha é obrigatória")
      .min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "As senhas devem corresponder")
      .required("Confirmação de senha é obrigatória"),
  });

  const handleRegister = (values: any) => {
    console.log("teste", values);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2") 
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-[5] mt-[75px] items-center bg-white">
        <Text className="text-2xl text-red-900 font-bold">NOVO CADASTRO</Text>
        <Formik
          initialValues={{
            fullName: "",
            cpf: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View className="w-[80%]">
              <Text className="text-2xl text-center text-#282828 pt-2">
                Preencha com os seus dados
              </Text>

              <View className="w-full mt-10 px-10">
                <Text className="text-lg text-red-900">Nome Completo:</Text>
                <TextInput
                  className="h-[40px] mt-[5px] px-[10px] bg-[#D9D9D9] border-[1px] border-[#676767]"
                  value={values.fullName}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                />
                {touched.fullName && errors.fullName && (
                  <Text className="text-red-600">{errors.fullName}</Text>
                )}
              </View>

              <View className="w-full mt-4 px-10">
                <Text className="text-lg text-red-900">CPF:</Text>
                <TextInput
                  className="h-[40px] mt-[5px] px-[10px] bg-[#D9D9D9] border-[1px] border-[#676767]"
                  value={values.cpf}
                  onChangeText={(text) => setFieldValue("cpf", formatCPF(text))}
                  onBlur={handleBlur("cpf")}
                  keyboardType="numeric"
                />
                {touched.cpf && errors.cpf && (
                  <Text className="text-red-600">{errors.cpf}</Text>
                )}
              </View>

              <View className="w-full mt-4 px-10">
                <Text className="text-lg text-red-900">Email:</Text>
                <TextInput
                  className="h-[40px] mt-[5px] px-[10px] bg-[#D9D9D9] border-[1px] border-[#676767]"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                {touched.email && errors.email && (
                  <Text className="text-red-600">{errors.email}</Text>
                )}
              </View>

              <View className="w-full mt-4 px-10">
                <Text className="text-lg text-red-900">Senha:</Text>
                <TextInput
                  className="h-[40px] mt-[5px] px-[10px] bg-[#D9D9D9] border-[1px] border-[#676767]"
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                {touched.password && errors.password && (
                  <Text className="text-red-600">{errors.password}</Text>
                )}
              </View>
              <View className="w-full mt-4 px-10">
                <Text className="text-lg text-red-900">Senha:</Text>
                <TextInput
                  className="h-[40px] mt-[5px] px-[10px] bg-[#D9D9D9] border-[1px] border-[#676767]"
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                {touched.password && errors.password && (
                  <Text className="text-red-600">{errors.password}</Text>
                )}
              </View>

              <View className="w-full mt-4 px-10">
                <Text className="text-lg text-red-900">Repita a Senha:</Text>
                <TextInput
                  className="h-[40px] mt-[5px] px-[10px] bg-[#D9D9D9] border-[1px] border-[#676767]"
                  secureTextEntry={true}
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text className="text-red-600">{errors.confirmPassword}</Text>
                )}
              </View>
              <View className="w-full mt-4 px-10">
                <Text className="text-lg text-red-900">Repita a Senha:</Text>
                <TextInput
                  className="h-[40px] mt-[5px] px-[10px] bg-[#D9D9D9] border-[1px] border-[#676767]"
                  secureTextEntry={true}
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text className="text-red-600">{errors.confirmPassword}</Text>
                )}
              </View>

              {/* Botões */}
              <View className="pt-12 items-center">
                <TouchableOpacity
                  className="rounded-full flex-row justify-center items-center bg-red-800 px-6 py-3 w-54"
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  <Text className="text-white text-xl font-bold">
                    CADASTRAR
                  </Text>
                  <View className="ml-2">
                    <Icon name="arrow-right-long" size={25} color="white" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleGoBack} className="pt-4">
                  <Text className="text-red-900 underline text-base">
                    voltar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
      <View className="flex-[1.4] bg-red-900 justify-center items-"></View>
    </View>
  );
};

export default RegisterPage;
