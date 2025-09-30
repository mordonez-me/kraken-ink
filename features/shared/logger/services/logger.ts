export class Logger {
  private readonly prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  log(...args: unknown[]) {
    console.log(`[${this.prefix}]`, ...args);
  }

  error(...args: unknown[]) {
    console.error(`[${this.prefix}]`, ...args);
  }
}

export const logger = new Logger("INK-APP");
