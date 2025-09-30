// screens/ChatScreen.tsx

import { Header } from "@/features/shared/ui/header/components/header";
import { useWsConnection } from "@/features/shared/ws/hooks/use-ws-connection";
import { FlashList } from "@shopify/flash-list";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { v4 as uuidv4 } from "uuid";
import { MessageListItem } from "../components/message-list-item";
import { USER_ID } from "../constants";
import { ChatMessage } from "../types/chat";

const WS_URL = process.env.EXPO_PUBLIC_WEBSOCKET_URL || "";

export const ChatScreen = () => {
  const { messages, status, send } = useWsConnection<ChatMessage>({
    url: WS_URL,
  });

  const { top } = useSafeAreaInsets();

  const [text, setText] = useState("");

  const messagesInverted = useMemo(
    () => messages.slice().reverse(),
    [messages]
  );

  const sendMessage = () => {
    if (text.trim().length) {
      send({
        messageId: uuidv4(),
        text: text.trim(),
        userId: USER_ID,
        createdAt: Date.now(),
        status: "pending",
      });
      setText("");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      className="flex-1">
      <View className="flex-1">
        {status === "reconnecting" && (
          <View className="flex-1 items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-black/50 text-center">
            <Text className="text-white">Reconnecting to WebSocket...</Text>
          </View>
        )}
        <View
          className="mx-4 pt-2"
          style={{ marginTop: top }}>
          <Header title="Chat" />
        </View>
        <FlashList
          data={messagesInverted}
          removeClippedSubviews
          nestedScrollEnabled
          maintainVisibleContentPosition={{
            autoscrollToBottomThreshold: 0.2,
            startRenderingFromBottom: true,
          }}
          className="flex-1"
          getItemType={(item) => "message"}
          renderItem={({ item }) => <MessageListItem message={item} />}
        />

        <View className="flex-row gap-2 p-4 border-t bg-neutral-900">
          <TextInput
            className="flex-1 border border-gray-500 p-2 rounded-2xl text-white placeholder:text-gray-500"
            value={text}
            onChangeText={setText}
            placeholder="Write a message…"
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <Pressable
            onPress={sendMessage}
            className="bg-violet-700 rounded-md p-2">
            <Text className="text-white">Send</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
