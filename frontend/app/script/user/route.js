"use strict";

//我的信息页面js
Vue.filter("user_route_time", function (v) {
    const date = new Date(v * 1000);
    const ts = moment(date);
    return ts.format("MM月DD H:mm");
});

Vue.config.delimiters = ["@{", "}"];
const app = new Vue({
    el: "body",
    data: function () {
        return {items: [], page: 0, pagetotal: 0}
    },
    ready: function () {
        this.getPulishRouteList();
    },
    methods: {
        getPulishRouteList: function () {
            const self = this;
            postJson('/api/lines/route/mine/listing', function (data) {
                $.each(data["data"]["data"], function (index, elIn) {
                    $.each(elIn["routes"], function (i, k) {
                        if (isToday(k["startDate"])) {
                            data["data"]["data"][index]["routes"][i]["startDate"] = '今天';
                        } else {
                            data["data"]["data"][index]["routes"][i]["startDate"] = Context.getZhDateMin(k["startDate"]).split(' ')[0];
                        }
                        data["data"]["data"][index]["routes"][i]["startTime"] = Context.getTime(k["startTime"]);
                    })
                });
                self.$set('items', data["data"]["data"]);
                self.$set('page', data["data"]["page"]);
                self.$set('pagetotal', data["data"]["pagetotal"]);
            })
        },
        changeTag: function (id, seatsTag, event) { //设置标签
            var changeId = id;
            var thisChangEl = $(event.target);
            var action = '';
            var self = this;
            if (thisChangEl.hasClass('active')) {
                action = (seatsTag == 1) ? '0,1' : '0,2';
            } else {
                action = (seatsTag == 1) ? '1,1' : '1,2';
            }
            postForm('/api/lines/route/mine/tag', {
                'routeid': changeId,
                'action': action
            }, function (data) {
                thisChangEl.siblings().removeClass('active');
                if (thisChangEl.hasClass('active')) {
                    thisChangEl.removeClass('active');
                    $.ModuleTip({
                        'txt': '已取消标签'
                    });
                } else {
                    thisChangEl.addClass('active');
                    $.ModuleTip({
                        'txt': '设置标签成功'
                    });
                }
            })
        },
        delPuhlishRoute: function (id, $event) {
            var parentUl = $(event.target).parents('ul');
            var parentLi = $(event.target).parents('li');
            var lengthSize = parentUl.attr('data-length');

            postForm('/api/lines/route/mine/cancel', {
                'routeid': id
            }, function (data) {
                if (lengthSize == 1) {
                    parentUl.remove();
                } else {
                    parentLi.remove();
                }
                $.ModuleTip({
                    'txt': '删除成功'
                });
            })

        },
        moreList: function (page) {
            var self = this;
            if (page + 1 > this.pagetotal) {
                $('.u-more').hide();
            } else {
                postForm('/api/lines/route/mine/listing', {
                    'page': page + 1
                }, function (data) {
                    $.each(data["data"]["data"], function (index, elIn) {
                        $.each(elIn["routes"], function (i, k) {
                            if (isToday(k["startDate"])) {
                                data["data"]["data"][index]["routes"][i]["startDate"] = '今天';
                            } else {
                                data["data"]["data"][index]["routes"][i]["startDate"] = Context.getZhDateMin(k["startDate"]).split(' ')[0];
                            }
                            data["data"]["data"][index]["routes"][i]["startTime"] = Context.getTime(k["startTime"]);
                            self.items.push(data["data"]["data"][index]);
                        });
                    });
                    self.page = data["data"]["page"];
                    self.pagetotal = data["data"]["pagetotal"];
                })
            }

        },
        isDriver: function (data) {
            if (typeof(data) == 'undefined') {
                return 1;
            }
            return data.routes[0].routeinfo.is_driver;
        },
        updateRoute: function (item) {
            const self = this, now = new Date();
            const url = "/api/routes/update";
            let data = {driver_route_id: item.routes[0].id};
            $.post(url, data, function (r) {
                if (r.codee != '1') {
                    mui.toast(r.message);
                    return;
                }
                let p = self.items.indexOf(item);
                self.items.splice(p, 1);
                item.routes[0].updated_at = now.getTime() / 1000;
                self.items.unshift(item);
                mui.toast("刷新置顶成功");
            });
        }
    }
});

// 判断是否是当天时间
function isToday(pdate) {
    var d = new Date;
    var today = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / 1000;
    var reg = /\d+/g;
    var foday = parseInt(pdate);
    if (today == foday) {
        return true;
    } else {
        return false;
    }
}
