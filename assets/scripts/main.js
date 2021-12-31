define("calc/init", ["calc/fix_calc"], function (fixCalc) {
    return function () {
        fixCalc();
    };
});
