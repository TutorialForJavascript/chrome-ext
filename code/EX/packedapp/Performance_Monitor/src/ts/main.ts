declare function range(to: number, from?: number, step?: number): number[];
const ponits_num = 20
interface ProcessorUsage {
    /** The cumulative time used by userspace programs on this processor. */
    user: number;
    /** The cumulative time used by kernel programs on this processor. */
    kernel: number;
    /** The cumulative time spent idle by this processor. */
    idle: number;
    /** The total cumulative time for this processor. This value is equal to user + kernel + idle. */
    total: number;
}

interface MemoryInfo {
    /** The total amount of physical memory capacity, in bytes. */
    capacity: number;
    /** The amount of available capacity, in bytes. */
    availableCapacity: number;
}

class Mem_History {
    private used: number[]
    private mem_chart_pie: Chart
    private mem_chart_line: Chart

    constructor() {
        console.log("Mem_History init")
        this.used = range(ponits_num).map((i) => 0)
        console.log("used:",this.used)
    }
    private getMemUsage(callback: Function) {
        chrome.system.memory.getInfo(function(info) {
            callback(info)
        })
    }
    private show() {
        let _this=this
        let history = {
            "labels": range(ponits_num).map(() => ""),
            "datasets": [
                {
                    "fillColor": "rgba(220,220,220,0.5)",
                    "data": _this.used
                }
            ]
        };

        let now = [
            {
                "value": _this.used[ponits_num - 1],
                "color": "rgba(220,220,220,0.7)"
            },
            {
                "value": 100 - _this.used[ponits_num - 1],
                "color": "rgba(220,220,220,0.3)"
            }
        ];
        let his_ctx = (<HTMLCanvasElement>document.getElementById('mem_history')).getContext("2d");
        let now_ctx = (<HTMLCanvasElement>document.getElementById("mem_total")).getContext("2d");
        if (!this.mem_chart_line || !this.mem_chart_pie) {
            this.mem_chart_line = new Chart(his_ctx)
            this.mem_chart_pie = new Chart(now_ctx)
        }
        this.mem_chart_line.Line(history, {scaleFontSize:4,pointDot:false,animation:false});
        this.mem_chart_pie.Pie(now, {segmentShowStroke:false,animation:false});
    }
    update() {
        let _this = this
        this.getMemUsage(function(info: MemoryInfo) {
            _this.used.shift()
            _this.used.push(Math.round((info.capacity - info.availableCapacity) / info.capacity * 100))
            _this.show()
        })

    }
}



class Cpu_History {
    private user: number[]
    private kernel: number[]
    private total: number[]
    private last_user: number[]
    private last_kernel: number[]
    private last_total: number[]
    private cpu_chart_pie: Chart
    private cpu_chart_line: Chart
    constructor(mem_history:Mem_History) {

        this.user = range(ponits_num).map((i) => 0)
        this.kernel = range(ponits_num).map((i) => 0)
        this.total = range(ponits_num).map((i) => 0)
        this.last_total = []
        this.last_user = []
        this.last_kernel = []
        let _this=this

        chrome.system.cpu.getInfo(function(info) {

            for (let i of range(info.processors.length)) {
                _this.last_total.push(info.processors[i].usage.total)
                _this.last_user.push(info.processors[i].usage.user)
                _this.last_kernel.push(info.processors[i].usage.kernel)
            }
        function _update(){
            mem_history.update()
            _this.update()
        }
        console.log("start")
        setInterval(_update, 1000)
        })
    }
    private getCpuUsage(callback: Function) {
        let _this = this
        chrome.system.cpu.getInfo(function(info) {
            let total = 0
            let user = 0
            let kernel = 0
            console.log("info:")
            console.log(info)
            for (let i of range(info.processors.length)) {
                total += info.processors[i].usage.total - _this.last_total[i]
                _this.last_total[i] = info.processors[i].usage.total
                user += info.processors[i].usage.user - _this.last_user[i]
                _this.last_user[i] = info.processors[i].usage.user
                kernel += info.processors[i].usage.kernel - _this.last_kernel[i]
                _this.last_kernel[i] = info.processors[i].usage.kernel
            }
            user = Math.round(user / total * 100)
            kernel = Math.round(kernel / total * 100)
            callback({ user: user, kernel: kernel, total: user + kernel })
        })
    }

    private show() {
        console.log("Cpu show")
        let _this = this
        let history = {
            "labels": range(ponits_num).map(() => ""),
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
        }
        console.log("history")
        console.log(history)
        let now = [
            {
                "value": _this.total[ponits_num - 1],
                "color": "rgba(220,220,220,0.7)"
            },
            {
                "value": 100 - _this.total[ponits_num - 1],
                "color": "rgba(220,220,220,0.3)"
            }
        ]
        console.log("now")
        console.log(now)
        let his_ctx = (<HTMLCanvasElement>document.getElementById('cpu_history')).getContext("2d")
        let now_ctx = (<HTMLCanvasElement>document.getElementById("cpu_total")).getContext("2d")
        if (!this.cpu_chart_line || !this.cpu_chart_pie) {
            this.cpu_chart_line = new Chart(his_ctx)
            this.cpu_chart_pie = new Chart(now_ctx)
        }
        this.cpu_chart_line.Line(history, {scaleFontSize:4,pointDot:false,animation:false});
        this.cpu_chart_pie.Pie(now, {segmentShowStroke:false,animation:false});
    }
    update() {
        console.log("Cpu update")
        let _this = this
        this.getCpuUsage(function(usage: ProcessorUsage) {
            _this.user.shift()
            _this.user.push(usage.user)
            _this.kernel.shift()
            _this.kernel.push(usage.kernel)
            _this.total.shift()
            _this.total.push(usage.total)
            _this.show()
        })
    }
}

let mem_history = new Mem_History()
let cpu_history = new Cpu_History(mem_history)
