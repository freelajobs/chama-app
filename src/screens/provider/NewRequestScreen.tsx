import React, { useState } from "react";
import { Text, View } from "react-native";
import { Screen } from "../../components/Screen";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { colors } from "../../theme/colors";
import { acceptBooking, rejectBooking } from "../../api/bookings";

// Disparada por push/WebSocket quando o backend publica "booking.created" (seção 12).
export default function NewRequestScreen({ route, navigation }: any) {
  const { bookingId, service = "Faxina Residencial", client = "João Silva", when = "Sáb, 26 abr · 09:00–12:00", address = "Rua das Flores, 123", value = "R$ 127,50" } = route.params || {};
  const [loading, setLoading] = useState(false);

  async function accept() {
    setLoading(true);
    try { await acceptBooking(bookingId); navigation.navigate("ProviderDashboard"); }
    finally { setLoading(false); }
  }
  async function reject() {
    setLoading(true);
    try { await rejectBooking(bookingId); navigation.navigate("ProviderDashboard"); }
    finally { setLoading(false); }
  }

  return (
    <Screen>
      <View style={{ alignItems: "center", paddingTop: 10 }}>
        <View style={{ backgroundColor: "#fff3d6", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, marginBottom: 10 }}>
          <Text style={{ color: colors.warn, fontSize: 10, fontWeight: "700" }}>⏱️ Expira em 04:32</Text>
        </View>
        <Text style={{ fontSize: 17, fontWeight: "800", marginBottom: 12 }}>Novo pedido recebido!</Text>
        <Card style={{ width: "100%" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontWeight: "700", fontSize: 13 }}>{service}</Text>
            <Text style={{ fontWeight: "700", color: colors.accent }}>{value}</Text>
          </View>
          <Text style={{ color: colors.muted, marginTop: 6 }}>👤 {client}</Text>
          <Text style={{ color: colors.muted }}>📅 {when}</Text>
          <Text style={{ color: colors.muted }}>📍 {address}</Text>
        </Card>
        <Button title="Aceitar pedido" onPress={accept} loading={loading} style={{ width: "100%", marginTop: 14 }} />
        <Button title="Recusar" variant="danger" onPress={reject} style={{ width: "100%", marginTop: 8 }} />
      </View>
    </Screen>
  );
}
