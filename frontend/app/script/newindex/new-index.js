"use strict";

<<<<<<< HEAD

=======
>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
Vue.transition('fadeIn', {
    enterClass: 'fadeIn',
    leaveClass: 'fadeOut'
});

Vue.transition('fadeDown', {
    enterClass: 'fadeInDown',
    leaveClass: 'fadeOutUp'
<<<<<<< HEAD
});

Vue.filter('hundred', function(value) {
    return value > 100 ? '99+' : value;
});

var app = new Vue({
    el: '#newIndex',
    data: function data() {
=======
})

Vue.filter('hundred', function(value) {
    return value > 100 ? '99+' : value;
})


var app = new Vue({
    el: '#newIndex',
    data() {
>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
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
<<<<<<< HEAD
            // tempSelected: '',
            filterList: [],
            // addressData: address,
            startAddress: [],
            endAddress: [],
=======
            tempSelected: '',
            filterList: [],
            addressData: address,
>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
            showListStart: true,
            showListEnd: true,
            ajaxStart: '',
            ajaxEnd: '',
            commRouters: [],
            searchData: [],
<<<<<<< HEAD
            user: {},
            ulHeight: 'auto',
            panelHeight: 'auto',
            seachComputed: ''
        };
    },

    ready: function ready() {
=======
            ulHeight: 'auto',
            panelHeight: 'auto',
            seachComputed: '',
        }
    },
    ready: function() {
>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
        this.initData();
        this.resizeHeight();
    },
    methods: {
<<<<<<< HEAD
        initData: function initData() {
            // 初始化数据
            var that = this;
            var url = 'http://test.haitat.com/api/user/route/main';
            $.get(url, { "_": new Date().getTime() }, function(r) {
                if (r.code == "1") {
                    var locationData = sessionStorage.getItem('location');
                    if (!!locationData) {
                        // 刷新页面 防止出现定位城市
=======
        initData: function() { // 初始化数据
            var that = this;
            var url = 'http://test.haitat.com/api/user/route/main?user=1';
            $.get(url, {}, function(r) {
                if (r.code == "1") {
                    var locationData = sessionStorage.getItem('location')
                    if (!!locationData) { // 刷新页面 防止出现定位城市
>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
                        if (JSON.parse(locationData).hasOwnProperty('name')) {
                            that.cityData.name = JSON.parse(locationData).name;
                            that.cityData.pinyin = JSON.parse(locationData).pinyin;
                        } else {
                            that.cityData.name = '未定位';
                            that.cityData.pinyin = 'weidingwei';
                        }
                        that.recommendCitys = JSON.parse(locationData).recommend_city;
                    } else {
<<<<<<< HEAD
                        that.user = r.data.user;
                        if (r.data.user) {
                            sessionStorage.setItem("user", r.data.user);
                        } else {
                            sessionStorage.removeItem("user");
                        }
=======
>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
                        if (r.data.user.location.hasOwnProperty('city')) {
                            that.cityData.name = r.data.user.location.city;
                            that.cityData.pinyin = r.data.user.location.pinyin;
                        } else {
                            that.cityData.name = '未定位';
                            that.cityData.pinyin = 'weidingwei';
                        }
<<<<<<< HEAD
                        that.recommendCitys = r.data.recommend_city;
=======
                        that.recommendCitys = r.data.recommend_city
>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
                    }
                    that.commRouters = r.data.top_lines;
                } else if (r.code == "50010") {
                    $.ModuleTip({ 'txt': r.message });
                }
<<<<<<< HEAD
                that.$emit("user-loaded", that.user);
=======
>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
            });
        },
        resizeHeight: function() {
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
<<<<<<< HEAD
        showSearchInLine: function showSearchInLine() {
            //展示搜索inline
            this.isSearchInLine = true;
            var that = this;
            setTimeout(function() {
                // 延迟获取焦点jq vue 不同步（bug）
                $('#searchInput').focus();
            }, 200);
        },
        searchBlur: function searchBlur() {
            //输入框失去焦点&输入文字为空
=======
        showSearchInLine: function() { //展示搜索inline
            this.isSearchInLine = true;
            var that = this;
            setTimeout(function() { // 延迟获取焦点jq vue 不同步（bug）
                $('#searchInput').focus();
            }, 200)
        },
        searchBlur: function() { //输入框失去焦点&输入文字为空
>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
            if (this.query == '' || this.query == undefined) {
                this.isSearchInLine = false;
                this.searchData = [];
            }
        },
<<<<<<< HEAD
        backIndex: function backIndex() {
=======
        backIndex: function() {
>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
            this.isSearchInLine = false;
            this.query = '';
            // this.panelHeight = 'auto';
        },
<<<<<<< HEAD
        cleanKey: function cleanKey() {
            // 清除关键字
=======
        cleanKey: function() { // 清除关键字
>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
            this.query = '';
            this.searchData = [];
            $('#searchInput').focus();
            // this.panelHeight = 'auto';
        },
<<<<<<< HEAD
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

=======
        showAdd: function() { //展示添加
            this.isAdd = true;
        },
        closeAdd: function() { //关闭添加
            this.isAdd = false;
            this.startCity = this.endCity = '';
        },
        selectedClick: function(val, selected) { //点击提示
>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
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
<<<<<<< HEAD
        input: function input(val, type) {
            // 城市输入
            if (type == 'start') {
                this.showListStart = !!val ? true : false;
=======
        input: function(val, type) { // 城市输入
            if (type == 'start') {
                console.log(val)
                this.showListStart = !!this.startCity ? true : false;
                console.log(this.showListStart);
>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
                this.ajaxStart = '';
            } else if (type = "end") {
                this.showListEnd = !!val ? true : false;
                this.ajaxEnd = '';
            }
        },
<<<<<<< HEAD
        blurInput: function blurInput(type) {
            // 添加线路输入框失去焦点
=======
        blurInput: function(type) { // 添加线路输入框失去焦点
>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
            var that = this;
            setTimeout(function() {
                if (type == 'start') {
                    that.startCity = that.ajaxStart == '' ? '' : that.startCity; //隐藏为空 startCity制空
                    that.showListStart = false;
                } else {
                    that.endCity = that.ajaxEnd == '' ? '' : that.endCity; //隐藏为空 startCity制空
                    that.showListEnd = false;
                }
<<<<<<< HEAD
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
=======
            }, 250)
        },
        enter: function() { // 输入框按回车不做操作，防止刷新
            return false;
        },
        linkRouters: function(id) { //常用往返链接跳转
            if (!id) return
            location.href = 'http://test.haitat.com/user/routes/' + id;
        },
        recommendRoute: function(recommendCity) { //点击推荐线路
>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
            this.linkRouters(recommendCity.id);
            var that = this;
            var dataJson = { //添加数据
                'start': that.cityData.name,
                'end': recommendCity.name,
                'start_py': that.cityData.pinyin,
<<<<<<< HEAD
                'end_py': recommendCity.pinyin
            };

            that.ajaxAdd(dataJson);
        },
        addCommon: function addCommon() {
            // 添加路线
=======
                'end_py': recommendCity.pinyin,
                'user': 1 // 测试用户 生产环境不用
            }

            that.ajaxAdd(dataJson);
        },
        addCommon: function() { // 添加路线
>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
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
<<<<<<< HEAD
            };
            
            that.ajaxAdd(dataJson);
        },
        selectedCity: function selectedCity(val) {
            //切换出发城市或目的城市
            if (!val) return;
=======
            }
            that.ajaxAdd(dataJson);
        },
        selectedCity: function(val) { //切换出发城市或目的城市
            if (!val) return
>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
            var that = this;
            if (val.hasOwnProperty('name')) {
                that.cityData.name = val.name;
                that.cityData.pinyin = val.pinyin;
            } else {
                that.cityData.name = '未定位';
                that.cityData.pinyin = 'weidingwei';
            }
            var url = 'http://test.haitat.com/api/user/city/switch';
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
<<<<<<< HEAD
        },
        ajaxAdd: function ajaxAdd(dataJson) {
            // 添加常用路线ajax
=======

        },
        ajaxAdd: function(dataJson) { // 添加常用路线ajax
>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
            var that = this;
            var url = 'http://test.haitat.com/api/user/route/add';
            var falg = false;
            $.get(url, dataJson, function(r) {
                if (r.code == "1") {
<<<<<<< HEAD
=======

>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
                    var _id = r.data.id; //添加的路线的id
                    that.commRouters.map(function(item, index) {
                        if (item.id == _id) {
                            falg = true;
                            that.commRouters.splice(index, 1);
                        }
<<<<<<< HEAD
                    });
=======
                    })
>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
                    if (!flag) {
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
<<<<<<< HEAD
            });

            that.closeAdd(); //关闭添加弹窗
        }
    },
    computed: {
        filterList: function filterList() {
            var filter = Vue.filter('filterBy');
            return filter(address, this.query, 'name', 'namef_full_py', 'name_smart_py');
        },
        seachComputed: function seachComputed() {
            return this.query != '' && this.isSearchInLine;
        },
        startAddress: function() {
            return !!this.startCity ? address : [];
        },
        endAddress: function() {
            return !!this.endCity ? address : [];
        }
    },
    watch: {
        seachComputed: function seachComputed(cur, old) {
=======
                that.closeAdd(); //关闭添加弹窗
            });
        }

    },
    computed: {
        filterList: function() {
            var filter = Vue.filter('filterBy');
            return filter(address, this.query, 'name', 'namef_full_py', 'name_smart_py');
        },
        seachComputed: function() {
            return this.query != '' && this.isSearchInLine;
        }
    },
    watch: {
        seachComputed: function(cur, old) {
>>>>>>> a02624f6c8688fa00861d689d53c060bd1726699
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
