import React from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { colors, radius } from "../theme/colors";

export function Input(props: TextInputProps) {
  return <TextInput placeholderTextColor={colors.muted} style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5, borderColor: colors.border, borderRadius: radius.sm,
    paddingHorizontal: 14, paddingVertical: 13, fontSize: 13, marginBottom: 10, color: colors.text, backgroundColor: "#fff",
  },
});
