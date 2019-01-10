const url_base = 'http://translate.google.com.hk/#auto/zh-CN/'

chrome.contextMenus.create({
    'type':'normal',
    'title':'使用Google翻译……',
    'contexts':['selection'],
    'id':'cn',
    'onclick':translate
});

function translate(info:any, tab:any){
    var url = url_base+info.selectionText ;
    window.open(url, '_blank');
}

chrome.runtime.onMessage.addListener(
    (message:string, sender:any, sendResponse:any)=>{
        chrome.contextMenus.update('cn',{'title':'使用Google翻译“'+message+'”'})
    }
)
