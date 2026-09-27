import React, { useState } from "react";
import { Text } from "react-native";
import { Screen } from "../../components/Screen";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { colors } from "../../theme/colors";

export default function ForgotPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  return (
    <Screen>
      <Text style={{ fontSize: 18, fontWeight: "800", marginTop: 20, marginBottom: 6 }}>Esqueci minha senha</Text>
      <Text style={{ color: colors.muted, marginBottom: 16 }}>Informe seu e-mail para receber o link de redefinição</Text>
      <Input placeholder="E-mail" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <Button title="Enviar link de recuperação" onPress={() => navigation.navigate("Login")} />
    </Screen>
  );
}
