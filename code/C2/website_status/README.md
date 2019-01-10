# 后台常驻

后台常驻可以通过设置`manifest.json`来定义

```ts
"background": {
    "scripts": [
        "js/status.js"
    ]
```

这样只要你打开浏览器,你的插件就会开始运行

在status中有`chrome`这个全局变量,在ts中需要安装`@types/chrome`并在tsconfig.json中设置

```
"types": [
"chrome"
]
```

才可以正常使用
