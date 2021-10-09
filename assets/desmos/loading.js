window.platform = 'chrome_app';

// read in any appconfig passed in via ?appconfig=
window.dcg_appconfig = (function() {
    var query = location.search;
    if (query[0] === '?') query = query.slice(1);
    var paramStrings = query.split('&');

    for (var i = 0; i < paramStrings.length; i++) {
        var pair = paramStrings[i].split('=');
        if (pair[0] === 'appconfig') {
            return pair[1];
        }
    }

    return undefined;
})();

if (window.SecureBrowser &&
    window.SecureBrowser.security &&
    window.SecureBrowser.security.isEnvironmentSecure) {
    function updateTakeATestIsSecure() {
        window.SecureBrowser.security.isEnvironmentSecure(function(state) {
            // set to false just in case the rest of this fails
            window.dcg_takeatest_active = false;
            var json = JSON.parse(state);
            window.dcg_takeatest_active = !!json.secure
        });
    }
    // run now and every 5 seconds
    updateTakeATestIsSecure();
    setInterval(updateTakeATestIsSecure, 5000);
}

// Safe Exam Browser
if ((/ SEB\/[0-9]+\.[0-9]+/).test(navigator.userAgent)) {
    window.dcg_takeatest_active = true;
}