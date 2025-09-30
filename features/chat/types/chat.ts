import { WsMessage } from "@/features/shared/ws/types/web-socket";

export type ChatMessage = {
  text: string;
  userId: string;
  createdAt: number;
} & WsMessage;
