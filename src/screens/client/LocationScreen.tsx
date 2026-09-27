import React, { useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Screen } from "../../components/Screen";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { colors } from "../../theme/colors";
import { reverseGeocode } from "../../api/geocode";

// Integração com Google Maps via react-native-maps (chave em app.json → ios/android.config).
// O endereço é resolvido no backend via POST /geocode/reverse (proxy da Google Geocoding API),
// mantendo a chave da API fora do app mobile.
export default function LocationScreen({ route, navigation }: any) {
  const { providerId, providerName, data, horario } = route.params;
  const [coords, setCoords] = useState({ latitude: -23.5629, longitude: -46.6544 });
  const [endereco, setEndereco] = useState("Rua das Flores, 123 · Jardim Paulista, São Paulo - SP");
  const [buscandoEndereco, setBuscandoEndereco] = useState(false);

  async function handleMove(coordinate: { latitude: number; longitude: number }) {
    setCoords(coordinate);
    setBuscandoEndereco(true);
    try {
      const { formatted } = await reverseGeocode(coordinate.latitude, coordinate.longitude);
      setEndereco(formatted);
    } catch {
      // mantém o endereço anterior editável manualmente se o geocoding falhar
    } finally {
      setBuscandoEndereco(false);
    }
  }

  return (
    <Screen scroll={false}>
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          initialRegion={{ ...coords, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
          onPress={(e) => handleMove(e.nativeEvent.coordinate)}
        >
          <Marker coordinate={coords} draggable onDragEnd={(e) => handleMove(e.nativeEvent.coordinate)} />
        </MapView>
        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <Text style={{ fontSize: 11, fontWeight: "700", color: colors.muted }}>Endereço do serviço</Text>
            {buscandoEndereco && <ActivityIndicator size="small" color={colors.accent} />}
          </View>
          <Input value={endereco} onChangeText={setEndereco} multiline />
          <Button
            title="Confirmar localização"
            onPress={() =>
              navigation.navigate("ConfirmOrder", {
                providerId, providerName, data, horario,
                address: { lat: coords.latitude, lng: coords.longitude, formatted: endereco },
              })
            }
          />
          <Text style={{ color: colors.muted, fontSize: 11, textAlign: "center", marginTop: 8 }}>
            Toque ou arraste o pin — o endereço é preenchido automaticamente via Google Maps
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({ map: { width: "100%", height: 320 } });
