// creates the dcg elements for the app
define("calc/setup_dom", [
    "jquery",
    "dcgview",
    "shared-components/tooltip",
    "calc/add_alert",
    "calc/make_config",
], function ($, n, t, addAlert, makeConfig) {
    return function () {
        const fDown = new FileDownloader();

        // change header's background color
        $(".dcg-header").css("background-color", "#2a2a2a");

        // create left-container elements
        const left_container = $(".align-left-container")[0];
        const left_elts = n.createClass({
            template: function () {
                return n.createElement(
                    "div",
                    {
                        class: n.const("replace-me"),
                        onMount: this.bindFn(this.removeWrapper),
                    },
                    // new-graph-btn
                    n.createElement(
                        "div",
                        {
                            class: n.const("new-graph-btn"),
                            onClick: () => addAlert({ type: "confirm" }),
                        },
                        n.createElement(
                            t.Tooltip,
                            {
                                tooltip: n.const("New Graph (ctrl+n)"),
                                gravity: n.const("se"),
                            },
                            n.createElement("i", {
                                class: n.const("dcg-icon dcg-icon-plus"),
                                tooltip: n.const("New Graph (ctrl+n)"),
                            })
                        )
                    ),
                    // graph-title
                    n.createElement(
                        "div",
                        { class: n.const("title-div") },
                        n.createElement(
                            t.Tooltip,
                            { tooltip: n.const("Rename (f2)") },
                            n.createElement(
                                "span",
                                {
                                    class: n.const("dcg-config-name"),
                                    role: n.const("heading"),
                                    tooltip: n.const("Rename (f2)"),
                                    "aria-level": n.const("1"),
                                    onClick: () => {
                                        let txt = $(".dcg-config-name").text();
                                        let title = txt != "Untitled Graph" ? txt : "";
                                        addAlert({
                                            type: "rename",
                                            args: { title },
                                        });
                                        $(".title-input").select();
                                    },
                                },
                                n.const("Untitled Graph")
                            )
                        )
                    ),
                    // open-btn
                    n.createElement(
                        "span",
                        { class: n.const("open-btn-container") },
                        n.createElement(
                            t.Tooltip,
                            { tooltip: n.const("Open Graph (ctrl+o)") },
                            n.createElement("input", {
                                type: n.const("file"),
                                accept: n.const("application/desmos"),
                                onChange: function () {
                                    let input = $(".open-btn-container input")[0];
                                    let file = input.files[0];
                                    let fr = new FileReader();
                                    let t = Calc._calc.controller;

                                    if (!file)
                                        t.dispatch({
                                            type: "toast/show",
                                            toast: {
                                                message: "Please select a file",
                                                toastStyle: "error",
                                                hideAfter: 6e3,
                                            },
                                        });
                                    else if (!/\.desmos$/g.test(file.name))
                                        t.dispatch({
                                            type: "toast/show",
                                            toast: {
                                                message: "Please select a .desmos file",
                                                toastStyle: "error",
                                                hideAfter: 6e3,
                                            },
                                        });
                                    else {
                                        fr.onload = () => {
                                            let data = JSON.parse(fr.result);
                                            let saved = makeConfig();
                                            t.dispatch({
                                                type: "toast/show",
                                                toast: {
                                                    message: t.s(
                                                        "account-shell-text-mygraphs-opened-graph",
                                                        {
                                                            graphTitle: data["title"],
                                                        }
                                                    ),
                                                    undoCallback: () => {
                                                        $(".dcg-config-name").text(saved.title);
                                                        Calc.setState(saved.state);
                                                    },
                                                    hideAfter: 6e3,
                                                },
                                            });
                                            $(".dcg-config-name").text(data["title"]);
                                            Calc.setState(data["state"]);
                                        };
                                        fr.readAsText(file);
                                    }
                                },
                            }),
                            n.createElement(
                                "span",
                                {
                                    class: n.const("dcg-action-open tooltip-offset dcg-btn-red"),
                                    role: n.const("button"),
                                    tooltip: n.const("Open Graph (ctrl+o)"),
                                    onClick: () => $(".open-btn-container input").click(),
                                },
                                n.const("Open")
                            )
                        )
                    ),
                    // save-btn
                    n.createElement(
                        "span",
                        {
                            class: n.const("save-btn-container"),
                            onClick: () => {
                                let config = makeConfig();
                                let stringify = JSON.stringify(config);
                                fDown.saveStrings(stringify.split("\n"), config["title"], "desmos");
                            },
                        },
                        n.createElement(
                            t.Tooltip,
                            { tooltip: n.const("Save Changes (ctrl+s)") },
                            n.createElement(
                                "span",
                                {
                                    class: n.const("dcg-action-save tooltip-offset dcg-btn-green"),
                                    role: n.const("button"),
                                    tooltip: n.const("Save Changes (ctrl+s)"),
                                },
                                n.const("Save")
                            )
                        )
                    )
                );
            },
            // remove elements wrapper
            removeWrapper: function (c) {
                $(c).replaceWith(() => $(c).children());
            },
        });
        n.mountToNode(left_elts, left_container);

        // create right-container elements
        $(".align-right-container").prepend(`<div class="place-in-me"></div>`);
        const right_container = $(".place-in-me")[0];
        const right_elts = n.createClass({
            template: function () {
                return n.createElement(
                    "div",
                    {
                        class: n.const("replace-me"),
                        onMount: this.bindFn(this.fixElts),
                    },
                    // screenshot icon
                    n.createElement(
                        t.Tooltip,
                        {
                            tooltip: n.const("Take a Screenshot"),
                            gravity: n.const("sw"),
                        },
                        n.createElement("div", {
                            class: n.const("screenshot-div"),
                        })
                    ),
                    // open-web icon
                    n.createElement(
                        t.Tooltip,
                        {
                            tooltip: n.const("Open in Web Version"),
                            gravity: n.const("sw"),
                        },
                        n.createElement("div", {
                            class: n.const("web-div"),
                        })
                    )
                );
            },
            fixElts: function (c) {
                // create screenshot and web icons
                $(c)
                    .find(".screenshot-div")
                    .replaceWith(
                        `<svg class="dcg-icon-screenshot" aria-label="Take a Screenshot" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="3.2"/><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>`
                    );
                $(c)
                    .find(".web-div")
                    .replaceWith(
                        `<svg class="dcg-icon-web" aria-label="Open in Web Version" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`
                    );
                // remove elements wrappers
                $(c).replaceWith(() => $(c).children());
                $(right_container).replaceWith(() => $(right_container).children());

                // event handlers
                $(".dcg-icon-screenshot").on("click", () => {
                    fDown.saveImage(Calc.screenshot());
                    $(".dcg-tooltip-mount-pt-screenshot").hide();
                });
                $(".dcg-icon-web").on("click", () => Calc._calc.controller._openOnWeb());
            },
        });
        n.mountToNode(right_elts, right_container);

        console.log("[main] dom setup done!");
    };
});

