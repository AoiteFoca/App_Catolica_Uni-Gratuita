import { Formik } from "formik";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";

type RootStackParamList = {
  Register: undefined;
  RePassword: undefined;
  Login: undefined;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("E-mail é obrigatório"),
  /*.email("Digite um e-mail válido")*/ password: Yup.string()
    .required("Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

const LoginPage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleRePassword = () => {
    navigation.navigate("RePassword");
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar
        style="dark"
        translucent={true}
        backgroundColor="rgba(0, 0, 0, 0.2)"
      />
      <View className="flex-1 bg-white items-center px-10 pt-40">
        {/* Botão de voltar */}
        <TouchableOpacity
          onPress={handleGoBack}
          style={{ position: "absolute", left: 20, top: 50 }}
        >
          <Icon name="arrow-left" size={25} color="#8B0000" />
        </TouchableOpacity>

        <Text className="text-3xl font-bold text-[#8B0000] mt-5 mb-5">
          LOGIN
        </Text>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
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
          }) => (
            <>
              <View className="flex-row items-center border-b border-[#676767] mt-5 mb-3 w-full pb-2">
                <Icon
                  name="envelope"
                  size={20}
                  color="#8B0000"
                  className="mr-2"
                />
                <TextInput
                  placeholder="E-mail"
                  className="flex-1 ml-2 h-10"
                  onFocus={() => setFieldTouched("email", false)}
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

              <View className="flex-row items-center border-b border-[#676767] mt-5 mb-3 w-full pb-2">
                <Icon name="lock" size={20} color="#8B0000" />
                <TextInput
                  placeholder="Senha"
                  className="flex-1 ml-2 h-10"
                  secureTextEntry={true}
                  onFocus={() => setFieldTouched("password", false)}
                  onChangeText={(text) => {
                    handleChange("password")(text);
                    setFieldTouched("password", true, false);
                  }}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <Text className="text-red-500">{errors.password}</Text>
                ) : null}
              </View>

              <Text className="text-xl text-[#282828] mt-5 mb-5">Ou</Text>

              <View className="flex-row justify-around w-full mb-5">
                <TouchableOpacity className="border border-[#676767] p-3 rounded-lg w-2/5 items-center">
                  <Icon name="google" size={25} color="#8B0000" />
                </TouchableOpacity>
                <TouchableOpacity className="border border-[#676767] p-3 rounded-lg w-2/5 items-center">
                  <Icon name="facebook" size={25} color="#8B0000" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                className="flex-row justify-center items-center bg-[#8B0000] py-3 rounded-full mt-5 w-4/5"
              >
                <Text className="text-white text-lg font-bold mr-2">
                  ENTRAR
                </Text>
                <Icon name="arrow-right" size={25} color="white" />
              </TouchableOpacity>
            </>
          )}
        </Formik>

        <TouchableOpacity onPress={handleRegister} className="mt-5">
          <Text className="text-[#8B0000] italic">
            Não tem uma conta?{" "}
            <Text className="underline font-bold italic">Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRePassword} className="mt-5">
          <Text className="text-[#8B0000] italic">
            Esqueceu sua senha?{" "}
            <Text className="underline font-bold italic">Recuperar senha</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginPage;
