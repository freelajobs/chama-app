import React from "react";
import { Text, View } from "react-native";
import { Screen } from "../../components/Screen";
import { colors } from "../../theme/colors";

// Telas de apoio (Notificações, Favoritos, Suporte) — estrutura de navegação pronta,
// conteúdo a implementar conforme os endpoints forem ficando disponíveis no backend.
export default function PlaceholderScreen({ route }: any) {
  const title = route?.params?.title || route?.name || "Em breve";
  return (
    <Screen>
      <View style={{ alignItems: "center", marginTop: 60, gap: 8 }}>
        <Text style={{ fontSize: 30 }}>🚧</Text>
        <Text style={{ fontWeight: "800", fontSize: 15 }}>{title}</Text>
        <Text style={{ color: colors.muted, textAlign: "center" }}>Tela reservada na navegação — conteúdo a implementar.</Text>
      </View>
    </Screen>
  );
}
