import { useChannels } from "@/channelsContext";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StreamChat } from "stream-chat";
import { Channel as ChannelType } from "stream-chat";
import { Channel, Chat, DeepPartial, MessageInput, MessageList, Theme } from "stream-chat-expo";

export let STREAM_KEY = `${process.env.EXPO_PUBLIC_STREAM_KEY}`;
export let STREAM_CHANNEL = `${process.env.EXPO_PUBLIC_STREAM_CHANNEL}`;
export let STREAM_CHAT_TYPE = `${process.env.EXPO_PUBLIC_STREAM_CHAT_TYPE}`;

export default function Index() {
    const [loading, setLoading] = useState(true);
    const [chatClient, setChatClient] = useState<StreamChat | undefined>();
    const [channel, setChannel] = useState<ChannelType | undefined>();
    const insets = useSafeAreaInsets();
    const { channelId, setChannelId } = useChannels();

    const streamTheme: DeepPartial<Theme> = {
          
          screenPadding: 0,
        };

        const sleep = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
      

    async function loadChat() {
        
        await sleep(1000);
        const client = StreamChat.getInstance(STREAM_KEY, {});
        setChatClient(client);

        updateChannel(client);
    }

    async function updateChannel(client: StreamChat) {
      try {
            
        const channels = await client.queryChannels(
          { type: "demo", id: { $eq: channelId } },
          [],
          {
            watch: true,
            state: true,
          },
        );
        if (channels) {
            const channel = channels[0];
            setChannel(channel);
        } else {
          const channel = client.channel("demo", channelId);
          await channel.create();
          setChannel(channel);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }

    }

    useEffect(() => {
        loadChat();
    }, []);

    useEffect(() => {
      if (chatClient) updateChannel(chatClient!);
    }, [channelId])

    return (
        <View style={{ flex: 1, backgroundColor: "white"}}>
            <SafeAreaView style={{ flex: 1, marginBottom: -1 * insets.bottom }}>
            {loading && 
                (<View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <View>
                    <ActivityIndicator animating={loading} />
                    </View>
                </View>)}
                {chatClient && (
                    <View style={{ flex: 1}}>
            <Chat client={chatClient} style={streamTheme}>
              {channel && (
                <Channel
                  channel={channel}
                  hideStickyDateHeader={true}
                  hideDateSeparators={true}
                  hasCommands={false}
                  hasFilePicker={false}
                >
                  <MessageList
                    inverted={false}
                  />
                  <MessageInput />
                </Channel>
              )}
            </Chat>
            </View>
          )}
            </SafeAreaView>
        </View>
    )
}
