import { select } from "#utils";
import { type CalcWithPatches, applyPatches } from "../globals/patches";
import window from "#globals";

const initSettings = {
  advancedStyling: true,
  border: false,
  showKeyboardShortcutsInTooltips: true,
  pasteGraphLink: true,
};

const CALC_TYPES = ["graphing", "geometry", "3d"] as const;

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
    const c3dContainer = select<HTMLDivElement>("#calc3d-container");

    const graphCalc = window.Desmos.GraphingCalculator(graphContainer, initSettings) as CalcWithPatches;
    const geoCalc = window.Desmos.Geometry(geoContainer, initSettings) as CalcWithPatches;
    const c3dCalc = window.Desmos.Calculator3D(c3dContainer, initSettings) as CalcWithPatches;

    applyPatches(graphCalc);
    applyPatches(geoCalc);

    this.calculators = [
      {
        type: "graphing",
        calc: graphCalc,
        container: graphContainer,
      },
      {
        type: "geometry",
        calc: geoCalc,
        container: geoContainer,
      },
      {
        type: "3d",
        calc: c3dCalc,
        container: c3dContainer,
      },
    ];

    this.selectCalculator("graphing");
  }

  destroy() {
    this.calculators.forEach((mc) => mc.calc.destroy());
    this.calculators = [];
    this.selected = undefined;
  }

  selectCalculator(type: MountedCalculator["type"]) {
    if (!CALC_TYPES.includes(type)) {
      throw Error(`${type} is not a valid calc. valid calc: ${CALC_TYPES.join(", ")}`);
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
