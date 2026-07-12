import type { Calc } from "~/types/DSOM";
import type { ExpressionModel, ItemModel, TableModel } from "~/types/models";

export type SelectedItem =
  | ExpressionItem
  | SanitizedTableItem
  | SanitizedImageItem
  | SanitizedFolderItem
  | SanitizedTextItem
  | undefined;

type ExpressionItem = Omit<SanitizedExpressionItem, "fill" | "lines" | "points">;

type SanitizedExpressionItem = Omit<ExpressionModel, "controller" | "index" | "renderShell" | "isHiddenFromUI" | "rootViewNode"> & {
  playing?: boolean;
};
interface SanitizedTableItem {
  id: string;
  type: "table";
  columns: TableModel["columns"];
};
interface SanitizedImageItem {
  id: string;
  type: "image";
  hidden: boolean | undefined;
  secret: boolean | undefined;
};
interface SanitizedFolderItem {
  id: string;
  type: "folder";
  hidden: boolean | undefined;
  secret: boolean | undefined;
};
interface SanitizedTextItem {
  id: string;
  type: "text";
  secret: boolean | undefined;
};

export function applyPatches(Calc: Calc) {
  const colorRotation = [
    Desmos.Colors.RED,
    Desmos.Colors.BLUE,
    Desmos.Colors.GREEN,
    Desmos.Colors.PURPLE,
    Desmos.Colors.BLACK,
  ] as const;
  type DesmosColorRotation = (typeof colorRotation)[number];

  Calc.getNextColor = () => {
    const index = Calc.controller.listModel.colorIdx;
    // oxlint-disable-next-line typescript/no-non-null-assertion -- The color index is supplied by Desmos
    return colorRotation[index]!;
  };

  Calc.setNextColor = (color) => {
    if (color === undefined) return false;
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Runtime membership is checked below
    const colorIndex = colorRotation.indexOf(color as DesmosColorRotation);
    if (colorIndex < 0) {
      console.error(`${color} is not a valid color.`);
      return false;
    }
    Calc.controller.listModel.colorIdx = colorIndex;
    return true;
  };

  Calc.getSelectedItem = (): SelectedItem => {
    const item = Calc.controller.getSelectedItem();
    if (item === undefined) return undefined;

    const sanitized = sanitizeItem(item);
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
    const item = Calc.getSelectedItem();
    if (item === undefined) return false;
    if (item.type === "expression") {
      item.color = color;
      // TODO: Fix Later
      // @ts-expect-error At runtime setExpression works
      Calc.setExpression(item);
      return true;
    }
    return false;
  };
}

const sanitizeItem = function (item: ItemModel) {
  type TableColumn = TableModel["columns"] extends Array<infer T> ? T : never;
  const tableColumn = (column: TableColumn) => ({
    id: column.id,
    latex: column.latex ?? "",
    color: column.color ?? "#000000",
    hidden: column.hidden ?? false,
    pointStyle: column.pointStyle ?? "POINT",
    pointSize: column.pointSize ?? 1,
    pointOpacity: column.pointOpacity ?? 1,
    lineStyle: column.lineStyle ?? "SOLID",
    lineWidth: column.lineWidth ?? 1,
    lineOpacity: column.lineOpacity ?? 1,
    points: column.points ?? false,
    lines: column.lines ?? false,
    dragMode: column.dragMode ?? "AUTO",
    values: column.values?.slice() ?? [],
  });

  switch (item.type) {
    case "expression": {
      const modal = item;
      const tmp: SanitizedExpressionItem = {
        id: modal.id,
        type: modal.type ?? "expression",
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
        // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Keys are filtered by this property list
        if (prop in modal) tmp[prop as keySanitized] = modal[prop] as never;
      });
      if ("parametricDomain" in modal) {
        tmp.parametricDomain = {
          min: modal.parametricDomain.min,
          max: modal.parametricDomain.max,
        };
      }
      if ("polarDomain" in modal) {
        tmp.polarDomain = {
          min: modal.polarDomain.min,
          max: modal.polarDomain.max,
        };
      }
      if ("domain" in modal) {
        tmp.domain = {
          min: modal.domain.min,
          max: modal.domain.max,
        };
      }
      if (modal.slider !== undefined) {
        tmp.sliderBounds = {
          min: modal.slider.hardMin ? modal.slider.min : "",
          max: modal.slider.hardMax ? modal.slider.max : "",
          step: modal.slider.step,
        };
        tmp.playing = modal.slider.isPlaying;
      }
      return tmp;
    };
    case "table": {
      const modal = item;
      const tmp: SanitizedTableItem = {
        id: modal.id,
        type: modal.type,
        columns: modal.columns.map(tableColumn),
      };
      return tmp;
    };
    case "folder":
    case "image": {
      const modal = item;
      const tmp: SanitizedImageItem | SanitizedFolderItem = {
        id: modal.id,
        type: modal.type,
        hidden: modal.hidden,
        secret: modal.secret,
      };
      return tmp;
    };
    case "text": {
      const modal = item;
      const tmp: SanitizedTextItem = {
        id: modal.id,
        type: modal.type,
        secret: modal.secret,
      };
      return tmp;
    };
    default:
      throw new Error(`Unknown item type: ${item.type}`);
  }
};
