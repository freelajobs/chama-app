import React, { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { Screen } from "../../components/Screen";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { colors } from "../../theme/colors";
import { submitReview } from "../../api/bookings";

export default function RatingScreen({ route, navigation }: any) {
  const { bookingId, targetName = "o profissional" } = route.params;
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState("");

  async function handleSubmit() {
    await submitReview(bookingId, nota, comentario).catch(() => {});
    navigation.navigate("Home");
  }

  return (
    <Screen>
      <View style={{ alignItems: "center", marginTop: 30, gap: 10 }}>
        <Text style={{ fontSize: 32 }}>✓</Text>
        <Text style={{ fontSize: 17, fontWeight: "800" }}>Serviço concluído!</Text>
        <Text style={{ color: colors.muted }}>Como foi a experiência com {targetName}?</Text>
        <View style={{ flexDirection: "row", gap: 6 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Pressable key={n} onPress={() => setNota(n)}>
              <Text style={{ fontSize: 28, color: n <= nota ? "#f5a623" : colors.border }}>★</Text>
            </Pressable>
          ))}
        </View>
        <Input placeholder="Deixe seu comentário (opcional)" value={comentario} onChangeText={setComentario} style={{ width: "100%" }} multiline />
        <Button title="Enviar avaliação" onPress={handleSubmit} style={{ width: "100%" }} />
      </View>
    </Screen>
  );
}
