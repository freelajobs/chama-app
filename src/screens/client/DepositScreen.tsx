import React, { useState } from "react";
import { Text, View, Alert } from "react-native";
import { Screen } from "../../components/Screen";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { colors } from "../../theme/colors";
import { deposit } from "../../api/wallet";

const SUGESTOES = [50, 100, 200];

export default function DepositScreen({ navigation }: any) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleDeposit() {
    const valor = Number(amount.replace(",", "."));
    if (!valor || valor <= 0) return Alert.alert("Valor inválido", "Informe um valor maior que zero.");
    setLoading(true);
    try {
      await deposit(valor);
      Alert.alert("Saldo adicionado!", `R$ ${valor.toFixed(2)} adicionados à sua carteira.`);
      navigation.goBack();
    } catch {
      Alert.alert("Erro", "Não foi possível adicionar o saldo agora.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <Text style={{ fontSize: 15, fontWeight: "800", marginBottom: 4 }}>Adicionar saldo</Text>
      <Text style={{ color: colors.muted, marginBottom: 16 }}>O valor fica disponível imediatamente na sua carteira</Text>
      <Input placeholder="R$ 0,00" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} />
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 16 }}>
        {SUGESTOES.map((v) => (
          <Text key={v} onPress={() => setAmount(String(v))} style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, fontSize: 12, color: colors.dark, fontWeight: "600" }}>
            R$ {v}
          </Text>
        ))}
      </View>
      <Button title="Confirmar" onPress={handleDeposit} loading={loading} />
    </Screen>
  );
}
