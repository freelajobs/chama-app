import React, { useEffect, useState } from "react";
import { Text, View, Pressable, ActivityIndicator } from "react-native";
import { Screen } from "../../components/Screen";
import { Button } from "../../components/Button";
import { colors } from "../../theme/colors";
import { getProvider } from "../../api/providers";
import { addFavorite, removeFavorite, getFavorites } from "../../api/favorites";

export default function ProviderDetailScreen({ route, navigation }: any) {
  const { id } = route.params;
  const [provider, setProvider] = useState<any>(null);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    getProvider(id).then(setProvider);
    getFavorites().then((favs) => setFavorited(favs.some((f: any) => f.providerId === id))).catch(() => {});
  }, [id]);

  async function toggleFavorite() {
    setFavorited((prev) => !prev); // otimista
    if (favorited) await removeFavorite(id).catch(() => {});
    else await addFavorite(id).catch(() => {});
  }

  if (!provider) return <Screen><ActivityIndicator color={colors.accent} style={{ marginTop: 40 }} /></Screen>;

  return (
    <Screen>
      <View style={{ height: 150, backgroundColor: "#d9e4df", borderRadius: 14, marginBottom: 14 }} />
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 17, fontWeight: "800" }}>{provider.user?.nome}</Text>
          <Text style={{ color: colors.muted, marginVertical: 4 }}>⭐ {provider.notaMedia?.toFixed(1) || "—"}</Text>
        </View>
        <Pressable onPress={toggleFavorite}>
          <Text style={{ fontSize: 20, color: favorited ? colors.danger : colors.border }}>{favorited ? "♥" : "♡"}</Text>
        </Pressable>
      </View>
      <Text style={{ color: colors.muted, marginBottom: 16 }}>{provider.bio}</Text>
      <Button title="Solicitar serviço" onPress={() => navigation.navigate("Schedule", { providerId: provider.id, providerName: provider.user?.nome })} />
    </Screen>
  );
}
