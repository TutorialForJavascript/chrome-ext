chrome.tts.getVoices(function(voices){
    console.log(voices)
    let choice = voices.filter((voice)=>{
        return voice.lang=="zh-CN"
    })[0]
    console.log(choice)
    chrome.tts.speak('你好',{
        lang:choice.lang,
        voiceName:choice.voiceName
    })

})
