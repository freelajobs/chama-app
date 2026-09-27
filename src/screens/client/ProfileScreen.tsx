import React from "react";
import { Text, View, Pressable } from "react-native";
import { Screen } from "../../components/Screen";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { colors } from "../../theme/colors";
import { useAuth } from "../../context/AuthContext";

const ITEMS = [
  { label: "Meus dados", route: null },
  { label: "Endereços", route: null },
  { label: "Formas de pagamento", route: null },
  { label: "Notificações", route: "Notifications" },
  { label: "Ajuda", route: "Support" },
];

export default function ProfileScreen({ navigation }: any) {
  const { signOut } = useAuth();
  return (
    <Screen>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center", marginBottom: 14 }}>
        <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "#cfe0d8" }} />
        <Text style={{ fontWeight: "700" }}>Meu perfil</Text>
      </View>
      <Pressable onPress={() => navigation.navigate("Wallet")}>
        <Card><Text style={{ fontSize: 12 }}>👛 Carteira</Text></Card>
      </Pressable>
      {ITEMS.map((i) => (
        <Pressable key={i.label} onPress={() => i.route && navigation.navigate(i.route)}>
          <Card><Text style={{ fontSize: 12 }}>{i.label}</Text></Card>
        </Pressable>
      ))}
      <Button title="Sair" variant="outline" onPress={signOut} style={{ marginTop: 10 }} />
    </Screen>
  );
}
