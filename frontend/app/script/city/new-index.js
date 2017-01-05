"use strict";

Vue.transition('fadeIn', {
    enterClass: 'fadeIn',
    leaveClass: 'fadeOut'
});

Vue.transition('fadeDown', {
    enterClass: 'fadeInDownBig',
    leaveClass: 'fadeOutUpBig'
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
            showListEnd: false,
            commRouters: [],
            filterStartData: []
        }
    },
    ready: function() {
        this.initData();
    },
    methods: {
        initData: function() {
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
            // console.log(query)
            if (this.query == '' || this.query == undefined) {
                this.isSearchInLine = false;
            }
        },
        backIndex: function() {
            this.isSearchInLine = false;
        },
        cleanKey: function() {
            this.query = '';
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
                this.showListStart = false;
            } else {
                this.endCity = val.name;
                this.showListEnd = false;
            }
        },
        input: function(val, type) { // 城市输入
            // if (type == 'start') {
            //     this.showListStart = val != '' ? true : false;
            // } else if (type = "end") {
            //     this.showListEnd = val != '' ? true : false;
            // } 
        },
        blurInput: function(type) {
            // var self = this;
            // if (type == 'start') {
            //     self.showListStart = false;
            // } else {
            //     self.showListEnd = false;
            // }
            // setTimeout(function() {

            // }, 250)
        },
        linkRouters: function(id) {
            // console.log(id);
            if (!id) return
            location.href = 'http://test.haitat.com/user/routes/' + id;
        },
        addCommon: function() {
            if (this.startCity == '') {
                $.ModuleTip({ 'txt': '出发城市不能为空!' });
                return false;
            }
            if (this.endCity == '') {
                $.ModuleTip({ 'txt': '到达城市不能为空!' });
                return false;
            }
            this.commRouters.push({ 'startCity': this.startCity, 'endCity': this.endCity })
                // console.log(this.commRouters);
            this.closeAdd();
            //或者请求借口添加数据
        }
    },
    computed: {
        filterStartData: function() {
                // var filter = Vue.filter().ord;
            }
            // filterList: function(cur, old) {
            //     console.log(cur);
            // },
            //     // isStartCity: function() {
            //     //     console.log(this.filterList.length > 0)
            //     //     return this.filterList.length > 0 ? true : false;
            //     // },
            //     isEndCity: function() {
            //         return this.filterList.length > 0 && this.filterList[0] != 0 && this.endCity != '' ? true : false;
            //     }
    },

});
