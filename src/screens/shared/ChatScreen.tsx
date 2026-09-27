import React, { useState } from "react";
import { View, Text, FlatList, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../../components/Input";
import { colors } from "../../theme/colors";

// Em produção: histórico via GET /bookings/:id/messages e envio em tempo real
// pelo WebSocket Gateway (seção 12), com fallback REST se desconectado.
export default function ChatScreen({ route }: any) {
  const { bookingId } = route.params;
  const [messages, setMessages] = useState([
    { id: "1", out: false, texto: "Olá! Já estou a caminho, chego por volta das 09h." },
    { id: "2", out: true, texto: "Perfeito, te aguardo! O portão azul." },
  ]);
  const [texto, setTexto] = useState("");

  function send() {
    if (!texto.trim()) return;
    setMessages((m) => [...m, { id: String(Date.now()), out: true, texto }]);
    setTexto("");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <FlatList
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={{ padding: 14, gap: 8 }}
          renderItem={({ item }) => (
            <View style={{ alignSelf: item.out ? "flex-end" : "flex-start", maxWidth: "75%", backgroundColor: item.out ? colors.accent : "#fff", borderWidth: item.out ? 0 : 1, borderColor: colors.border, borderRadius: 14, padding: 10 }}>
              <Text style={{ color: item.out ? "#fff" : colors.text, fontSize: 12 }}>{item.texto}</Text>
            </View>
          )}
        />
        <View style={{ flexDirection: "row", gap: 8, padding: 10, borderTopWidth: 1, borderColor: colors.border }}>
          <Input placeholder="Digite uma mensagem..." value={texto} onChangeText={setTexto} style={{ flex: 1, marginBottom: 0 }} />
          <Pressable onPress={send} style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: colors.accent, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: "#fff" }}>➤</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
