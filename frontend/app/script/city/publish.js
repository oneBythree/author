//发布行程
const params = localParam(window.location.search);

function gen_time_items() {
    let minutes = [], items = [];
    for (let i = 0; i < 12; i++) {
        const d = (100 + i * 5).toString().substr(1, 2);
        minutes.push({text: d + "分", value: d})
    }
    for (let i = 0; i < 13; i++) {
        const d = (100 + i).toString().substr(1, 2);
        items.push({
            text: d + "点", children: minutes, value: i
        })
    }
    return items;
}

const PageTool = {
    loadForm: function (self) {
        if (sessionStorage.publishForm) {
            let data = JSON.parse(sessionStorage.publishForm);
            document.querySelector("#mobile").value = data.mobile;
            document.querySelector("#message").value = data.message;
            self.info.is_driver = data.is_driver;
            sessionStorage.publishForm = '';
        }
        if (sessionStorage.carInfo) {
            try {
                const car = JSON.parse(sessionStorage.carInfo);
                if (car && car.model && car.name) {
                    self.info.carInfo = car;
                }
            } catch (e) {
            }
        }
    },
    saveForm: function (self) {
        let info = {
            message: document.querySelector("#message").value,
            mobile: document.querySelector("#mobile").value,
            is_driver: self.info.is_driver
        };
        sessionStorage.publishForm = JSON.stringify(info);
    }
};

Vue.config.delimiters = ['@{', '}'];
const app = new Vue({
    el: "body",
    data: function () {
        const routes = JSON.parse(jQuery('#cityRoutes').val());
        const arrow = "<span class='iconfont icon-wangfan'></span>";
        for (let k = 0; k < routes.length; k++) {
            routes[k].text = decodeURIComponent(params.city) + arrow + routes[k].des + "（往返）";
        }
        const showMask = true;
        const isCp = location.search.indexOf("utm_source") > -1;
        return {
            des: routes[0].des,
            userInfo: {},
            routes: routes,
            info: {
                route_id: routes[0].id,
                is_driver: 1,
                carInfo: {name: "", model: 0},
                payment: [],
                delPayment: 0
            },
            context: {showMask: showMask, page_ready: false},
            isCp: isCp,
            holder: {
                1: "可说明 去哪儿，出发时间，可捎几人，价格等",
                0: "可说明 去哪儿，几人乘车，是否有大件行李等"
            }
        }
    },
    computed: {
        hasCarInfo: function () {
            const car = this.info.carInfo;
            return car && car.model && car.name.toString().trim();
        },
        carName: function () {
            return this.info.carInfo.name.toString().trim();
        },
        hasPayment: function(){
            const info = this.info;
            return info && info.payment && info.payment.length > 0;
        }
    },
    created: function () {
        this.getHash();
        this.$set("city", decodeURIComponent(params.city));
        this.getUserInfo();
    },
    methods: {
        //获取哈希值
        getHash: function () {
            let id = params.lineId, self = this;
            const history = localStorage.getItem('arryHistory');
            if (!(history === null || history == undefined || history == "" )) {
                const changHistory = eval(history);
                id = JSON.parse(changHistory[0]).id;
            }
            PageTool.loadForm(this);
        },
        //获取用户信息
        getUserInfo: function () {
            let self = this, url = '/api/currentUser';
            if (typeof(params.utm_source) !== "undefined") {
                url += "?utm_source=" + params.utm_source;
            }
            postJson(url, function (data) {
                self.context.page_ready = true;
                const user = data.data;
                self.userInfo = user;
                self.$set('nickName', user["nickName"]);
                self.$set('verified', user["verified"]);
                self.$set('driverRouteCount', user["driverRouteCount"]);
                self.$set('isWXFans', user["isWXFans"]);
                self.$set('isCp', user["isCp"]);
                if (self.isWXFans) {
                    self.context.showMask = false;
                }
                if (user.carModel && self.info.carInfo && !self.info.carInfo.model) {
                    let car = self.info.carInfo;
                    car.model = Math.round(user.carModel);
                    car.name = Context.getCarBrand(car.model);
                }
                if (user && user.weixin_payurl) {
                    self.info.payment.push(user.weixin_payurl);
                }
            });
        },
        changLine: function (event) {
            const changEl = $(event.target);
            const changType = changEl.attr('data-type');
            let start = '', stop = '';
            if (changType == 1) {
                changEl.attr('data-type', 2);
                start = this.stop;
                stop = this.start;
            } else {
                changEl.attr('data-type', 1);
                start = this.start;
                stop = this.stop;
            }
            $('#start').text(start);
            $('#stop').text(stop);
        },
        relocation: function () {
            window.location.href = "/city/location?ref=publish";
        },
        routePicker: function (evt) {
            const picker = new mui.PopPicker(), self = this, routeItems = [], h = {};
            const arrow = "<span class='iconfont icon-wangfan'></span>";
            for (let r = 0; r < self.routes.length; r++) {
                const item = self.routes[r];
                if (h[item.id] == 1) continue;
                const src = item.src || self.city;
                routeItems.push({
                    text: src + arrow + item.des + "（往返）",
                    id: item.id, des: item.des, src: src
                });
                h[item.id] = 1;
            }
            picker.setData(routeItems);
            picker.show(function (items) {
                const d = items[0];
                self.des = d.des;
                self.origin = d.src;
                const args = {city: self.city, route: d.id};
                self.info.route_id = d.id;
                localStorage.setItem("page:loc:user:latest", JSON.stringify(args));
            });
        },
        changeType: function (is_driver) {
            this.info.is_driver = is_driver === 1 ? 1 : 0;
        },
        maskTrigger: function (show) {
            if (typeof(params.utm_source) == 'undefined') {
                window.location.href = "/user/be-driver";
                return;
            }
            if (show === true) {
                this.context.showMask = true;
                return;
            } else if (show === false) {
                this.context.showMask = false;
                return;
            }
            this.context.showMask = !this.context.showMask;
        },
        fillPayment: function () {
            PageTool.saveForm(this);
            location.href = "/user/payment/edit";
        },
        nameIsNull: function () {
            const user = this.userInfo;
            let hasName = user && user.nickName && user.nickName.toString().trim();
            return !hasName;
        },
        getCarModel: function () {
            PageTool.saveForm(this);
            location.href = "/car-brand";
        },
        clearPayment: function () {
            this.info.delPayment = 1;
            this.info.payment = [];
        },
        clearModel: function () {
            this.info.carInfo = {};
        }
    }
});

