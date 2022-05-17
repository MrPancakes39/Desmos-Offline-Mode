define("calc/make_config", [], function () {
    return function () {
        let config = {};
        config["title"] = Calc.header.title;
        config["state"] = Calc.getState();
        return config;
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
            if (item_type === "expression" || item_type === "image" || item_type === "slider") {
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
                const imageInput = $(`<input type="file" accept="image/*" style="display: none">`);
                imageInput
                    .on("change", () => {
                        const fileList = imageInput.prop("files");
                        e.dispatch({ type: "new-images", files: fileList });
                    })
                    .click();
            }
        },
        sanitizer: Desmos.require("graphing-calc/api/sanitize-expression"),
    };
});

define("calc/fix_shortcuts", ["jquery", "calc/private_props"], function ($, props) {
    return function () {
        $(document).keydown((e) => {
            e.superKey = e["originalEvent"].getModifierState("OS");

            let comb = "";
            comb += e.superKey ? "Super+" : "";
            comb += e.ctrlKey ? "Ctrl+" : "";
            comb += e.shiftKey ? "Shift+" : "";
            comb += e.altKey ? "Alt+" : "";
            comb += e.code;

            let keyHandler = {
                // Close a dialog
                Escape: () => {
                    const dcg_elt = $("#dcg-modal-container .dcg-icon-remove");
                    if (dcg_elt.length) {
                        dcg_elt.trigger("dcg-tap");
                    }
                    const alert_elt = $(".dcg-alert-container");
                    if (alert_elt.length) {
                        alert_elt.remove();
                    }
                },
                // Rename a Graph
                F2: () => {
                    Calc.header.clickTitle();
                },
                // New Graph
                "Ctrl+KeyN": () => {
                    e.preventDefault();
                    $(".align-left-container .dcg-icon.dcg-icon-plus").click();
                },
                // Open a Graph
                "Ctrl+KeyO": () => {
                    e.preventDefault();
                    $(".dcg-action-open").click();
                },
                // Save a Graph
                "Ctrl+KeyS": () => {
                    e.preventDefault();
                    $(".save-btn-container").click();
                },
                // Show or Hide the Expression List
                "Shift+Alt+KeyE": () => {
                    e.preventDefault();
                    const t = Calc._calc.controller;
                    const expVisible = t.layoutModel.expressionsVisible;
                    t.dispatch({
                        type: expVisible ? "hide-expressions-list" : "show-expressions-list",
                        focusShowIcon: !1,
                    });
                },
                // Focus the Expression List
                "Ctrl+Alt+KeyE": () => {
                    Calc.focusFirstExpression();
                },
                // Toggle Options for the Focused Expression
                "Ctrl+Shift+KeyO": () => {
                    e.preventDefault();
                    let t = Calc._calc.controller;
                    let item = t.getSelectedItem();
                    if (item && (item.type === "expression" || item.type === "image"))
                        props.toggleOptions(item);
                },
                // Delete the Focused Expression
                "Ctrl+Shift+KeyD": () => {
                    Calc.removeSelected();
                },
                // Add an Expression
                "Ctrl+Alt+KeyX": () => {
                    props.addItem("expression");
                },
                // Add a Note
                "Ctrl+Alt+KeyO": () => {
                    props.addItem("note");
                },
                // Collapse / Expand Selected Folder
                "Alt+ArrowUp": () => {
                    let t = Calc._calc.controller;
                    let item = t.getSelectedItem();
                    if (item && item.type === "folder") {
                        console.log(item);
                        item.model = t.getItemModel(item.id);
                        t.dispatch({
                            type: "set-folder-collapsed",
                            id: item.id,
                            isCollapsed: !item.model.collapsed,
                        });
                    }
                },
                // Add a Folder
                "Ctrl+Alt+KeyF": () => {
                    props.addItem("folder");
                },
                // Add an Image
                "Ctrl+Alt+KeyI": () => {
                    props.addItem("image");
                },
                // Add a Table
                "Ctrl+Alt+KeyT": () => {
                    props.addItem("table");
                },
                // Undo
                "Ctrl+KeyZ": () => {
                    const t = Calc._calc.controller;
                    if (t.hasVisibleAndUndoableToast()) {
                        t.toastUndo();
                    } else {
                        Calc.undo();
                    }
                },
                // Redo
                "Ctrl+Shift+KeyZ": () => {
                    Calc.redo();
                },
                "Ctrl+KeyY": () => keyHandler["Ctrl+Shift+KeyZ"](),
                // Turn Edit List Mode On or Off
                "Ctrl+Alt+KeyD": () => {
                    let t = Calc._calc.controller;
                    let mode = !t.isInEditListMode();
                    t.dispatch({
                        type: "set-edit-list-mode",
                        isEditListMode: mode,
                        focusExpressionList: !0,
                    });
                },
                // Open or Close the Graph Settings Menu
                "Ctrl+Alt+KeyG": () => {
                    Calc._calc.controller.dispatch({
                        type: "toggle-graph-settings",
                        focusOnOpen: !0,
                    });
                },
                // Open or Close the Help Menu
                "Ctrl+Alt+KeyH": () => {
                    $(".dcg-help-btn").trigger("dcg-tap");
                },
            };

            if (comb in keyHandler) keyHandler[comb]();
        });
    };
});

