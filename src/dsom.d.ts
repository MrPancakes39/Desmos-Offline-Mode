declare namespace Desmos {
  /**
   * Creates a 3d calculator object to control the calculator embedded in the DOM element specified by element.
   *
   * If API didn't fetch the 3D API then this function throws an Error that the API is disabled.
   */
  export function Graphing3DCalculator(...params: Parameters<(typeof Desmos)["GraphingCalculator"]>): Desmos.Calculator;
  export function Geometry(...params: Parameters<(typeof Desmos)["GraphingCalculator"]>): Desmos.Calculator;
}

interface TransparentController {
  init: () => void;
  destroy: () => void;
}
