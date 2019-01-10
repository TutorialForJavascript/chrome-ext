const url_base='http://api.openweathermap.org/data/2.5/forecast/daily?q='

const APPID = '&APPID=18dbbbf626b02a618ed8a6536a20341d'
let city = localStorage.getItem('city')!==null?localStorage.getItem('city'):'beijing'
let url = url_base+city+',china&lang=zh_cn'+APPID;

function httpRequest(url:string, callback:Function){
    $.get(url,(data:any,state:string)=>{
        if(state==="success"){
            console.log(data)
            callback(data)
        }
    })
}

function showWeather(result:any){
    let list = result["list"]
    console.log(list);
    let title = '<h2>'+result['city']['name']+'</h2>'
    let table = '<table><tr><th>日期</th><th>天气</th><th>最低温度</th><th>最高温度</th></tr>'
    for(let i in list){
        let d = new Date(list[i].dt*1000)
        table += '<tr>'
        table += '<td>'+d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+'</td>'
        table += '<td>'+list[i].weather[0].description+'</td>'
        table += '<td>'+Math.round(list[i].temp.min-273.15)+' °C</td>'
        table += '<td>'+Math.round(list[i].temp.max-273.15)+' °C</td>'
        table += '</tr>'
    }
    table += '</table>'
    $('#weather').html(title+table)
}


httpRequest(url, showWeather);
