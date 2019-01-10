chrome.app.runtime.onLaunched.addListener(function () {
    chrome.app.window.create('main.html', {
        id: 'main',
        bounds: {
            width: 800,
            height: 600,
            left: 100,
            top: 100,
        },
        minWidth: 900,
        minHeight: 700,
        maxWidth: 600,
        maxHeight: 400,
        frame: 'none',
        state: 'normal'
    }, function (appWindow) {
        console.log(appWindow);
    });
});
//# sourceMappingURL=background.js.map