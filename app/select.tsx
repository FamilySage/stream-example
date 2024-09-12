import React, { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { ActivityIndicator, Pressable, RefreshControl, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StreamChat } from "stream-chat";
import { Channel as ChannelType } from "stream-chat";
import { Channel, Chat, DeepPartial, MessageInput, MessageList, Theme } from "stream-chat-expo";
import { useChannels } from "@/channelsContext";

export let STREAM_KEY = `${process.env.EXPO_PUBLIC_STREAM_KEY}`;
export let STREAM_CHANNEL = `${process.env.EXPO_PUBLIC_STREAM_CHANNEL}`;
export let STREAM_CHAT_TYPE = `${process.env.EXPO_PUBLIC_STREAM_CHAT_TYPE}`;

const channels = [
    {
        channel_id: `${process.env.EXPO_PUBLIC_FIRST_CHANNEL}`,
        name: "First channel",
    },
    {
        channel_id: `${process.env.EXPO_PUBLIC_SECOND_CHANNEL}`,
        name: "Second channel",
    }
]
export default function Index() {
    const insets = useSafeAreaInsets();
    const { channelId, setChannelId } = useChannels();

    function channelPicked(channel_id: string) {

        setChannelId(channel_id);

    }


    function renderItem(item: any) {

        return (
            <Pressable onPress={() => channelPicked(item.channel_id)}>
            <View style={{ paddingHorizontal: 12, paddingVertical: 20, borderBottomWidth: 1, borderColor: "black", gap: 10, flexDirection: "row"}}>
                <Text>{item.name}</Text>
                {channelId === item.channel_id && <Text>SELECTED</Text>}
            </View>
            </Pressable>

        )

    }


    return (
        <View style={{flex: 1, paddingVertical: insets.top, backgroundColor: "white"}}>
            <FlatList data={channels} keyExtractor={(item) => item.channel_id} renderItem={({index, item}) => renderItem(item)} />
        </View>
    )

}