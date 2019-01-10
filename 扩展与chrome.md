# 扩展与chrome

chrome插件当然可以使用chrome的api操作浏览器中的内容了

## 标签

chrome中的标签对象如下:

```js
{
    id: 标签id,
    index: 标签在窗口中的位置，以0开始,
    windowId: 标签所在窗口的id,
    openerTabId: 打开此标签的标签id,
    highlighted: 是否被高亮显示,
    active: 是否是活动的,
    pinned: 是否被固定,
    url: 标签的URL,
    title: 标签的标题,
    favIconUrl: 标签favicon的URL,
    status :标签状态，loading或complete,
    incognito: 是否在隐身窗口中,
    width: 宽度,
    height: 高度,
    sessionId: 用于sessions API的唯一id
}
```

要使用标签首先要在`manifest.json`中的`permissions`字段中设置`tabs`权限

之后就可以在主程序中使用了.

### 获取标签

+ `chrome.tabs.get(tabId, callback)`通过id获取tab

+ `chrome.tabs.getCurrent(callback)`获取当前使用的tab

+ `chrome.tabs.query(option)`通过option对象中的内容找到匹配的tab

    query方法可以指定的匹配条件如下:
    ```js
    {
        active: 是否是活动的,
        pinned: 是否被固定,
        highlighted: 是否正被高亮显示,
        currentWindow: 是否在当前窗口,
        lastFocusedWindow: 是否是上一次选中的窗口,
        status: 状态，loading或complete,
        title: 标题,
        url: 所打开的url,
        windowId: 所在窗口的id,
        windowType: 窗口类型，normal、popup、panel或app,
        index: 窗口中的位置
    }

    ```

### 创建标签

+ `chrome.tabs.create(tabObject, callback)` 创建标签
+ `chrome.tabs.duplicate(tabId, callback)` 复制标签

### 更新标签

+ `chrome.tabs.update(tabId, {url: 'url'},callback`更新标签

更新标签时也可以不指定tabId，如果不指定，默认会更改当前窗口的活动标签。需要指出，直到31.0.1650.63 m，更新highlighted属性为true后，标签active属性也会被指定为true，所以如果只是想将某个标签高亮以引起用户的注意，需要先记录当前的标签id，更新后再将这个标签的active属性改回true。这个bug在之后的版本也许会被修正。

+ `chrome.tabs.reload(tabId, {bypassCache: true}, callback)`重载标签
浏览器通常会对一些静态资源进行缓存，JavaScript中的location.reload()方法通常无法实现强制刷新，此时上面的方法就会很好地解决这个问题.这都靠`bypassCache: true`这一设置

### 移动标签

+ `chrome.tabs.move(tabIds, {'windowId':wId,'index':0}, callback)`

可以将标签移动到特定位置(指的是在窗口中的顺序).其中tabIds可以是一个数字型的标签id，也可以是一个包含多个标签id的数组。返回的tabs可能是标签对象也可能是包含多个标签对象的数组。如果指定的index为-1，会将标签移动到指定窗口的最后面。

### 移除标签

+ `chrome.tabs.remove(tabIds, callback)`

其中tabIds可以是一个数字型的标签id，也可以是一个包含多个标签id的数组。


### 获取页面语言信息

+ `chrome.tabs.detectLanguage(tabId, callback)`
如果不指定tabId，则返回当前窗口当前标签的语言。

### 页面截取

+ `chrome.tabs.captureVisibleTab(windowId, {format: 'jpeg',quality: 50}, callback)`获取指定窗口活动标签可见部分的截图

其中format还支持png，如果指定为png，则quality属性会被忽略。如果指定jpeg格式，quality的取值范围为0-100，数值越高，图片质量越好，体积也越大。扩展只有在`manifest.json`中的`permissions`字段中声明`activeTab`或`<all_url>`权限能获取到活动标签的截图

