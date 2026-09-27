import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Screen } from "../../components/Screen";
import { Card } from "../../components/Card";
import { colors, radius } from "../../theme/colors";

const CATS = [
  { nome: "Faxina", icone: "🧹", bg: "#fff3d6", fg: "#d98a00" },
  { nome: "Jardinagem", icone: "🌿", bg: "#e3f6e8", fg: colors.accent },
  { nome: "Pintura", icone: "🎨", bg: "#e6f0fb", fg: "#2f6fd1" },
  { nome: "Elétrica", icone: "⚡", bg: "#fdeeee", fg: colors.danger },
  { nome: "Hidráulica", icone: "🚿", bg: "#e6f0fb", fg: "#2f6fd1" },
  { nome: "Montagem", icone: "🪛", bg: "#f1ecfb", fg: "#7a5cd6" },
  { nome: "Reformas", icone: "🧱", bg: "#fdeeee", fg: colors.danger },
  { nome: "Mais", icone: "⋯", bg: "#eef1f0", fg: colors.muted },
];

export default function HomeScreen({ navigation }: any) {
  return (
    <Screen>
      <View style={styles.row}>
        <Text style={styles.logo}>🔥 CHAMA</Text>
        <Text style={{ color: colors.muted }}>📍 São Paulo, SP</Text>
      </View>
      <Pressable onPress={() => navigation.navigate("Categories")}>
        <View style={styles.search}><Text style={{ color: colors.muted }}>🔍 Qual serviço você precisa?</Text></View>
      </Pressable>
      <View style={styles.grid}>
        {CATS.map((c) => (
          <Pressable key={c.nome} style={styles.catItem} onPress={() => navigation.navigate("ProviderList", { category: c.nome })}>
            <View style={[styles.icon, { backgroundColor: c.bg }]}><Text style={{ fontSize: 18 }}>{c.icone}</Text></View>
            <Text style={{ fontSize: 10, fontWeight: "600" }}>{c.nome}</Text>
          </Pressable>
        ))}
      </View>
      <Card style={{ backgroundColor: "#e3f6e8", borderWidth: 0, flexDirection: "row", gap: 10 }}>
        <Text style={{ fontSize: 20 }}>🛡️</Text>
        <View>
          <Text style={{ fontWeight: "700", fontSize: 12 }}>Serviço com garantia</Text>
          <Text style={{ color: colors.muted, fontSize: 11 }}>Qualidade e segurança em cada contratação</Text>
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  logo: { fontSize: 16, fontWeight: "800", color: colors.dark },
  search: { borderWidth: 1.5, borderColor: colors.border, borderRadius: radius.sm, padding: 13, backgroundColor: "#fff", marginBottom: 14 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 16 },
  catItem: { width: "22%", alignItems: "center" },
  icon: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center", marginBottom: 4 },
});
