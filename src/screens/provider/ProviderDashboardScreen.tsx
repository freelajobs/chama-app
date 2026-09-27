import React from "react";
import { Text, View } from "react-native";
import { Screen } from "../../components/Screen";
import { Card } from "../../components/Card";
import { colors } from "../../theme/colors";

export default function ProviderDashboardScreen() {
  return (
    <Screen>
      <Text style={{ fontSize: 16, fontWeight: "800", marginBottom: 4 }}>Olá, profissional! 👋</Text>
      <Text style={{ color: colors.muted, marginBottom: 14 }}>Você tem serviços agendados</Text>
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 14 }}>
        <Card style={{ flex: 1, alignItems: "center" }}><Text style={{ fontWeight: "800" }}>5</Text><Text style={{ color: colors.muted, fontSize: 10 }}>Agendamentos</Text></Card>
        <Card style={{ flex: 1, alignItems: "center" }}><Text style={{ fontWeight: "800" }}>4.9</Text><Text style={{ color: colors.muted, fontSize: 10 }}>Avaliação</Text></Card>
        <Card style={{ flex: 1, alignItems: "center" }}><Text style={{ fontWeight: "800" }}>R$1.250</Text><Text style={{ color: colors.muted, fontSize: 10 }}>Este mês</Text></Card>
      </View>
      <Text style={{ fontSize: 11, fontWeight: "700", marginBottom: 8 }}>Próximos serviços</Text>
      <Card><Text style={{ fontSize: 12 }}>Faxina Residencial · Sáb, 26 abr · 09:00</Text></Card>
    </Screen>
  );
}
