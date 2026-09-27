import React, { useState } from "react";
import { Text, Pressable, View } from "react-native";
import { Screen } from "../../components/Screen";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { colors } from "../../theme/colors";
import { chargePayment } from "../../api/bookings";

const METHODS = [["pix", "Pix", "💠"], ["credit_card", "Cartão de crédito", "💳"], ["wallet", "Carteira digital", "👛"]];

export default function PaymentScreen({ route, navigation }: any) {
  const { bookingId } = route.params;
  const [method, setMethod] = useState("pix");
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setLoading(true);
    try {
      await chargePayment(bookingId, method);
      navigation.navigate("OrderStatus", { bookingId });
    } catch {
      navigation.navigate("PaymentFailed", { bookingId });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <Text style={{ fontSize: 15, fontWeight: "800", marginBottom: 10 }}>Pagamento seguro</Text>
      {METHODS.map(([id, label, icon]) => (
        <Pressable key={id} onPress={() => setMethod(id)}>
          <Card style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderColor: method === id ? colors.accent : colors.border }}>
            <Text style={{ fontSize: 12 }}>{icon}  {label}</Text>
            <View style={{ width: 16, height: 16, borderRadius: 8, borderWidth: 1.5, borderColor: method === id ? colors.accent : colors.border, backgroundColor: method === id ? colors.accent : "transparent" }} />
          </Card>
        </Pressable>
      ))}
      <Text style={{ fontWeight: "800", fontSize: 15, color: colors.accent, marginVertical: 12 }}>Total: R$ 150,00</Text>
      <Button title={`Pagar com ${method === "pix" ? "Pix" : "cartão"}`} onPress={handlePay} loading={loading} />
    </Screen>
  );
}
