import { For, If, Tooltip } from "..";
import { Component, jsx } from "#DCGView";
import { LANG_DISPLAY_NAMES, type LANG_MAP } from "#DSOM";

import type DesmosOfflineMode from "#DSOM";
import type { HeaderMenuProp, HeaderPopoverMenu } from "../../controllers/HeaderController";
import Fragment from "../common/Fragment";

type PopoverProps = () => void;

export default class RightContainer extends Component<{
  dsom: DesmosOfflineMode;
  menu: HeaderMenuProp;
}> {
  dsom!: DesmosOfflineMode;
  menu!: HeaderMenuProp;
  toggleMenu!: (menu: HeaderPopoverMenu) => void;

  popoverProps = {
    help: () => HelpMenu(this.dsom),
    lang: () => LanguageMenu(this.dsom),
  } as const satisfies Record<HeaderPopoverMenu, PopoverProps>;

  init() {
    this.dsom = this.props.dsom();
    this.menu = this.props.menu();

    this.toggleMenu = (menu: HeaderPopoverMenu) => {
      if (this.menu.current() === menu) {
        this.menu.close();
      } else {
        this.menu.open(menu);
      }
    };
  }

  template() {
    return (
      <div class="right-container">
        {/* Language Menu (Ctrl + Alt/Cmd + L) */}
        <Tooltip tooltip={() => this.dsom.format("account-shell-label-language")}>
          <div class="center-div">
            <span class="dcg-icon-world desom-icon-inline" tabindex="0" onTap={() => this.toggleMenu("lang")}></span>
          </div>
        </Tooltip>
        {/* Help Menu (Ctrl + Alt/Cmd + H) */}
        <Tooltip tooltip={() => this.dsom.format("account-shell-label-help")}>
          <div class="center-div">
            <span
              class="dcg-icon-question-sign desom-icon-inline"
              tabindex="0"
              onTap={() => this.toggleMenu("help")}
            ></span>
          </div>
        </Tooltip>
        {/* Popover Menu */}
        <If predicate={() => this.menu.current() !== "closed"}>
          {() => {
            const currentMenu = this.menu.current() as HeaderPopoverMenu;
            return (
              <div class={`desom-popover-container menu-${currentMenu} dcg-popover dcg-bottom`}>
                <div class="dcg-popover-interior">{this.popoverProps[currentMenu]()}</div>
                <span class="dcg-arrow"></span>
              </div>
            );
          }}
        </If>
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
      <a role="link" tabindex="0" class="dcg-link" onTap={() => dsom.modalController.showModal("hotkeys")}>
        <i class="dcg-icon-keyboard"></i>
        <span class="dcg-link-text">{() => dsom.format("account-shell-link-keyboard-shortcuts")}</span>
      </a>
    </div>
  );
}

function LanguageMenu(dsom: DesmosOfflineMode) {
  return (
    <div class="dcg-language-picker dcg-two-columns">
      <div class="dcg-popover-title" role="heading" aria-level="2">
        {dsom.format("shared-title-language-menu")}
      </div>
      <ul class="dcg-unstyled-list dcg-languages-list dcg-popover-content" role="menu">
        <For each={() => [...LANG_DISPLAY_NAMES.entries()]} key={(e: LANG_MAP) => e[0]}>
          {([lang, displayName]: LANG_MAP) => {
            let className = "dcg-listitem dcg-language-option";
            if (lang === dsom.currentLanguage()) className += " dcg-selected";

            return (
              <Fragment>
                <If predicate={() => lang === "ar"}>{() => <hr />}</If>
                <li
                  class={className}
                  lang={lang}
                  role="menuitem"
                  tabIndex="0"
                  onTap={() => {
                    dsom.languageController.fetchLanguage(lang);
                    dsom.headerController.closeMenu();
                  }}
                >
                  {displayName}
                </li>
              </Fragment>
            );
          }}
        </For>
      </ul>
    </div>
  );
}
