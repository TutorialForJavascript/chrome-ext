import *  as $ from "jquery"

console.log("main")
const url:string = 'http://1212.ip138.com/ic.asp'

function httpRequest(url:string, callback:(url:string)=>void){
    $.get(url,(data:any,status:string)=>{
        if (status === "success") {
            callback(data)
        }
    })
}

httpRequest(url,(text:string)=>$('#ip_div').html(text))
