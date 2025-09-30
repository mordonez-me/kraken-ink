import { useMemo } from "react";
import { logger } from "../services/logger";

export const useLogger = () => {
  return useMemo(() => logger, []);
};
