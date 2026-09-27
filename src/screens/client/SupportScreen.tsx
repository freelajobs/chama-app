import React, { useState } from "react";
import { Text, View, Pressable, Linking } from "react-native";
import { Screen } from "../../components/Screen";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { colors } from "../../theme/colors";

const FAQ = [
  { q: "Como funciona o pagamento?", a: "O valor fica retido com segurança até a confirmação da conclusão do serviço, quando é repassado ao profissional (split automático)." },
  { q: "Posso cancelar um pedido?", a: "Sim. O percentual de reembolso depende da antecedência do cancelamento — veja os detalhes na tela de cancelamento do pedido." },
  { q: "Como recebo meus ganhos como profissional?", a: "Os valores caem na sua carteira dentro do app e podem ser sacados via Pix/TED a qualquer momento, após verificação de identidade." },
  { q: "O que fazer se o profissional não comparecer?", a: "Abra uma disputa pelo pedido — nossa equipe analisa em até 24h e o reembolso é processado conforme o caso." },
];

export default function SupportScreen({ navigation }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Screen>
      <Text style={{ fontSize: 15, fontWeight: "800", textAlign: "center", marginBottom: 4 }}>Central de ajuda</Text>
      <Text style={{ color: colors.muted, textAlign: "center", marginBottom: 16 }}>Como podemos ajudar?</Text>

      <Text style={{ fontSize: 11, fontWeight: "700", color: colors.muted, marginBottom: 6 }}>Dúvidas frequentes</Text>
      {FAQ.map((item, i) => (
        <Pressable key={item.q} onPress={() => setOpenIndex(openIndex === i ? null : i)}>
          <Card>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 12, fontWeight: "700", flex: 1 }}>{item.q}</Text>
              <Text style={{ color: colors.muted }}>{openIndex === i ? "−" : "+"}</Text>
            </View>
            {openIndex === i && <Text style={{ color: colors.muted, fontSize: 11.5, marginTop: 8 }}>{item.a}</Text>}
          </Card>
        </Pressable>
      ))}

      <Text style={{ fontSize: 11, fontWeight: "700", color: colors.muted, marginTop: 10, marginBottom: 6 }}>Mais opções</Text>
      <Pressable onPress={() => Linking.openURL("mailto:suporte@chama.app")}>
        <Card><Text style={{ fontSize: 12 }}>💬 Falar com o suporte</Text></Card>
      </Pressable>
      <Pressable onPress={() => Linking.openURL("https://chama.app/termos")}>
        <Card><Text style={{ fontSize: 12 }}>📄 Termos de uso</Text></Card>
      </Pressable>
      <Pressable onPress={() => Linking.openURL("https://chama.app/privacidade")}>
        <Card><Text style={{ fontSize: 12 }}>🔒 Política de privacidade</Text></Card>
      </Pressable>

      <Button title="Reportar um problema com um pedido" variant="outline" onPress={() => navigation.navigate("Orders")} style={{ marginTop: 12 }} />
    </Screen>
  );
}
