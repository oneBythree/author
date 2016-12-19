"use strict";

const app = new Vue({
    el: "body",
    data: {
        status: {canSubmit: 1, showMask: false},
        info: {
            name: "",
            brand: "",
            city: "",
            mobile: "",
            wx: ""
        }
    },
    computed: {
        haveAllFields: function () {
            return this.info.name && this.info.city && this.info.mobile && this.info.wx;
        }
    },
    methods: {
        sendReq: function () {
            let city = document.querySelector("#city");
            city = city && city.value ? city.value : "";
            if (!city) {
                mui.toast("请输入城市");
                return;
            }
            let brand = document.querySelector("#brand");
            brand = brand && brand.value ? brand.value : "";

            let name = document.querySelector("#name");
            name = name && name.value ? name.value : "";
            if (!name) {
                mui.toast("请输入姓名");
                return;
            }

            let mobile = document.querySelector("#phone");
            mobile = mobile && mobile.value ? mobile.value : "";
            if (!mobile) {
                mui.toast("请输入手机号");
                return;
            }

            let wx = document.querySelector("#contact");
            wx = wx && wx.value ? wx.value : "";
            if (!wx) {
                mui.toast("请输入联系微信");
                return;
            }
            const url = "/friends/post-info", self=this;
            $.post(url, this.info, function (resp) {
                if (resp.codee == "1") {
                    self.status.showMask = true;
                } else if (resp.message){
                    mui.toast(resp.message);
                } else {
                    mui.toast("发生错误，请联系管理员");
                }
            });
        },
        closeMsg: function () {
            this.status.showMask = false;
        }
    }
});