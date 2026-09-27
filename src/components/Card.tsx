import React from "react";
import { View, ViewStyle } from "react-native";
import { colors, radius } from "../theme/colors";

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <View
      style={[
        { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: 14, marginBottom: 10 },
        style,
      ]}
    >
      {children}
    </View>
  );
}
