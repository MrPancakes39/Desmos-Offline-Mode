import { Fragile } from "~/globals/window";
import type { DesmosOfflineMode } from "~/types/DSOM";
import { select } from "~/utils";

import { PPreviewContainer } from "./print-preview.component";

export default class PrintPreviewController implements TransparentController {
  unsub: (() => void) | undefined;
  divContainer: HTMLDivElement | undefined;
  ppreviewContent: HTMLDivElement | undefined;

  constructor(readonly dsom: DesmosOfflineMode) {}

  init() {
    const ppreviewContainer = select<HTMLDivElement>("#print-preview-container");
    this.divContainer = ppreviewContainer;

    const view = Fragile.DCGView.mountToNode(PPreviewContainer, this.divContainer, {
      dsom: () => this.dsom,
    });
    this.unsub = this.dsom.cc.subscribeToChanges(() => view.update());

    const ppreviewContent = ppreviewContainer.querySelector<HTMLDivElement>(".dsom-pprint-content");
    if (ppreviewContent === null) throw new Error("Could not find the print preview content element");
    this.ppreviewContent = ppreviewContent;
  }

  destroy() {
    this.unsub?.();
    if (this.divContainer !== undefined) {
      Fragile.DCGView.unmountFromNode(this.divContainer);
    }
  }

  open() {
    if (this.ppreviewContent === undefined) return;
    const dcgGraphElt = select<HTMLCanvasElement>("#calc-container canvas.dcg-graph-inner");
    const dcgExpPanelElt = select<HTMLDivElement>("#calc-container .dcg-exppanel-outer");

    // Copy DCG Graph
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = dcgGraphElt.width;
    canvas.height = dcgGraphElt.height;
    ctx?.drawImage(dcgGraphElt, 0, 0);
    canvas.style.border = "2px solid #444";

    // Copy Expression Panel
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Ignore
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
    if (this.ppreviewContent !== undefined) {
      this.ppreviewContent.innerHTML = "";
    }
  }
}
