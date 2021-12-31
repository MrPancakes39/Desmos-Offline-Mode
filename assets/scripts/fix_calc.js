define("calc/default_settings", [], function () {
    return {
        showGrid: true,
        showXAxis: true,
        showYAxis: true,
        xAxisStep: 0,
        yAxisStep: 0,
        xAxisMinorSubdivisions: 0,
        yAxisMinorSubdivisions: 0,
        xAxisArrowMode: "NONE",
        yAxisArrowMode: "NONE",
        xAxisLabel: "",
        yAxisLabel: "",
        xAxisNumbers: true,
        yAxisNumbers: true,
        polarMode: false,
        polarNumbers: true,
        degreeMode: false,
        randomSeed: "a2779c2a4fc02c679fa49e2297d6a930",
        restrictGridToFirstQuadrant: false,
        keypad: true,
        graphpaper: true,
        expressions: true,
        settingsMenu: true,
        zoomButtons: true,
        showResetButtonOnGraphpaper: false,
        expressionsTopbar: true,
        capExpressionSize: false,
        pointsOfInterest: true,
        trace: true,
        border: false,
        lockViewport: false,
        expressionsCollapsed: false,
        administerSecretFolders: false,
        advancedStyling: false,
        images: true,
        folders: true,
        notes: true,
        sliders: true,
        links: true,
        qwertyKeyboard: true,
        restrictedFunctions: false,
        forceEnableGeometryFunctions: false,
        pasteGraphLink: true,
        pasteTableData: true,
        clearIntoDegreeMode: false,
        autosize: true,
        plotSingleVariableImplicitEquations: true,
        plotImplicits: true,
        plotInequalities: true,
        colors: {
            RED: "#c74440",
            BLUE: "#2d70b3",
            GREEN: "#388c46",
            ORANGE: "#fa7e19",
            PURPLE: "#6042a6",
            BLACK: "#000000",
        },
        invertedColors: false,
        functionDefinition: true,
        projectorMode: false,
        decimalToFraction: true,
        fontSize: 16,
        language: "en",
        backgroundColor: "#fff",
        textColor: "#000",
        distributions: true,
        brailleMode: "none",
        sixKeyInput: false,
        brailleControls: true,
        zoomFit: true,
        forceLogModeRegressions: false,
    };
});

define("calc/private_props", ["jquery"], function ($) {
    return {
        colorRotation: [
            Desmos.Colors.RED,
            Desmos.Colors.BLUE,
            Desmos.Colors.GREEN,
            Desmos.Colors.PURPLE,
            Desmos.Colors.BLACK,
        ],

        toggleOptions: (item) => {
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
                throw new Error(
                    `"${item_type}" type doesn't have menu options.`
                );
            }
        },

        addItem: (type) => {
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
        },
    };
});

