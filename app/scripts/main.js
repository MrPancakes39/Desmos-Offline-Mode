"use strict";

define("calc/play", ["htm", "dcgview"], function (htm, dcgview) {
    // for debugging
    window.dcgview = dcgview;
    // setup
    const html = htm.bind(dcgview.createElement);
    const { Tooltip } = require("shared-components/tooltip");
    const cst = dcgview.const;

    class Button extends dcgview.Class {
        template() {
            return html`
            <div role=${cst("button")} class=${cst("hello-btn")}>
                <${Tooltip}>
                    <span>${cst("Hello")}</span>
                </${Tooltip}>
            </div>
            `;
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
