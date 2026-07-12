import { DropdownPopoverWithAnchorShim, For, Toggle } from "~/components";
import { LANG_DISPLAY_NAMES, type LANG_MAP } from "~/controllers/language/language.controller";
import { Component, DCGView, jsx } from "~/globals/DCGView";
import type { DesmosOfflineMode } from "~/types/DSOM";
import { safeStorage } from "~/utils";

import type { HeaderMenuProp } from "../header.controller";

export class RightContainer extends Component<{
  dsom: DesmosOfflineMode;
  menu: HeaderMenuProp;
}> {
  dsom!: DesmosOfflineMode;
  menu!: HeaderMenuProp;

  override init() {
    this.dsom = this.props.dsom();
    this.menu = this.props.menu();
  }

  template() {
    return (
      <div class="right-container">
        {/* Language Menu (Ctrl + Alt/Cmd + L) */}
        <div class="center-div">
          <DropdownPopoverWithAnchorShim
            orientation={DCGView.const("bottom-left")}
            tooltip={() => this.dsom.format("account-shell-label-language")}
            anchor={() => (
              <span
                role="button"
                tabindex="0"
                aria-label={() => this.dsom.format("account-shell-label-language")}
                class="dcg-icon-language desom-icon-inline"
              />
            )}
            popoverBody={() => (
              <div class="desom-popover-container menu-lang">
                <div class="desom-popover-interior dcg-language-menu">{LanguageMenu(this.dsom)}</div>
              </div>
            )}
            controlled={() => ({
              isOpen: this.menu.current() === "lang",
              setDropdownOpen: (isOpen) => (isOpen ? this.menu.open("lang") : this.menu.close()),
            })}
          />
        </div>
        {/* Help Menu (Ctrl + Alt/Cmd + H) */}
        <div class="center-div">
          <DropdownPopoverWithAnchorShim
            orientation={DCGView.const("bottom-left")}
            tooltip={() => this.dsom.format("account-shell-label-help")}
            anchor={() => (
              <span
                role="button"
                tabindex="0"
                aria-label={() => this.dsom.format("account-shell-label-help")}
                class="dcg-icon-question-sign desom-icon-inline"
              />
            )}
            popoverBody={() => (
              <div class="desom-popover-container menu-help">
                <div class="desom-popover-interior dcg-language-menu">{HelpMenu(this.dsom)}</div>
              </div>
            )}
            controlled={() => ({
              isOpen: this.menu.current() === "help",
              setDropdownOpen: (isOpen) => (isOpen ? this.menu.open("help") : this.menu.close()),
            })}
          />
        </div>
      </div>
    );
  }
}

function HelpMenu(dsom: DesmosOfflineMode) {
  return (
    <div class="desom-help-menu">
      <div class="message-container">
        <div class="message">{() => dsom.format("dsom-shell-help-message")}</div>
      </div>
      <button
        type="button"
        role="link"
        tabindex="0"
        class="dcg-link"
        onTap={() => {
          console.log("hotkeys");
          dsom.modalController.showModal("hotkeys");
        }}
      >
        <i class="dcg-icon-keyboard"></i>
        <span class="dcg-link-text">{() => dsom.format("account-shell-link-keyboard-shortcuts")}</span>
      </button>
    </div>
  );
}

function LanguageMenu(dsom: DesmosOfflineMode) {
  const saveLangPrefs = safeStorage.getItem("saveLangPrefs", { lang: "en", toggleState: false });

  return (
    <div class="dcg-language-picker dcg-two-columns">
      <div class="dcg-popover-title" role="heading" aria-level="2">
        {dsom.format("shared-title-language-menu")}
      </div>
      <ul class="dcg-unstyled-list dcg-languages-list dcg-popover-content" role="menu">
        <For each={() => [...LANG_DISPLAY_NAMES.entries()]} key={(e: LANG_MAP) => e[0]}>
          {(getLangRecord: () => LANG_MAP) => {
            const [lang, displayName] = getLangRecord();

            let className = "dcg-listitem dcg-language-option";
            if (lang === dsom.currentLanguage()) className += " dcg-selected";

            return (
              <li
                class={className}
                lang={lang}
                role="menuitem"
                tabIndex="0"
                onTap={() => {
                  dsom.languageController.fetchAndSetLanguage(lang);
                  if (saveLangPrefs.toggleState) {
                    safeStorage.setItem("saveLangPrefs", { lang, toggleState: true });
                  }
                  // dsom.headerController.closeMenu();
                }}
              >
                {displayName}
              </li>
            );
          }}
        </For>
      </ul>
      <hr />
      <div class="desom-save-language-preference-container">
        <span>{() => dsom.format("dsom-shell-save-language-preference-toggle")}</span>
        <Toggle
          toggled={() => saveLangPrefs.toggleState}
          onChange={() => {
            saveLangPrefs.toggleState = !saveLangPrefs.toggleState;
            if (saveLangPrefs.toggleState) {
              safeStorage.setItem("saveLangPrefs", { lang: dsom.currentLanguage(), toggleState: true });
            } else {
              safeStorage.removeItem("saveLangPrefs");
            }
            dsom.cc.updateViews();
          }}
          disabled={() => false}
        />
      </div>
    </div>
  );
}
