"use strict";

Vue.transition('fadeIn', {
    enterClass: 'fadeIn',
    leaveClass: 'fadeOut'
});

Vue.transition('fadeDown', {
    enterClass: 'fadeInDown',
    leaveClass: 'fadeOutUp'
})

var app = new Vue({
    el: '#newIndex',
    data() {
        return {
            isSearchInLine: false,
            city: '',
            recommendCitys: [],
            query: '', // 搜索关键字 （出发城市或目的城市）
            isAdd: false,
            startCity: "",
            endCity: "",
            tempSelected: '',
            filterList: [],
            addressData: address,
            showListStart: true,
            showListEnd: true,
            ajaxStart: '',
            ajaxEnd: '',
            commRouters: [],
            searchData: []
        }
    },
    ready: function() {
        this.initData();
    },
    methods: {
        initData: function() { // 初始化数据
            var that = this;
            var url = 'http://test.haitat.com/api/user/route/main?user=1';
            $.get(url, {}, function(r) {
                if (r.code == "1") {
                    that.city = r.data.user.location.hasOwnProperty('city') ? r.data.user.location.city : '未定位';
                    that.recommendCitys = r.data.recommend_city;
                    that.commRouters = r.data.top_lines;
                } else if (r.code == "50010") {
                    $.ModuleTip({ 'txt': r.message });
                }
            });
        },
        showSearchInLine: function() { //展示搜索inline
            this.isSearchInLine = true;
            setTimeout(function() { // 延迟获取焦点jq vue 不同步（bug）
                $('#searchInput').focus();
            }, 200)
        },
        searchBlur: function() { //输入框失去焦点&输入文字为空
            if (this.query == '' || this.query == undefined) {
                this.isSearchInLine = false;
            }
        },
        backIndex: function() {
            this.isSearchInLine = false;
        },
        cleanKey: function() { // 清除关键字
            this.query = '';
            $('#searchInput').focus();
        },
        searchQueryRouter: function(key) {
            console.log(key);
        },
        showAdd: function() { //展示添加
            this.isAdd = true;
        },
        closeAdd: function() { //关闭添加
            this.isAdd = false;
            this.startCity = this.endCity = '';
        },
        selectedClick: function(val, selected) { //点击提示
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
        input: function(val, type) { // 城市输入
            if (type == 'start') {
                this.showListStart = !!val ? true : false;
                this.ajaxStart = '';
            } else if (type = "end") {
                this.showListEnd = !!val ? true : false;
                this.ajaxEnd = '';
            }
        },
        blurInput: function(type) { // 添加线路输入框失去焦点
            var that = this;
            setTimeout(function() {
                if (type == 'start') {

                    that.startCity = that.ajaxStart == '' ? '' : that.startCity; //隐藏为空 startCity制空
                    that.showListStart = false;
                } else {
                    that.endCity = that.ajaxEnd == '' ? '' : that.endCity; //隐藏为空 startCity制空
                    that.showListEnd = false;
                }
            }, 250)
        },
        enter: function() { // 输入框按回车不做操作，防止刷新
            return false;
        },
        linkRouters: function(id) { //常用往返链接跳转
            if (!id) return
            location.href = 'http://test.haitat.com/user/routes/' + id;
        },
        addCommon: function() { // 添加路线
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


            var url = 'http://test.haitat.com/api/user/route/add';
            var dataJson = { //添加数据
                'start': that.ajaxStart.name,
                'end': that.ajaxEnd.name,
                'start_py': that.ajaxStart.namef_full_py,
                'end_py': that.ajaxEnd.namef_full_py,
                'user': 1 // 测试用户 生产环境不用
            }

            $.get(url, dataJson, function(r) {
                if (r.code == "1") {
                    that.commRouters.push({ 'start': that.ajaxStart.name, 'end': that.ajaxEnd.name, 'id': r.data.id }) // 添加路线
                } else if (r.code == "50010") {
                    $.ModuleTip({ 'txt': r.message });
                }
                that.closeAdd(); //关闭添加弹窗
            });
        },
        searchQuery: function(key) { //模糊搜索
            var that = this;
            var url = 'http://test.haitat.com/api/user/city/suggest';
            var _t = new Date().getTime();

            var dataJson = {
                q: key,
                t: _t
            }
            console.log(dataJson);

            $.get(url, dataJson, function(r) {
                if (r.code == "1") {
                    that.searchData = r.data.items;
                } else if (r.code == "50010") {
                    $.ModuleTip({ 'txt': r.message });
                }
            });
        },
        selectedCity: function(val) {
            if (!val) return
            this.city = val;
            this.backIndex();
        }
    }
});
