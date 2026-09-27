import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Screen } from "../../components/Screen";
import { Button } from "../../components/Button";
import { colors } from "../../theme/colors";
import { getBooking, releasePayment } from "../../api/bookings";
import { getSocket } from "../../realtime/socket";

const STEPS = ["Solicitado", "Em busca de profissional", "Aguardando confirmação", "Serviço em andamento", "Concluído"];

export default function OrderStatusScreen({ route, navigation }: any) {
  const { bookingId } = route.params;
  const [booking, setBooking] = useState<any>(null);
  const [releasing, setReleasing] = useState(false);

  useEffect(() => {
    getBooking(bookingId).then(setBooking);

    // WebSocket é só um atalho de baixa latência — o REST acima já garante o estado
    // inicial correto; aqui só reagimos a mudanças que aconteçam enquanto a tela está aberta.
    let unsub = () => {};
    getSocket().then((socket) => {
      const handler = (payload: { bookingId: string; status: string }) => {
        if (payload.bookingId === bookingId) getBooking(bookingId).then(setBooking);
      };
      socket.on("booking:update", handler);
      unsub = () => socket.off("booking:update", handler);
    });
    return () => unsub();
  }, [bookingId]);

  const activeIndex = booking?.status === "confirmado" ? 2 : booking?.status === "em_andamento" ? 3 : booking?.status === "concluido" ? 4 : 1;
  const podeFinalizar = booking?.status === "concluido";

  async function handleFinalizar() {
    setReleasing(true);
    try {
      await releasePayment(bookingId); // libera o split — tela "Finalização do Serviço" (seção 8.3)
      navigation.navigate("Rating", { bookingId, targetName: booking?.provider?.user?.nome });
    } finally {
      setReleasing(false);
    }
  }

  return (
    <Screen>
      <Text style={{ fontSize: 15, fontWeight: "800", marginBottom: 16 }}>Pedido #{bookingId?.slice(0, 8)}</Text>
      {STEPS.map((step, i) => (
        <View key={step} style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
          <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: i <= activeIndex ? colors.accent : colors.border, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: "#fff", fontSize: 10 }}>{i < activeIndex ? "✓" : ""}</Text>
          </View>
          <Text style={{ fontSize: 12, color: i <= activeIndex ? colors.text : colors.muted, paddingTop: 2 }}>{step}</Text>
        </View>
      ))}
      {podeFinalizar ? (
        <Button title="Confirmar conclusão e avaliar" onPress={handleFinalizar} loading={releasing} style={{ marginBottom: 8 }} />
      ) : (
        <>
          <Button title="Falar com o profissional" variant="outline" onPress={() => navigation.navigate("Chat", { bookingId })} style={{ marginBottom: 8 }} />
          <Button title="Cancelar pedido" variant="danger" onPress={() => navigation.navigate("CancelOrder", { bookingId, scheduledAt: booking?.scheduledAt })} />
        </>
      )}
    </Screen>
  );
}
