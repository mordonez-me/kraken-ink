import { Tabs } from "expo-router";
import { Cog, MessageCircle, Wallet } from "lucide-react-native";
import React from "react";

import { Colors } from "@/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["dark"].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <Wallet
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Cog
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => (
            <MessageCircle
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
