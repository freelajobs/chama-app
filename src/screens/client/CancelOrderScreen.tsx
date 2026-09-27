import React, { useState } from "react";
import { Text, View } from "react-native";
import { Screen } from "../../components/Screen";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { colors } from "../../theme/colors";
import { cancelBooking } from "../../api/bookings";

const REASONS = ["Imprevisto pessoal", "Mudei de ideia", "Encontrei outro profissional", "Outro"];

// O percentual de reembolso é calculado no backend (seção 14.1) — aqui só refletimos
// a resposta da API após a confirmação, sem recalcular a regra no client.
export default function CancelOrderScreen({ route, navigation }: any) {
  const { bookingId } = route.params;
  const [reason, setReason] = useState(REASONS[0]);
  const [loading, setLoading] = useState(false);

  async function handleCancel() {
    setLoading(true);
    try {
      const result = await cancelBooking(bookingId, reason);
      navigation.navigate("Orders");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <Card style={{ backgroundColor: "#fff3d6", borderWidth: 0, flexDirection: "row", gap: 8 }}>
        <Text>⚠️</Text>
        <Text style={{ fontSize: 11.5, flex: 1 }}>O percentual de reembolso depende da antecedência do cancelamento e será confirmado na próxima tela.</Text>
      </Card>
      <Text style={{ fontSize: 11, fontWeight: "700", color: colors.muted, marginBottom: 6, marginTop: 8 }}>Motivo do cancelamento</Text>
      {REASONS.map((r) => (
        <Card key={r} style={{ flexDirection: "row", justifyContent: "space-between" }} >
          <Text onPress={() => setReason(r)} style={{ fontSize: 12 }}>{r}</Text>
          <View style={{ width: 16, height: 16, borderRadius: 8, borderWidth: 1.5, borderColor: reason === r ? colors.accent : colors.border, backgroundColor: reason === r ? colors.accent : "transparent" }} />
        </Card>
      ))}
      <Button title="Manter pedido" variant="outline" onPress={() => navigation.goBack()} style={{ marginTop: 10, marginBottom: 8 }} />
      <Button title="Confirmar cancelamento" variant="danger" onPress={handleCancel} loading={loading} />
    </Screen>
  );
}
