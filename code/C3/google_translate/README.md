# 右键菜单

可以定义右键菜单的行为作为扩展,方法是这manifest.json中定义
```
"permissions": [
    "contextMenus"
]
```
来申明可以扩展菜单栏

用Chrome提供的三种方法操作右键菜单，分别是create、update和remove，对应于创建、更新和移除操作。

本例中我们使用`content.js`文件定义了要翻译的内容怎么获得,之后通过页面间消息传递的方式
`chrome.runtime.sendMessage(xxx)`和`chrome.runtime.onMessage.addListener(callback)`

将内容传给`background.js`并做处理

所以这边需要使用

```
"content_scripts": [
    {
        "matches": ["*://*/*"],
        "js": ["js/content.js"]
    }
],
```
来指定脚本
