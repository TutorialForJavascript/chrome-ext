
function option_func(){
    chrome.storage.sync.get('city',(result)=>{
        let city:string
        if (result === null){
            chrome.storage.sync.set({'city':'beijing'},()=>{
                alert('保存成功。为北京')
            })
            city = 'beijing'
        }else{
            city = result["city"]
        }
        $('#cu_city').text(city)
    })
    $('#save').click(() => {
        chrome.storage.sync.set({'city':$('#city').val()},()=>{
            alert('保存成功。')
        })

    })
}

option_func()
