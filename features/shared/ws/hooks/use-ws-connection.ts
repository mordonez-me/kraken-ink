import { useLogger } from "@/features/shared/logger/hooks/use-logger";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import { WebSocketConnectionProps, WsMessage } from "../types/web-socket";

export const useWsConnection = <T extends WsMessage>({
  url,
  maxQueue = 100,
  onOpen,
  onClose,
  onError,
  onMessage,
}: WebSocketConnectionProps<T>) => {
  const [status, setStatus] = useState<
    "connected" | "disconnected" | "reconnecting" | "not-initialized"
  >("not-initialized");
  const [messages, setMessages] = useState<T[]>([]);

  const websocketRef = useRef<WebSocket | null>(null);

  const logger = useLogger();

  const send = (message: T) => {
    if (
      websocketRef.current &&
      websocketRef.current.readyState === WebSocket.OPEN
    ) {
      // Send message to WebSocket
      websocketRef.current.send(JSON.stringify(message));

      // Add message to local messages (to show the user that the message is processing)
      setMessages((prev) => [message, ...prev].slice(0, maxQueue));
    }
  };

  const openWebSocket = useCallback(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      logger.log("WebSocket connected");
      setStatus("connected");
      onOpen?.();
    };

    socket.onclose = (event: CloseEvent) => {
      logger.log("WebSocket disconnected", event);
      setStatus("disconnected");
      onClose?.();
    };

    socket.onerror = (event: Event) => {
      logger.error("WebSocket error", event);
      onError?.(event);
    };

    socket.onmessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data) as T;
        setMessages((prev) => {
          // Filter out messages that are not pending and have the same messageId
          // Preferred search by index because latest messages are at the beginning of the array
          const index = prev.findIndex(
            (m) => m.messageId === message.messageId
          );
          if (index !== -1) {
            prev.splice(index, 1, { ...message, status: "processed" });
          } else {
            prev.unshift(message);
          }
          return prev.slice(0, maxQueue);
        });
        onMessage?.(message);
      } catch (error) {
        // Discard unparsable messages, just log the error
        logger.error("WebSocket message error", error);
      }
    };

    websocketRef.current = socket;

    return socket;
  }, [url]);

  const reconnectWebSocket = useCallback(() => {
    if (websocketRef.current) {
      websocketRef.current.close();
    }
    setStatus("reconnecting");
    openWebSocket();
  }, [openWebSocket]);

  const handleAppStateChange = useCallback(
    (next: AppStateStatus) => {
      if (next === "active") {
        if (status === "disconnected") {
          reconnectWebSocket();
        }
      }
    },
    [status, reconnectWebSocket]
  );

  useEffect(() => {
    const socket = openWebSocket();
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => {
      subscription.remove();
    };
  }, [handleAppStateChange]);

  useEffect(() => {
    if (status === "disconnected") {
      setTimeout(() => {
        reconnectWebSocket();
      }, 1000);
    }
  }, [status]);

  return {
    status,
    messages,
    send,
  };
};
