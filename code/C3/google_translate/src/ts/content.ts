window.onmouseup = function(){
    let selection = window.getSelection();
    if(selection.isCollapsed){
        chrome.runtime.sendMessage(selection.toString());
    }
}
