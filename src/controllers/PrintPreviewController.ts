import { Fragile } from "#globals";
import { select } from "#utils";
import { PPreviewContainer } from "../components";

import type DesmosOfflineMode from "#DSOM";

export default class PrintPreviewController implements TransparentController {
  unsub: (() => void) | undefined;
  divContainer: HTMLDivElement | undefined;
  ppreviewContent: HTMLDivElement | undefined;

  constructor(readonly dsom: DesmosOfflineMode) {
    this.dsom = dsom;
  }

  init() {
    const ppreviewContainer = select<HTMLDivElement>("#print-preview-container");
    this.divContainer = ppreviewContainer;

    const view = Fragile.DCGView.mountToNode(PPreviewContainer, this.divContainer, {
      dsom: () => this.dsom,
    });
    this.unsub = this.dsom.cc.subscribeToChanges(() => view.update());

    const ppreviewContent = ppreviewContainer.querySelector<HTMLDivElement>(".dsom-pprint-content");
    if (!ppreviewContent) throw new Error("Could not find the print preview content element");
    this.ppreviewContent = ppreviewContent;
  }

  destroy() {
    this.unsub?.();
    if (this.divContainer) Fragile.DCGView.unmountFromNode(this.divContainer);
  }

  open() {
    if (!this.ppreviewContent) return;
    const dcgGraphElt = select<HTMLCanvasElement>("#calc-container canvas.dcg-graph-inner");
    const dcgExpPanelElt = select<HTMLDivElement>("#calc-container .dcg-exppanel-outer");

    // Copy DCG Graph
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = dcgGraphElt.width;
    canvas.height = dcgGraphElt.height;
    ctx && ctx.drawImage(dcgGraphElt, 0, 0);
    canvas.style.border = "2px solid #444";

    // Copy Expression Panel
    const expPanelPreview = dcgExpPanelElt.cloneNode(true) as HTMLDivElement;
    expPanelPreview.querySelectorAll(".dcg-selected").forEach((elt) => elt.classList.remove("dcg-selected"));
    expPanelPreview.style.display = "block";

    // Add them to the preview container
    this.ppreviewContent.innerHTML = "";
    this.ppreviewContent.appendChild(canvas);
    this.ppreviewContent.appendChild(expPanelPreview);

    // Show the preview
    document.documentElement.classList.add("print-preview");
  }

  close() {
    document.documentElement.classList.remove("print-preview");
    if (this.ppreviewContent) this.ppreviewContent.innerHTML = "";
  }
}
