import React, { useEffect, useState } from "react";
import { Text, View, Pressable, ActivityIndicator } from "react-native";
import { Screen } from "../../components/Screen";
import { colors, radius } from "../../theme/colors";
import { getNotifications, markNotificationRead } from "../../api/notifications";

const ICONS: Record<string, string> = { booking: "✅", payment: "💳", reminder: "⏰", promo: "🎁" };

export default function NotificationsScreen() {
  const [items, setItems] = useState<any[] | null>(null);

  useEffect(() => { load(); }, []);
  function load() { getNotifications().then(setItems).catch(() => setItems([])); }

  async function handlePress(n: any) {
    if (!n.lida) {
      await markNotificationRead(n.id).catch(() => {});
      setItems((prev) => prev!.map((i) => (i.id === n.id ? { ...i, lida: true } : i)));
    }
  }

  if (items === null) return <Screen><ActivityIndicator color={colors.accent} style={{ marginTop: 40 }} /></Screen>;

  if (!items.length) {
    return (
      <Screen>
        <View style={{ alignItems: "center", marginTop: 60, gap: 8 }}>
          <Text style={{ fontSize: 30 }}>🔔</Text>
          <Text style={{ fontWeight: "800" }}>Nenhuma notificação por aqui</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      {items.map((n) => (
        <Pressable key={n.id} onPress={() => handlePress(n)}>
          <View style={{
            flexDirection: "row", gap: 10, alignItems: "center", backgroundColor: "#fff",
            borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: 12, marginBottom: 9,
            opacity: n.lida ? 0.6 : 1,
          }}>
            <View style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: "#eafbf1", alignItems: "center", justifyContent: "center" }}>
              <Text>{ICONS[n.tipo] || "🔔"}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11.5, fontWeight: n.lida ? "500" : "700" }}>{n.titulo}</Text>
              <Text style={{ color: colors.muted, fontSize: 11 }}>{n.corpo}</Text>
            </View>
            {!n.lida && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent }} />}
          </View>
        </Pressable>
      ))}
    </Screen>
  );
}
