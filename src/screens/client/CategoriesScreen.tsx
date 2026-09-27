import React from "react";
import { Pressable, Text, View } from "react-native";
import { Screen } from "../../components/Screen";
import { Input } from "../../components/Input";
import { Card } from "../../components/Card";
import { colors } from "../../theme/colors";

const CATS = [
  ["Faxina", "Limpeza residencial e comercial"],
  ["Jardinagem", "Manutenção de jardins e áreas verdes"],
  ["Pintura", "Pintura interna e externa"],
  ["Elétrica", "Instalações e reparos elétricos"],
  ["Hidráulica", "Reparos e instalações hidráulicas"],
  ["Montagem", "Móveis e equipamentos"],
  ["Reformas", "Pequenos e grandes reparos"],
  ["Outros", "Diversas modalidades"],
];

export default function CategoriesScreen({ navigation }: any) {
  return (
    <Screen>
      <Input placeholder="🔍 Buscar categoria" />
      {CATS.map(([nome, desc]) => (
        <Pressable key={nome} onPress={() => navigation.navigate("ProviderList", { category: nome })}>
          <Card style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: "#eafbf1", alignItems: "center", justifyContent: "center" }}>
              <Text>🔧</Text>
            </View>
            <View>
              <Text style={{ fontWeight: "700", fontSize: 12.5 }}>{nome}</Text>
              <Text style={{ color: colors.muted, fontSize: 11 }}>{desc}</Text>
            </View>
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}
