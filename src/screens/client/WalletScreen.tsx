import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { Screen } from "../../components/Screen";
import { Button } from "../../components/Button";
import { colors, radius } from "../../theme/colors";
import { getWallet, getWalletTransactions } from "../../api/wallet";
import { useAuth } from "../../context/AuthContext";

// Reaproveitada tanto para contratante quanto para prestador (a API já retorna a
// wallet certa a partir do token — nunca aceitar wallet_id do client, seção 13.2).
export default function WalletScreen({ isProvider = false, navigation }: any) {
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    getWallet().then(setWallet);
    getWalletTransactions().then((r) => setTransactions(r.data || []));
  }, []);

  if (!wallet) return <Screen><ActivityIndicator color={colors.accent} style={{ marginTop: 40 }} /></Screen>;

  return (
    <Screen>
      <View style={{ backgroundColor: colors.dark, borderRadius: radius.md, padding: 18, marginBottom: 16 }}>
        <Text style={{ color: "#b9d6c4" }}>{isProvider ? "Saldo disponível para saque" : "Saldo disponível na carteira"}</Text>
        <Text style={{ color: "#fff", fontSize: 26, fontWeight: "800", marginVertical: 8 }}>
          R$ {Number(wallet.balance).toFixed(2).replace(".", ",")}
        </Text>
        <Button
          title={isProvider ? "Sacar" : "Adicionar saldo"}
          onPress={() => navigation.navigate(isProvider ? "Withdraw" : "Deposit")}
          style={{ backgroundColor: isProvider ? colors.accent2 : "#fff" }}
        />
      </View>
      <Text style={{ fontSize: 11, fontWeight: "700", color: colors.muted, marginBottom: 8 }}>Extrato</Text>
      {transactions.map((t) => {
        const positivo = Number(t.amount) >= 0;
        return (
          <View key={t.id} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: 11, marginBottom: 9 }}>
            <View>
              <Text style={{ fontSize: 11.5, fontWeight: "600" }}>{t.description}</Text>
              <Text style={{ color: colors.muted, fontSize: 10.5 }}>{new Date(t.createdAt).toLocaleDateString("pt-BR")}</Text>
            </View>
            <Text style={{ fontWeight: "700", color: positivo ? colors.accent : colors.text }}>
              {positivo ? "+" : ""}R$ {Number(t.amount).toFixed(2).replace(".", ",")}
            </Text>
          </View>
        );
      })}
    </Screen>
  );
}
