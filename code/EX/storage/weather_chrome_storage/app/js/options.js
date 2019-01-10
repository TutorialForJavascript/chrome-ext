function option_func() {
    chrome.storage.sync.get('city', function (result) {
        var city;
        if (result === null) {
            chrome.storage.sync.set({ 'city': 'beijing' }, function () {
                alert('保存成功。为北京');
            });
            city = 'beijing';
        }
        else {
            city = result["city"];
        }
        $('#cu_city').text(city);
    });
    $('#save').click(function () {
        chrome.storage.sync.set({ 'city': $('#city').val() }, function () {
            alert('保存成功。');
        });
    });
}
option_func();
//# sourceMappingURL=options.js.map