//提交表单
$('.btn-submit').on('click', function (event) {
    const now = new Date();
    const resultUL = document.getElementById("resultUl");

    let nickname = document.getElementById("nickname");
    nickname = nickname && nickname ? nickname.value : '';
    if (nickname == '') {
        $.ModuleTip({'txt': '昵称不能为空'});
        return false;
    }
    let phone = document.getElementById("mobile");
    phone = phone && phone.value ? phone.value : '';

    const regNum = /^\d$/;
    const regPhone = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    if (phone == '') {
        $.ModuleTip({'txt': '手机号不能为空'});
        return false;
    } else if (!regPhone.test(phone)) {
        $.ModuleTip({'txt': '请填写11位手机号'});
        return false;
    }

    let model = document.getElementById("model");
    model = model && model.dataset && model.dataset.model ? model.dataset.model : '';

    let payment = '';
    const note = document.getElementById("message").value;
    if (note == '') {
        $.ModuleTip({
            'txt': '行程详情不能为空'
        });
        return false;
    } else if (note.length < 6) {
        $.ModuleTip({
            'txt': '行程详情长度不能小于6个字符'
        });
        return false;
    }
    let routeId = Math.round(document.querySelector("span[data-route]").dataset.route),
        reqData = {
            'is_driver': document.querySelector("div[data-driver]").dataset.driver,
            "del_payment": app.info.delPayment,
            'nickname': nickname,
            'lineId': routeId,
            'payment': payment,
            'phone': phone,
            'model': model,
            'note': note
        };
    const isCp = window.location.search.toLowerCase().indexOf('utm_source') > -1;
    const ext = isCp ? "?utm_source=" + params.utm_source : "";
    const url = '/api/lines/route/add' + ext;
    postForm(url, reqData, function (data) {
        window.location.href = '/city/routes?' + "city=" + params.city + "&route=" + reqData.lineId
            + ext.replace("?", "&");
    });
    if (typeof(_hmt) != "undefined" && params.utm_source) {
        const url = '/trace/{{from}}/publish'.replace("{{from}}", params.utm_source);
        _hmt.push(['_trackPageview', url]);
    }
    const city = (params.city && params.city.indexOf("%") == -1 ) ? params.city : decodeURIComponent(params.city);
    const args = {city: city, route: routeId};
    localStorage.setItem("page:loc:user:latest", JSON.stringify(args));
});
