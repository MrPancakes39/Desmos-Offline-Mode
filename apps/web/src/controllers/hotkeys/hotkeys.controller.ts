import type { DesmosOfflineMode } from "~/types/DSOM";

export default class HotkeysController implements TransparentController {
  readonly dsom: DesmosOfflineMode

  isListening: boolean;
  listener: ((ev: KeyboardEvent) => void) | undefined;

  constructor(dsom: DesmosOfflineMode) {
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
    if (this.isListening && this.listener !== undefined) {
      document.removeEventListener("keydown", this.listener);
      this.listener = undefined;
      this.isListening = false;
    }
  }

  handleGlobalKeydown(ev: KeyboardEvent) {
    if (this.isUndo(ev) || this.isRedo(ev)) {
      console.log("Undo/Redo");
      return;
    }

    if (ev.ctrlKey || ev.shiftKey || ev.altKey || ev.metaKey || ev.key !== "Escape") {
      if (this.isHelp(ev)) {
        // show keyboard hotkeys modal
        this.dsom.modalController.showModal("hotkeys");
        ev.preventDefault();
        ev.stopPropagation();
        return;
      }

      this.handleCtrlModKeyShortcut(ev);
      return;
    }

    this.handleEscape(ev);
  }

  handleEscape(ev: KeyboardEvent) {
    this.dsom.modalController.closeModal();
    this.dsom.sidebarController.hideSideBar();
    this.dsom.headerController.closeMenu();
    // Menu to be done
    ev.preventDefault();
    ev.stopPropagation();
  }

  handleCtrlModKeyShortcut(ev: KeyboardEvent) {
    const isCombo = ev.ctrlKey && (ev.altKey || ev.metaKey) && !ev.shiftKey;
    if (!isCombo) return;

    // open menus
    const key = ev.key.toUpperCase();
    switch (key) {
      case "L":
        // Language menu (Ctrl + Alt/Cmd + L)
        this.dsom.headerController.openMenu("lang");
        ev.preventDefault();
        ev.stopPropagation();
        break;
      case "H":
        // Help Menu (Ctrl + Alt/Cmd + H)
        ev.preventDefault();
        ev.stopPropagation();
        this.dsom.headerController.openMenu("help");
        break;

      case "S":
        // Share Menu (Ctrl + Alt/Cmd + S)
        console.log("Share Menu");
        ev.preventDefault();
        ev.stopPropagation();
        break;
    }
  }

  isUndo(e: KeyboardEvent) {
    // Ctrl/Cmd + Z
    return !e.altKey && !e.shiftKey && (e.ctrlKey || e.metaKey) && e.key === "z";
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
