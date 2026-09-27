import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";

export function Screen({ children, scroll = true }: { children: React.ReactNode; scroll?: boolean }) {
  const Wrapper = scroll ? ScrollView : View;
  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <Wrapper contentContainerStyle={scroll ? styles.scrollContent : styles.flexContent} style={scroll ? undefined : styles.flexContent}>
        {children}
      </Wrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { padding: 16, paddingBottom: 32 },
  flexContent: { flex: 1, padding: 16 },
});
