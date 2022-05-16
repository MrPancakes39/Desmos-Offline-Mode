define("calc/alerts", [], function () {
    return {
        customAlert: (title, html) => `
            <div class="dcg-alert-container">
                <div class="dcg-modal-background"></div>
                <div class="dcg-box-modal">
                    <span role="link" tabindex="0" aria-label="Close Dialog" class="dcg-close-modal" ontap="">
                        <i class="dcg-icon-remove-custom"></i>
                    </span>
                    <div class="alert-dialog">
                        <h1>${title}</h1>
                        <div class="alert-content">
                            ${html}
                        </div>
                    </div>
                </div>
            </div>
            `,
        renameAlert: (title) => `
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
            `,
        confirmAlert: () => `
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
            `,
    };
});

define("calc/add_alert", ["jquery", "lodash", "calc/alerts", "calc/make_config"], function (
    $,
    _,
    alerts,
    makeConfig
) {
    return function (props) {
        // Check props object
        if (!_.isPlainObject(props)) throw new Error("props needs to be a plain object.");
        if (!_.isString(props.type)) throw new Error("props.type needs to be a string.");
        let validTypes = ["custom", "rename", "confirm"];
        if (!validTypes.includes(props.type)) throw new Error(`${props.type} is not a valid type.`);
        if (!_.isPlainObject(props.args)) props.args = {};

        // Creates alert
        let alert;
        if (props.type === "custom")
            alert = alerts.customAlert(props.args.title || "", props.args.html || "");
        else if (props.type === "rename") alert = alerts.renameAlert(props.args.title || "");
        else alert = alerts.confirmAlert();

        // Adds alert to body
        $("body").append(alert);
        $(".dcg-modal-background").click(() => $(".dcg-modal-background").parent().remove());
        $(".dcg-icon-remove-custom").click(() => $(".dcg-alert-container").remove());

        // set up the events
        if (props.type === "rename") {
            $(".title-save").click(() => {
                let txt = $(".title-input").val();
                let title = txt != "" ? txt : "Untitled Graph";
                Calc.header.title = title;
                $(".dcg-icon-remove-custom").click();
            });
        }
        if (props.type === "confirm") {
            $(".dcg-dark-gray-link").click(() => $(".dcg-icon-remove-custom").click());
            $(".dcg-btn-red.dcg-action-delete").click(() => {
                let saved = makeConfig();
                $(".dcg-icon-remove-custom").click();
                Calc.header.title = "Untitled Graph";
                Calc.setBlank();
                Calc.newRandomSeed();
                let t = Calc._calc.controller;
                t.dispatch({
                    type: "toast/show",
                    toast: {
                        message: t.s("account-shell-text-new-graph-created"),
                        undoCallback: () => {
                            Calc.header.title = saved.title;
                            Calc.setState(saved.state);
                        },
                        hideAfter: 6e3,
                    },
                });
            });
        }
    };
});
