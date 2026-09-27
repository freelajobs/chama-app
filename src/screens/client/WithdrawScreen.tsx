import React, { useEffect, useState } from "react";
import { Text, View, Alert, ActivityIndicator } from "react-native";
import { Screen } from "../../components/Screen";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { colors } from "../../theme/colors";
import { withdraw, getWallet } from "../../api/wallet";

export default function WithdrawScreen({ navigation }: any) {
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { getWallet().then(setWallet); }, []);

  async function handleWithdraw() {
    const valor = Number(amount.replace(",", "."));
    if (!valor || valor <= 0) return Alert.alert("Valor inválido", "Informe um valor maior que zero.");
    if (wallet && valor > Number(wallet.balance)) return Alert.alert("Saldo insuficiente", "O valor solicitado é maior que o saldo disponível.");

    setLoading(true);
    try {
      // TODO: selecionar a conta bancária cadastrada em vez de um ID fixo
      const result = await withdraw(valor, "conta-bancaria-principal");
      Alert.alert("Saque solicitado!", `Status: ${result.status}. O valor cai na conta em até 1 dia útil.`);
      navigation.goBack();
    } catch (e: any) {
      Alert.alert("Erro", e?.response?.data?.error || "Não foi possível processar o saque. Verifique se seu KYC está aprovado.");
    } finally {
      setLoading(false);
    }
  }

  if (!wallet) return <Screen><ActivityIndicator color={colors.accent} style={{ marginTop: 40 }} /></Screen>;

  return (
    <Screen>
      <Text style={{ fontSize: 15, fontWeight: "800", marginBottom: 4 }}>Sacar</Text>
      <Text style={{ color: colors.muted, marginBottom: 16 }}>
        Saldo disponível: <Text style={{ fontWeight: "700", color: colors.accent }}>R$ {Number(wallet.balance).toFixed(2).replace(".", ",")}</Text>
      </Text>
      <Input placeholder="R$ 0,00" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} />
      <Button title="Solicitar saque" onPress={handleWithdraw} loading={loading} />
      <Text style={{ color: colors.muted, fontSize: 11, textAlign: "center", marginTop: 10 }}>
        Transferência via Pix/TED, processada pelo PSP em até 1 dia útil
      </Text>
    </Screen>
  );
}
