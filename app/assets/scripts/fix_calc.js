function fixCalc() {
    let default_settings = {
        __observers: {},
        __eventObservers: {},
        __oldProperties: { randomSeed: 'da01d19b8ec6413cf2839e412c8ee61a' },
        __propertyComparators: {},
        guid: 'guid_933076_1632673458878_11',
        showGrid: true,
        showXAxis: true,
        showYAxis: true,
        xAxisStep: 0,
        yAxisStep: 0,
        xAxisMinorSubdivisions: 0,
        yAxisMinorSubdivisions: 0,
        xAxisArrowMode: 'NONE',
        yAxisArrowMode: 'NONE',
        xAxisLabel: '',
        yAxisLabel: '',
        xAxisNumbers: true,
        yAxisNumbers: true,
        polarMode: false,
        polarNumbers: true,
        degreeMode: false,
        randomSeed: 'a2779c2a4fc02c679fa49e2297d6a930',
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
            RED: '#c74440',
            BLUE: '#2d70b3',
            GREEN: '#388c46',
            ORANGE: '#fa7e19',
            PURPLE: '#6042a6',
            BLACK: '#000000'
        },
        invertedColors: false,
        functionDefinition: true,
        projectorMode: false,
        decimalToFraction: true,
        fontSize: 16,
        language: 'en',
        backgroundColor: '#fff',
        textColor: '#000',
        distributions: true,
        brailleMode: 'none',
        sixKeyInput: false,
        brailleControls: true,
        zoomFit: true,
        forceLogModeRegressions: false,
        actions: 'auto'
    };

    // Fix Calc Settings
    Calc.default_settings = default_settings;
    Calc.updateSettings(default_settings);
    Calc.newRandomSeed();

    Calc.lastSelectedId = () => Calc._calc.controller.__lastSelectedId;

    Calc.getSelectedItem = () => {
        let e = Calc._calc.controller.getSelectedItem();
        if (typeof e === "undefined")
            return;
        return Calc._santizer.sanitizeItem(e);
    }

    Calc.colorRotation = [Desmos.Colors.RED, Desmos.Colors.BLUE, Desmos.Colors.GREEN, Desmos.Colors.PURPLE, Desmos.Colors.BLACK];

    Calc.setNextColor = (color) => {
        let validColors = Calc.colorRotation;
        if (!validColors.includes(color)) {
            console.error(`${color} is not a valid color.`);
            return;
        }
        let t = Calc._calc.controller;
        let id = validColors.indexOf(color);
        t.listModel.colorIdx = id;
    }

    Calc.setSelectedItemColor = (color) => {
        let e = Calc.getSelectedItem();
        if (typeof e === "undefined")
            return;
        e.color = color;
        if (e.type === "expression" || e.type === "table")
            Calc.setExpression(e);
    }

    console.log("[fix_calc] calc api fixed!");
}