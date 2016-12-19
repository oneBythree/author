let $ = window.$;

Vue.config.delimiters = ["@{", "}"];

function getCache(key) {
    let data = localStorage.getItem(key);
    data = data ? data : '[]';
    data = JSON.parse(data);
    let ret = [], set = {};
    for (let k in data) {
        if (!data.hasOwnProperty(k)) continue;
        let city = data[k];
        if (set[city.name]) continue;
        set[city.name] = 1;
        ret.push(city);
    }
    return ret;
}

function setCache(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

let vmLocation = new Vue({
    el: "body",
    data: {
        blurEvt: null,
        selected: {},
        cityList: [],
        map: {
            lines: []
        },
        search: $.map(window.location.search.split('&'), function(i, v){

        })
    },
    created: function() {
        this.init();
        this.historyList = this.getHistory();
        this.fetchCities();
        this.getMap();
    },
    computed: {
        querySet: function(){
            if (!this.query) {
                return []
            }
            let cities = this.cityList, chars = {}, self = this;
            for (let c in Object.keys(cities)) {
                $.extend(chars, cities[c]);
            }
            let tmp="", result=[];
            $.each(Object.keys(chars), function(p, v){
                let items = chars[v].items;
                for (let n in items) {
                    if (!items.hasOwnProperty(n)) continue;
                    let t = items[n];
                    if (t.name.indexOf(self.query) != -1 || t.remark.indexOf(self.query.toLowerCase()) != -1) {
                        if (tmp.indexOf(t.remark) == -1) {
                            result.push(t);
                            tmp = tmp + "(" + t.remark + ")";
                        }
                    }
                }
            });
            return result;
        },
        localParam: function () {
            let search = window.location.search;
            let fn = function(str, reg) {
                if (str) {
                    let data = {};
                    str.replace(reg, function($0, $1, $2, $3) {
                        data[$1] = $3;
                    });
                    return data;
                }
            };
            return (fn(search, new RegExp("([^?=&]+)(=([^&]*))?", "g")));
        }
    },
    methods: {
        init: function () {
            let p = this.localParam;
            if(!p || typeof(p.smart) == 'undefined' || typeof(p.ref) == 'undefined')
                return;
            let key = "page:loc:user:latest", latest = JSON.parse(localStorage.getItem(key));
            if (latest === null) return;
            $('body').hide();
            let path = p.ref === "publish" ? "publish" : "routes";
            if (latest && latest.city) {
                if (latest.city.indexOf("%") != -1) {
                    latest.city = decodeURIComponent(latest.city);
                }
                window.location.replace("/city/{sub}?".replace('{sub}', path) + $.param(latest));
            }
        },
        clkChar: function (evt) {
            let t = evt.target;
            $("#city-pool").insertAfter($(t).parent(".city-row"));
            let g = t.dataset.group, c = t.dataset.char, src = this.cityList[g][c];
            this.selected = {char: c, group: g, list: src.items};
            $(".city-row .char").siblings().removeClass("active");
            $(t).addClass("active");
        },
        clkCity: function(evt){
            if (this.blurEvt) {
                clearTimeout(this.blurEvt);
                this.blurEvt = null;
            }
            let key = "city:history:names", history = getCache(key);
            history = history ? history : [];
            let t = evt.target, name = t.innerText.trim(), tid = Math.round(t.dataset.id || 0);
            if (name == this.map.location && this.map.lines.length == 0) {
                return;
            }
            let args = {city: name, route:tid};
            let p = $.param(args);
            $.each(history, function(k, v){
                if (v.name == name) {
                    history.splice(k);
                    return false;
                }
                return true;
            });
            history.unshift({name: name, route: tid});
            history = history.length > 6 ? history.slice(0, 6) : history;
            setCache(key, history);
            setCache("page:loc:user:latest", args);
            if (window.location.href.indexOf("ref=publish") > 0) {
                window.location.href = "/city/publish?" + p;
            }  else {
                window.location.href = "/city/routes?" + p;
            }
        },
        clkPlaceHolder: function(evt){
            let dom = evt.target;
            document.querySelector("div.ht-search").className += " ht-active";
            document.getElementById("ht-ipt-search").focus();
        },
        clkClear: function(){
            this.query = '';
            document.getElementById("ht-ipt-search").focus();
        },
        getHistory: function() {
            let routes = getCache("city:history:names") || [];
            let r = [];
            for (let i=0; i<routes.length;i++){
                if (routes[i].toString().trim()) {
                    r.push(routes[i].toString().trim());
                }
            }
            return routes;
        },
        fetchCities: function(){
            self = this;
            let url = "/api/lines/group/char";
            $.get(url, function(data){
                self.$set("cityList", data.data.cities);
                self.$set("hotList", data.data.hotList);
            });
        },
        getMap: function() {
            let self = this;
            $.get('/api/user/location', function(data) {
                if (data.data) {
                    self.$set('map', data["data"]);
                }
            })
        }
    }
});