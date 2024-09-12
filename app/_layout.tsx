import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { Icon, Provider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OverlayProvider } from "stream-chat-expo";
import { StreamChat } from "stream-chat";
import { ChannelsProvider } from "../src/channelsContext";

export let STREAM_KEY = `${process.env.EXPO_PUBLIC_STREAM_KEY}`;
export let STREAM_CHANNEL = `${process.env.EXPO_PUBLIC_STREAM_CHANNEL}`;
export let STREAM_CHAT_TYPE = `${process.env.EXPO_PUBLIC_STREAM_CHAT_TYPE}`;

export default function TabLayout() {
    const [connected, setConnected] = useState(false);

    async function connectStream() {
        const client = StreamChat.getInstance(STREAM_KEY, {});
        await client.setGuestUser({ id: 'tommaso' });
        setConnected(true);
        // const channel = client.channel(STREAM_CHAT_TYPE, STREAM_CHANNEL, {
        //     name: "Demo chat"
        // });
        // await channel.create();
    }

    useEffect(() => {
        if (!connected) connectStream();
    }, []);

  return (
    <Provider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <OverlayProvider>
          <ChannelsProvider>
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
        name="select"
        options={{
          tabBarIcon: ({ size, color }: { size: number; color: string }) => (
            <Icon source="numeric-2" size={size} color={color} />
          ),
        }}
      />

    </Tabs>
    
    </ChannelsProvider>
    </OverlayProvider>
    </GestureHandlerRootView>
    </Provider>
  );
}
