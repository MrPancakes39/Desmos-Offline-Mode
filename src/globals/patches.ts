import { Calc as CalcType } from "./Calc";
import { ExpressionModel, ItemModel, TableModel } from ".";

type DesmosColorNames = keyof typeof Desmos.Colors;
type DesmosColorsValues = (typeof Desmos.Colors)[DesmosColorNames];

export type CalcWithPatches = CalcType & {
  getSelectedItem: () => SelectedItem;
  setItemColor: (color?: string) => boolean;
  getNextColor: () => DesmosColorsValues;
  setNextColor: (color?: string) => boolean;
};

export function applyPatches(Calc: CalcWithPatches) {
  const colorRotation = [
    Desmos.Colors.RED,
    Desmos.Colors.BLUE,
    Desmos.Colors.GREEN,
    Desmos.Colors.PURPLE,
    Desmos.Colors.BLACK,
  ] as const;
  type DesmosColorRotation = (typeof colorRotation)[number];

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

  Calc.getSelectedItem = (): SelectedItem => {
    let item = Calc.controller.getSelectedItem();
    if (item === undefined) return undefined;

    let sanitized = sanitizeItem(item);
    if (sanitized.type === "expression") {
      delete sanitized.fill;
      delete sanitized.lines;
      delete sanitized.points;
      sanitized.domain = { min: "0", max: "1" };
    }
    if (sanitized.type === "table") {
      sanitized.columns.pop();
      sanitized.columns.forEach((column) => column.values?.pop());
    }
    return sanitized;
  };

  Calc.setItemColor = (color) => {
    if (color === undefined) return false;
    let item = Calc.getSelectedItem();
    if (item === undefined) return false;
    if (item.type === "expression") {
      item.color = color;
      // TODO: Fix Later
      // @ts-expect-error
      Calc.setExpression(item);
      return true;
    }
    return false;
  };
}

type ExpressionItem = Omit<SanitizedExpressionItem, "fill" | "lines" | "points">;
type SelectedItem =
  | ExpressionItem
  | SanitizedTableItem
  | SanitizedImageItem
  | SanitizedFolderItem
  | SanitizedTextItem
  | undefined;

type SanitizedExpressionItem = Omit<ExpressionModel, "controller" | "index"> & {
  playing?: boolean;
};
type SanitizedTableItem = {
  id: string;
  type: "table";
  columns: TableModel["columns"];
};
type SanitizedImageItem = {
  id: string;
  type: "image";
  hidden: boolean | undefined;
  secret: boolean | undefined;
};
type SanitizedFolderItem = {
  id: string;
  type: "folder";
  hidden: boolean | undefined;
  secret: boolean | undefined;
};
type SanitizedTextItem = {
  id: string;
  type: "text";
  secret: boolean | undefined;
};

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
        const tmp: SanitizedExpressionItem = {
          id: modal.id,
          type: modal.type,
        };
        type keyModal = keyof typeof modal;
        type keySanitized = keyof SanitizedExpressionItem;
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
          // TODO: Fix???
          if (prop in modal) tmp[prop as keySanitized] = modal[prop] as never;
        });
        if ("parametricDomain" in modal && modal.parametricDomain) {
          tmp.parametricDomain = {
            min: modal.parametricDomain.min,
            max: modal.parametricDomain.max,
          };
        }
        if ("polarDomain" in modal && modal.polarDomain) {
          tmp.polarDomain = {
            min: modal.polarDomain.min,
            max: modal.polarDomain.max,
          };
        }
        if ("domain" in modal && modal.domain) {
          tmp.domain = {
            min: modal.domain.min,
            max: modal.domain.max,
          };
        }
        if (modal.slider) {
          tmp.sliderBounds = {
            min: modal.slider.hardMin ? modal.slider.min : "",
            max: modal.slider.hardMax ? modal.slider.max : "",
            step: modal.slider.step,
          };
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
        } as SanitizedTableItem;
      })(item);
    case "folder":
    case "image":
      return (function (modal) {
        return {
          id: modal.id,
          type: modal.type,
          hidden: modal.hidden,
          secret: modal.secret,
        } as SanitizedImageItem | SanitizedFolderItem;
      })(item);
    case "text":
      return (function (modal) {
        return {
          id: modal.id,
          type: modal.type,
          secret: modal.secret,
        } as SanitizedTextItem;
      })(item);
    default:
      return item as never;
  }
};
