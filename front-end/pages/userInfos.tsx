import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome6";
import * as Yup from "yup";
import StyledInput from "../components/styledInput";
import { fetchData, submitForm } from "../request/Users/formRequests";
import { Picker } from "@react-native-picker/picker";
import { lookupCep } from "../utils/cepLookup";
import DateTimePicker from "@react-native-community/datetimepicker";
import BooleanButton from '../components/booleanButton'; 

type RootStackParamList = {
  UserInfos: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "UserInfos">;

const UserInfosPage = () => {
  const navigation = useNavigation<NavigationProp>();
  const [stateOptions, setStateOptions] = useState<any>({
    estadoCivil: [],
    corRaca: [],
    sexo: [],
    tipoMoradia: [],
    graduacao: [],
    instituicao: [],
  });

  const formacaoOptions = [
    { label: 'Educação infantil', value: 'Educação infantil' },
    { label: 'Fundamental', value: 'Fundamental' },
    { label: 'Ensino Médio completo', value: 'Ensino Médio completo' },
    { label: 'Ensino Médio incompleto', value: 'Ensino Médio incompleto' },
    { label: 'Superior (Graduação) completo', value: 'Superior (Graduação) completo' },
    { label: 'Superior (Graduação) incompleto', value: 'Superior (Graduação) incompleto' },
    { label: 'Pós-graduação', value: 'Pós-graduação' },
    { label: 'Mestrado', value: 'Mestrado' },
    { label: 'Doutorado', value: 'Doutorado' },
  ];

  useEffect(() => {
    fetchData()
      .then((data) => setStateOptions(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const validationSchema = Yup.object().shape({
    cpf: Yup.string().required("CPF é obrigatório"),
    rg: Yup.string().required("RG é obrigatório"),
    nome: Yup.string().required("Nome é obrigatório"),
    sobrenome: Yup.string().required("Sobrenome é obrigatório"),
    dataNascimento: Yup.date().required("Data de nascimento é obrigatória"),
    nomeMae: Yup.string().required("Nome da mãe é obrigatório"),
    nomePai: Yup.string().required("Nome do pai é obrigatório"),
    naturalidade: Yup.string().required("Naturalidade é obrigatória"),
    cep: Yup.string().required("CEP é obrigatório"),
    domicilio: Yup.string().required("Domicílio é obrigatório"),
    bairro: Yup.string().required("Bairro é obrigatório"),
    municipio: Yup.string().required("Município é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    estadoCivil: Yup.string().required("Estado civil é obrigatório"),
    corRaca: Yup.string().required("Cor/Raça é obrigatória"),
    sexo: Yup.string().required("Sexo é obrigatório"),
    ensinoMedio: Yup.boolean().required("Ensino médio é obrigatório"),
    possuiGraduacao: Yup.boolean().required("Possui graduação é obrigatório"),
    assistPublica: Yup.boolean().required("Assistência pública é obrigatória"),
    resideSC: Yup.number().required("Reside em SC é obrigatório"),
    rendaFamiliarBruta: Yup.number().required("Renda familiar bruta é obrigatória"),
    rendaPerCapita: Yup.number().required("Renda per capita é obrigatória"),
    bensFamilia: Yup.number().required("Bens da família é obrigatório"),
    situacaoDesemprego: Yup.boolean().required("Situação de desemprego é obrigatória"),
    graduacaoId: Yup.number().required("Graduação é obrigatória"),
    tipoMoradiaId: Yup.number().required("Tipo de moradia é obrigatório"),
  });

  const handleCepChange = async (cep: string, setFieldValue: Function) => {
    setFieldValue("cep", cep);
    if (cep.length === 8) {
      try {
        const data = await lookupCep(cep);
        setFieldValue("domicilio", data.logradouro);
        setFieldValue("bairro", data.bairro);
        setFieldValue("municipio", data.localidade);
      } catch (error) {
        console.error("Error looking up CEP:", error);
      }
    }
  };

  const handleUserInfos = (values: any) => {
    submitForm(values)
      .then((res) => console.log(res))
      .catch((error) => console.error("Error submitting form:", error));
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const formatCPF = (value: any) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatRG = (value: any) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>FORMULÁRIO</Text>
      <Formik
        initialValues={{
          cpf: "",
          rg: "",
          nome: "",
          sobrenome: "",
          dataNascimento: "",
          nomeMae: "",
          nomePai: "",
          naturalidade: "",
          cep: "",
          domicilio: "",
          bairro: "",
          municipio: "",
          complemento: "",
          telefone: "",
          telefoneComercial: "",
          celular: "",
          resideSC: "",
          email: "",
          estadoCivil: "",
          corRaca: "",
          sexo: "",
          ensinoMedio: false,
          possuiGraduacao: false,
          assistPublica: false,
          rendaFamiliarBruta: 0,
          rendaPerCapita: 0,
          despesaHab: 0,
          bensFamilia: 0,
          despesaTransporte: 0,
          despesaDoenca: 0,
          despesaEducacao: 0,
          situacaoDesemprego: false,
          deficiencia: false,
          instituicao: "",
          dataIngresso: "",
          curso: "",
          anoSemestre: "",
          fase: "",
          numFasesCurso: "",
          grau: "",
          modalidade: "",
          matricula: "",
          numPessoasGrupo: 0,
          formacaoOptions: formacaoOptions
        }}
        validationSchema={validationSchema}
        onSubmit={handleUserInfos}
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
              icon="id-card"
              placeholder="CPF"
              value={values.cpf}
              onChangeText={(text) => setFieldValue("cpf", formatCPF(text))}
              onBlur={handleBlur("cpf")}
              error={errors.cpf}
              touched={touched.cpf}
              keyboardType="numeric"
              format={formatCPF}
            />
            <StyledInput
              icon="id-card"
              placeholder="RG"
              value={values.rg}
              onChangeText={(text) => setFieldValue("rg", formatRG(text))}
              onBlur={handleBlur("rg")}
              error={errors.rg}
              touched={touched.rg}
              keyboardType="numeric"
              format={formatRG}
            />
            <StyledInput
              icon="user"
              placeholder="Nome"
              value={values.nome}
              onChangeText={handleChange("nome")}
              onBlur={handleBlur("nome")}
              error={errors.nome}
              touched={touched.nome}
            />
            <StyledInput
              icon="user"
              placeholder="Sobrenome"
              value={values.sobrenome}
              onChangeText={handleChange("sobrenome")}
              onBlur={handleBlur("sobrenome")}
              error={errors.sobrenome}
              touched={touched.sobrenome}
            />
            <View style={styles.datePickerContainer}>
            <Icon name="calendar" size={20} color="#333" style={styles.icon} />
            <Text style={styles.label}>Data de Nascimento:</Text>
              <DateTimePicker
                style={styles.datePicker}
                value={values.dataNascimento || new Date()}
                mode="date"
                display="default"
                minimumDate={new Date('1900-01-01')}
                maximumDate={new Date()}
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || values.dataNascimento || new Date();
                  setFieldValue('dataNascimento', currentDate);
                }}
              />
            </View>
            <StyledInput
              icon="user"
              placeholder="Nome da Mãe"
              value={values.nomeMae}
              onChangeText={handleChange("nomeMae")}
              onBlur={handleBlur("nomeMae")}
              error={errors.nomeMae}
              touched={touched.nomeMae}
            />
            <StyledInput
              icon="user"
              placeholder="Nome do Pai"
              value={values.nomePai}
              onChangeText={handleChange("nomePai")}
              onBlur={handleBlur("nomePai")}
              error={errors.nomePai}
              touched={touched.nomePai}
            />
            <StyledInput
              icon="map"
              placeholder="Naturalidade"
              value={values.naturalidade}
              onChangeText={handleChange("naturalidade")}
              onBlur={handleBlur("naturalidade")}
              error={errors.naturalidade}
              touched={touched.naturalidade}
            />
            <StyledInput
              icon="map"
              placeholder="CEP"
              value={values.cep}
              onChangeText={(text) => handleCepChange(text, setFieldValue)}
              onBlur={handleBlur("cep")}
              error={errors.cep}
              touched={touched.cep}
            />
            <StyledInput
              icon="home"
              placeholder="Domicílio"
              value={values.domicilio}
              onChangeText={handleChange("domicilio")}
              onBlur={handleBlur("domicilio")}
              error={errors.domicilio}
              touched={touched.domicilio}
            />
            <StyledInput
              icon="home"
              placeholder="Bairro"
              value={values.bairro}
              onChangeText={handleChange("bairro")}
              onBlur={handleBlur("bairro")}
              error={errors.bairro}
              touched={touched.bairro}
            />
            <StyledInput
              icon="building"
              placeholder="Município"
              value={values.municipio}
              onChangeText={handleChange("municipio")}
              onBlur={handleBlur("municipio")}
              error={errors.municipio}
              touched={touched.municipio}
            />
            <StyledInput
              icon="home"
              placeholder="Complemento"
              value={values.complemento}
              onChangeText={handleChange("complemento")}
              onBlur={handleBlur("complemento")}
              error={errors.complemento}
              touched={touched.complemento}
            />
            <StyledInput
              icon="phone"
              placeholder="DDD/Telefone"
              value={values.telefone}
              onChangeText={handleChange("telefone")}
              onBlur={handleBlur("telefone")}
              error={errors.telefone}
              touched={touched.telefone}
            />
            <StyledInput
              icon="phone"
              placeholder="DDD/Telefone Comercial"
              value={values.telefoneComercial}
              onChangeText={handleChange("telefoneComercial")}
              onBlur={handleBlur("telefoneComercial")}
              error={errors.telefoneComercial}
              touched={touched.telefoneComercial}
            />
            <StyledInput
              icon="mobile"
              placeholder="DDD/Celular"
              value={values.celular}
              onChangeText={handleChange("celular")}
              onBlur={handleBlur("celular")}
              error={errors.celular}
              touched={touched.celular}
            />
            <StyledInput
              icon="calendar"
              placeholder="Reside em SC desde"
              value={values.resideSC}
              onChangeText={handleChange("resideSC")}
              onBlur={handleBlur("resideSC")}
              error={errors.resideSC}
              touched={touched.resideSC}
            />
            <StyledInput
              icon="envelope"
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              error={errors.email}
              touched={touched.email}
            />
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Estado Civil</Text>
              <Picker
                selectedValue={values.estadoCivil}
                onValueChange={(itemValue) => setFieldValue("estadoCivil", itemValue)}
              >
                {stateOptions.estadoCivil.map((option: any) => (
                  <Picker.Item key={option.id} label={option.nome} value={option.id} />
                ))}
              </Picker>
              {touched.estadoCivil && errors.estadoCivil && (
                <Text style={styles.errorText}>{errors.estadoCivil}</Text>
              )}
            </View>
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Cor/Raça</Text>
              <Picker
                selectedValue={values.corRaca}
                onValueChange={(itemValue) => setFieldValue("corRaca", itemValue)}
              >
                {stateOptions.corRaca.map((option: any) => (
                  <Picker.Item key={option.id} label={option.nome} value={option.id} />
                ))}
              </Picker>
              {touched.corRaca && errors.corRaca && (
                <Text style={styles.errorText}>{errors.corRaca}</Text>
              )}
            </View>
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Sexo</Text>
              <Picker
                selectedValue={values.sexo}
                onValueChange={(itemValue) => setFieldValue("sexo", itemValue)}
              >
                {stateOptions.sexo.map((option: any) => (
                  <Picker.Item key={option.id} label={option.nome} value={option.id} />
                ))}
              </Picker>
              {touched.sexo && errors.sexo && (
                <Text style={styles.errorText}>{errors.sexo}</Text>
              )}
            </View>
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>
                Você cursou todo o Ensino Médio em escolas de rede pública catarinense OU instituições privadas com bolsa integral ou parcial?
              </Text>
              <BooleanButton
                value={values.ensinoMedio}
                onPress={(value) => setFieldValue('ensinoMedio', value)}
                style={{ marginTop: 10 }}
              />
              {touched.ensinoMedio && errors.ensinoMedio && (
                <Text style={styles.errorText}>{errors.ensinoMedio}</Text>
              )}
            </View>
            {touched.ensinoMedio && errors.ensinoMedio && (
              <Text style={styles.errorText}>{errors.ensinoMedio}</Text>
            )}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>
                Possui graduação, exceto licenciatura curta?
              </Text>
              <BooleanButton
                value={values.possuiGraduacao}
                onPress={(value) => setFieldValue('possuiGraduacao', value)}
                style={{ marginTop: 10 }}
              />
              {touched.possuiGraduacao && errors.possuiGraduacao && (
                <Text style={styles.errorText}>{errors.possuiGraduacao}</Text>
              )}
            </View>
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>
              Possui alguma modalidade de Assistência Financeira Estudantil oriunda de recursos públicos
              </Text>
              <BooleanButton
                value={values.assistPublica}
                onPress={(value) => setFieldValue('assistPublica', value)}
                style={{ marginTop: 10 }}
              />
              {touched.assistPublica && errors.assistPublica && (
                <Text style={styles.errorText}>{errors.assistPublica}</Text>
              )}
            </View>
            <StyledInput
              icon="dollar"
              placeholder="Renda familiar bruta mensal"
              value={values.rendaFamiliarBruta}
              onChangeText={handleChange("rendaFamiliarBruta")}
              onBlur={handleBlur("rendaFamiliarBruta")}
              error={errors.rendaFamiliarBruta}
              touched={touched.rendaFamiliarBruta}
            />
            <StyledInput
              icon="dollar"
              placeholder="Renda per capita"
              value={values.rendaPerCapita}
              onChangeText={handleChange("rendaPerCapita")}
              onBlur={handleBlur("rendaPerCapita")}
              error={errors.rendaPerCapita}
              touched={touched.rendaPerCapita}
            />
            <StyledInput
              icon="dollar"
              placeholder="Despesa familiar mensal com habitação"
              value={values.despesaHab}
              onChangeText={handleChange("despesaHab")}
              onBlur={handleBlur("despesaHab")}
              error={errors.despesaHab}
              touched={touched.despesaHab}
            />
            <StyledInput
              icon="dollar"
              placeholder="Bens do Grupo Familiar"
              value={values.bensFamilia}
              onChangeText={handleChange("bensFamilia")}
              onBlur={handleBlur("bensFamilia")}
              error={errors.bensFamilia}
              touched={touched.bensFamilia}
            />
            <StyledInput
              icon="dollar"
              placeholder="Despesa familiar mensal, para estudo, com transporte coletivo"
              value={values.despesaTransporte}
              onChangeText={handleChange("despesaTransporte")}
              onBlur={handleBlur("despesaTransporte")}
              error={errors.despesaTransporte}
              touched={touched.despesaTransporte}
            />
            <StyledInput
              icon="dollar"
              placeholder="Despesa familiar com doença crônica"
              value={values.despesaDoenca}
              onChangeText={handleChange("despesaDoenca")}
              onBlur={handleBlur("despesaDoenca")}
              error={errors.despesaDoenca}
              touched={touched.despesaDoenca}
            />
            <StyledInput
              icon="dollar"
              placeholder="Despesa familiar mensal, com educação regular paga, para outro membro do grupo familiar"
              value={values.despesaEducacao}
              onChangeText={handleChange("despesaEducacao")}
              onBlur={handleBlur("despesaEducacao")}
              error={errors.despesaEducacao}
              touched={touched.despesaEducacao}
            />
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>
              Você ou algum integrante do seu grupo familiar encontra-se em situação de desemprego?
              </Text>
              <BooleanButton
                value={values.situacaoDesemprego}
                onPress={(value) => setFieldValue('situacaoDesemprego', value)}
                style={{ marginTop: 10 }}
              />
              {touched.situacaoDesemprego && errors.situacaoDesemprego && (
                <Text style={styles.errorText}>{errors.situacaoDesemprego}</Text>
              )}
            </View>
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>
              Você possui algum tipo de deficiência?
              </Text>
              <BooleanButton
                value={values.deficiencia}
                onPress={(value) => setFieldValue('deficiencia', value)}
                style={{ marginTop: 10 }}
              />
              {touched.deficiencia && errors.deficiencia && (
                <Text style={styles.errorText}>{errors.deficiencia}</Text>
              )}
            </View>
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Tipo de Moradia</Text>
              <Picker
                selectedValue={values.tipoMoradiaId}
                onValueChange={(itemValue) => setFieldValue("tipoMoradiaId", itemValue)}
              >
                {stateOptions.tipoMoradia.map((option: any) => (
                  <Picker.Item key={option.id} label={option.nome} value={option.id} />
                ))}
              </Picker>
              {touched.tipoMoradiaId && errors.tipoMoradiaId && (
                <Text style={styles.errorText}>{errors.tipoMoradiaId}</Text>
              )}
            </View>
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Graduação</Text>
              <Picker
                selectedValue={values.graduacaoId}
                onValueChange={(itemValue) => setFieldValue("graduacaoId", itemValue)}
              >
                {stateOptions.graduacao.map((option: any) => (
                  <Picker.Item key={option.id} label={option.nome} value={option.id} />
                ))}
              </Picker>
              {touched.graduacaoId && errors.graduacaoId && (
                <Text style={styles.errorText}>{errors.graduacaoId}</Text>
              )}
            </View>
            <View style={styles.datePickerContainer}>
            <Icon name="calendar" size={20} color="#333" style={styles.icon} />
            <Text style={styles.label}>Data de Ingresso:</Text>
              <DateTimePicker
                style={styles.datePicker}
                value={values.dataIngresso || new Date()}
                mode="date"
                display="default"
                minimumDate={new Date('1900-01-01')}
                maximumDate={new Date()}
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || values.dataIngresso || new Date();
                  setFieldValue('dataIngresso', currentDate);
                }}
              />
            </View>
            <StyledInput
              icon="book"
              placeholder="Curso"
              value={values.curso}
              onChangeText={handleChange("curso")}
              onBlur={handleBlur("curso")}
              error={errors.curso}
              touched={touched.curso}
            />
            <StyledInput
              icon="calendar"
              placeholder="Ano/Semestre"
              value={values.anoSemestre}
              onChangeText={handleChange("anoSemestre")}
              onBlur={handleBlur("anoSemestre")}
              error={errors.anoSemestre}
              touched={touched.anoSemestre}
            />
            <StyledInput
              icon="book"
              placeholder="Fase"
              value={values.fase}
              onChangeText={handleChange("fase")}
              onBlur={handleBlur("fase")}
              error={errors.fase}
              touched={touched.fase}
            />
            <StyledInput
              icon="book"
              placeholder="Número de Fases do Curso"
              value={values.numFasesCurso}
              onChangeText={handleChange("numFasesCurso")}
              onBlur={handleBlur("numFasesCurso")}
              error={errors.numFasesCurso}
              touched={touched.numFasesCurso}
            />
            <StyledInput
              icon="book"
              placeholder="Grau"
              value={values.grau}
              onChangeText={handleChange("grau")}
              onBlur={handleBlur("grau")}
              error={errors.grau}
              touched={touched.grau}
            />
            <StyledInput
              icon="book"
              placeholder="Modalidade"
              value={values.modalidade}
              onChangeText={handleChange("modalidade")}
              onBlur={handleBlur("modalidade")}
              error={errors.modalidade}
              touched={touched.modalidade}
            />
            <StyledInput
              icon="id-card"
              placeholder="Matrícula"
              value={values.matricula}
              onChangeText={handleChange("matricula")}
              onBlur={handleBlur("matricula")}
              error={errors.matricula}
              touched={touched.matricula}
            />
            <StyledInput
              icon="users"
              placeholder="Número de Pessoas no Grupo Familiar"
              value={values.numPessoasGrupo}
              onChangeText={handleChange("numPessoasGrupo")}
              onBlur={handleBlur("numPessoasGrupo")}
              error={errors.numPessoasGrupo}
              touched={touched.numPessoasGrupo}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  goBackButton: {
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  form: {
    width: "100%",
  },
  submitButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdownContainer: {
    marginVertical: 10,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  datePicker: {
    width: 115,
    marginVertical: 10,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
  },
  icon:{
    marginLeft: 8,
    marginRight: 8,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default UserInfosPage;
