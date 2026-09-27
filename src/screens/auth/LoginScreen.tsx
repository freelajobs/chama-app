import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { Screen } from "../../components/Screen";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { colors } from "../../theme/colors";
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen({ navigation }: any) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    try {
      await signIn(email, senha);
    } catch {
      Alert.alert("Erro", "E-mail ou senha inválidos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <View style={{ alignItems: "center", marginTop: 30, marginBottom: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "800", color: colors.dark }}>CHAMA</Text>
        <Text style={{ color: colors.muted, marginTop: 6 }}>Entre ou cadastre-se para continuar</Text>
      </View>
      <Input placeholder="E-mail" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <Input placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
      <Text onPress={() => navigation.navigate("ForgotPassword")} style={{ color: colors.muted, textAlign: "right", marginBottom: 14, fontSize: 12 }}>
        Esqueceu sua senha?
      </Text>
      <Button title="Entrar" onPress={handleLogin} loading={loading} />
      <Text onPress={() => navigation.navigate("Register")} style={{ textAlign: "center", marginTop: 16, color: colors.muted }}>
        Não tem uma conta? <Text style={{ color: colors.accent, fontWeight: "700" }}>Cadastre-se</Text>
      </Text>
    </Screen>
  );
}
