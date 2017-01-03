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
    template: '<div class="new-covers animated" transition="fadeIn" v-if="isLogin" @click="closeLogin"></div>' +
        '<div class="new-login animated" transition="fadeIn" v-if="isLogin">' +
        '<div class="content">' +
        '<img src="../images/login_pic.png" alt="" class="logo">' +
        '<form>' +
        '<input class="tel" type="tel" v-model="tel" maxlength="11" placeholder="请输入手机号" " style="ime-mode:Disabled" v-number-only>' +
        '<div class="group-from table">' +
        '<input class="code cell" type="tel"   v-model="code" maxlength="4" placeholder="请输入验证码" " style="ime-mode:Disabled" v-number-only>' +
        '<a href="javascript:;" class="cell" :class="diableClass" @click="getCode()">{{sendButtonText}}</a>' +
        '<!-- <a href="javascript:;">已发送（59）</a> -->' +
        '</div>' +
        '<a href="javascript:;" class="submit" @click="loginAjax">登录</a>' +
        '</form>' +
        '<a href="javascript:;" class="close" @click="closeLogin"></a>' +
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
        this.vaildateIsLogin()
    },
    methods: {
        vaildateIsLogin: function() { //验证是否登录

        },
        closeLogin: function() { //关闭登录
            this.isLogin = false;
        },
        getCode: function() { //获取验证码
            var that = this;
            var countdown = 60;
            settime();
            function settime() {
                if (countdown == 0) {
                    that.isSend = false;
                    that.sendButtonText = "获取验证码";
                } else {
                    that.isSend = true;
                    that.sendButtonText = "已发送(" + countdown + ")";
                    countdown--;
                }
                setTimeout(function() {
                    settime()
                }, 1000)
            }
        },
        loginAjax: function() { //登录

        },
    },
    computed: {
        diableClass: function() {
            return this.isSend ? 'disable' : '';
        }
    }

})
