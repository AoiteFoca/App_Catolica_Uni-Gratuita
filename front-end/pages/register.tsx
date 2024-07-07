import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome6";
import * as Yup from "yup";
import StyledInput from "../components/styledInput";
import { registerUser } from "../request/Users/createUser";

type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  AfterLogin: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Register">;

const RegisterPage = () => {
  const navigation = useNavigation<NavigationProp>();

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

  const handleAfterLogin = (values: any) => {
    values["login"] = values.fullName;
    values["userTypeId"] = 1;
    registerUser(values).then((res) => console.log(res));
    // navigation.navigate("AfterLogin");
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
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>CADASTRAR</Text>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          termsAccepted: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleAfterLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
          touched,
          setFieldTouched,
        }: any) => (
          <View style={styles.form}>
            <StyledInput
              icon="user"
              placeholder="Nome completo"
              value={values.fullName}
              onChangeText={handleChange("fullName")}
              onFocus={() => setFieldTouched("fullName", true, false)}
              onBlur={handleBlur("fullName")}
              keyboardType="default"
              error={errors.fullName}
              touched={touched.fullName}
            />
            {/* <View style={styles.inputContainer}>
              <Icon
                name="user"
                size={20}
                color="#000"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Nome completo"
                value={values.fullName}
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
              />
            </View>
            {touched.fullName && errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )} */}

            <StyledInput
              icon="envelope"
              placeholder="E-mail"
              value={values.email}
              onChangeText={handleChange("email")}
              onFocus={() => setFieldTouched("fullName", true, false)}
              onBlur={handleBlur("email")}
              keyboardType="email-address"
              error={errors.email}
              secureTextEntry={false}
              touched={touched.email}
            />
            {/* <View style={styles.inputContainer}>
              <Icon
                name="envelope"
                size={20}
                color="#000"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                keyboardType="email-address"
              />
            </View> */}
            {/* {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )} */}

            <StyledInput
              icon="lock"
              placeholder="Senha"
              value={values.password}
              onChangeText={handleChange("password")}
              onFocus={() => setFieldTouched("password", true, false)}
              onBlur={handleBlur("password")}
              keyboardType="default"
              secureTextEntry={true}
              touched={touched.password}
            />
            {/* <View style={styles.inputContainer}>
              <Icon
                name="lock"
                size={20}
                color="#000"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry={true}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
              />
            </View>
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )} */}
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <StyledInput
              icon="lock"
              placeholder="Repita a senha"
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onFocus={() => setFieldTouched("confirmPassword", true, false)}
              onBlur={handleBlur("confirmPassword")}
              keyboardType="default"
              secureTextEntry={true}
              touched={touched.confirmPassword}
            />

            {/* <View style={styles.inputContainer}>
              <Icon
                name="lock"
                size={20}
                color="#000"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Repita a senha"
                secureTextEntry={true}
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
              />
            </View>
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text> */}
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            <View style={styles.termsContainer}>
              <CheckBox
                checked={values.termsAccepted}
                onPress={() =>
                  setFieldValue("termsAccepted", !values.termsAccepted)
                }
                containerStyle={styles.checkboxContainer}
              />
              <Text style={styles.termsText}>
                Eu concordo com os{" "}
                <Text style={styles.termsLink}>Termos & Condições</Text>
              </Text>
            </View>
            {touched.termsAccepted && errors.termsAccepted && (
              <Text style={styles.errorText}>{errors.termsAccepted}</Text>
            )}

            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>CRIAR CONTA</Text>
              <Icon
                name="arrow-right"
                size={24}
                color="#fff"
                style={styles.submitButtonIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <View style={styles.bottomLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingTop: 60,
    alignItems: "flex-start",
    gap: 20,
  },
  goBackButton: {
    marginLeft: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#800000",
    marginTop: 20,
    marginBottom: 40,
    textAlign: "left",
    marginLeft: 10,
  },
  form: {
    flex: 1,
    marginTop: 20,
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 45,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 8,
  },
  inputIcon: {
    marginRight: 10,
    alignSelf: "center",
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: -10,
    marginBottom: 10,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  checkboxContainer: {
    padding: 0,
    marginRight: 0,
  },
  termsText: {
    fontSize: 16,
    alignSelf: "center",
  },
  termsLink: {
    textDecorationLine: "underline",
    color: "#0000EE",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#800000",
    paddingVertical: 18,
    borderRadius: 30,
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  submitButtonIcon: {
    marginLeft: 10,
  },
  bottomLine: {
    height: 30,
    backgroundColor: "#800000",
    width: "130%",
    position: "absolute",
    bottom: 0,
  },
});

export default RegisterPage;
