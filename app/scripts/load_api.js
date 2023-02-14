define("calc/private/toggle-options", [], function () {
    return (item) => {
        let t = Calc._calc.controller;
        let item_modal = t.getItemModel(item.id);
        let item_type = item.sliderExists ? "slider" : item.type;
        if (
            item_type === "expression" ||
            item_type === "image" ||
            item_type === "slider"
        ) {
            t.dispatch({
                type: "toggle-item-settings-menu",
                menu: {
                    type: item_type,
                    model: item_modal,
                    focusFirstOption: !1,
                },
            });
        } else {
            throw new Error(`"${item_type}" type doesn't have menu options.`);
        }
    };
});

define("calc/private/add-item", ["jquery"], function ($) {
    return (type) => {
        const validTypes = [
            "expression",
            "table",
            "note",
            "text",
            "folder",
            "image",
            "simulation",
        ];
        if (!validTypes.includes(type)) {
            throw new Error(`${type} is not a valid type.`);
        }
        let e = Calc._calc.controller;
        if (type !== "image") {
            let t = type === "note" ? "new-text" : `new-${type}`;
            e.dispatch({ type: t });
        } else {
            const imageInput = $(
                `<input type="file" accept="image/*" style="display: none">`
            );
            imageInput
                .on("change", () => {
                    const fileList = imageInput.prop("files");
                    e.dispatch({ type: "new-images", files: fileList });
                })
                .click();
        }
    };
});

/**
 * "api/calculator" is used to load the DesmosAPI in as Desmos global object hasn't been created yet.
 */
define("calc/load_api", ["api/calculator"], function ({ DesmosAPI }) {
    const graphContainer = document.getElementById("graph-container");
    const Calc = DesmosAPI.GraphingCalculator(graphContainer);

    const sanitizer = require("graphing-calc/api/sanitize-expression");
    const colorRotation = [
        Desmos.Colors.RED,
        Desmos.Colors.BLUE,
        Desmos.Colors.GREEN,
        Desmos.Colors.PURPLE,
        Desmos.Colors.BLACK,
    ];

    Calc.getSelectedItem = () => {
        let e = Calc._calc.controller.getSelectedItem();
        if (e) {
            let i = sanitizer.sanitizeItem(e);
            if (i.type === "expression") {
                delete i.fill;
                delete i.lines;
                delete i.points;
                i.domain = { min: "0", max: "1" };
            }
            if (i.type === "table") {
                i.columns.pop();
                i.columns.forEach((v) => v.values.pop());
            }
            return i;
        }
    };

    Calc.getNextColor = () => {
        let t = Calc._calc.controller;
        let index = t.listModel.colorIdx;
        return colorRotation[index];
    };

    Calc.printNextColor = () => {
        let colors = Desmos.Colors;
        let next = Calc.getNextColor();
        return Object.keys(colors).find((key) => colors[key] === next);
    };

    Calc.setNextColor = (color) => {
        if (!colorRotation.includes(color)) {
            throw new Error(`${color} is not a valid color.`);
        }
        let t = Calc._calc.controller;
        let id = colorRotation.indexOf(color);
        t.listModel.colorIdx = id;
    };

    Calc.setItemColor = (color) => {
        let e = Calc.getSelectedItem();
        if (typeof e === "undefined") return;
        e.color = color;
        if (e.type === "expression" || e.type === "table")
            Calc.setExpression(e);
    };

    return Calc;
});
