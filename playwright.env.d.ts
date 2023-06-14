declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CI?: string;
      PORT?: string;
      IS_DOCKER?: string;
    }
  }
}

export {};
