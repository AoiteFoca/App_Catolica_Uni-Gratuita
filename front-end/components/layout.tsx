// components/layout.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import AppBottomBar from "./appBar";

interface LayoutProps {
  children: React.ReactNode;
  currentTab: string;
}

const Layout: React.FC<LayoutProps> = ({ children, currentTab }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      <AppBottomBar currentTab={currentTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
});

export default Layout;
