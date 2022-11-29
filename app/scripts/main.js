"use strict";

// defines window.IS_BROWSER constant
Object.defineProperty(window, "IS_BROWSER", {
    value: window.__TAURI__ === undefined,
    writable: false,
});

define("calc/build", [
    "main/instantiate-top-level-components",
    "text!example_graphs",
], function (init_components, example_graphs) {
    let seed = crypto.randomUUID().split("-").join("");
    // temporary exposer
    window.descont = init_components.default({
        seed: seed,
        exampleGraphsRaw: example_graphs,
        calcOptions: { pasteGraphLink: !0 },
    });

    window.Calc = descont.Calc;
});

define("calc/app", ["api/calculator", "calc/build"], function () {
    console.log(window.Calc);
});
