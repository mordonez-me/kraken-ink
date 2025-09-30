export type WebSocketConnectionProps<T> = {
  url: string;
  maxQueue?: number;
  onMessage?: (msg: T) => void;
  onOpen?: () => void;
  onClose?: (ev?: CloseEvent | { code?: number; reason?: string }) => void;
  onError?: (err: unknown) => void;
};

export type WsMessage = {
  messageId: string;
  status: "processed" | "error" | "pending";
};
