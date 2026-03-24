export {}

declare global {
  interface Window {
    FB: {
      init: (options: {
        appId: string;
        cookie?: boolean;
        xfbml?: boolean;
        version: string;
      }) => void;

      login: (
        callback: (response: FacebookLoginResponse) => void,
        options?: { scope?: string }
      ) => void;

      logout: (callback: () => void) => void;

      getLoginStatus: (
        callback: (response: FacebookLoginResponse) => void
      ) => void;
    };
  }
}
