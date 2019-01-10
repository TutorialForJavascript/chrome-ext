var ponits_num = 20;
var Mem_History = (function () {
    function Mem_History() {
        console.log("Mem_History init");
        this.used = range(ponits_num).map(function (i) { return 0; });
        console.log("used:", this.used);
    }
    Mem_History.prototype.getMemUsage = function (callback) {
        chrome.system.memory.getInfo(function (info) {
            callback(info);
        });
    };
    Mem_History.prototype.show = function () {
        var _this = this;
        var history = {
            "labels": range(ponits_num).map(function () { return ""; }),
            "datasets": [
                {
                    "fillColor": "rgba(220,220,220,0.5)",
                    "data": _this.used
                }
            ]
        };
        var now = [
            {
                "value": _this.used[ponits_num - 1],
                "color": "rgba(220,220,220,0.7)"
            },
            {
                "value": 100 - _this.used[ponits_num - 1],
                "color": "rgba(220,220,220,0.3)"
            }
        ];
        var his_ctx = document.getElementById('mem_history').getContext("2d");
        var now_ctx = document.getElementById("mem_total").getContext("2d");
        if (!this.mem_chart_line || !this.mem_chart_pie) {
            this.mem_chart_line = new Chart(his_ctx);
            this.mem_chart_pie = new Chart(now_ctx);
        }
        this.mem_chart_line.Line(history, { scaleFontSize: 4, pointDot: false, animation: false });
        this.mem_chart_pie.Pie(now, { segmentShowStroke: false, animation: false });
    };
    Mem_History.prototype.update = function () {
        var _this = this;
        this.getMemUsage(function (info) {
            _this.used.shift();
            _this.used.push(Math.round((info.capacity - info.availableCapacity) / info.capacity * 100));
            _this.show();
        });
    };
    return Mem_History;
}());
var Cpu_History = (function () {
    function Cpu_History(mem_history) {
        this.user = range(ponits_num).map(function (i) { return 0; });
        this.kernel = range(ponits_num).map(function (i) { return 0; });
        this.total = range(ponits_num).map(function (i) { return 0; });
        this.last_total = [];
        this.last_user = [];
        this.last_kernel = [];
        var _this = this;
        chrome.system.cpu.getInfo(function (info) {
            for (var _i = 0, _a = range(info.processors.length); _i < _a.length; _i++) {
                var i = _a[_i];
                _this.last_total.push(info.processors[i].usage.total);
                _this.last_user.push(info.processors[i].usage.user);
                _this.last_kernel.push(info.processors[i].usage.kernel);
            }
            function _update() {
                mem_history.update();
                _this.update();
            }
            console.log("start");
            setInterval(_update, 1000);
        });
    }
    Cpu_History.prototype.getCpuUsage = function (callback) {
        var _this = this;
        chrome.system.cpu.getInfo(function (info) {
            var total = 0;
            var user = 0;
            var kernel = 0;
            console.log("info:");
            console.log(info);
            for (var _i = 0, _a = range(info.processors.length); _i < _a.length; _i++) {
                var i = _a[_i];
                total += info.processors[i].usage.total - _this.last_total[i];
                _this.last_total[i] = info.processors[i].usage.total;
                user += info.processors[i].usage.user - _this.last_user[i];
                _this.last_user[i] = info.processors[i].usage.user;
                kernel += info.processors[i].usage.kernel - _this.last_kernel[i];
                _this.last_kernel[i] = info.processors[i].usage.kernel;
            }
            user = Math.round(user / total * 100);
            kernel = Math.round(kernel / total * 100);
            callback({ user: user, kernel: kernel, total: user + kernel });
        });
    };
    Cpu_History.prototype.show = function () {
        console.log("Cpu show");
        var _this = this;
        var history = {
            "labels": range(ponits_num).map(function () { return ""; }),
            "datasets": [
                {
                    "fillColor": "rgba(220,220,220,0.5)",
                    "data": _this.total
                },
                {
                    "fillColor": "rgba(90,140,255,0.5)",
                    "data": _this.kernel
                },
                {
                    "fillColor": "rgba(255,90,90,0.5)",
                    "data": _this.user
                }
            ]
        };
        console.log("history");
        console.log(history);
        var now = [
            {
                "value": _this.total[ponits_num - 1],
                "color": "rgba(220,220,220,0.7)"
            },
            {
                "value": 100 - _this.total[ponits_num - 1],
                "color": "rgba(220,220,220,0.3)"
            }
        ];
        console.log("now");
        console.log(now);
        var his_ctx = document.getElementById('cpu_history').getContext("2d");
        var now_ctx = document.getElementById("cpu_total").getContext("2d");
        if (!this.cpu_chart_line || !this.cpu_chart_pie) {
            this.cpu_chart_line = new Chart(his_ctx);
            this.cpu_chart_pie = new Chart(now_ctx);
        }
        this.cpu_chart_line.Line(history, { scaleFontSize: 4, pointDot: false, animation: false });
        this.cpu_chart_pie.Pie(now, { segmentShowStroke: false, animation: false });
    };
    Cpu_History.prototype.update = function () {
        console.log("Cpu update");
        var _this = this;
        this.getCpuUsage(function (usage) {
            _this.user.shift();
            _this.user.push(usage.user);
            _this.kernel.shift();
            _this.kernel.push(usage.kernel);
            _this.total.shift();
            _this.total.push(usage.total);
            _this.show();
        });
    };
    return Cpu_History;
}());
var mem_history = new Mem_History();
var cpu_history = new Cpu_History(mem_history);
//# sourceMappingURL=main.js.map