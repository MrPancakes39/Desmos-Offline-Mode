"use strict";

define("calc/play", ["htm", "dcgview", "touchtracking"], function (
    htm,
    dcgview,
    touch
) {
    // for debugging
    window.dcgview = dcgview;
    // setup
    const html = htm.bind(dcgview.createElement);
    const { Tooltip } = require("shared-components/tooltip");
    const { HeaderIcon } = require("calculator-shell/header-icon");
    const cst = dcgview.const;

    class Button extends dcgview.Class {
        template() {
            let x = html`
            <div style=${() => "display: flex;flex-direction: row;"}
                didMount=${function (elt) {
                    touch.monitor(elt);
                }}
            >
                <div role=${cst("button")}
                    class=${cst("hello-btn")}
                    onClick=${() => alert("Hello")}
                >
                    <${Tooltip} tooltip=${cst("Hello")} gravity=${cst("se")}>
                        <span>${cst("Hello")}</span>
                    </${Tooltip}>
                </div>
                <${HeaderIcon}
                    controller=${() => descont.headerController}
                    label=${() => Calc.controller.s("account-shell-label-help")}
                    tooltip=${() =>
                        Calc.controller.s("account-shell-label-help")}
                    icon=${cst("dcg-icon-question-sign")}
                    name=${cst("help")}
                    onTap=${function (t) {
                        console.log(t);
                    }}
                >
                </${HeaderIcon}>
            </div>
            `;
            console.log(x);
            return x;
        }
    }

    const domELT = document.querySelector("#dcg-header-container");
    console.log(Button, domELT);
    dcgview.mountToNode(Button, domELT);
});

define("calc/app", ["calc/load_api"], function () {
    // console.log(window.Calc);
    require("calc/play");
});
