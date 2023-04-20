import { CalcWithPatches } from "../globals/Calc";

export function applyPatches(Calc: CalcWithPatches) {
  const colorRotation = [
    Desmos.Colors.RED,
    Desmos.Colors.BLUE,
    Desmos.Colors.GREEN,
    Desmos.Colors.PURPLE,
    Desmos.Colors.BLACK,
  ] as const;
  type DesmosColorRotation = typeof colorRotation[number];

  Calc.getNextColor = () => {
    let index = Calc.controller.listModel.colorIdx;
    return colorRotation[index];
  };

  Calc.setNextColor = (color) => {
    if (color === undefined) return false;
    const colorIndex = colorRotation.indexOf(color as DesmosColorRotation);
    if (colorIndex < 0) {
      console.error(`${color} is not a valid color.`);
      return false;
    }
    Calc.controller.listModel.colorIdx = colorIndex;
    return true;
  };
}
