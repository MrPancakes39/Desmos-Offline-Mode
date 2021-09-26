function setupDOM() {
    $(".dcg-config-name")[0].innerText = "Offline Graphing Calculator";
    $(".dcg-header.dcg-secure-header.dcg-header-desktop")[0].style["background-color"] = "#2a2a2a";
    $(".align-left-container")[0].style["width"] = "auto";
    $(".title-div")[0].style["padding-right"] = "0px";
    $(".align-left-container")
        .append(`<span class="dcg-if-user open-btn-container"><span role="button" tooltip="Open File    (ctrl+o)" class="dcg-action-open tooltip-offset dcg-btn-blue " ontap="" original-title="">Open</span></span>`)
        .append(`<span class="dcg-if-user save-btn-container"><span role="button" tooltip="Save Changes (ctrl+s)" class="dcg-action-save tooltip-offset dcg-btn-green" ontap="" original-title="">Save</span></span>`);
}

function eventHandlers() {
    $(".dcg-icon-question-sign.dcg-help-btn").click(() => {
        let t = $(".dcg-non-chromeos-message")[0];
        if (t)
            t.innerText = "You are using Offline Graphing Calculator. As a result, some features may be missing. To use online version, visit www.desmos.com/calculator";
    });
}