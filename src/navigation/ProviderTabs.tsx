import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import ProviderDashboardScreen from "../screens/provider/ProviderDashboardScreen";
import WalletScreen from "../screens/client/WalletScreen";
import ProfileScreen from "../screens/client/ProfileScreen";
import PlaceholderScreen from "../screens/shared/PlaceholderScreen";
import { colors } from "../theme/colors";

const Tab = createBottomTabNavigator();

export default function ProviderTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.accent, tabBarInactiveTintColor: colors.muted }}>
      <Tab.Screen name="ProviderDashboard" component={ProviderDashboardScreen} options={{ title: "Início", tabBarIcon: () => <Text>🏠</Text> }} />
      <Tab.Screen name="ProviderServices" component={PlaceholderScreen} options={{ title: "Serviços", tabBarIcon: () => <Text>🧰</Text> }} initialParams={{ title: "Serviços" }} />
      <Tab.Screen name="ProviderWallet" options={{ title: "Financeiro", tabBarIcon: () => <Text>💳</Text> }}>
        {(props) => <WalletScreen {...props} isProvider />}
      </Tab.Screen>
      <Tab.Screen name="ProviderProfile" component={ProfileScreen} options={{ title: "Perfil", tabBarIcon: () => <Text>👤</Text> }} />
    </Tab.Navigator>
  );
}
