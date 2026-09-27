import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";

import { useAuth } from "../context/AuthContext";
import { colors } from "../theme/colors";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";

import ClientTabs from "./ClientTabs";
import ProviderTabs from "./ProviderTabs";

import CategoriesScreen from "../screens/client/CategoriesScreen";
import ProviderListScreen from "../screens/client/ProviderListScreen";
import ProviderDetailScreen from "../screens/client/ProviderDetailScreen";
import ScheduleScreen from "../screens/client/ScheduleScreen";
import LocationScreen from "../screens/client/LocationScreen";
import ConfirmOrderScreen from "../screens/client/ConfirmOrderScreen";
import PaymentScreen from "../screens/client/PaymentScreen";
import PaymentFailedScreen from "../screens/client/PaymentFailedScreen";
import OrderStatusScreen from "../screens/client/OrderStatusScreen";
import CancelOrderScreen from "../screens/client/CancelOrderScreen";
import RatingScreen from "../screens/client/RatingScreen";
import WalletScreen from "../screens/client/WalletScreen";

import ChatScreen from "../screens/shared/ChatScreen";
import DisputeScreen from "../screens/shared/DisputeScreen";
import NotificationsScreen from "../screens/client/NotificationsScreen";
import SupportScreen from "../screens/client/SupportScreen";
import DepositScreen from "../screens/client/DepositScreen";
import WithdrawScreen from "../screens/client/WithdrawScreen";

import NewRequestScreen from "../screens/provider/NewRequestScreen";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="ClientTabs" component={ClientTabs} options={{ headerShown: false }} />
      <Stack.Screen name="ProviderTabs" component={ProviderTabs} options={{ headerShown: false }} />

      <Stack.Screen name="Categories" component={CategoriesScreen} options={{ title: "Categorias" }} />
      <Stack.Screen name="ProviderList" component={ProviderListScreen} options={{ title: "Profissionais disponíveis" }} />
      <Stack.Screen name="ProviderDetail" component={ProviderDetailScreen} options={{ title: "Detalhe do serviço" }} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ title: "Agendar serviço" }} />
      <Stack.Screen name="Location" component={LocationScreen} options={{ title: "Localização do serviço" }} />
      <Stack.Screen name="ConfirmOrder" component={ConfirmOrderScreen} options={{ title: "Confirmação" }} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: "Pagamento" }} />
      <Stack.Screen name="PaymentFailed" component={PaymentFailedScreen} options={{ title: "Pagamento" }} />
      <Stack.Screen name="OrderStatus" component={OrderStatusScreen} options={{ title: "Pedido em andamento" }} />
      <Stack.Screen name="CancelOrder" component={CancelOrderScreen} options={{ title: "Cancelar pedido" }} />
      <Stack.Screen name="Rating" component={RatingScreen} options={{ title: "Avaliação" }} />
      <Stack.Screen name="Wallet" component={WalletScreen} options={{ title: "Carteira" }} />

      <Stack.Screen name="Chat" component={ChatScreen} options={{ title: "Conversa" }} />
      <Stack.Screen name="Dispute" component={DisputeScreen} options={{ title: "Central de disputa" }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: "Notificações" }} />
      <Stack.Screen name="Support" component={SupportScreen} options={{ title: "Suporte" }} />
      <Stack.Screen name="Deposit" component={DepositScreen} options={{ title: "Adicionar saldo" }} />
      <Stack.Screen name="Withdraw" component={WithdrawScreen} options={{ title: "Sacar" }} />

      <Stack.Screen name="NewRequest" component={NewRequestScreen} options={{ title: "Novo pedido" }} />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.bg }}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
