const today = new Date(), params = localParam();

function postLineList(city, time, route, page, size, callFuc) {
    time = time ? time : 0;
    const params = $.param({time: time, route: route, page: page, size: size});
    const url = "/api/city/" + encodeURIComponent(city) + "/routes?" + params;
    getJson(url, function (data) {
        const sData = data["data"]["data"];
        const iDate = data["data"];
        $.each(sData, function (n, j) {
            sData[n]["startTime"] = Context.getTime(j["startTime"]);
            sData[n]["userinfo"]["carModel"] = Context.getCarBrand(j["userinfo"]["carModel"]);
        });
        callFuc(sData, iDate);
    })
}

function wxConfig(wx, msg) {
    if (!wx) return;
    const htConfig = {title: msg.title, desc: msg.desc, link: msg.url, imgUrl: msg.imgurl};
    wx.onMenuShareAppMessage(htConfig);
    wx.onMenuShareTimeline(htConfig);
    wx.onMenuShareQQ(htConfig);
    wx.onMenuShareQZone(htConfig);
}

function handleRoutes(self, routes, extend) {
    if (extend == false) {
        self.listData = [];
    }
    for (let k = 0; k < routes.length; k++) {
        const item = routes[k];
        const time = self.timeMarkMap.latest_time;
        item.today = new Date(item.created_at * 1000).toString().substr(0, 15);
        if ((!time[item.today]) || time[item.today] < item.created_at) {
            time[item.today] = item.created_at;
        }
        self.listData.push(item);
    }
    for (let k = 0; k < routes.length; k++) {
        self.timeMarkMap.addItem(routes[k]);
    }
}
function fetchData($self, city, route, time, page, size, callback) {
    if (typeof(size) == "undefined") size = 15;
    route = route ? route : 0;
    if (location.href.indexOf("#day=") >= 0) {
        const t = location.href.match(/day=(\d+)/);
        time = t[1];
        $self.info.time = Number.parseInt(time);
        location.href = location.href.replace(/day=\d+/, '');
    }
    postLineList(city, time, route, page, size, function (data, pageData) {
        const routes = pageData["routes"];
        if (page > 1) {
            handleRoutes($self, data, true);
        } else {
            if ($self.des == "") {
                if (routes && routes.length) {
                    const r = routes[0];
                    $self.$set('des', r.des);
                    $self.info.route = r.id;
                    if (r.src) {
                        $self.$set('origin', r.src);
                    }
                }
            }
            if (routes.length > 0) {
                $self.$set('routes', routes);
            }
            handleRoutes($self, data, false);
        }
        $self.$set('page', pageData["page"]);
        $self.$set('pagetotal', pageData["pagetotal"]);
        if (Number.parseInt(page) == 1) {
            if (typeof(jWeixin) != 'undefined' && pageData['wx'] && pageData['wx'].msg) {
                const msg = pageData['wx'].msg;
                msg.link = msg.url = location.href.split('#')[0];
                wxConfig(jWeixin, msg);
            }
        }
        if (callback) {
            callback.endPullupToRefresh(page >= $self.pagetotal);
            if (data.length < size && page == 1) {
                callback.disablePullupToRefresh();
            } else if (page == 1 && data.length == size) {
                callback.enablePullupToRefresh();
            }
        }
        $self.is_ready = true;
    });
}

function dateJson(pdate) {
    const dayNames = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const dayNames2 = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const reg = /\d+/g;
    let d = new Date();
    if (pdate != undefined) {
        const temp = pdate.match(reg);
        d = new Date(temp[0], parseInt(temp[1]) - 1, temp[2]);
    }
    const sYear = d.getFullYear();
    const sM = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
    const sD = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    const sW = dayNames[d.getDay()];
    const sW2 = dayNames2[d.getDay()];
    const numDate = sYear + '-' + sM + '-' + sD;
    const ZhDate = sM + '-' + sD + ' ' + sW2;
    const unixTime = Context.getUnix(numDate);
    return {'numDate': numDate, 'ZhDate': ZhDate, 'unixTime': unixTime}
}
Vue.config.delimiters = ['@{', '}'];
Vue.filter("pubMark", function (time) {
    if (!time) {
        return ''
    }
    const ts = new Date(time * 1000);
    const month = ts.getMonth() + 1;
    const day = ts.getDate();
    let data = month + "月" + day + "日 " + ts.toString().substr(16, 5);
    if (today.getDate() == ts.getDate()) {
        data = data.substr(6);
    }
    return data;
});

