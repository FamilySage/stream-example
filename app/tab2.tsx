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

    const streamTheme: DeepPartial<Theme> = {
          
          screenPadding: 0,
        };
    
        const sleep = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    async function loadChat() {
        
      await sleep(1000);
        const client = StreamChat.getInstance(STREAM_KEY, {});
        setChatClient(client);

        try {
            const channels = await client.queryChannels(
              { type: STREAM_CHAT_TYPE },
              [],
              {
                watch: true,
                state: true,
              },
            );
            if (channels) {
                const channel = channels[0];
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

    return (
        <View style={{ flex: 1, backgroundColor: "white"}}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ height: 100, backgroundColor: "pink"}} />
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
