import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { Screen } from "../../components/Screen";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import * as AuthApi from "../../api/auth";

export default function RegisterScreen({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setLoading(true);
    try {
      await AuthApi.register({ nome, email, senha, tipo: "contratante" });
      Alert.alert("Conta criada!", "Agora faça login.");
      navigation.navigate("Login");
    } catch {
      Alert.alert("Erro", "Não foi possível concluir o cadastro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <Text style={{ fontSize: 18, fontWeight: "800", marginBottom: 14 }}>Criar conta</Text>
      <Input placeholder="Nome completo" value={nome} onChangeText={setNome} />
      <Input placeholder="E-mail" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <Input placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
      <Button title="Criar conta" onPress={handleRegister} loading={loading} />
    </Screen>
  );
}
