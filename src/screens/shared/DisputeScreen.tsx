import React, { useState } from "react";
import { Text, View } from "react-native";
import { Screen } from "../../components/Screen";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { colors } from "../../theme/colors";
import { openDispute } from "../../api/bookings";

const CATS = ["Serviço não realizado", "Cobrança incorreta", "Comportamento inadequado", "Outro"];

export default function DisputeScreen({ route, navigation }: any) {
  const { bookingId } = route.params;
  const [categoria, setCategoria] = useState(CATS[0]);
  const [descricao, setDescricao] = useState("");

  async function handleSubmit() {
    await openDispute(bookingId, `${categoria}: ${descricao}`).catch(() => {});
    navigation.navigate("Orders");
  }

  return (
    <Screen>
      <Text style={{ fontSize: 15, fontWeight: "800" }}>Reportar um problema</Text>
      <Text style={{ color: colors.muted, marginBottom: 12 }}>Nossa equipe analisa em até 24h</Text>
      {CATS.map((c) => (
        <Card key={c} style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 12 }} onPress={() => setCategoria(c)}>{c}</Text>
          <View style={{ width: 16, height: 16, borderRadius: 8, borderWidth: 1.5, borderColor: categoria === c ? colors.accent : colors.border, backgroundColor: categoria === c ? colors.accent : "transparent" }} />
        </Card>
      ))}
      <Input placeholder="Descreva o ocorrido..." value={descricao} onChangeText={setDescricao} multiline style={{ minHeight: 80 }} />
      <Button title="Enviar reporte" onPress={handleSubmit} />
    </Screen>
  );
}
