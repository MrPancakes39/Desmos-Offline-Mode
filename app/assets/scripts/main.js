function setupDOM() {
    $(".dcg-config-name")[0].innerText = "Untitled Graph";
    $(".dcg-header.dcg-secure-header.dcg-header-desktop").css("background-color", "#2a2a2a");
    $(".align-left-container")
        .prepend(`<i class="dcg-icon dcg-icon-plus"></i>`)
        .append(`<span class="dcg-if-user save-btn-container"><span role="button" tooltip="Save Changes (ctrl+s)" class="dcg-action-save tooltip-offset dcg-btn-green" ontap="" original-title="">Save</span></span>`);
    $(".align-right-container")
        .prepend(`<div class="dcg-tooltip-hit-area-container" handleevent="true" ontap=""><svg class="dcg-icon-web" aria-label="Open in Web Version" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg></div>`)
        .prepend(`<div class="dcg-tooltip-hit-area-container" handleevent="true" ontap=""><svg class="dcg-icon-screenshot" aria-label="Take a Screenshot" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="3.2"/><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg></div>`);
    setupSaveBtn();

    addTooltip("dcg-icon-screenshot");
    addTooltip("dcg-icon-web");

    console.log("[main] dom setup done!");
}

function eventHandlers() {
    $(".dcg-icon-question-sign.dcg-help-btn").click(() => {
        let t = $(".dcg-non-chromeos-message")[0];
        if (t) {
            t.innerText = "You are using Desmos Offline Mode. As a result, some features may be missing. To use online version, visit www.desmos.com/calculator";
            $(".dcg-link").on("dcg-tap", () => {
                let table = $(".dcg-hotkey-section-header:contains('Common Actions')").next();
                let rows = table.children();

                function createRow(shortcut, keys) {
                    let elt = `<tr><td>${shortcut}</td><td class="dcg-keyboard-shortcut dcg-os-windows">`;
                    keys.forEach(key => {
                        elt += `<span class="dcg-key-command">${key}</span>+`;
                    });
                    elt = elt.slice(0, -1);
                    elt += `<td class="dcg-keyboard-shortcut dcg-os-mac" style="display: none;"></td></tr>`;
                    return $(elt);
                }
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
            });
        }
    });
    $(".dcg-config-name").click(() => {
        let txt = $(".dcg-config-name").text();
        let title = (txt != "Untitled Graph") ? txt : "";
        addAlert(renameAlert(title), "rename");
        $(".title-input").select();
    });

    $(".dcg-icon-web").click(() => {
        addLoader();
        openOnWeb()
            .then(url => {
                nodeAPI.send("open-link", url);
                $(".dcg-loading-container").remove();
            })
            .catch(err => {
                console.error(err);
                setTimeout(() => {
                    $(".dcg-loading-container").remove();
                    addAlert(customAlert("Error", "Unable to open on web."), "custom");
                }, 500);
            });
        $(".dcg-tooltip-mount-pt-dcg-icon-web").hide();
    });
    $(".dcg-icon-screenshot").click(() => {
        nodeAPI.send("saveImage", Calc.screenshot());
        $(".dcg-tooltip-mount-pt-dcg-icon-screenshot").hide();
    });

    makeEventsTooltip("dcg-icon-screenshot");
    makeEventsTooltip("dcg-icon-web");

    $(".dcg-tooltip-mount-pt-screenshot").mouseleave(() => $(".dcg-tooltip-mount-pt-screenshot").hide());
    $(".align-left-container>.dcg-icon.dcg-icon-plus").click(() => {
        addAlert(confirmAlert(), "new");
    });

    $(".dcg-settings-pillbox").click(() => {
        $(".dcg-braille-container").unbind().click(() => {
            let a = $(".dcg-refreshable-braille-note a");
            let b = $(".dcg-six-key-checkbox a i");
            if (a.length) {
                a.unbind().click((e) => {
                    e.preventDefault();
                    nodeAPI.send("open-link", a[0].href);
                });
            }
            if (b.length) {
                b.unbind().click((e) => {
                    e.preventDefault();
                    nodeAPI.send("open-link", (b.parent())[0].href);
                });
            }
        });
    });

    setInterval(() => {
        (Calc._hasUnsavedChanges()) ? saveBtn.enable(): saveBtn.disable();
    }, 100);

    nodeAPI.receive("open-file", (json) => {
        let t = Calc._calc.controller;
        let saved = makeConfig();
        saved._newFile = Calc._newFile;
        const config = JSON.parse(json);
        $(".dcg-config-name").text(config["title"]);
        Calc.setState(config["state"]);
        t.dispatch({
            type: "toast/show",
            toast: {
                message: t.s("account-shell-text-mygraphs-opened-graph", { graphTitle: config["title"] }),
                undoCallback: () => {
                    $(".dcg-config-name").text(saved.title);
                    Calc.setState(saved.state);
                    Calc._newFile = saved._newFile;
                },
                hideAfter: 6e3
            }
        });
        Calc._newFile = false;
        t._hasUnsavedChanges = false;
    });

    saveBtn.click(() => {
        let json = JSON.stringify(makeConfig());
        nodeAPI.send("saveFile", json);
    });

    nodeAPI.receive("save-file", (msg) => {
        let json = JSON.stringify(makeConfig());
        nodeAPI.send("saveFile", json);
    });

    nodeAPI.receive("save-file-as", (msg) => {
        let json = JSON.stringify(makeConfig());
        nodeAPI.send("saveFileAs", json);
    });

    nodeAPI.receive("save-done", (msg) => {
        Calc._newFile = false;
        Calc._calc.controller._hasUnsavedChanges = false;
    });

    nodeAPI.receive("open-about", (json) => {
        let info = JSON.parse(json);
        addAlert(aboutAlert(info["ver"], info["elec"], info["node"], info["os"]), "about");
    })

    console.log("[main] event handlers setup done!");
}

