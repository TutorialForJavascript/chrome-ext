
function option_func(){
    let city = localStorage.getItem('city') !== null ? localStorage.getItem('city') : 'beijing'
    $('#cu_city').text(city)
    $('#save').click(() => {

        localStorage.setItem('city', $('#city').val())
        alert('保存成功。')
    })

}

option_func()
