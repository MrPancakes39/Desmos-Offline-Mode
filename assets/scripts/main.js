const fDown = new FileDownloader();

function setupDOM() {
    $(".dcg-config-name")[0].innerText = "Untitled Graph";
    $(".dcg-header.dcg-secure-header.dcg-header-desktop").css("background-color", "#2a2a2a");
    $(".align-left-container")
        .prepend(`<i class="dcg-icon dcg-icon-plus"></i>`)
        .append(`<span class="dcg-if-user open-btn-container"><input type="file" accept="application/desmos"><span role="button" tooltip="Open File    (ctrl+o)" class="dcg-action-open tooltip-offset dcg-btn-red  " ontap="" original-title="">Open</span></span>`)
        .append(`<span class="dcg-if-user save-btn-container"><span role="button" tooltip="Save Changes (ctrl+s)" class="dcg-action-save tooltip-offset dcg-btn-green" ontap="" original-title="">Save</span></span>`);
    $(".align-right-container")
        .prepend(`<div class="dcg-tooltip-hit-area-container" handleevent="true" ontap=""><svg class="dcg-icon-web" aria-label="Open in Web Version" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg></div>`)
        .prepend(`<div class="dcg-tooltip-hit-area-container" handleevent="true" ontap=""><svg class="dcg-icon-screenshot" aria-label="Take a Screenshot" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="3.2"/><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg></div>`);

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
    $(".dcg-icon-screenshot")
        .click(() => {
            fDown.saveImage(Calc.screenshot());
            $(".dcg-tooltip-mount-pt-screenshot").hide();
        });
    $(".align-left-container>.dcg-icon.dcg-icon-plus").click(() => {
        addAlert(confirmAlert(), "new");
    });

    $(".dcg-icon-web").click(() => Calc._calc.controller._openOnWeb());

    $(".dcg-if-user.save-btn-container").click(() => {
        let config = makeConfig();
        let stringify = JSON.stringify(config);
        fDown.saveStrings(stringify.split("\n"), config["title"], "desmos");
    });

    $(".dcg-action-open.tooltip-offset.dcg-btn-red").click(() => $(".open-btn-container>input").click());

    $(".open-btn-container>input").change(() => {
        let input = $(".open-btn-container>input")[0];
        let file = input.files[0];
        let fr = new FileReader();

        if (!file)
            addAlert(customAlert("Error", "Please select a file"), "custom");
        else if (!(/\.desmos$/g).test(file.name))
            addAlert(customAlert("Error", "Please select a .desmos file"), "custom");
        else {
            fr.onload = () => {
                let data = JSON.parse(fr.result);
                $(".dcg-config-name").text(data["title"]);
                Calc.setState(data["state"]);
            };
            fr.readAsText(file);
        }
    });

    makeEventsTooltip("dcg-icon-screenshot");
    makeEventsTooltip("dcg-icon-web");

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
                $(".dcg-config-name").text(title);
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
            })
            break;

        default:
            $(".dcg-alert-container").remove();
            throw new Error("This type is unknown");
    }
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