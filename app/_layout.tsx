import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { Icon, Provider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OverlayProvider } from "stream-chat-expo";
import { StreamChat } from "stream-chat";

export let STREAM_KEY = `${process.env.EXPO_PUBLIC_STREAM_KEY}`;

export default function TabLayout() {

    async function connectStream() {
        const client = StreamChat.getInstance(STREAM_KEY, {});
        await client.setGuestUser({ id: 'tommaso' });
    }

    useEffect(() => {
        connectStream();
    }, []);
    
  return (
    <Provider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <OverlayProvider>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "#a1a1a1",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, color }: { size: number; color: string }) => (
            <Icon source="numeric-1" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tab2"
        options={{
          tabBarIcon: ({ size, color }: { size: number; color: string }) => (
            <Icon source="numeric-2" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
    
    
    </OverlayProvider>
    </GestureHandlerRootView>
    </Provider>
  );
}