const vmSearch = new Vue({
    el: "body",
    data: function () {
        const markMap = {
            headerMark: [],
            latest_time: {},
            addItem: function (item) {
                let k = Number.parseInt(item.created_at / 300);
                if (item.routeinfo.is_driver == 0 || item.userinfo.verified && item.routeinfo.is_driver == 1) {
                    k = Number.parseInt(this.latest_time[item.today] / 300);
                }
                if (this[k] === undefined) {
                    this[k] = [];
                }
                this[k].push(item.id);
            },
            buildTime: function (item) {
                let k = Number.parseInt(item.created_at / 300), key = k;
                if (item.routeinfo.is_driver == 0 || item.userinfo.verified && item.routeinfo.is_driver == 1) {
                    k = Number.parseInt(this.latest_time[item.today] / 300);
                }
                let ts = item.created_at;
                if (this[k] == undefined) {
                    ts = item.created_at;
                } else if (this[k].indexOf(item.id) == 0) {
                    ts = key == k ? item.created_at : this.latest_time[item.today];
                } else {
                    ts = 0;
                }
                return ts;
            }
        };
        return {
            info: {time: 0, route: 0, limit: 15}, userInfo: {}, isCp: false,
            origin: "", des: '', routes: [], listData: [], page: 0,
            params: localParam(), timeMarkMap: markMap, is_ready: false,
            pagetotal: 0, city: '', dateJson: {}, sms: {status: 0, time: 60},
            status: {showLoginForm: 0}
        };
    },
    created: function () {
        this.checkCooperation();
        this.getHash();
        this.$set('dateJson', dateJson());
        this.getUserInfo();
        self = this;
        function pullUpRefresh() {
            self.pullUpUtil = this;
            self.pullUpRefresh(self.pullUpUtil);
        }

        mui.init({
            pullRefresh: {
                container: "#htRoutes",
                up: {
                    height: 50,
                    auto: true,
                    contentnomore: "没有更多数据了",
                    contentrefresh: "正在加载...",
                    callback: pullUpRefresh
                }
            }
        });
    },
    methods: {
        //获取哈希值
        getHash: function () {
            const params = this.params;
            if (typeof(params) == "undefined") {
                window.location.href = '/city/location?ref=location';
                return;
            }
            if (params.city) {
                const city = decodeURIComponent(params.city || "");
                this.$set('city', city);
            }
            this.info.route = params.route;
            this.info.time = params.day;
            if (!this.info.time) {
                this.info.time = new Date(new Date().toDateString()).getTime() / 1000;
            }
            this.info.time = Number.parseInt(this.info.time);
        },
        pullUpRefresh: function (callback) {
            fetchData(this, this.city, this.info.route, this.info.time, this.page + 1, this.info.limit, callback);
        },
        getUserInfo: function () {
            const self = this;
            postJson('/api/currentUser', function (data) {
                if (data['codee'] == 1) {
                    self.userInfo = data.data;
                    if (typeof(_hmt) == "undefined") return;

                    let val = "{v}:{wx}";
                    if (self.userInfo.verifed) {
                        val = val.replace("{v}", '认证车主');
                    } else {
                        val = val.replace("{v}", '未认证');
                    }
                    if (self.userInfo.is_wx_fans) {
                        val = val.replace("{wx}", '关注了海獭GO');
                    } else {
                        val = val.replace("{wx}", '未关注');
                    }
                    if (params.utm_source) {
                        val = val + ":访问过" + params.utm_source;
                    }
                    _hmt.push(['_setCustomconst', 1, 'userType', val, 1]);
                    if (window.location.href && window.location.href.indexOf("#from_route_pub") > -1) {
                        self.routePub();
                    }
                }
            }, function () {
            }, function () {
            }, true);
        },
        callPhoneFuc: function (tel) { //拨打电话
            if (!tel) {
                return false;
            }
            window.location.href = 'tel:' + tel;
            const self = this;
            if (typeof(_hmt) != 'undefined') {
                // 记录页面,行为,点击项
                const cp = this.params.utm_source || '';
                _hmt.push(['_trackEvent', self.city, "p:" + tel, cp]);
            }
        },
        collectFuc: function (lineId, actionType, event) { //收藏
            // const id = lineId;
            // const thisEvent = $(event.target).parents('.collect');
            // const action = thisEvent.attr('data-type');
            // postForm('/api/lines/route/mine/favorite', {'routeid': id, 'action': action}, function (data) {
            //     if (action == 0) {
            //         thisEvent.find('em').removeClass('icon-collect-off').addClass('icon-collect-on active');
            //         thisEvent.attr('data-type', 1);
            //         thisEvent.find('i').text('已收藏');
            //     } else {
            //         thisEvent.find('em').removeClass('icon-collect-on').addClass('icon-collect-off active');
            //         thisEvent.attr('data-type', 0);
            //         thisEvent.find('i').text('收藏');
            //     }
            // });
        },
        checkCooperation: function () {
            const self = this;
            const url = window.location.href.toLowerCase();
            self.isCp = url.indexOf('utm_source') > 0;
        },
        routePicker: function (evt) {
            if ((!this.routes) || this.routes == 0) {
                return;
            }

            const picker = new mui.PopPicker(), self = this;
            const routeItems = [];
            const arrow = "<span class='iconfont icon-wangfan'></span>";
            const h = {};
            for (const r in self.routes) {
                if (!self.routes.hasOwnProperty(r)) continue;
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
                self.info.route = d.id;
                fetchData(self, self.city, d.id, self.info.time, 1, 10, self.pullUpUtil);
                const args = {city: self.city, route: d.id};
                localStorage.setItem("page:loc:user:latest", JSON.stringify(args));
            });
        },
        todayStr: function () {
            const today = new Date();
            return "" + (today.getMonth() + 1) + "." + today.getDate();
        },
        gotoPay: function (user) {
            window.location.href = "/user/pay?userid=" + user.id;
        },
        lineIsDriver: function (line) {
            try {
                const is_driver = line.routeinfo.is_driver;
                return (is_driver === "0" || is_driver === 0 ) ? 0 : 1
            } catch (e) {
                return 1;
            }
        },
        routePub: function () {
            const self = this;
            const city = this.origin || this.city;
            const route = this.info.route;
            let url = "/city/publish?city=@{1}&id=@{2}#@{cp_conf}"
                .replace("@{1}", encodeURIComponent(city)).replace("@{2}", route), cp_conf = '';
            if (self.isCp) {
                if (self.params && self.params.utm_source)
                    cp_conf = "&utm_source=" + encodeURIComponent(this.params.utm_source);
            }
            url = url.replace("#@{cp_conf}", cp_conf);

            if (self.userInfo && self.userInfo.id && self.userInfo.mobilePhoneNumber && self.userInfo.nickName) {
                window.location.href = url;
            } else if (self.userInfo && self.userInfo.id && self.userInfo.nickName) {
                self.status.showLoginForm = 1;
            } else {
                if (!window.haitago || !window.haitago.appID) {
                    mui.toast("配置错误， 请联系管理员");
                }
                let base = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=@{app_id}&response_type=code&scope=snsapi_userinfo&state=123&redirect_uri=";
                base = base.replace("@{app_id}", window.haitago.appID);
                const next = "?next=" + encodeURIComponent(window.location.href + "##from_route_pub");
                window.location.href = base + "http%3A%2F%2F" + window.location.host + "%2Fweixin%2Fredirectback" + encodeURIComponent(next);
            }
        },
        checkRouteStatus: function (is_driver) {
            if (is_driver == 1 || is_driver == "1") {
                mui.toast("车满了");
            } else {
                mui.toast("有车了");
            }
        },
        mobileLogin: function () {
            const self = this;
            let mobile = document.querySelector('input[name=mobile]');
            let captcha = document.querySelector('input[name=code]');
            if (mobile && captcha) {
                try {
                    mobile = mobile.value.toString().trim();
                    captcha = captcha.value.toString().trim();
                } catch (e) {
                    mobile = captcha = "";
                }
            }
            if (!mobile || !captcha) {
                mui.toast("请填写正确的信息");
                return false;
            }
            const form = {mobile: mobile, code: captcha};
            const url = "/api/user/captcha/check";
            $.post(url, form, function (r) {
                if (r.codee == '1') {
                    if (location.href.indexOf("#from_list_routes") > -1) {
                        location.href = "/myroute";
                    }  else if(location.href.indexOf("#from_route_pub") > -1) {
                        location.href = "/city/publish?" + $.param({city: self.city, route: self.info.route});
                    }
                    return;
                }
                mui.toast("手机号或者验证码错误");
            });
        },
        sendSMS: function () {
            let txtMobile = document.querySelector("input[name=mobile]");
            let mobile = txtMobile.value;
            mobile = mobile.toString().trim();
            if (!mobile) {
                mui.toast("请输入手机号");
                return;
            } else if (!/1\d{10}/.test(mobile)) {
                mui.toast("请输入正确的手机号");
                return;
            }

            const url = "/api/getLoginSmsCode";
            let form = {mobile: mobile};
            const self = this;
            $.post(url, form, function (r, code) {
                if (r.codee == "1") {
                    mui.toast("发送成功，请等待短信验证码");
                    self.sms.time = 60;
                    self.sms.status = 1;
                    const time_count = function () {
                        if (self.sms.time <= 0) {
                            self.sms.status = 0;
                            return;
                        }
                        self.sms.time -= 1;
                        setTimeout(time_count, 1000)
                    };
                    setTimeout(time_count, 1000);
                } else if (r.message) {
                    mui.toast(r.message);
                } else {
                    mui.toast("未知错误，请联系管理员");
                }
            });
        },
        showLineExtra: function (line) {
            const user = line.userinfo;
            if (!user) {
                return false;
            }
            return !!(user.carModel.toString().trim() || user.weixin_payurl.toString().trim() || user.zhifubao_payurl.toString().trim());
        },
        closeLoginForm: function () {
            this.status.showLoginForm = 0;
        },
        listRoutes: function(){
            const self = this, target = "/myroute";
            if (self.userInfo && self.userInfo.id && self.userInfo.mobilePhoneNumber && self.userInfo.nickName) {
                window.location.href = target;
            } else if (self.userInfo && self.userInfo.id && self.userInfo.nickName) {
                self.status.showLoginForm = 1;
            } else {
                if (!window.haitago || !window.haitago.appID) {
                    mui.toast("配置错误，请联系管理员");
                }
                let base = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=@{app_id}&response_type=code&scope=snsapi_userinfo&state=123&redirect_uri=";
                base = base.replace("@{app_id}", window.haitago.appID);
                const next = "?next=" + encodeURIComponent(window.location.href + "##from_list_routes");
                window.location.href = base + "http%3A%2F%2F" + window.location.host + "%2Fweixin%2Fredirectback" + encodeURIComponent(next);
            }
        },
        tapCP: function(){
            if (typeof(_hmt) != "undefined") {
                const url = '/tap/routes/cp:{{form}}'.replace("{{from}}", params.utm_source);
                _hmt.push(['_trackPageview', url]);
            }
        }
    }
});

