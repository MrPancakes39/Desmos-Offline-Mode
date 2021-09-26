// const saveBtn = $(".dcg-action-save");
// saveBtn.enable = (e) => e.removeClass("dcg-btn-green").addClass("dcg-disabled");
// saveBtn.disable = (e) => e.removeClass("dcg-disabled").addClass("dcg-btn-green");

function setupDOM() {
    $(".dcg-config-name")[0].innerText = "Untitled Graph";
    $(".dcg-header.dcg-secure-header.dcg-header-desktop")[0].style["background-color"] = "#2a2a2a";
    $(".align-left-container")[0].style["width"] = "auto";
    $(".title-div")[0].style["padding-right"] = "0px";
    $(".align-left-container")
        .append(`<span class="dcg-if-user open-btn-container"><span role="button" tooltip="Open File    (ctrl+o)" class="dcg-action-open tooltip-offset dcg-btn-red  " ontap="" original-title="">Open</span></span>`)
        .append(`<span class="dcg-if-user save-btn-container"><span role="button" tooltip="Save Changes (ctrl+s)" class="dcg-action-save tooltip-offset dcg-btn-green" ontap="" original-title="">Save</span></span>`);
}

function eventHandlers() {
    $(".dcg-icon-question-sign.dcg-help-btn").click(() => {
        let t = $(".dcg-non-chromeos-message")[0];
        if (t)
            t.innerText = "You are using Offline Graphing Calculator. As a result, some features may be missing. To use online version, visit www.desmos.com/calculator";
    });
    $(".dcg-config-name").click(() => {
        let txt = $(".dcg-config-name").text();
        let title = (txt != "Untitled Graph") ? txt : "";
        $("body").append(renameGraphAlert(title));
        $(".dcg-icon-remove-custom").click(() => $(".dcg-alert-container").remove());
        $(".title-save").click(() => {
            let txt = $(".title-input").val();
            let title = (txt != "") ? txt : "Untitled Graph";
            $(".dcg-config-name").text(title);
            $(".dcg-icon-remove-custom").click();
        });
        $(".title-input").select();
    })
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

function renameGraphAlert(title) {
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