function setupDOM() {
    $(".dcg-config-name")[0].innerText = "Untitled Graph";
    $(".dcg-header.dcg-secure-header.dcg-header-desktop").css("background-color", "#2a2a2a");
    $(".align-left-container")
        .prepend(`<i class="dcg-icon dcg-icon-plus"></i>`)
        .append(`<span class="dcg-if-user save-btn-container"><span role="button" tooltip="Save Changes (ctrl+s)" class="dcg-action-save tooltip-offset dcg-btn-green" ontap="" original-title="">Save</span></span>`);
    $(".align-right-container")
        .prepend(`<div class="dcg-tooltip-hit-area-container" handleevent="true" ontap=""><svg class="dcg-icon-screenshot" aria-label="Take a Screenshot" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="3.2"/><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg></div>`);
    addScreenshotTooltip();
    setupSaveBtn();

    console.log("[main] dom setup done!");
}

function eventHandlers() {
    $(".dcg-icon-question-sign.dcg-help-btn").click(() => {
        let t = $(".dcg-non-chromeos-message")[0];
        if (t)
            t.innerText = "You are using Desmos Offline Mode. As a result, some features may be missing. To use online version, visit www.desmos.com/calculator";
    });
    $(".dcg-config-name").click(() => {
        let txt = $(".dcg-config-name").text();
        let title = (txt != "Untitled Graph") ? txt : "";
        addAlert(renameAlert(title), "rename");
        $(".title-input").select();
    });
    $(".dcg-icon-screenshot")
        .click(() => {
            nodeAPI.send("saveImage", Calc.screenshot());
            $(".dcg-tooltip-mount-pt-screenshot").hide();
        })
        .hover(
            () => setTimeout(() => {
                if ($(".dcg-icon-screenshot").is(":hover"))
                    $(".dcg-tooltip-mount-pt-screenshot").show()
            }, 500),
            () => setTimeout(() => {
                if (!($(".dcg-tooltip-mount-pt-screenshot").is(":hover")))
                    $(".dcg-tooltip-mount-pt-screenshot").hide();
            }, 200)
        );
    $(".dcg-tooltip-mount-pt-screenshot").mouseleave(() => $(".dcg-tooltip-mount-pt-screenshot").hide());
    $(".align-left-container>.dcg-icon.dcg-icon-plus").click(() => {
        addAlert(confirmAlert(), "new");
    });

    $(window).resize(() => {
        let pos = $(".dcg-tooltip-mount-pt-screenshot .dcg-tooltip-positioning-container");
        pos[0].style["left"] = `${$(".dcg-icon-screenshot").offset()["left"] - 5}px`;
    });

    setInterval(() => {
        let t = Calc._calc.controller;
        (t._hasUnsavedChanges) ? saveBtn.enable(): saveBtn.disable();
    }, 100);

    nodeAPI.receive("open-file", (json) => {
        const config = JSON.parse(json);
        $(".dcg-config-name").text(config["title"]);
        Calc.setState(config["state"]);
        Calc._calc.controller._hasUnsavedChanges = false;
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
        Calc._calc.controller._hasUnsavedChanges = false;
    });

    console.log("[main] event handlers setup done!");
}

function makeConfig() {
    let config = {};
    config["title"] = $(".dcg-config-name").text();
    config["state"] = Calc.getState();
    return config;
}

function customAlert(title, msg) {
    return `
    <div class="dcg-alert-container">
        <div class="dcg-modal-background"></div>
        <div class="dcg-box-modal">
            <span role="link" tabindex="0" aria-label="Close Dialog" class="dcg-close-modal" ontap="">
                <i class="dcg-icon-remove-custom"></i>
            </span>
            <div class="alert-dialog">
                <h1>${title}</h1>
                <div class="alert-content">
                    <p>${msg}</p>
                </div>
            </div>
        </div>
    </div>
    `;
}

function renameAlert(title) {
    return `
    <div class="dcg-alert-container">
        <div class="dcg-modal-background"></div>
        <div class="dcg-box-modal">
            <span role="link" tabindex="0" aria-label="Close Dialog" class="dcg-close-modal" ontap="">
                <i class="dcg-icon-remove-custom"></i>
            </span>
            <div class="alert-dialog">
                <h1>Rename This Graph</h1>
                <div class="alert-content">
                    <p class="graph-title">Title</p>
                    <input class="title-input" name="title" placeholder="Untitled Graph" value="${title}" maxlength="140" tabindex="0" autofocus="true">
                    <button type="submit" class="title-save">Save</button>
                </div>
            </div>
        </div>
    </div>
    `;
}

function confirmAlert() {
    return `
    <div class="dcg-alert-container">
        <div class="dcg-modal-background"></div>
        <div class="dcg-box-modal">
            <span role="link" tabindex="0" aria-label="Close Dialog" class="dcg-close-modal" ontap="">
                <i class="dcg-icon-remove-custom"></i>
            </span>
            <div class="alert-dialog">
                <h1>Create New Graph</h1>
                <div class="alert-content">
                    <p>Are you sure you want to create a new graph?
                    This graph will be lost</p>
                    <div class="alert-buttons">
                        <button type="submit" class="dcg-dark-gray-link">Cancel</button>
                        <button type="submit" class="dcg-btn-red dcg-action-delete">New</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
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
                $(".dcg-icon-remove-custom").click();
                $(".dcg-config-name").text("Untitled Graph");
                Calc.setBlank();
                Calc.newRandomSeed();
                Calc._calc.controller._hasUnsavedChanges = true;
            })
            break;

        default:
            $(".dcg-alert-container").remove();
            throw new Error("This type is unknown");
    }
}

function addScreenshotTooltip() {
    $("body").append(
        `<div class="dcg-tooltip-mount-pt-screenshot" style="display: none;">
            <div class="dcg-tooltip-positioning-container" style="top:5px;left:369px;width:36px;height:36px">
                <div class="dcg-tooltip-message-container" style="top:100%;right:0px;margin-top:5px;text-align:right">
                    <div class="dcg-tooltip-message" style="background:#000;cursor:default">Take a Screenshot</div>
                </div>
                <div class="dcg-tooltip-arrow" style="top:100%;left:50%;border:5px solid transparent;border-color:transparent transparent #000 transparent;margin-top:-5px;margin-left:-5px"></div>
            </div>
        </div>`
    );
    let temp = $(".dcg-tooltip-mount-pt-screenshot .dcg-tooltip-positioning-container");
    temp[0].style["top"] = "-2.9px";
    temp[0].style["left"] = `${$(".dcg-icon-screenshot").offset()["left"] - 5}px`;
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