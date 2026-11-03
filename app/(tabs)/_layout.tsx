import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { palette } from "@/components/fishery-ui";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 10 : Math.max(insets.bottom, 8);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: palette.teal,
        tabBarInactiveTintColor: palette.muted,
        tabBarButton: HapticTab,
        tabBarLabelStyle: styles.label,
        tabBarStyle: { height: 64 + bottomPadding, paddingTop: 7, paddingBottom: bottomPadding, backgroundColor: palette.white, borderTopColor: palette.line, borderTopWidth: 1 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "الرئيسية", tabBarIcon: ({ color, size }) => <MaterialIcons name="dashboard" color={color} size={size} /> }} />
      <Tabs.Screen name="boats" options={{ title: "القوارب", tabBarIcon: ({ color, size }) => <MaterialIcons name="directions-boat" color={color} size={size} /> }} />
      <Tabs.Screen name="fishers" options={{ title: "الصيادون", tabBarIcon: ({ color, size }) => <MaterialIcons name="groups" color={color} size={size} /> }} />
      <Tabs.Screen name="accounts" options={{ title: "الحسابات", tabBarIcon: ({ color, size }) => <MaterialIcons name="account-balance-wallet" color={color} size={size} /> }} />
      <Tabs.Screen name="more" options={{ title: "المزيد", tabBarIcon: ({ color, size }) => <MaterialIcons name="menu" color={color} size={size} /> }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({ label: { fontSize: 11, fontWeight: "700" } });
