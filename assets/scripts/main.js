define("calc/setup_dom", ["jquery"], function ($) {
    return function () {
        $(".dcg-header.dcg-secure-header.dcg-header-desktop").css(
            "background-color",
            "#2a2a2a"
        );
        console.log("[main] dom setup done!");
    };
});

define("calc/init", ["calc/fix_calc", "calc/setup_dom"], function (
    fixCalc,
    setupDOM
) {
    return function () {
        fixCalc();
        setupDOM();
    };
});
