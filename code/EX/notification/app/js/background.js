var audio = document.createElement("audio");
audio.src = "../source/蔡志展 - 战斗音乐.mp3";
audio.play();
var notification = {
    "type": 'basic',
    "iconUrl": '../images/xkfy.png',
    "title": "音乐播放",
    "message": "战斗曲",
    "contextMessage": '蔡志展'
};
chrome.notifications.create(notification);
chrome.browserAction.setBadgeBackgroundColor({ color: '#0000FF' });
chrome.browserAction.setBadgeText({ text: 'xxm' });
//# sourceMappingURL=background.js.map