顺带一提,全页面截取可以使用[html2canvas](https://github.com/niklasvh/html2canvas)来实现

### 代码注入

+ 注入js文件

```
chrome.tabs.executeScript(tabId, {
    file: 'js/ex.js',
    allFrames: true,
    runAt: 'document_start'
}, function(resultArray){
    console.log(resultArray);
});
```

+ 注入js代码

```
chrome.tabs.executeScript(tabId, {
    code: 'document.body.style.backgroundColor="red"',
    allFrames: true,
    runAt: 'document_start'
}, function(resultArray){
    console.log(resultArray);
});
```

+ 注入css

```
chrome.tabs.insertCSS(tabId, {
    file: 'css/insert.css',
    allFrames: false,
    runAt: 'document_start'
}, function(){
    console.log('The css has been inserted.');
});
```
与js类似,也可以直接注入code

+ 与指定标签中的内容脚本（content script）通信

当js注入后,我们就可以让当前页面和后台脚本交互了,这是前面的页面就相当于`popup.html`,页面间的交互我们可以看扩展与页面间通信部分


## 默认页面

Chrome支持用自定义的页面替换Chrome相应默认的页面这些页面主要是书签页,历史页,新空白标签页

要修改默认页面,只需在Manifest中进行声明即可(一个扩展只能替换一个页面):

```js
"chrome_url_overrides" : {
    "bookmarks": "bookmarks.html"
}

"chrome_url_overrides" : {
    "history": "history.html"
}

"chrome_url_overrides" : {
    "newtab": "newtab.html"
}

```
把上面页面的地址替换成你自己的就可以了。

Google官方对override pages给出了几点建议:

+ 使您的页面又快又小

用户期望内置的浏览器页面能够立即打开。请避免做任何可能花较长时间的事情，例如，避免同步地获取网络或数据库资源。

+ 在您的页面中包含标题

否则用户可能会看到页面的 URL，会令人感到疑惑。这是一个指定标题的例子：新标签页

+ 不要假定页面具有键盘焦点

当用户创建新标签页时总是地址栏先获得焦点。

+ 不要试着模仿默认的“打开新的标签页”页面

用于创建与默认的“打开新的标签页”页面类似（具有最常访问的网站、最近关闭的标签页、提示、主题背景图像等等）的修改版本所需的 API 还不存在。在出现那些 API 之前您还是最好还是考虑一些完全不同的新想法。



## 书签

Chrome为开发者提供了添加、分类（书签文件夹）和排序等方法来操作书签，同时也提供了读取书签的方法。

要在扩展中操作书签，需要在`Manifest.js`中的`permissions`声明`bookmarks`权限：

书签本身还是很复杂的,以下是它的api:

```js
namespace chrome.bookmarks {

    interface BookmarkTreeNode {

        index?: number;

        dateAdded?: number;

        title: string;

        url?: string;

        dateGroupModified?: number;

        id: string;

        parentId?: string;
        children?: BookmarkTreeNode[];
        unmodifiable?: any;
    }

    interface BookmarkRemoveInfo {
        index: number;
        parentId: string;
    }

    interface BookmarkMoveInfo {
        index: number;
        oldIndex: number;
        parentId: string;
        oldParentId: string;
    }

    interface BookmarkChangeInfo {
        url?: string;
        title: string;
    }

    interface BookmarkReorderInfo {
        childIds: string[];
    }

    interface BookmarkRemovedEvent extends chrome.events.Event<(id: string, removeInfo: BookmarkRemoveInfo) => void> {}

    interface BookmarkImportEndedEvent extends chrome.events.Event<() => void> {}

    interface BookmarkMovedEvent extends chrome.events.Event<(id: string, moveInfo: BookmarkMoveInfo) => void> {}

    interface BookmarkImportBeganEvent extends chrome.events.Event<() => void> {}

    interface BookmarkChangedEvent extends chrome.events.Event<(id: string, changeInfo: BookmarkChangeInfo) => void> {}

    interface BookmarkCreatedEvent extends chrome.events.Event<(id: string, bookmark: BookmarkTreeNode) => void> {}

    interface BookmarkChildrenReordered extends chrome.events.Event<(id: string, reorderInfo: BookmarkReorderInfo) => void> {}

    interface BookmarkSearchQuery {
        query?: string;
        url?: string;
        title?: string;
    }

    interface BookmarkCreateArg {
        /** Optional. Defaults to the Other Bookmarks folder.  */
        parentId?: string;
        index?: number;
        title?: string;
        url?: string;
    }

    interface BookmarkDestinationArg {
        parentId?: string;
        index?: number;
    }

    interface BookmarkChangesArg {
        title?: string;
        url?: string;
    }

    var MAX_WRITE_OPERATIONS_PER_HOUR: number;

    var MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE: number;

    export function search(query: string, callback: (results: BookmarkTreeNode[]) => void): void;

    export function search(query: BookmarkSearchQuery, callback: (results: BookmarkTreeNode[]) => void): void;

    export function getTree(callback: (results: BookmarkTreeNode[]) => void): void;

    export function getRecent(numberOfItems: number, callback: (results: BookmarkTreeNode[]) => void): void;

    export function get(id: string, callback: (results: BookmarkTreeNode[]) => void): void;

    export function get(idList: string[], callback: (results: BookmarkTreeNode[]) => void): void;

    export function create(bookmark: BookmarkCreateArg, callback?: (result: BookmarkTreeNode) => void): void;

    export function move(id: string, destination: BookmarkDestinationArg, callback?: (result: BookmarkTreeNode) => void): void;
    export function update(id: string, changes: BookmarkChangesArg, callback?: (result: BookmarkTreeNode) => void): void;

    export function remove(id: string, callback?: Function): void;

    export function getChildren(id: string, callback: (results: BookmarkTreeNode[]) => void): void;
    export function getSubTree(id: string, callback: (results: BookmarkTreeNode[]) => void): void;

    export function removeTree(id: string, callback?: Function): void;

    var onRemoved: BookmarkRemovedEvent;

    var onImportEnded: BookmarkImportEndedEvent;

    var onImportBegan: BookmarkImportBeganEvent;

    var onChanged: BookmarkChangedEvent;

    var onMoved: BookmarkMovedEvent;

    var onCreated: BookmarkCreatedEvent;

    var onChildrenReordered: BookmarkChildrenReordered;
}

```

## 历史

与书签类似,历史记录也需要声明权限

```
"permissions": [
    "history"
]
```
相对而言,历史因为没有树状结构,所以接口简单得多

```js
namespace chrome.history {

    interface VisitItem {

        transition: string;

        visitTime?: number;

        visitId: string;

        referringVisitId: string;

        id: string;
    }


    interface HistoryItem {

        typedCount?: number;

        title?: string;

        url?: string;

        lastVisitTime?: number;

        visitCount?: number;

        id: string;
    }

    interface HistoryQuery {

        text: string;

        maxResults?: number;

        startTime?: number;

        endTime?: number;
    }

    interface Url {

        url: string;
    }

    interface Range {

        endTime: number;

        startTime: number;
    }

    interface RemovedResult {

        allHistory: boolean;

        urls?: string[];
    }

    interface HistoryVisitedEvent extends chrome.events.Event<(result: HistoryItem) => void> {}

    interface HistoryVisitRemovedEvent extends chrome.events.Event<(removed: RemovedResult) => void> {}

    export function search(query: HistoryQuery, callback: (results: HistoryItem[]) => void): void;
    export function addUrl(details: Url, callback?: () => void): void;

    export function deleteRange(range: Range, callback: () => void): void;

    export function deleteAll(callback: () => void): void;

    export function getVisits(details: Url, callback: (results: VisitItem[]) => void): void;

    export function deleteUrl(details: Url, callback?: () => void): void;
    var onVisited: HistoryVisitedEvent;

    var onVisitRemoved: HistoryVisitRemovedEvent;
}
```

## cookie

cookie就不讲了,查看别人网站的cookie本身就是黑客行为了
