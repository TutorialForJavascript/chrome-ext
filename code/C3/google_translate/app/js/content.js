window.onmouseup = function () {
    var selection = window.getSelection();
    if (selection.isCollapsed) {
        chrome.runtime.sendMessage(selection.toString());
    }
};
//# sourceMappingURL=content.js.map