function makeConfig() {
    let config = {};
    config["title"] = $(".dcg-config-name").text();
    config["state"] = Calc.getState();
    return config;
}

function addAlert(alert, type) {
    $("body").append(alert);
    $(".dcg-modal-background").click(() => $(".dcg-modal-background").parent().remove());
    $(".dcg-icon-remove-custom").click(() => $(".dcg-alert-container").remove());

    switch (type) {
        case "custom":
            break;

        case "rename":
            $(".title-save").click(() => {
                let txt = $(".title-input").val();
                let title = (txt != "") ? txt : "Untitled Graph";
                let old_title = $(".dcg-config-name").text();
                if (old_title !== title) {
                    $(".dcg-config-name").text(title);
                    Calc._calc.controller._hasUnsavedChanges = true;
                }
                $(".dcg-icon-remove-custom").click();
            });
            break;

        case "new":
            $(".dcg-dark-gray-link").click(() => $(".dcg-icon-remove-custom").click());
            $(".dcg-btn-red.dcg-action-delete").click(() => {
                let saved = makeConfig();
                saved._newFile = Calc._newFile;
                let t = Calc._calc.controller;
                $(".dcg-icon-remove-custom").click();
                $(".dcg-config-name").text("Untitled Graph");
                Calc.setBlank();
                Calc.newRandomSeed();
                t.dispatch({
                    type: "toast/show",
                    toast: {
                        message: t.s(`account-shell-text-${(Calc._newFile) ? "graph-cleared" : "new-graph-created"}`),
                        undoCallback: () => {
                            $(".dcg-config-name").text(saved.title);
                            Calc.setState(saved.state);
                            Calc._newFile = saved._newFile;
                        },
                        hideAfter: 6e3
                    }
                });
                Calc._newFile = true;
                t._hasUnsavedChanges = true;
                nodeAPI.send("newFile", "[main] new file");
            });
            if (!Calc._hasUnsavedChanges())
                $(".dcg-btn-red.dcg-action-delete").click();
            break;

        case "about":
            $(".about-link").click((e) => {
                e.preventDefault();
                nodeAPI.send("open-link", e.target.href);
            })
            break

        default:
            $(".dcg-alert-container").remove();
            throw new Error("This type is unknown");
    }
}

