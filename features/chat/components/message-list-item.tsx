import { Text, View } from "react-native";
import { ChatMessage } from "../types/chat";

export const MessageListItem = ({ message }: { message: ChatMessage }) => {
  return (
    <View className="w-full my-2 p-4 rounded-2xl">
      <Text className="text-lg text-white">{message.text}</Text>
      <Text className="text-sm text-white opacity-60 mt-2">
        {new Date(message.createdAt).toLocaleTimeString()}
      </Text>
      {message.status === "pending" && (
        <Text className="text-xs text-white opacity-60 mt-2">Pending...</Text>
      )}
      {message.status === "processed" && (
        <Text className="text-xs text-white opacity-60 mt-2">Processed</Text>
      )}
      {message.status === "error" && (
        <Text className="text-xs text-white opacity-60 mt-2">Error</Text>
      )}
    </View>
  );
};
