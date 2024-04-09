import { select } from "#utils";
import { type CalcWithPatches, applyPatches } from "../globals/patches";
import window from "#globals";

const initSettings = {
  advancedStyling: true,
  border: false,
  showKeyboardShortcutsInTooltips: true,
  pasteGraphLink: true,
};

const CALC_TYPES = ["graph", "geometry"] as const;

type MountedCalculator = {
  type: (typeof CALC_TYPES)[number];
  calc: CalcWithPatches;
  container: HTMLDivElement;
};

export default class SwitcherController implements TransparentController {
  calculators: MountedCalculator[] = [];
  selected: MountedCalculator | undefined;

  init() {
    const graphContainer = select<HTMLDivElement>("#graph-container");
    const geoContainer = select<HTMLDivElement>("#geometry-container");

    const graphCalc = window.Desmos.GraphingCalculator(graphContainer, initSettings) as CalcWithPatches;
    const geoCalc = window.Desmos.Geometry(geoContainer, initSettings) as CalcWithPatches;

    applyPatches(graphCalc);
    applyPatches(geoCalc);

    this.calculators = [
      {
        type: "graph",
        calc: graphCalc,
        container: graphContainer,
      },
      {
        type: "geometry",
        calc: geoCalc,
        container: geoContainer,
      },
    ];

    this.selectCalculator("graph");
    // export const Calc = window.Desmos.Graphing3DCalculator(graphContainer) as CalcWithPatches;
  }

  destroy() {
    this.calculators.forEach((mc) => mc.calc.destroy());
    this.calculators = [];
    this.selected = undefined;
  }

  selectCalculator(type: MountedCalculator["type"]) {
    if (!CALC_TYPES.includes(type)) {
      throw Error(`${type} is not a valid calc. valid calc: ${CALC_TYPES}`);
    }

    this.calculators.forEach((mc) => {
      if (mc.type !== type) {
        mc.container.style.display = "none";
      } else {
        mc.container.style.display = "block";
        window.Calc = mc.calc;
        this.selected = mc;
      }
    });
  }
}
