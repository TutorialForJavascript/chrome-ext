function option_func() {
    var city = localStorage.getItem('city') !== null ? localStorage.getItem('city') : 'beijing';
    $('#cu_city').text(city);
    $('#save').click(function () {
        localStorage.setItem('city', $('#city').val());
        alert('保存成功。');
    });
}
option_func();
//# sourceMappingURL=options.js.map