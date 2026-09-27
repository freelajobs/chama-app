import React from "react";
import { Text } from "react-native";
import { Screen } from "../../components/Screen";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { colors } from "../../theme/colors";
import { createBooking } from "../../api/bookings";

export default function ConfirmOrderScreen({ route, navigation }: any) {
  const { providerId, providerName, data, horario, address } = route.params;

  async function handleConfirm() {
    const booking = await createBooking({
      provider_id: providerId,
      category_id: "categoria-id-exemplo",
      scheduled_at: new Date().toISOString(),
      address,
      amount: 150.0,
    });
    navigation.navigate("Payment", { bookingId: booking.id });
  }

  return (
    <Screen>
      <Text style={{ fontSize: 15, fontWeight: "800", marginBottom: 10 }}>Revise seu pedido</Text>
      <Card>
        <Text style={{ fontWeight: "700", fontSize: 12 }}>{providerName}</Text>
      </Card>
      <Card>
        <Text style={{ fontSize: 11.5, marginBottom: 6 }}>📅 {data} · {horario}</Text>
        <Text style={{ fontSize: 11.5 }}>📍 {address.formatted}</Text>
      </Card>
      <Text style={{ fontWeight: "700", fontSize: 15, color: colors.accent, marginVertical: 10 }}>Total: R$ 150,00</Text>
      <Button title="Confirmar pedido" onPress={handleConfirm} />
    </Screen>
  );
}
