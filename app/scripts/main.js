"use strict";

define("calc/header", ["htm", "dcgview", "touchtracking"], function (
    htm,
    n,
    touch
) {
    const html = htm.bind(n.createElement);
    const { addSVGLogo } = require("frontpage/desmos-svg-logo").DesmosSVGLogo
        .prototype;

    class Header extends n.Class {
        template() {
            return html`
                <div
                    class=${n.const("dcg-header")}
                    didMount=${function (elt) {
                        touch.monitor(elt);
                    }}
                >
                    <div class=${n.const("align-left-container")}></div>
                    <div class=${n.const("align-center-container")}>
                        <a
                            href=${n.const("https://www.desmos.com/")}
                            target=${n.const("_blank")}
                            class=${n.const("dcg-home-link")}
                        >
                            <span
                                class=${n.const("desmos-logo")}
                                onMount=${addSVGLogo}
                            ></span>
                        </a>
                    </div>
                    <div class=${n.const("align-right-container")}></div>
                </div>
            `;
        }
    }

    n.mountToNode(Header, document.querySelector("#dcg-header-container"));
});

define("calc/app", ["calc/load_api"], function (calc) {
    return new Promise((resolve) => {
        require("calc/header");
        resolve(calc);
    });
});
