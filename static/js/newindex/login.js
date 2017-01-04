"use strict";Vue.directive("numberOnly",{bind:function(){this.handler=function(){this.el.value=this.el.value.replace(/\D+/,"")}.bind(this),this.el.addEventListener("input",this.handler)},unbind:function(){this.el.removeEventListener("input",this.handler)}}),Vue.component("dialog-login",{template:'<div class="new-covers animated" transition="fadeIn" v-if="isLogin" ></div><div class="new-login animated" transition="fadeIn" v-if="isLogin"><div class="content"><img src="../images/login_pic.png" alt="" class="logo"><form><input class="tel" type="tel" v-model="tel" maxlength="11" placeholder="请输入手机号" " style="ime-mode:Disabled" v-number-only><div class="group-from table"><input class="code cell" type="tel"   v-model="code" maxlength="4" placeholder="请输入验证码" " style="ime-mode:Disabled" v-number-only><a href="javascript:;" class="cell" :class="diableClass" @click="getCode()">{{sendButtonText}}</a><!-- <a href="javascript:;">已发送（59）</a> --></div><a href="javascript:;" class="submit" @click="loginAjax">登录</a></form></div></div>',props:{isLogin:{type:Boolean,require:!0,default:!1},tel:{type:Number,require:!1},code:{type:Number,require:!1},isSend:{type:Boolean,require:!0,default:!1},sendButtonText:{type:String,require:!0,default:"获取验证码"},diableClass:{type:String,require:!0,default:""}},ready:function(){this.vaildateIsLogin()},methods:{vaildateIsLogin:function(){console.log(!!sessionStorage.getItem("user")),sessionStorage.getItem("user")?this.isLogin=!1:this.isLogin=!0},closeLogin:function(){this.isLogin=!1},getCode:function(){function e(i){return 0==i?(t.isSend=!1,void(t.sendButtonText="获取验证码")):(t.isSend=!0,t.sendButtonText="已发送("+i+")",void setTimeout(function(){e(--i)},1e3))}var t=this;if(t.isSend)return!1;var i=/^0?1[3|4|5|7|8][0-9]\d{8}$/;if(""==t.tel)return $.ModuleTip({txt:"手机号不能为空"}),!1;if(!i.test(t.tel))return $.ModuleTip({txt:"请填写11位手机号"}),!1;var s="http://test.haitat.com/api/user/mobile/captcha";$.get(s,{mobile:t.tel},function(t){"1"==t.code?e(60):"50020"==t.code&&$.ModuleTip({txt:"手机号码错误"})})},loginAjax:function(){var e="http://test.haitat.com/api/user/captcha/check",t=this;$.get(e,{code:t.code,mobile:t.tel},function(e,i){"1"==e.code?(t.isLogin=!1,sessionStorage.setItem("user","aaa")):"7"==e.code?$.ModuleTip({txt:"验证码不存在或者超时，请重试"}):(t.isLogin=!1,sessionStorage.setItem("user","aaa"),$.ModuleTip({txt:e.message}))})}},computed:{diableClass:function(){return this.isSend?"disable":""}}});