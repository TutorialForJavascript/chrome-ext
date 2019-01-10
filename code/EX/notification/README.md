# 后台常驻

后台常驻可以通过设置`manifest.json`来定义`"background"`属性,它可以包含

+ scripts js脚本
+ page html页面,但不会显示
+ persistent 定义了常驻后台的方式——当其值为true时，表示扩展将一直在后台运行，无论其是否正在工作；当其值为false时，表示扩展在后台按需运行，这就是Chrome后来提出的Event Page。Event Page可以有效减小扩展对内存的消耗，如非必要，请将persistent设置为false。persistent的默认值为true
