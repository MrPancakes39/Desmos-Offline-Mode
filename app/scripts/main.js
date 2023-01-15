"use strict";

define("calc/header", ["htm", "dcgview"], function (htm, n) {
    const html = htm.bind(n.createElement);
    window.n = n;

    class Header extends n.Class {
        template() {
            return html`
                <div class=${n.const("dcg-header")}>
                    <div class=${n.const("align-left-container")}></div>
                    <div class=${n.const("align-center-container")}></div>
                    <div class=${n.const("align-right-container")}></div>
                </div>
            `;
        }
    }

    const headerContainer = document.querySelector("#dcg-header-container");
    n.mountToNode(Header, headerContainer);
});

define("calc/app", ["calc/load_api", "calc/header"], function () {
    console.log(window.Calc);
});
