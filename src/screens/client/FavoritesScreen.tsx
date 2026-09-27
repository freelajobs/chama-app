import React, { useEffect, useState } from "react";
import { Text, View, Pressable, ActivityIndicator } from "react-native";
import { Screen } from "../../components/Screen";
import { Card } from "../../components/Card";
import { colors } from "../../theme/colors";
import { getFavorites, removeFavorite } from "../../api/favorites";

export default function FavoritesScreen({ navigation }: any) {
  const [favorites, setFavorites] = useState<any[] | null>(null);

  useEffect(() => { load(); }, []);
  function load() { getFavorites().then(setFavorites).catch(() => setFavorites([])); }

  async function handleRemove(providerId: string) {
    setFavorites((prev) => prev!.filter((f) => f.providerId !== providerId)); // otimista
    await removeFavorite(providerId).catch(load); // se falhar, recarrega o estado real
  }

  if (favorites === null) return <Screen><ActivityIndicator color={colors.accent} style={{ marginTop: 40 }} /></Screen>;

  if (!favorites.length) {
    return (
      <Screen>
        <View style={{ alignItems: "center", marginTop: 60, gap: 8 }}>
          <Text style={{ fontSize: 30 }}>♡</Text>
          <Text style={{ fontWeight: "800" }}>Nenhum favorito ainda</Text>
          <Text style={{ color: colors.muted, textAlign: "center" }}>Toque no coração no perfil de um profissional para salvá-lo aqui.</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      {favorites.map((f) => (
        <Pressable key={f.id} onPress={() => navigation.navigate("ProviderDetail", { id: f.providerId })}>
          <Card style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "#cfe0d8" }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "700", fontSize: 12 }}>{f.provider?.user?.nome}</Text>
              <Text style={{ color: colors.muted, fontSize: 11 }}>⭐ {f.provider?.notaMedia?.toFixed(1) || "—"}</Text>
            </View>
            <Text onPress={() => handleRemove(f.providerId)} style={{ fontSize: 16, color: colors.danger }}>♥</Text>
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}
