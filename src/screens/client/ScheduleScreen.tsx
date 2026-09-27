import React, { useState } from "react";
import { Text } from "react-native";
import { Screen } from "../../components/Screen";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { colors } from "../../theme/colors";

export default function ScheduleScreen({ route, navigation }: any) {
  const { providerId, providerName } = route.params;
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");

  return (
    <Screen>
      <Text style={{ fontSize: 15, fontWeight: "800", marginBottom: 10 }}>Agendar serviço</Text>
      <Text style={{ color: colors.muted, marginBottom: 14 }}>{providerName}</Text>
      <Input placeholder="Data (ex: 26/04/2025)" value={data} onChangeText={setData} />
      <Input placeholder="Horário (ex: 09:00 - 12:00)" value={horario} onChangeText={setHorario} />
      <Button
        title="Continuar"
        onPress={() => navigation.navigate("Location", { providerId, providerName, data, horario })}
      />
    </Screen>
  );
}
