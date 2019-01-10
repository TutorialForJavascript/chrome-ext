# 地址栏工具

chrome的地址栏可以作为扩展的输入位置,比如我们在manifest.json中定义关键字
```
"omnibox": {
    "keyword": "usd"
},
```
这样在地址栏输入usd+tab键就可以让我们的插件获取输入了.

这个插件中我们使用了

```
chrome.omnibox.setDefaultSuggestion({ 'description': 'Find current USD price.' })

chrome.omnibox.onInputChanged.addListener(updateAmount)

chrome.omnibox.onInputEntered.addListener(gotoYahoo)
```

第一条用来设定默认的描述文字

第二条监听输入后输入框中内容有改变的行为

第三条监听按下回车的行为