define("calc/fix_shortcuts", ["jquery", "calc/private_props"], function (
    $,
    props
) {
    return function () {
        $(document).keydown((e) => {
            e.superKey = e["originalEvent"].getModifierState("OS");

            const noMod = !e.ctrlKey && !e.shiftKey && !e.altKey && !e.superKey;
            const Ctrl = e.ctrlKey && !e.shiftKey && !e.altKey && !e.superKey;
            const Shift = !e.ctrlKey && e.shiftKey && !e.altKey && !e.superKey;
            const Alt = !e.ctrlKey && !e.shiftKey && e.altKey && !e.superKey;
            const Super = !e.ctrlKey && !e.shiftKey && !e.altKey && e.superKey;
            const CtrlShift = e.ctrlKey && e.shiftKey && !e.altKey && !e.superKey; // prettier-ignore
            const CtrlAlt = e.ctrlKey && !e.shiftKey && e.altKey && !e.superKey;
            const ShiftAlt = !e.ctrlKey && e.shiftKey && e.altKey && !e.superKey; // prettier-ignore
            const CtrlAltShift = e.ctrlKey && e.shiftKey && e.altKey && !e.superKey; // prettier-ignore

            // Close a dialog
            if (noMod && e.code === "Escape") {
                const dcg_elt = $("#dcg-modal-container .dcg-icon-remove");
                if (dcg_elt.length) {
                    dcg_elt.trigger("dcg-tap");
                }
                const alert_elt = $(".dcg-alert-container");
                if (alert_elt.length) {
                    alert_elt.remove();
                }
                return;
            }
            // New Graph
            if (Ctrl && e.code === "KeyN") {
                e.preventDefault();
                $(".align-left-container .dcg-icon.dcg-icon-plus").click();
                return;
            }
            // Open a Graph
            if (Ctrl && e.code === "KeyO") {
                e.preventDefault();
                $(".dcg-action-open").click();
                return;
            }
            // Save a Graph
            if (Ctrl && e.code === "KeyS") {
                e.preventDefault();
                $(".save-btn-container").click();
                return;
            }
            // Show or Hide the Expression List
            if (ShiftAlt && e.code === "KeyE") {
                e.preventDefault();
                const t = Calc._calc.controller;
                const expVisible = t.layoutModel.expressionsVisible;
                if (expVisible) {
                    t.dispatch({
                        type: "hide-expressions-list",
                        focusShowIcon: !1,
                    });
                } else {
                    t.dispatch({
                        type: "show-expressions-list",
                        focusShowIcon: !1,
                    });
                }
                return;
            }
            // Focus the Expression List
            if (CtrlAlt && e.code === "KeyE") {
                Calc.focusFirstExpression();
                return;
            }
            // Toggle Options for the Focused Expression
            if (CtrlShift && e.code === "KeyO") {
                let t = Calc._calc.controller;
                let item = t.getSelectedItem();
                if (
                    item &&
                    (item.type === "expression" || item.type === "image")
                )
                    props.toggleOptions(item);
                return;
            }
            // Delete the Focused Expression
            if (CtrlShift && e.code === "KeyD") {
                Calc.removeSelected();
                return;
            }
            // Add an Expression
            if (CtrlAlt && e.code === "KeyX") {
                props.addItem("expression");
                return;
            }
            // Add a Note
            if (CtrlAlt && e.code === "KeyO") {
                props.addItem("note");
                return;
            }
            // Collapse / Expand Selected Folder
            if (Alt && e.code === "ArrowUp") {
                let t = Calc._calc.controller;
                let item = t.getSelectedItem();
                if (item && item.type === "folder") {
                    item.model = t.getItemModel(item.id);
                    t.dispatch({
                        type: "set-folder-collapsed",
                        id: item.id,
                        isCollapsed: !item.model.collapsed,
                    });
                }
            }
            // Add a Folder
            if (CtrlAlt && e.code === "KeyF") {
                props.addItem("folder");
                return;
            }
            // Add a Note
            if (CtrlAlt && e.code === "KeyI") {
                props.addItem("image");
                return;
            }
            // Add a Table
            if (CtrlAlt && e.code === "KeyT") {
                props.addItem("table");
                return;
            }
            // Undo
            if (Ctrl && e.code === "KeyZ") {
                const t = Calc._calc.controller;
                if (t.hasVisibleAndUndoableToast()) {
                    t.toastUndo();
                } else {
                    Calc.undo();
                }
                return;
            }
            // Redo
            if (
                (CtrlShift && e.code === "KeyZ") ||
                (Ctrl && e.code === "KeyY")
            ) {
                Calc.redo();
                return;
            }
            // Turn Edit List Mode On or Off
            if (CtrlAlt && e.code === "KeyD") {
                let t = Calc._calc.controller;
                let mode = !t.isInEditListMode();
                t.dispatch({
                    type: "set-edit-list-mode",
                    isEditListMode: mode,
                    focusExpressionList: !0,
                });
                return;
            }
            // Open or Close the Graph Settings Menu
            if (CtrlAlt && e.code === "KeyG") {
                Calc._calc.controller.dispatch({
                    type: "toggle-graph-settings",
                    focusOnOpen: !0,
                });
                return;
            }
            // Open or Close the Help Menu
            if (CtrlAlt && e.code === "KeyH") {
                $(".dcg-help-btn").trigger("dcg-tap");
                return;
            }
        });
    };
});

define("calc/fix_calc", [
    "calc/default_settings",
    "calc/private_props",
    "calc/fix_shortcuts",
], function (settings, props, fixShortcuts) {
    return function () {
        // Fix Calc Settings
        Calc.updateSettings(settings);
        Calc.newRandomSeed();
        Calc.setBlank();
        Calc.focusFirstExpression();

        Calc.getSelectedItem = () => {
            let e = Calc._calc.controller.getSelectedItem();
            if (e) {
                let i = Calc._santizer.sanitizeItem(e);
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
            return props.colorRotation[index];
        };

        Calc.setNextColor = (color) => {
            if (!props.colorRotation.includes(color)) {
                throw new Error(`${color} is not a valid color.`);
            }
            let t = Calc._calc.controller;
            let id = props.colorRotation.indexOf(color);
            t.listModel.colorIdx = id;
        };

        Calc.setItemColor = (color) => {
            let e = Calc.getSelectedItem();
            if (typeof e === "undefined") return;
            e.color = color;
            if (e.type === "expression" || e.type === "table")
                Calc.setExpression(e);
        };

        fixShortcuts();
        console.log("[fix_calc] calc api fixed!");
    };
});
