import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Layout from "../components/layout";
import * as Yup from "yup";
import { Formik } from "formik";
import { loginUser } from "../request/Users/loginUser";
import Icon from "react-native-vector-icons/FontAwesome6";
import StyledInput from "../components/styledInput";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  password: Yup.string()
    .required("Senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "As senhas devem corresponder")
    .required("Senha é obrigatória"),
  termsAccepted: Yup.boolean().oneOf(
    [true],
    "Você deve aceitar os Termos e Condições"
  ),
});

const ChangeRegistration = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const loginFunction = (values: any) => {
    console.log(values);
    loginUser(values).then((response) => {});
  };

  return (
    <Layout currentTab="ChangeRegistration">
      <View className="bg-white">
        <View className="bg-gray-300 p-5 rounded-3xl">
          <TouchableOpacity className="mb-5 mt-5" onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View className="flex-row items-center mb-1">
            <View className="mr-5">
              <Image
                className="w-20 h-20 rounded-xl bg-gray-300"
                source={{ uri: "https://via.placeholder.com/150" }}
              />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold">Fulano S. da Silva</Text>
              <Text className="text-stone-700 mb-1">Católica SC</Text>
            </View>
          </View>
        </View>
        <Formik
          initialValues={{ login: "", password: "", rePassword: "" }}
          validationSchema={validationSchema}
          onSubmit={loginFunction}
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
              <View className="items-center">
                <View className="mt-10 w-[80%]">
                  <StyledInput
                    icon="envelope"
                    placeholder="E-mail/Usuário"
                    value={values.login}
                    onChangeText={(text) => {
                      handleChange("login")(text);
                      setFieldTouched("login", true, false);
                    }}
                    onFocus={() => setFieldTouched("login", true, false)}
                    onBlur={handleBlur("login")}
                    keyboardType="default"
                    error={errors.login}
                    touched={touched.login}
                  />
                </View>
                <View className="mt-6 w-[80%]">
                  <StyledInput
                    icon="lock"
                    placeholder="Senha"
                    value={values.password}
                    onChangeText={(text) => {
                      handleChange("password")(text);
                      setFieldTouched("password", true, false);
                    }}
                    onFocus={() => setFieldTouched("password", true, false)}
                    onBlur={handleBlur("password")}
                    keyboardType="default"
                    touched={touched.password}
                    secureTextEntry={true}
                  />
                </View>
                <View className="mt-6 w-[80%]">
                  <StyledInput
                    icon="lock"
                    placeholder="Repita a senha"
                    value={values.rePassword}
                    onChangeText={(text) => {
                      handleChange("rePassword")(text);
                      setFieldTouched("rePassword", true, false);
                    }}
                    onFocus={() => setFieldTouched("rePassword", true, false)}
                    onBlur={handleBlur("rePassword")}
                    keyboardType="default"
                    touched={touched.rePassword}
                    secureTextEntry={true}
                  />
                </View>
              </View>
              {errors.password && touched.password ? (
                <Text className="text-red-500">{errors.password}</Text>
              ) : null}
              <View className="items-center mt-14">
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  className="flex-row justify-center items-center bg-[#8B0000] py-3 rounded-full mt-5 w-4/5"
                >
                  <Text className="text-white text-lg font-bold mr-2">
                    SALVAR ALTERAÇÕES
                  </Text>
                  <Icon name="arrow-right" size={25} color="white" />
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </Layout>
  );
};

export default ChangeRegistration;