function addLoader() {
    $("body").append(`
        <div class="dcg-loading-container" style="display: none;">
            <div class="dcg-loading-modal">
                <h2 class="title">Loading on Web</h2>
                <div class="loader">
                    <div class="dot-floating"></div>
                </div>
            </div>
        </div>
    `);
    $(".dcg-loading-container").fadeIn(300);
}

function addTooltip(elt) {
    $("body").append(
        `<div class="dcg-tooltip-mount-pt-${elt}" style="display: none;">
            <div class="dcg-tooltip-positioning-container" style="top:5px;left:369px;width:36px;height:36px">
                <div class="dcg-tooltip-message-container" style="top:100%;right:0px;margin-top:5px;text-align:right">
                    <div class="dcg-tooltip-message" style="background:#000;cursor:default">${$(`.${elt}`).attr("aria-label")}</div>
                </div>
                <div class="dcg-tooltip-arrow" style="top:100%;left:50%;border:5px solid transparent;border-color:transparent transparent #000 transparent;margin-top:-5px;margin-left:-5px"></div>
            </div>
        </div>`
    );
    let temp = $(`.dcg-tooltip-mount-pt-${elt} .dcg-tooltip-positioning-container`);
    temp[0].style["top"] = "-2.9px";
    temp[0].style["left"] = `${$(`.${elt}`).offset()["left"] - 5}px`;
}

function updateTooltip(elt) {
    let pos = $(`.dcg-tooltip-mount-pt-${elt} .dcg-tooltip-positioning-container`);
    pos[0].style["left"] = `${$(`.${elt}`).offset()["left"] - 5}px`;
}

function makeEventsTooltip(elt) {
    $(`.${elt}`)
        .hover(
            () => setTimeout(() => {
                if ($(`.${elt}`).is(":hover"))
                    $(`.dcg-tooltip-mount-pt-${elt}`).show()
            }, 500),
            () => setTimeout(() => {
                if (!($(`.dcg-tooltip-mount-pt-${elt}`).is(":hover")))
                    $(`.dcg-tooltip-mount-pt-${elt}`).hide();
            }, 200)
        );
    $(`.dcg-tooltip-mount-pt-${elt}`).mouseleave(() => $(`.dcg-tooltip-mount-pt-${elt}`).hide());
    $(window).resize(() => updateTooltip(elt));
}

function setupSaveBtn() {
    saveBtn = $(".dcg-action-save");
    saveBtn.enable = () => {
        saveBtn.removeClass("dcg-disabled").addClass("dcg-btn-green");
        saveBtn.attr("disabled", false);
    }
    saveBtn.disable = () => {
        saveBtn.removeClass("dcg-btn-green").addClass("dcg-disabled");
        saveBtn.attr("disabled", true);
    }
}

async function openOnWeb() {
    const e = Calc._calc;
    const F = jQuery;
    let t = JSON.stringify(e.getState()),
        n = e.grapher.screenshot({ width: 100, height: 100 }),
        r = e.graphSettings.config.crossOriginSaveTest,
        i = r ? "/" : "https://www.desmos.com/",
        o = i + "api/v1/calculator/cross_origin_save";

    a = F('<input type="text" name="calc_state" />').val(t);
    s = F('<input type="text" name="thumb_data" />').val(n);
    c = F('<form method="POST" style="display:none;"></form>').attr("action", o).append(F('<input type="text" name="is_open_on_web" value="true" />')).append(F('<input type="text" name="my_graphs" value="false" />')).append(F('<input type="text" name="is_update" value="false" />')).append(a).append(s);

    const url = o;
    const data = new URLSearchParams(new FormData(c[0]));

    const res = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    });

    if (res.status === 200)
        return res.url
}