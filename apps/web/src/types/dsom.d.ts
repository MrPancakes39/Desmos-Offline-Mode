declare namespace Desmos {
  /**
   * Creates a 3d calculator object to control the calculator embedded in the DOM element specified by element.
   */
  export function Calculator3D(...params: Parameters<(typeof Desmos)["GraphingCalculator"]>): Calculator;
  export function Geometry(...params: Parameters<(typeof Desmos)["GraphingCalculator"]>): Calculator;

  interface TapEvent extends JQuery.TriggeredEvent {
    type: "dcg-tap";
    preventTap: () => void;
    wasLongheld: () => boolean;
    isDefaultPrevented: () => boolean;
    originalEvent: JQuery.Event;
  }
}

interface TransparentController {
  init: () => void;
  destroy: () => void;
}
