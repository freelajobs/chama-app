import React from "react";
import { Text, View } from "react-native";
import { Screen } from "../../components/Screen";
import { Button } from "../../components/Button";
import { colors } from "../../theme/colors";

export default function PaymentFailedScreen({ route, navigation }: any) {
  const { bookingId } = route.params;
  return (
    <Screen>
      <View style={{ alignItems: "center", marginTop: 60, gap: 10 }}>
        <Text style={{ fontSize: 34 }}>❌</Text>
        <Text style={{ fontWeight: "800", fontSize: 16 }}>Pagamento não aprovado</Text>
        <Text style={{ color: colors.muted, textAlign: "center" }}>Não conseguimos processar seu pagamento. Verifique os dados ou tente outro método.</Text>
        <Button title="Tentar novamente" onPress={() => navigation.navigate("Payment", { bookingId })} style={{ marginTop: 10, width: "100%" }} />
      </View>
    </Screen>
  );
}
