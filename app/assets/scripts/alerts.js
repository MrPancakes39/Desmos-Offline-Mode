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

function aboutAlert(ver, elec, node, os) {
    return `
    <div class="dcg-alert-container">
        <div class="dcg-modal-background"></div>
        <div class="dcg-box-modal">
            <span role="link" tabindex="0" aria-label="Close Dialog" class="dcg-close-modal" ontap="">
                <i class="dcg-icon-remove-custom"></i>
            </span>
            <div class="alert-dialog">
                <h1></h1>
                <div class="about-dialog">
                    <div class="about-logo"><img src="./favicon.ico" alt="Desmos | Offline Mode"></div>
                    <h1 class="about-title">Desmos | Offline Mode</h1>
                    <p class="no-margin">Version: ${ver}</p>
                    <p class="no-margin">Electron: ${elec}</p>
                    <p class="no-margin">Node.js: ${node}</p>
                    <p class="no-margin">OS: ${os}</p>
                    <p>Please visit the Desmos Offline Mode release page for release notes and to download the latest version.</p>
                    <p style="margin-bottom: 5px">
                        <a class="about-link" href="https://github.com/MrPancakes39/Desmos-Offline-Mode/releases/" target="_blank">View Releases</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
    `;
}