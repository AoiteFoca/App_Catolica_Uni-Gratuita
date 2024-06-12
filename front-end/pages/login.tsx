import { Formik } from "formik";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  cpf: Yup.string()
    .required("CPF é obrigatório")
    .matches(/^\d{11}$/, "CPF deve conter 11 dígitos"),
  password: Yup.string()
    .required("Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

const LoginPage = () => {
  return (
    <>
      <View className="flex-1 bg-white">
        <View className="flex-[5] mt-[125px] items-center bg-white">
          <Text className="text-2xl text-red-900 font-bold">LOGIN</Text>
          <View className="w-[80%]">
            <Text className="text-2xl text-center text-#282828 pt-5">
              Preencha com os seus dados
            </Text>

            <Formik
              initialValues={{ cpf: "", password: "" }}
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
              }) => (
                <>
                  <View className="w-full pt-10 px-10">
                    <Text className="text-lg text-red-900">CPF:</Text>
                    <TextInput
                      className="h-[40px] mt-[10px] px-[10px] bg-[#D9D9D9] border-[1px] border-[#676767]"
                      onChangeText={handleChange("cpf")}
                      onBlur={handleBlur("cpf")}
                      value={values.cpf}
                    />
                    {errors.cpf && touched.cpf ? (
                      <Text className="text-red-500">{errors.cpf}</Text>
                    ) : null}
                  </View>

                  <View className="w-full pt-5 px-10">
                    <Text className="text-lg text-red-900">Senha:</Text>
                    <TextInput
                      style={styles.input}
                      secureTextEntry={true}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />
                    {errors.password && touched.password ? (
                      <Text className="text-red-500">{errors.password}</Text>
                    ) : null}
                  </View>

                  <TouchableOpacity className="items-center pt-5">
                    <Text className="text-red-900 underline text-base italic">
                      esqueci minha senha
                    </Text>
                  </TouchableOpacity>

                  <View className="pt-20 items-center">
                    <TouchableOpacity
                      className="rounded-full flex-row justify-around items-center bg-red-800 px-4 py-4 w-48"
                      onPress={() => handleSubmit}
                    >
                      <Text className="text-white text-xl font-bold">
                        ENTRAR
                      </Text>
                      <Text className="text-white right-2">
                        <Icon name="arrow-right-long" size={25} />
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>

            <View className="pt-5">
              <TouchableOpacity>
                <Text className="text-red-900 underline font-bold text-base">
                  entrar de outro modo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View className="flex-[0.2] bg-red-900 justify-center items-"></View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "#676767",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "#D9D9D9",
  },
});

export default LoginPage;
