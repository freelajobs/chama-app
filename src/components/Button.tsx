import React from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle } from "react-native";
import { colors, radius } from "../theme/colors";

interface Props {
  title: string;
  onPress: () => void;
  variant?: "primary" | "outline" | "danger";
  loading?: boolean;
  style?: ViewStyle;
}

export function Button({ title, onPress, variant = "primary", loading, style }: Props) {
  const isPrimary = variant === "primary";
  const isDanger = variant === "danger";
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={[
        styles.base,
        isPrimary && { backgroundColor: colors.accent },
        variant === "outline" && { backgroundColor: "#fff", borderWidth: 1.5, borderColor: colors.border },
        isDanger && { backgroundColor: "#fff", borderWidth: 1.5, borderColor: colors.danger },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? "#fff" : colors.accent} />
      ) : (
        <Text style={[styles.text, !isPrimary && { color: isDanger ? colors.danger : colors.text }]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: radius.sm, paddingVertical: 14, alignItems: "center", justifyContent: "center" },
  text: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