// creates additional shorcuts for default modal
define("calc/shortcut_modal_setup", ["jquery"], function ($) {
    // creates a row for table
    function createRow(shortcut, keys) {
        let elt = `<tr><td>${shortcut}</td><td class="dcg-keyboard-shortcut dcg-os-windows">`;
        keys.forEach((key) => {
            elt += `<span class="dcg-key-command">${key}</span>+`;
        });
        elt = elt.slice(0, -1);
        elt += `<td class="dcg-keyboard-shortcut dcg-os-mac" style="display: none;"></td></tr>`;
        return $(elt);
    }

    return function () {
        let table = $(".dcg-hotkey-section-header:contains('Common Actions')").next();
        let rows = table.children();

        $(rows[2]).before(createRow("Rename a Graph", ["F2"]));
        $(rows[2]).before(createRow("Create a New Graph", ["CTRL", "N"]));
        $(rows[2]).before(createRow("Open a Graph", ["CTRL", "O"]));
        $(rows[2]).before(createRow("Save a Graph", ["CTRL", "S"]));
        $(rows[2]).before(createRow("Print a Graph", ["CTRL", "P"]));
        $(rows[2]).before(createRow("Show or Hide the Expression List", ["SHIFT", "ALT", "E"]));
        $(rows[3]).children(":first").text("Toggle Options for the Focused Expression");
        $(rows[6]).before(createRow("Add a Note", ["CTRL", "ALT", "O"]));
        $(rows[6]).before(createRow("Collapse / Expand Selected Folder", ["ALT", "Up Arrow"]));
        $(rows[6]).before(createRow("Add a Folder", ["CTRL", "ALT", "F"]));
        $(rows[6]).before(createRow("Add an Image", ["CTRL", "ALT", "I"]));
    };
});

// sets up additional event listeners
define("calc/event_handlers", ["jquery", "calc/shortcut_modal_setup"], function ($, shortModal) {
    return function () {
        // when we click on help icon
        $(".dcg-help-btn").on("dcg-tap", () => {
            let t = $(".dcg-non-chromeos-message");
            if (t.length) {
                // change modal's text
                t.text(
                    "You are using Desmos Offline Mode. As a result, some features may be missing. To use online version, visit www.desmos.com/calculator"
                );
                // when we open keyboard shortcuts modal.
                $(".dcg-link").on("dcg-tap", shortModal);
            }
        });
    };
});

// defines an init point
define("calc/init", ["calc/fix_calc", "calc/setup_dom", "calc/event_handlers"], function (
    fixCalc,
    setupDOM,
    eventHandlers
) {
    return function () {
        fixCalc();
        setupDOM();
        eventHandlers();
    };
});
