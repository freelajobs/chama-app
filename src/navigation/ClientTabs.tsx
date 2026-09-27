import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import HomeScreen from "../screens/client/HomeScreen";
import OrdersScreen from "../screens/client/OrdersScreen";
import FavoritesScreen from "../screens/client/FavoritesScreen";
import ProfileScreen from "../screens/client/ProfileScreen";
import { colors } from "../theme/colors";

const Tab = createBottomTabNavigator();

export default function ClientTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.accent, tabBarInactiveTintColor: colors.muted }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Início", tabBarIcon: () => <Text>🏠</Text> }} />
      <Tab.Screen name="Orders" component={OrdersScreen} options={{ title: "Pedidos", tabBarIcon: () => <Text>🧾</Text> }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: "Favoritos", tabBarIcon: () => <Text>♡</Text> }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil", tabBarIcon: () => <Text>👤</Text> }} />
    </Tab.Navigator>
  );
}
