'use strict';

//只能输入数字指令
Vue.directive('numberOnly', {
    bind: function() {
        this.handler = function() {
            this.el.value = this.el.value.replace(/\D+/, '')
        }.bind(this)
        this.el.addEventListener('input', this.handler)
    },
    unbind: function() {
        this.el.removeEventListener('input', this.handler)
    }
})

Vue.component('dialog-login', {
    template: '<div class="new-covers animated" transition="fadeIn" v-if="isLogin" ></div>' +
        '<div class="new-login animated" transition="fadeIn" v-if="isLogin">' +
        '<div class="content">' +
        '<img src="../images/login_pic.png" alt="" class="logo">' +
        '<form>' +
        '<div class="group-from">' +
        '<input class="tel" type="tel" v-model="tel" maxlength="11" placeholder="请输入手机号" style="ime-mode:Disabled" v-number-only>' +
        '</div>' +
        '<div class="group-from n-flex">' +
        '<input class="code flex-1" type="tel" v-model="code" maxlength="4" placeholder="请输入验证码" style="ime-mode:Disabled" v-number-only>' +
        '<a href="javascript:;" class="cell sendcode" :class="diableClass" @click="getCode()">{{sendButtonText}}</a>' +
        '</div>' +
        '<a href="javascript:;" class="submit" @click="loginAjax">登录</a>' +
        '</form>' +
        // '<a href="javascript:;" class="close" @click="closeLogin"></a>' +
        '</div>' +
        '</div>',
    props: {
        isLogin: {
            type: Boolean,
            require: true,
            default: false
        },
        tel: {
            type: Number,
            require: false,
        },
        code: {
            type: Number,
            require: false
        },
        isSend: {
            type: Boolean,
            require: true,
            default: false
        },
        sendButtonText: {
            type: String,
            require: true,
            default: '获取验证码'
        },
        diableClass: {
            type: String,
            require: true,
            default: '',
        }
    },
    ready: function() {
        this.vaildateIsLogin();
    },
    methods: {
        vaildateIsLogin: function() { //验证是否登录
            if (!!sessionStorage.getItem('user')) {
                this.isLogin = false;
            } else {
                this.isLogin = true;
            }
        },
        closeLogin: function() { //关闭登录
            this.isLogin = false;
        },
        getCode: function() { //获取验证码
            var that = this;
            if (that.isSend) {
                return false;
            }
            const regPhone = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
            if (that.tel == '') {
                $.ModuleTip({ 'txt': '手机号不能为空' });
                return false;
            } else if (!regPhone.test(that.tel)) {
                $.ModuleTip({ 'txt': '请填写11位手机号' });
                return false;
            }
            const url = "http://test.haitat.com/api/user/mobile/captcha"; // 请求验证码url
            $.get(url, { mobile: that.tel }, function(r) {
                if (r.code == "1") {
                    setTime(60);
                } else if (r.code == "50020") {
                    $.ModuleTip({ 'txt': '手机号码错误' });
                }
            });

            function setTime(countdown) {
                if (countdown == 0) {
                    that.isSend = false;
                    that.sendButtonText = "获取验证码";
                    return;
                } else {
                    that.isSend = true;
                    that.sendButtonText = "已发送(" + countdown + ")";
                }
                setTimeout(function() {
                    setTime(--countdown)
                }, 1000);
            }
        },
        loginAjax: function() { //登录
            const url = "http://test.haitat.com/api/user/captcha/check";
            const self = this;

            $.get(url, { code: self.code, mobile: self.tel }, function(resp, statusCode) {
                if (resp.code == "1") {
                    self.isLogin = false;
                    sessionStorage.setItem('user', 'aaa'); //成功时候要加sessionStorage
                } else if (resp.code == "7") {
                    $.ModuleTip({ 'txt': '验证码不存在或者超时，请重试' });
                } else {
                    self.isLogin = false;
                    $.ModuleTip({ 'txt': resp.message });
                }
            });
        },
    },
    computed: {
        diableClass: function() {
            return this.isSend ? 'disable' : '';
        }
    }

})
