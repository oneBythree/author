"use strict";
Vue.config.delimiters = ['@{', "}"];

const app = new Vue({
    el: '#entry-body',
    data: {
        info: {weixin_payurl: ''}
    },
    created: function () {
        this.getUserInfo();
    },
    methods: {
        getUserInfo: function () {
            const url = '/api/currentUser?page=be_driver', self = this;
            postJson(url, function (data) {
                const user = data['data'];
                self.user = user;
                self.info.weixin_payurl = user['weixin_payurl'];
            });
        }
    }
});
