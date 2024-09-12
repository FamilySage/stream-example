The following setup is needed.

1. Create a "demo" channel type. Enable the guest role to have full access to reading channels and sending messages.
2. Create two channels in the admin console with the demo channel type.
3. Update the env vars below, use the channels you created
4. Launch app
5. Send a unique message to the first channel
6. Switch to second channel in other tab
7. Send a unique message to second channel
8. Quit app
9. Launch app
10. Toggle between channels. Observe the message list does not update
11. Send a message in any of the channels
12. Observe toggling channels now works correctly.
13. You can quit app and re-launch to experience this behavior again.

```
export EXPO_PUBLIC_STREAM_KEY=<STREAM_KEY>
export EXPO_PUBLIC_STREAM_CHAT_TYPE=<Channel type that allows guests to connect and write messages>
export EXPO_PUBLIC_FIRST_CHANNEL=<first channel id>
export EXPO_PUBLIC_SECOND_CHANNEL=<first channel id>
```
