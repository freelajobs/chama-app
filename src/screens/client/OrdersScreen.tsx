import React, { useEffect, useState } from "react";
import { Text, View, Pressable, ActivityIndicator } from "react-native";
import { Screen } from "../../components/Screen";
import { Card } from "../../components/Card";
import { colors } from "../../theme/colors";
import { listBookings } from "../../api/bookings";

const TABS = [["Todos", undefined], ["Em andamento", "em_andamento"], ["Concluídos", "concluido"]] as const;

export default function OrdersScreen({ navigation }: any) {
  const [tab, setTab] = useState(0);
  const [bookings, setBookings] = useState<any[] | null>(null);

  useEffect(() => {
    setBookings(null);
    listBookings(TABS[tab][1]).then(setBookings).catch(() => setBookings([]));
  }, [tab]);

  return (
    <Screen>
      <Text style={{ fontSize: 15, fontWeight: "800", marginBottom: 10 }}>Meus pedidos</Text>
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
        {TABS.map(([label], i) => (
          <Pressable key={label} onPress={() => setTab(i)} style={{ backgroundColor: tab === i ? colors.dark : "#eef1f0", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 }}>
            <Text style={{ color: tab === i ? "#fff" : colors.muted, fontSize: 11, fontWeight: "600" }}>{label}</Text>
          </Pressable>
        ))}
      </View>

      {bookings === null && <ActivityIndicator color={colors.accent} style={{ marginTop: 30 }} />}
      {bookings?.length === 0 && <Text style={{ color: colors.muted, textAlign: "center", marginTop: 30 }}>Nenhum pedido por aqui ainda.</Text>}

      {bookings?.map((b) => (
        <Pressable key={b.id} onPress={() => navigation.navigate("OrderStatus", { bookingId: b.id })}>
          <Card style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "#cfe0d8" }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "700", fontSize: 12 }}>{b.category?.nome} · {b.provider?.user?.nome}</Text>
              <Text style={{ color: colors.muted, fontSize: 11 }}>{new Date(b.scheduledAt).toLocaleString("pt-BR")}</Text>
            </View>
            <Text style={{ fontSize: 10, fontWeight: "700", color: colors.accent, textTransform: "capitalize" }}>{b.status.replace("_", " ")}</Text>
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}
