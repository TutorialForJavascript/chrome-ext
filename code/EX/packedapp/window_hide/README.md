# 使用chrome的storage接口存储数据

Chrome为扩展应用提供了存储API，以便将扩展中需要保存的数据写入本地磁盘。Chrome提供的存储API可以说是对localStorage的改进，它与localStorage相比有以下区别：

如果储存区域指定为sync，数据可以自动同步；

content_scripts可以直接读取数据，而不必通过background页面；

在隐身模式下仍然可以读出之前存储的数据；

读写速度更快；

用户数据可以以对象的类型保存。

对于第二点要进一步说明一下。首先localStorage是基于域名的，这在前面的小节中已经提到过了。而content_scripts是注入到用户当前浏览页面中的，如果content_scripts直接读取localStorage，所读取到的数据是用户当前浏览页面所在域中的。所以通常的解决办法是content_scripts通过runtime.sendMessage和background通信，由background读写扩展所在域（通常是chrome-extension://extension-id/）的localStorage，然后再传递给content_scripts。

使用Chrome存储API必须要在Manifest的permissions中声明"storage"，之后才有权限调用。Chrome存储API提供了2种储存区域，分别是sync和local。两种储存区域的区别在于，sync储存的区域会根据用户当前在Chrome上登陆的Google账户自动同步数据，当无可用网络连接可用时，sync区域对数据的读写和local区域对数据的读写行为一致。

对于每种储存区域，Chrome又提供了5个方法，分别是get、getBytesInUse、set、remove和clear。

get方法即为读取数据，完整的方法为：

chrome.storage.StorageArea.get(keys, function(result){
    console.log(result);
});
keys可以是字符串、包含多个字符串的数组或对象。如果keys是字符串，则和localStorage的用法类似；如果是数组，则相当于一次读取了多个数据；如果keys是对象，则会先读取以这个对象属性名为键值的数据，如果这个数据不存在则返回keys对象的属性值（比如keys为{'name':'Billy'}，如果name这个值存在，就返回name原有的值，如果不存在就返回Billy）。如果keys为一个空数组（[]）或空对象（{}），则返回一个空列表，如果keys为null，则返回所有存储的数据。

getBytesInUse方法为获取一个数据或多个数据所占用的总空间，返回结果的单位是字节，完整方法为：

chrome.storage.StorageArea.getBytesInUse(keys, function(bytes){
    console.log(bytes);
});
此处的keys只能为null、字符串或包含多个字符串的数组。

set方法为写入数据，完整方法为：

chrome.storage.StorageArea.set(items, function(){
    //do something
});
items为对象类型，形式为键/值对。items的属性值如果是字符型、数字型和数组型，则储存的格式不会改变，但如果是对象型和函数型的，会被储存为“{}”，如果是日期型和正则型的，会被储存为它们的字符串形式。

remove方法为删除数据，完整方法为：

chrome.storage.StorageArea.remove(keys, function(){
    //do something
});
其中keys可以是字符串，也可以是包含多个字符串的数组。

clear方法为删除所有数据，完整方法为：

chrome.storage.StorageArea.clear(function(){
    //do something
});
请注意，上述五种完整方法中，StorageArea必须指定为local或sync中的一个。

Chrome同时还为存储API提供了一个onChanged事件，当存储区的数据发生改变时，这个事件会被激发。

onChanged的完整方法为：

chrome.storage.onChanged.addListener(function(changes, areaName){
    console.log('Value in '+areaName+' has been changed:');
    console.log(changes);
});
callback会接收到两个参数，第一个为changes，第二个是StorageArea。changes是词典对象，键为更改的属性名称，值包含两个属性，分别为oldValue和newValue；StorageArea为local或sync。
