export {};

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, any>) => void;
      identify: (userId: string, properties?: Record<string, any>) => void;
      reset: () => void;
      opt_out_capturing: () => void;
      opt_in_capturing: () => void;
      debug: (enabled?: boolean) => void;
      [key: string]: any;
    };
  }
}