define("calc/custom_methods", ["calc/private_props"], function (props) {
    return function () {
        Calc.getSelectedItem = () => {
            let e = Calc._calc.controller.getSelectedItem();
            if (e) {
                let i = props.sanitizer.sanitizeItem(e);
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
            if (e.type === "expression" || e.type === "table") Calc.setExpression(e);
        };
    };
});

define("calc/header", [], function () {
    return function () {
        let e = {};
        e.rootElt = document.querySelector(".dcg-header");
        let titleDOM = e.rootElt.querySelector(".dcg-config-name");
        Object.defineProperty(e, "title", {
            get() {
                return titleDOM.innerText;
            },
            set(value) {
                titleDOM.innerText = value;
            },
            enumerable: true,
        });
        e.clickTitle = () => titleDOM.click();
        Calc.header = e;
    };
});

define("calc/fetch_lang", [], function () {
    return async function (lang) {
        let validLangs = [
            "en",
            "ar",
            "pl",
            "el",
            "da",
            "zh-TW",
            "vi",
            "it",
            "id",
            "is",
            "cs",
            "haw",
            "ka",
            "ko",
            "ru",
            "th",
            "pt-BR",
            "en-GB",
            "hy-AM",
            "hu",
            "zh-CN",
            "ca",
            "tr",
            "fr",
            "es-ES",
            "sv-SE",
            "uk",
            "nl",
            "de",
            "hi",
            "ja",
            "no",
            "pt-PT",
        ];
        if (!validLangs.includes(lang)) {
            console.warn(`${lang} is not an available language.`);
            return false;
        }
        if (!Desmos.supportedLanguages.includes(lang)) {
            let res = await fetch(`/lang/${lang}.ftl`);
            let ftl = await res.json();
            Object.assign(Desmos.localeData, ftl);
            Desmos.supportedLanguages.push(lang);
        }
        return true;
    };
});

define("calc/set_lang", ["@fluent/bundle", "text!l10n/all-en-strings.ftl"], function (
    fluent,
    en_ftl
) {
    return function (lang) {
        if (!Desmos.supportedLanguages.includes(lang)) {
            console.warn(`${lang} is not supported.`);
            return;
        }
        let resource;
        if (lang != "en") {
            resource = new fluent.FluentResource(Desmos.localeData[lang]);
        } else {
            resource = new fluent.FluentResource(en_ftl);
        }
        let bundle = new fluent.FluentBundle(lang);
        bundle.addResource(resource);
        const createDictionaryLookupFunction = function (msg, format) {
            let str = bundle.getMessage(msg);
            if (str.value) return bundle.formatPattern(str.value, format);
            return str.value;
        };
        Calc._calc.controller.s = createDictionaryLookupFunction;
    };
});

define("calc/update_lang", ["calc/fetch_lang", "calc/set_lang"], function (
    fetchLanguage,
    setLanguage
) {
    return function (lang) {
        fetchLanguage(lang).then((success) => {
            if (success) {
                setLanguage(lang);
                Calc.updateSettings({ language: lang });
            }
        });
    };
});

define("calc/fix_calc", [
    "calc/fix_shortcuts",
    "calc/custom_methods",
    "calc/fetch_lang",
    "calc/update_lang",
], function (fixShortcuts, customMethods, fetchLanguage, fetchAndSetLanguage) {
    return function () {
        // Generate Calc
        let container = document.querySelector("#graph-container .dcg-wrapper");
        container.innerHTML = "";
        window.Calc = Desmos.GraphingCalculator(container);

        // Fix Calc Settings
        Calc.newRandomSeed();
        Calc.setBlank();
        Calc.focusFirstExpression();

        customMethods();
        fixShortcuts();
        Desmos.supportedLanguages = ["en"];
        Desmos.localeData = {};
        Calc.fetchLanguage = fetchLanguage;
        Calc._calc.controller.fetchAndSetLanguage = fetchAndSetLanguage;
        console.log("[fix_calc] calc api fixed!");
    };
});
