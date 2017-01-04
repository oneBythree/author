"use strict";

var address = [
    "Beijing|北京市-北京市|bj|110000",
    "dongchengqu|北京市-东城区|dcq|110101",
    // "xichengqu|北京市-西城区|xcq|110102",
    // "chaoyangqu|北京市-朝阳区|cyq|110105",
    "fengtaiqu|北京市-丰台区|ftq|110106",
    "shijingshanqu|北京市-石景山区|sjsq|110107",
    "haidianqu|北京市-海淀区|hdq|110108",
    "mentougouqu|北京市-门头沟区|mtgq|110109",
    "fangshanqu|北京市-房山区|fsq|110111",
    "tongzhouqu|北京市-通州区|tzq|110112",
    "shunyiqu|北京市-顺义区|syq|110113",
    "changpingqu|北京市-昌平区|cpq|110114",
    "daxingqu|北京市-大兴区|dxq|110115",
    "huairouqu|北京市-怀柔区|hrq|110116",
    "pingguqu|北京市-平谷区|pgq|110117",
    "miyunqu|北京市-密云县|myq|110118",
    "yanqingqu|北京市-延庆县|yqq|110119",
    "Tianjin|天津市-天津|tj|120000",
    "hepingqu|天津市-和平区|hpq|120101",
    "hedongqu|天津市-河东区|hdq|120102",
    "hexiqu|天津市-河西区|hxq|120103",
    "nankaiqu|天津市-南开区|nkq|120104",
    "hebeiqu|天津市-河北区|hbq|120105",
    "hongqiaoqu|天津市-红桥区|hqq|120106",
    "dongliqu|天津市-东丽区|dlq|120110",
    "xiqingqu|天津市-西青区|xjq|120111",
    "jinnanqu|天津市-津南区|jnq|120112",
    "beichenqu|天津市-北辰区|bcq|120113",
    "wuqingqu|天津市-武清区|wqq|120114",
    "baodiqu|天津市-宝坻区|bdq|120115",
    "binhaixinqu|天津市-滨海新区|bhxq|120116",
    "ninghexian|天津市-宁河县|nh|120117",
    "jinghaixian|天津市-静海县|jhx|120118",
    "jixian|天津市-蓟县|jx|120119",
    "Shijiazhuang|河北省-石家庄|sjz|130100",
    "Shijiazhuang|河北省-石家庄|sjz|130100",
    "Baoding|河北省-保定|bd",
    "Baoding|河北省-保定|bd",
    "Cangzhou|河北省-沧州|cz",
    "Chengde|河北省-承德|cd",
    "Handan|河北省-邯郸|hd",
    "Hengshui|河北省-衡水|hs",
    "Langfang|河北省-廊坊|lf",
    "Qinhuangdao|河北省-秦皇岛|qhd",
    "Tangshan|河北省-唐山|ts",
    "Xingtai|河北省-邢台|xt",
    "Zhangjiakou|河北省-张家口|zjk",
    "Binzhou|山东省-滨州|bz",
    "Dezhou|山东省-德州|dz",
    "Dongying|山东省-东营|dy",
    "Heze|山东省-菏泽|hz",
    "Jinan|山东省-济南|jn",
    "Jining|山东省-济宁|jn",
    "Laiwu|山东省-莱芜|lw",
    "Liaocheng|山东省-聊城|lc",
    "Linyi|山东省-临沂|ly",
    "Qingdao|山东省-青岛|qd",
    "Rizhao|山东省-日照|rz",
    "Taian|山东省-泰安|ta",
    "Weihai|山东省-威海|wh",
    "Weifang|山东省-潍坊|wf",
    "Yantai|山东省-烟台|yt",
    "Zaozhuang|山东省-枣庄|zz",
    "Zibo|山东省-淄博|zb",
    "Changzhi|山西省-长治|cz",
    "Datong|山西省-大同|dt",
    "Jincheng|山西省-晋城|jc",
    "Jinzhong|山西省-晋中|jz",
    "Linfen|山西省-临汾|lf",
    "Lvliang|山西省-吕梁|ll",
    "Shuozhou|山西省-朔州|sz",
    "Taiyuan|山西省-太原|ty",
    "Xinzhou|山西省-忻州|xz",
    "Yangquan|山西省-阳泉|yq",
    "Yuncheng|山西省-运城|yc",
    "Ankang|陕西省-安康|ak",
    "Baoji|陕西省-宝鸡|bj",
    "Hanzhong|陕西省-汉中|hz",
    "Shangluo|陕西省-商洛|sl",
    "Tongchuan|陕西省-铜川|tc",
    "Weinan|陕西省-渭南|wn",
    "Xian|陕西省-西安|xa",
    "Xianyang|陕西省-咸阳|xy",
    "Yanan|陕西省-延安|ya",
    "Yulin|陕西省-榆林|yl",
    "Anyang|河南省-安阳|ay",
    "Hebi|河南省-鹤壁|hb",
    "Jiyuan|河南省-济源|jy",
    "Jiaozuo|河南省-焦作|jz",
    "Kaifeng|河南省-开封|kf",
    "Luoyang|河南省-洛阳|ly",
    "Nanyang|河南省-南阳|ny",
    "Pingdingshan|河南省-平顶山|pds",
    "Sanmenxia|河南省-三门峡|smx",
    "Shangqiu|河南省-商丘|sq",
    "Xinxiang|河南省-新乡|xx",
    "Xinyang|河南省-信阳|xy",
    "Xuchang|河南省-许昌|xc",
    "Zhengzhou|河南省-郑州|zz",
    "Zhoukou|河南省-周口|zk",
    "Zhumadian|河南省-驻马店|zmd",
    "LuoHe|河南省-漯河|lh",
    "PuYang|河南省-濮阳|py",
    "Daqing|河南省-大庆|dq",
    "Anqing|安徽-安庆aq",
    "Bangbu|安徽-蚌埠bb",
    "Chaohu|安徽-巢湖ch",
    "Chizhou|安徽-池州cz",
    "Chuzhou|安徽-滁州cz",
    "Fuyang|安徽-阜阳fy",
    "Hefei|安徽-合肥hf",
    "Huaibei|安徽-淮北hb",
    "Huainan|安徽-淮南hn",
    "Huangshan|安徽-黄山hs",
    "Liuan|安徽-六安la",
    "Maanshan|安徽-马鞍山mas",
    "Suzhou|安徽-宿州sz",
    "Tongling|安徽-铜陵tl",
    "Wuhu|安徽-芜湖|wh",
    "Xuancheng|安徽-宣城|xc",
    "BoZhou|安徽-亳州|bz",

    "Fuzhou|福建省-福州|fz",
    "Longyan|福建省-龙岩|ly",
    "Nanping|福建省-南平|np",
    "Ningde|福建省-宁德|nd",
    "Putian|福建省-莆田|pt",
    "Quanzhou|福建省-泉州|qz",
    "Sanming|福建省-三明|sm",
    "Xiamen|福建省-厦门|xm",
    "Zhangzhou|福建省-漳州|zz",
    "Baiyin|甘肃省-白银|by",
    "Dingxi|甘肃省-定西|dx",
    "Gannan|甘肃省-甘南|gn",
    "Jiayuguan|甘肃省-嘉峪关|jyg",
    "Jinchang|甘肃省-金昌|jc",
    "Jiuquan|甘肃省-酒泉|jq",
    "Lanzhou|甘肃省-兰州|lz",
    "Linxia|甘肃省-临夏|nx",
    "Longnan|甘肃省-陇南|ln",
    "Pingliang|甘肃省-平凉|pl",
    "Qingyang|甘肃省-庆阳|qy",
    "Tianshui|甘肃省-天水|ts",
    "Wuwei|甘肃省-武威|ww",
    "Zhangye|甘肃省-张掖|zy",
    "Chaozhou|广东省-潮州|cz",
    "DongGuan|广东省-东莞|dg",
    "Foshan|广东省-佛山|fs",
    "Guangzhou|广东省-广州|gz",
    "Heyuan|广东省-河源|hy",
    "Huizhou|广东省-惠州|hz",
    "Jiangmen|广东省-江门|jm",
    "Jieyang|广东省-揭阳|jy",
    "Maoming|广东省-茂名|mm",
    "Meizhou|广东省-梅州|mz",
    "Qingyuan|广东省-清远|qy",
    "Shantou|广东省-汕头|st",
    "Shanwei|广东省-汕尾|sw",
    "Shaoguan|广东省-韶关|sg",
    "Shenzhen|广东省-深圳|sz",
    "Yangjiang|广东省-阳江|yj",
    "Yunfu|广东省-云浮|yf",
    "Zhanjiang|广东省-湛江|zj",
    "Zhaoqing|广东省-肇庆|zq",
    "Zhongshan|广东省-中山|zs",
    "Zhuhai|广东省-珠海|zh",
    "Baise|广西省-百色|bs",
    "Beihai|广西省-北海|bh",
    "Chongzuo|广西省-崇左|cz",
    "Fangchenggang|广西省-防城港|fcg",
    "Guilin|广西省-桂林|gl",
    "Guigang|广西省-贵港|gg",
    "Hechi|广西省-河池|hc",
    "Hezhou|广西省-贺州|hz",
    "Laibin|广西省-来宾|lb",
    "Liuzhou|广西省-柳州|lz",
    "Nanning|广西省-南宁|nn",
    "Qinzhou|广西省-钦州|qz",
    "Wuzhou|广西省-梧州|wz",
    "Yulin|广西省-玉林|yl",
    "Anshun|贵州省-安顺|as",
    "Bijie|贵州省-毕节|bj",
    "Guiyang|贵州省-贵阳|gy",
    "Liupanshui|贵州省-六盘水|lps",
    "Qiandongnanmiaozudongzuzizhizhou|贵州省-黔东|qd",
    "Qiannanbuyizumiaozuzizhizhou|贵州省-黔南|qn",
    "Qianxinanbuyizumiaozuzizhizhou|贵州省-黔西|qx",
    "Tongren|贵州省-铜仁|tr",
    "Zunyi|贵州省-遵义|zy",
    "Baishalizuzizhixian|海南省-白沙|bs",
    "Baotinglizumiaozuzizhixian|海南省-保亭|bt",
    "Changjianglizuzizhixian|海南省-昌江|cj",
    "Chengmaixian|海南省-澄迈县|cm",
    "Dinganxian|海南省-定安县|ad",
    "Dongfang|海南省-东方|df",
    "Haikou|海南省-海口|hk",
    "Ledonglizuzizhixian|海南省-乐东|ld",
    "Lingaoxian|海南省-临高县|lg",
    "Lingshui|海南省-陵水|ls",
    "Qionghai|海南省-琼海|qh",
    "Qiongzhonglizumiaozuzizhixian|海南省-琼中|qz",
    "Sanya|海南省-三亚|sy",
    "Tunchangxian|海南省-屯昌县|tc",
    "Wanning|海南省-万宁|wn",
    "Wenchang|海南省-文昌|wc",
    "Wuzhishan|海南省-五指山|wzs",
    "DanZhou|海南省-儋州|dz",
    "Daxinganling|黑龙江省-大兴安岭|dxal",
    "Haerbin|黑龙江省-哈尔滨|heb",
    "Hegang|黑龙江省-鹤岗|hg",
    "Heihe|黑龙江省-黑河|hh",
    "Jixi|黑龙江省-鸡西|jx",
    "Jiamusi|黑龙江省-佳木斯|jms",
    "Mudanjiang|黑龙江省-牡丹江|mdj",
    "Qitaihe|黑龙江省-七台河|qth",
    "Qiqihaer|齐齐哈尔|qqhe",
    "Shuangyashan|黑龙江省-双鸭山|sys",
    "Suihua|黑龙江省-绥化|sh",
    "Yichun|黑龙江省-伊春|yc",
    "Ezhou|湖北省-鄂州|ez",
    "Enshitujiazumiaozuzizhizhou|湖北省-恩施|es",
    "Huanggang|湖北省-黄冈|hg",
    "Huangshi|湖北省-黄石|hs",
    "Jingmen|湖北省-荆门|jm",
    "Jingzhou|湖北省-荆州|jz",
    "Qianjiang|湖北省-潜江|qj",
    "Shennongjialinqu|湖北省-神农架|snj",
    "Shiyan|湖北省-十堰|sy",
    "Suizhou|湖北省-随州|sz",
    "Tianmen|湖北省-天门|tm",
    "Wuhan|湖北省-武汉|wh",
    "Xiantao|湖北省-仙桃|xt",
    "Xianning|湖北省-咸宁|xn",
    "Xiangfan|湖北省-襄樊|xf",
    "Xiaogan|湖北省-孝感|xg",
    "Yichang|湖北省-宜昌|yc",
    "Chibishi|湖北省-赤壁|cbs",
    "Changde|湖南省-常德|cd",
    "Changsha|湖南省-长沙|cs",
    "Chenzhou|湖南省-郴州|cz",
    "Hengyang|湖南省-衡阳|hy",
    "Huaihua|湖南省-怀化|hh",
    "Loudi|湖南省-娄底|ld",
    "Shaoyang|湖南省-邵阳|sy",
    "Xiangtan|湖南省-湘潭|xt",
    "Xiangxi|湖南省-湘西|xx",
    "Yiyang|湖南省-益阳|yy",
    "Yongzhou|湖南省-永州|yz",
    "Yueyang|湖南省-岳阳|yy",
    "Zhangjiajie|湖南省-张家界|zjj",
    "Zhuzhou|湖南省-株洲|zz",
    "Baicheng|吉林省-白城|bc",
    "Baishan|吉林省-白山|bs",
    "Changchun|吉林省-长春|cc",
    "Jilin|吉林省-吉林|jl",
    "Liaoyuan|吉林省-辽源|ly",
    "Siping|吉林省-四平|sp",
    "Songyuan|吉林省-松原|sy",
    "Tonghua|吉林省-通化|th",
    "Yanbian|吉林省-延边|yb",
    "Changzhou|江苏省-常州|cz",
    "Huaian|江苏省-淮安|ha",
    "Lianyungang|江苏省-连云港|lyg",
    "Nanjing|江苏省-南京|nj",
    "Nantong|江苏省-南通|nt",
    "Suzhou|江苏省-苏州|sz",
    "Suqian|江苏省-宿迁|sq",
    "Taizhou|江苏省-泰州|tz",
    "Wuxi|江苏省-无锡|wx",
    "Xuzhou|江苏省-徐州|xz",
    "Yancheng|江苏省-盐城|yc",
    "Yangzhou|江苏省-扬州|yz",
    "Zhenjiang|江苏省-镇江|zj",
    "Fuzhou|江苏省-抚州|fz",
    "Ganzhou|江西省-赣州|gz",
    "Jian|江西省-吉安|ja",
    "Jingdezhen|景德镇|jdz",
    "Jiujiang|江西省-九江|jj",
    "Nanchang|江西省-南昌|nc",
    "Pingxiang|江西省-萍乡|px",
    "Shangrao|江西省-上饶|sr",
    "Xinyu|江西省-新余|xy",
    "Yichun|江西省-宜春|yc",
    "Yingtan|江西省-鹰潭|yt",
    "Anshan|辽宁省-鞍山|as",
    "Benxi|辽宁省-本溪|bx",
    "Chaoyang|辽宁省-朝阳|cy",
    "Dalian|辽宁省-大连|dl",
    "Dandong|辽宁省-丹东|dd",
    "Fushun|辽宁省-抚顺|fs",
    "Fuxin|辽宁省-阜新|fx",
    "Huludao|辽宁省-葫芦岛|hld",
    "Jinzhou|辽宁省-锦州|jz",
    "Liaoyang|辽宁省-辽阳|ly",
    "Panjin|辽宁省-盘锦|pj",
    "Shenyang|辽宁省-沈阳|sy",
    "Tieling|辽宁省-铁岭|tl",
    "Yingkou|辽宁省-营口|yk",
    "Alashanmeng|内蒙古-阿拉善盟|alsm",
    "Bayannaoer|内蒙古-巴彦淖尔|byne",
    "Baotou|内蒙古-包头|bt",
    "Chifeng|内蒙古-赤峰|cf",
    "Eerduosi|内蒙古-鄂尔多斯|eeds",
    "Huhehaote|内蒙古-呼和浩特|hhht",
    "Hulunbeier|内蒙古-呼伦贝尔|hlbe",
    "Tongliao|内蒙古-通辽|tl",
    "Wuhai|内蒙古-乌海|wh",
    "Wulanchabushi|内蒙古-乌兰察布|wlcb",
    "Xilinguole|内蒙古-锡林郭勒|xlgl",
    "Xinganmeng|内蒙古-兴安盟|xam",
    "Guyuan|宁夏-固原|gy",
    "Shizuishan|宁夏-石嘴山|szs",
    "Wuzhong|宁夏-宁夏-吴忠|wz",
    "Yinchuan|宁夏-银川|yc",
    "Guoluocangzuzizhizhou|青海-果洛|gl",
    "Haibeicangzuzizhizhou|青海-海北|hb",
    "Haidong|青海-海东|hd",
    "Hainancangzuzizhizhou|青海-海南|hn",
    "Haixi|青海-海西|hx",
    "Huangnancangzuzizhizhou|青海-黄南|hn",
    "Xining|青海-西宁|xn",
    "Yushucangzuzizhizhou|青海-玉树|ys",
    "Shanghai|上海市-上海|sh",
    "Abacangzuqiangzuzizhizhou|四川省-阿坝|ab",
    "Bazhong|四川省-巴中|bz",
    "Chengdu|四川省-成都|cd",
    "Dazhou|四川省-达州|dz",
    "Deyang|四川省-德阳|dy",
    "Ganzi|四川省-甘孜|gz",
    "Guangan|四川省-广安|ga",
    "Guangyuan|四川省-广元|gy",
    "Leshan|四川省-乐山|ls",
    "Liangshan|四川省-凉山|ls",
    "Meishan|四川省-眉山|ms",
    "Mianyang|四川省-绵阳|my",
    "Nanchong|四川省-南充|nc",
    "Neijiang|四川省-内江|nj",
    "Panzhihua|四川省-攀枝花|pzh",
    "Suining|四川省-遂宁|sn",
    "Yaan|四川省-雅安|ya",
    "Yibin|四川省-宜宾|yb",
    "Ziyang|四川省-资阳|zy",
    "Zigong|四川省-自贡|zg",
    "LuZhou|四川省-泸州|lz",

    "Ali|西藏-阿里|al",
    "Changdu|西藏-昌都|cd",
    "Lasa|西藏-拉萨|ls",
    "Linzhi|西藏-林芝|lz",
    "Naqu|西藏-那曲|nq",
    "Rikaze|西藏-日喀则|rkz",
    "Shannan|西藏-山南|sn",
    "Akesu|新疆-阿克苏|aks",
    "Alaer|新疆-阿拉尔|ale",
    "Bayinguoleng|新疆-巴音郭楞|bygl",
    "Boertalamengguzizhizhou|新疆-博尔塔拉|betl",
    "Changjihuizuzizhizhou|新疆-昌吉|cj",
    "Hami|新疆-哈密|hm",
    "Hetian|新疆-和田|ht",
    "Kashi|新疆-喀什|ks",
    "Kelamayi|新疆-克拉玛依|klmy",
    "Kezilesukeerkezizizhizhou| 新疆-克孜|kz",
    "Shihezi| 新疆-石河子|shz",
    "Tumushuke| 新疆-图木舒克|tmsk",
    "Tulufan| 新疆-吐鲁番|tlf",
    "Wulumuqi| 新疆-乌鲁木齐|wlmq",
    "Wujiaqu| 新疆-五家渠|wjq",
    "Yili| 新疆-伊犁|yl",
    "Aletai|新疆-阿勒泰|alt",
    "Baoshan|云南省-保山|bs",
    "Chuxiongyizuzizhizhou|云南省-楚雄|cx",
    "Dali|云南省-大理|dl",
    "Dehongdaizujingpozuzizhizhou|云南省-德宏|dh",
    "Diqing|云南省-迪庆|dq",
    "Honghehanizuyizuzizhizhou|云南省-红河|hh",
    "Kunming|云南省-昆明|km",
    "Lijiang|云南省-丽江|lj",
    "Lincang|云南省-临沧|lc",
    "Nujianglilizuzizhizhou|云南省-怒江|nj",
    "Qujing|云南省-曲靖|qj",
    "Simao|云南省-思茅|sm",
    "Wenshanzhuangzumiaozuzizhizhou|云南省-文山|ws",
    "Xishuangbanna|云南省-西双版纳|xsbn",
    "Yuxi|云南省-玉溪|yx",
    "Zhaotong|云南省-昭通|zt",
    "Hangzhou|浙江省-杭州|hz",
    "Huzhou|浙江省-湖州|hz",
    "Jiaxing|浙江省-嘉兴|jx",
    "Jinhua|浙江省-金华|jh",
    "Lishui|浙江省-丽水|ls",
    "Ningbo|浙江省-宁波|nb",
    "Shaoxing|浙江省-绍兴|sx",
    // "Taizhou|浙江省-台州|tz",
    // "Wenzhou|浙江省-温州|wz",
    // "Zhoushan|浙江省-舟山|zs",
    // "QuZhou|浙江省-衢州|qz",
    // "Chongqing|重庆市-重庆|cq",
    // "Xianggang|香港-香港|xg",
    // "Aomen|澳门-澳门|am",
    // "Gaoxiong|高雄|gx",
    // "Hualian|花莲|hl",
    // "Jilong|基隆|jl",
    // "Jiayi|嘉义|jy",
    // "Taibei|台北|tb",
    // "Taidong|台东|td",
    // "Tainan|台南|tn",
    // "Taizhong|台中|tz",
    // "Zhongwei|中卫5|zw",
    // "Tacheng|塔城|tc",

    // "Wusulijiang|乌苏里江3|wslj ",
    "Shunde|广东省-顺德|sd "
];


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
            isEndCity: false,
            isStartCity: false,
            tempSelected: '',
            filterList: [],
            addressData: address,
            showListStart: false,
            showListEnd: false,
            commRouters: [],
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
                this.startCity = val.split('-')[1].trim();
                this.showListStart = false;
            } else {
                this.endCity = val.split('-')[1].trim();
                this.showListEnd = false;
            }
        },
        input: function(val, type) { // 城市输入
            if (type == 'start') {
                this.showListStart = val != '' ? true : false;
            } else if (type = "end") {
                this.showListEnd = val != '' ? true : false;
            } else if (type = "key") {

            }
        },
        blurInput: function(type) {
            var self = this;
            setTimeout(function() {
                if (type == 'start') {
                    self.showListStart = false;
                } else {
                    self.showListEnd = false;
                }
            }, 250)
        },
        linkRouters: function(id) {
            // console.log(id);
            if(!id) return
            location.href = 'http://test.haitat.com/user/routes/'+id;
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
    // watch: {
    //     filterList: function(cur, old) {
    //         console.log(cur.length)
    //         this.isStartCity = cur.length > 0 ? true : false;
    //     },
    //     startCity: function(cur, old) {
    //         this.tempSelected = cur;
    //     },
    //     endCity: function(cur, old) {
    //         this.tempSelected = cur;
    //     },
    //     // isStartCity:function(cur)
    //     // isCity: function(cur, old) {
    //     //     console.log(cur);
    //     // }
    // }
});
