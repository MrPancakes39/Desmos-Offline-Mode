import { ItemModel, TableModel } from "../globals/models";
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

const sanitizeItem = function (item: ItemModel) {
  type TableColumn = TableModel["columns"] extends Array<infer T> ? T : never;
  const tableColumn = (column: TableColumn) => {
    return {
      id: column.id,
      latex: column.latex,
      color: column.color,
      hidden: column.hidden,
      pointStyle: column.pointStyle,
      pointSize: column.pointSize,
      pointOpacity: column.pointOpacity,
      lineStyle: column.lineStyle,
      lineWidth: column.lineWidth,
      lineOpacity: column.lineOpacity,
      points: column.points,
      lines: column.lines,
      dragMode: column.dragMode,
      values: column.values?.slice(),
    };
  };

  switch (item.type) {
    case "expression":
      return (function (modal) {
        const tmp: Record<string, any> = {
          id: modal.id,
          type: modal.type,
        };
        type keyModal = keyof typeof modal;
        const properties: keyModal[] = [
          "latex",
          "color",
          "lineStyle",
          "lineWidth",
          "lineOpacity",
          "pointStyle",
          "pointSize",
          "pointOpacity",
          "points",
          "lines",
          "fill",
          "fillOpacity",
          "hidden",
          "secret",
          "dragMode",
          "label",
          "showLabel",
          "labelSize",
          "labelOrientation",
          "interactiveLabel",
          "readonly",
        ];
        properties.forEach((prop) => {
          if (prop in modal) tmp[prop] = modal[prop];
        });
        if ("parametricDomain" in modal) {
          tmp.parametricDomain = {
            min: modal.parametricDomain?.min,
            max: modal.parametricDomain?.max,
          };
        }
        if ("polarDomain" in modal) {
          tmp.polarDomain = {
            min: modal.polarDomain?.min,
            max: modal.polarDomain?.max,
          };
        }
        if ("domain" in modal) {
          tmp.domain = {
            min: modal.domain?.min,
            max: modal.domain?.max,
          };
        }
        if (modal.slider) {
          if (modal.slider.hardMin) {
            tmp.sliderBounds = tmp.sliderBounds || {};
            tmp.sliderBounds.min = modal.slider.min;
          }
          if (modal.slider.hardMax) {
            tmp.sliderBounds = tmp.sliderBounds || {};
            tmp.sliderBounds.min = modal.slider.max;
          }
          if (modal.slider.step) {
            tmp.sliderBounds = tmp.sliderBounds || {};
            tmp.sliderBounds.step = modal.slider.step;
          }
          tmp.playing = modal.slider.isPlaying;
        }
        return tmp;
      })(item);
    case "table":
      return (function (modal) {
        return {
          id: modal.id,
          type: modal.type,
          columns: modal.columns.map(tableColumn),
        };
      })(item);
    case "folder":
    case "image":
      return (function (modal) {
        return {
          id: modal.id,
          type: modal.type,
          hidden: modal.hidden,
          secret: modal.secret,
        };
      })(item);
    case "text":
      return (function (modal) {
        return {
          id: modal.id,
          type: modal.type,
          secret: modal.secret,
        };
      })(item);
    default:
      return item;
  }
};
