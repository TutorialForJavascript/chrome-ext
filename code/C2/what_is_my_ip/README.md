# 访问外部

插件可以使用html的api或者jquery等通过ajax访问外部(跨域访问),不过需要在`manifest.json`中定义要访问的站点:

```ts
"permissions": [
    "http://1212.ip138.com/ic.asp"
]
```

ts要在浏览器中使用第三方库,需要在`tsconfig.json`中设置`"module": "amd"`,并在html文件中用
`<script data-main="js/my_ip.js" type="text/javascript" src="js/require.js"></script>`

指定入口文件和require.js的位置
