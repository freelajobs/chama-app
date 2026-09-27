import React, { useEffect, useState } from "react";
import { Pressable, Text, View, ActivityIndicator } from "react-native";
import { Screen } from "../../components/Screen";
import { Card } from "../../components/Card";
import { colors } from "../../theme/colors";
import { searchProviders } from "../../api/providers";

export default function ProviderListScreen({ route, navigation }: any) {
  const { category } = route.params || {};
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchProviders({ category }).then(setProviders).catch(() => setProviders([])).finally(() => setLoading(false));
  }, [category]);

  if (loading) return <Screen><ActivityIndicator color={colors.accent} style={{ marginTop: 40 }} /></Screen>;

  if (!providers.length) {
    return (
      <Screen>
        <View style={{ alignItems: "center", marginTop: 60, gap: 10 }}>
          <Text style={{ fontSize: 34 }}>🔍</Text>
          <Text style={{ fontWeight: "800", fontSize: 16 }}>Nenhum profissional disponível</Text>
          <Text style={{ color: colors.muted, textAlign: "center" }}>Não encontramos profissionais para essa categoria e região. Tente outro horário ou amplie o raio de busca.</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={{ color: colors.muted, marginBottom: 10 }}>{category}</Text>
      {providers.map((p) => (
        <Pressable key={p.id} onPress={() => navigation.navigate("ProviderDetail", { id: p.id })}>
          <Card style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "#cfe0d8" }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "700", fontSize: 12.5 }}>{p.user?.nome}</Text>
              <Text style={{ color: colors.muted, fontSize: 11 }}>⭐ {p.notaMedia?.toFixed(1) || "—"}</Text>
            </View>
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}
