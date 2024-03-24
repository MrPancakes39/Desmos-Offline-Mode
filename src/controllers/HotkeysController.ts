import type DesmosOfflineMode from "#DSOM";

export default class HotkeysController implements TransparentController {
  isListening: boolean;
  listener: ((ev: KeyboardEvent) => void) | undefined;

  constructor(readonly dsom: DesmosOfflineMode) {
    this.dsom = dsom;
    this.isListening = false;
  }

  init() {
    this.startListening();
  }

  destroy() {
    this.stopListening();
  }

  startListening() {
    if (!this.isListening) {
      this.listener = (ev) => this.handleGlobalKeydown(ev);
      document.addEventListener("keydown", this.listener);
      this.isListening = true;
    }
  }

  stopListening() {
    if (this.isListening && this.listener) {
      document.removeEventListener("keydown", this.listener);
      this.listener = undefined;
      this.isListening = false;
    }
  }

  handleGlobalKeydown(ev: KeyboardEvent) {
    // console.log(ev);
    if (this.isUndo(ev) || this.isRedo(ev)) {
    } else if (ev.ctrlKey || ev.shiftKey || ev.altKey || ev.metaKey || ev.key !== "Escape") {
      if (this.isHelp(ev)) {
        // show keyboard hotkeys modal
        console.log("Keyboard Modal");
        ev.preventDefault();
        ev.stopPropagation();
      } else if (ev.ctrlKey && (ev.altKey || ev.metaKey) && !ev.shiftKey) {
        // open menus
        const key = ev.key.toUpperCase();
        if (key === "L") {
          // Language menu (Ctrl + Alt/Cmd + L)
          console.log("Language Menu");
          ev.preventDefault();
          ev.stopPropagation();
        }
        if (key === "H") {
          // Help Menu (Ctrl + Alt/Cmd + H)
          ev.preventDefault();
          ev.stopPropagation();
          this.dsom.headerController.openHelpMenu();
        }
        if (key === "S") {
          // Share Menu (Ctrl + Alt/Cmd + S)
          console.log("Share Menu");
          ev.preventDefault();
          ev.stopPropagation();
        }
      }
    } else {
      this.handleEscape(ev);
    }
  }

  handleEscape(ev: KeyboardEvent) {
    this.dsom.modalController.closeModal();
    this.dsom.sidebarController.hideSideBar();
    this.dsom.headerController.closeHelpMenu();
    // Menu to be done
    ev.preventDefault();
    ev.stopPropagation();
  }

  isUndo(e: KeyboardEvent) {
    // Ctrl/Cmd + Z
    return !e.altKey && !e.shiftKey && (e.ctrlKey || e.metaKey) && e.key == "z";
  }

  isRedo(e: KeyboardEvent) {
    // Ctrl/Cmd + Y || Ctrl/Cmd + Shift + Z
    return !e.altKey && (e.ctrlKey || e.metaKey) && (e.key === "y" || (e.shiftKey && (e.key === "Z" || e.key === "z")));
  }

  isHelp(e: KeyboardEvent) {
    // Ctrl/Cmd + /
    return !e.altKey && (e.ctrlKey || e.metaKey) && e.key === "/";
  }
}
