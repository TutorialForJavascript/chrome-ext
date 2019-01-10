chrome.tts.getVoices(function (voices) {
    console.log(voices);
    var choice = voices.filter(function (voice) {
        return voice.lang == "zh-CN";
    })[0];
    console.log(choice);
    chrome.tts.speak('你好', {
        lang: choice.lang,
        voiceName: choice.voiceName
    });
});
//# sourceMappingURL=background.js.map