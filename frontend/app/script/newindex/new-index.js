"use strict";

Vue.transition('fadeIn', {
    enterClass: 'fadeIn',
    leaveClass: 'fadeOut'
});

Vue.transition('fadeDown', {
    enterClass: 'fadeInDown',
    leaveClass: 'fadeOutUp'
});

// //只能输入数字指令
// Vue.directive('auto-focus', {
//     bind: function() {
//         var el = this.el;
//         this.el.addEventListener('input', el.foucs());
//     }
// })

Vue.filter('hundred', function(value) {
    return value > 100 ? '99+' : value;
});

var app = new Vue({
    el: '#newIndex',
    data: function data() {
        return {
            isSearchInLine: false,
            cityData: {
                name: '',
                pinyin: ''
            },
            recommendCitys: [],
            query: '', // 搜索关键字 （出发城市或目的城市）
            isAdd: false,
            startCity: "",
            endCity: "",
            tempSelected: '',
            filterList: [],
            addressData: address,
            startAddress: [],
            endAddress: [],
            showListStart: true,
            showListEnd: true,
            ajaxStart: '',
            ajaxEnd: '',
            commRouters: [],
            searchData: [],
            user: {},
            ulHeight: 'auto',
            panelHeight: 'auto',
            seachComputed: ''
        };
    },
    directives: {
        'auto-focus': function(value) {
            if (value) {
                var el = this.el;
                Vue.nextTick(function() {
                    el.focus();
                });
            }

        }
    },
    ready: function ready() {
        this.initData();
        this.resizeHeight();
    },
    methods: {
        initData: function initData() {
            // 初始化数据
            var that = this;
            var url = 'http://test.haitat.com/api/user/route/main';
            $.get(url, { "_": new Date().getTime() }, function(r) {
                if (r.code == "1") {
                    var locationData = sessionStorage.getItem('location');
                    if (!!locationData) {
                        // 刷新页面 防止出现定位城市
                        if (JSON.parse(locationData).hasOwnProperty('name')) {
                            that.cityData.name = JSON.parse(locationData).name;
                            that.cityData.pinyin = JSON.parse(locationData).pinyin;
                        } else {
                            that.cityData.name = '未定位';
                            that.cityData.pinyin = 'weidingwei';
                        }
                        that.recommendCitys = JSON.parse(locationData).recommend_city;
                    } else {
                        that.user = r.data.user;
                        if (r.data.user) {
                            sessionStorage.setItem("user", r.data.user);
                        } else {
                            sessionStorage.removeItem("user");
                        }
                        if (r.data.user.location.hasOwnProperty('city')) {
                            that.cityData.name = r.data.user.location.city;
                            that.cityData.pinyin = r.data.user.location.pinyin;
                        } else {
                            that.cityData.name = '未定位';
                            that.cityData.pinyin = 'weidingwei';
                        }
                        that.recommendCitys = r.data.recommend_city;
                    }
                    that.commRouters = r.data.top_lines;
                } else if (r.code == "50010") {
                    $.ModuleTip({ 'txt': r.message });
                }
                that.$emit("user-loaded", that.user);
            });
        },
        resizeHeight: function resizeHeight() {
            var that = this;
            $(window).resize(function(event) {
                if (that.seachComputed) {
                    var wHeight = $('body').height();
                    var panelTop = $('#panel').offset().top * 2;
                    var inputTop = $('a#seachWarp').offset().top;
                    var inputSearch = $('a#seachWarp').outerHeight();
                    var searchHeight = wHeight - inputSearch - inputTop - panelTop;
                    var panelHeight = wHeight - panelTop;
                    that.ulHeight = searchHeight + 'px';
                    that.panelHeight = panelHeight + 'px';
                } else {
                    that.panelHeight = 'auto';
                }
            });
        },
        showSearchInLine: function showSearchInLine() {
            //展示搜索inline
            this.isSearchInLine = true;
            var that = this;

            // setTimeout(function() {
            //     // 延迟获取焦点jq vue 不同步（bug）
            //     $('#searchInput').focus();
            // }, 200);
        },
        searchBlur: function searchBlur() {
            //输入框失去焦点&输入文字为空
            if (this.query == '' || this.query == undefined) {
                this.isSearchInLine = false;
                this.searchData = [];
            }
        },
        backIndex: function backIndex() {
            this.isSearchInLine = false;
            this.query = '';
            // this.panelHeight = 'auto';
        },
        cleanKey: function cleanKey() {
            // 清除关键字
            this.query = '';
            this.searchData = [];
            $('#searchInput').focus();
            // this.panelHeight = 'auto';
        },
        showAdd: function showAdd() {
            //展示添加
            this.isAdd = true;
        },
        closeAdd: function closeAdd() {
            //关闭添加
            this.isAdd = false;
            this.startCity = this.endCity = '';
        },
        selectedClick: function selectedClick(val, selected) {
            //点击提示

            if (selected == 'start') {
                this.startCity = val.name;
                this.ajaxStart = val;
                this.showListStart = false;
            } else {
                this.endCity = val.name;
                this.ajaxEnd = val;
                this.showListEnd = false;
            }
        },
        input: function input(val, type) {
            // 城市输入
            var self = this;
            if (type == 'start') {
                this.showListStart = !!val ? true : false;
                this.ajaxStart = '';
            } else if (type = "end") {
                this.showListEnd = !!val ? true : false;
                this.ajaxEnd = '';
                self.searchQuery(val);
            }
        },
        blurInput: function blurInput(type) {
            // 添加线路输入框失去焦点
            var that = this;
            setTimeout(function() {
                if (type == 'start') {
                    that.startCity = that.ajaxStart == '' ? '' : that.startCity; //隐藏为空 startCity制空
                    that.showListStart = false;
                } else {
                    that.endCity = that.ajaxEnd == '' ? '' : that.endCity; //隐藏为空 startCity制空
                    that.showListEnd = false;
                }
            }, 250);
        },
        enter: function enter() {
            // 输入框按回车不做操作，防止刷新
            return false;
        },
        linkRouters: function linkRouters(id) {
            //常用往返链接跳转
            if (!id) return;
            location.href = 'http://test.haitat.com/user/routes/' + id;
        },
        recommendRoute: function recommendRoute(recommendCity) {
            //点击推荐线路
            this.linkRouters(recommendCity.id);
            var that = this;
            var dataJson = { //添加数据
                'start': that.cityData.name,
                'end': recommendCity.name,
                'start_py': that.cityData.pinyin,
                'end_py': recommendCity.pinyin
            };

            that.ajaxAdd(dataJson);
        },
        addCommon: function addCommon() {
            // 添加路线
            var that = this;

            if (that.startCity == '') {
                $.ModuleTip({ 'txt': '出发城市不能为空' });
                return false;
            }

            if (that.endCity == '') {
                $.ModuleTip({ 'txt': '到达城市不能为空' });
                return false;
            }

            if (that.ajaxStart.code == that.ajaxEnd.name) {
                $.ModuleTip({ 'txt': '出发城市不能为到达城市' });
                return false;
            }

            var dataJson = { //添加数据
                'start': that.ajaxStart.name,
                'end': that.ajaxEnd.name,
                'start_py': that.ajaxStart.namef_full_py,
                'end_py': that.ajaxEnd.namef_full_py,
                'user': 1 // 测试用户 生产环境不用
            };
            that.ajaxAdd(dataJson);
        },
        searchQuery: function searchQuery(key) {
            //模糊搜索
            var that = this;
            // let url = '/api/user/city/suggest';
            that.searchData = []; // 每次查询前 将数据至零
            for (var k = 0; k < address.length; k++) {
                var v = address[k];
                if (!v || !v.name || !v.namef_full_py) {
                    continue;
                }
                var name = v.name;
                var py = v.namef_full_py.toLowerCase();
                if (name.indexOf(key) >= 0 || py.indexOf(key) >= 0) {
                    that.searchData.push({ name: name, pinyin: py, title: v.fullname, post_code: v.name_code });
                }
                if (that.searchData.length > 30) {
                    break;
                }
            }
        },
        selectedCity: function selectedCity(val) {
            //切换出发城市或目的城市
            if (!val) return;
            var that = this;
            if (val.hasOwnProperty('name')) {
                that.cityData.name = val.name;
                that.cityData.pinyin = val.pinyin;
            } else {
                that.cityData.name = '未定位';
                that.cityData.pinyin = 'weidingwei';
            }
            var url = '/api/user/city/switch';
            var dataJson = { city: val.name };
            $.get(url, dataJson, function(r) {
                if (r.code == "1") {
                    that.recommendCitys = r.data.items; // 重新获取推荐线路
                    val.recommend_city = r.data.items;
                    sessionStorage.setItem('location', JSON.stringify(val)); // 添加本地缓存
                } else if (r.code == "50010") {
                    $.ModuleTip({ 'txt': r.message });
                }
            });

            this.backIndex();
        },
        ajaxAdd: function ajaxAdd(dataJson) {
            // 添加常用路线ajax
            var that = this;
            var url = 'http://test.haitat.com/api/user/route/add';
            var falg = false;
            $.get(url, dataJson, function(r) {
                if (r.code == "1") {
                    var _id = r.data.id; //添加的路线的id
                    that.commRouters.map(function(item, index) {
                        if (item.id == _id) {
                            falg = true;
                            that.commRouters.splice(index, 1);
                        }
                    });
                    if (!falg) {
                        $.ModuleTip({ 'txt': '添加路线成功' });
                    } else {
                        $.ModuleTip({ 'txt': '路线已存在' });
                    }
                    that.commRouters.unshift({
                        'start': dataJson.start,
                        'end': dataJson.end,
                        'id': _id
                    }); // 添加路线
                } else if (r.code == "50010") {
                    $.ModuleTip({ 'txt': r.message });
                }
            });
            that.closeAdd(); //关闭添加弹窗
        }
    },
    computed: {
        filterList: function filterList() {
            var self = this;
            var result = [];
            for (var k = 0; k < address.length; k++) {
                var addr = address[k];
                if (addr.name.indexOf(this.query) > -1 || addr.namef_full_py.indexOf(this.query) > -1) {
                    result.push(addr);
                }
                if (result.length > 20) {
                    return result;
                }
            }
            return result;
        },
        seachComputed: function seachComputed() {
            return this.query != '' && this.isSearchInLine;
        },
        startAddress: function startAddress() {
            return !!this.startCity ? address : [];
        },
        endAddress: function endAddress() {
            return !!this.endCity ? address : [];
        }
    },
    watch: {
        seachComputed: function seachComputed(cur, old) {
            if (cur) {
                var wHeight = $('body').height();
                var panelTop = $('#panel').offset().top * 2;
                var inputTop = $('a#seachWarp').offset().top;
                var inputSearch = $('a#seachWarp').outerHeight();
                var searchHeight = wHeight - inputSearch - inputTop - panelTop;
                var panelHeight = wHeight - panelTop;
                this.ulHeight = searchHeight + 'px';
                this.panelHeight = panelHeight + 'px';
            } else {
                this.panelHeight = 'auto';
            }
        }
    }
});
