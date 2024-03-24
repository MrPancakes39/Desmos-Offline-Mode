import { Fragile } from "#globals";
import { select } from "#utils";
import { Header } from "../components";
import type DesmosOfflineMode from "#DSOM";

class HeaderController implements TransparentController {
  divContainer: HTMLDivElement | undefined;

  constructor(readonly dsom: DesmosOfflineMode) {
    this.dsom = dsom;
  }

  init() {
    this.divContainer = select<HTMLDivElement>("#dcg-header-container");
    Fragile.DCGView.mountToNode(Header, this.divContainer, { dsom: () => this.dsom });
  }
  destroy() {
    if (this.divContainer) Fragile.DCGView.unmountFromNode(this.divContainer);
  }
}

export default HeaderController;
