let audio = document.createElement("audio")
audio.src = "../source/蔡志展 - 战斗音乐.mp3"
audio.play()

chrome.browserAction.setBadgeBackgroundColor({color: '#0000FF'})
chrome.browserAction.setBadgeText({text: 'xxm'})
