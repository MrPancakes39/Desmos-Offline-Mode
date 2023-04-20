interface windowConfig extends Window {
  IS_BROWSER: boolean;
}

declare const window: windowConfig;

// defines window.IS_BROWSER constant
Object.defineProperty(window, "IS_BROWSER", {
  value: !("__TAURI__" in window),
  writable: false,
});

export default window;
