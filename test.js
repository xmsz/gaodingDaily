Bmob.initialize("1f83c3fb0dd43f84fb2e7c5b659c3d26", "e48ecaadf867fcf9dc94340b6dcf22aa");
var $http = axios.create({
    baseURL: 'https://mmmm.gaoding.com/api/',
    timeout: 1000,
    headers: { 'origin': 'https://mmmm.gaoding.com', 'content-type': 'application/json;charset=UTF-8', }
});

// 计算出最多的模板
function getCount(arr, rank, ranktype) {
    var obj = {}, k, arr1 = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        k = arr[i];
        if (obj[k])
            obj[k]++;
        else
            obj[k] = 1;
    }
    //保存结果{el-'元素'，count-出现次数}
    for (var o in obj) {
        arr1.push({ el: o, count: obj[o] });
    }
    //排序（降序）
    arr1.sort(function (n1, n2) {
        return n2.count - n1.count
    });
    //如果ranktype为1，则为升序，反转数组
    if (ranktype === 1) {
        arr1 = arr1.reverse();
    }
    var rank1 = rank || arr1.length;
    return arr1.slice(0, rank1);
}


function timeConvert(time, type = 'y/m/d h:m', zero = true) {
    let result = '';
    const now = new Date(time);
    const weekCn = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const getWeekCn = (week) => weekCn[week];
    const nowArray = [
        {
            name: 'y',
            val: now.getFullYear(),
        },
        {
            name: 'm',
            val: now.getMonth() + 1,
        },
        {
            name: 'd',
            val: now.getDate(),
        },
        {
            name: 'h',
            val: now.getHours(),
        },
        {
            name: 'm',
            val: now.getMinutes(),
        },
        {
            name: 's',
            val: now.getSeconds(),
        },
        {
            name: 'W',
            val: getWeekCn(now.getDay())
        },
    ];
    if (zero) {
        // 补0
        nowArray.map(it => {
            it.val = it.val < 10 ? '0' + it.val : it.val;
        });
    }

    let timeArray = type.split('');
    for (let i = 0; i < timeArray.length; i += 1) {
        for (let j = 0; j < nowArray.length; j += 1) {
            if (timeArray[i] === nowArray[j].name) {
                timeArray[i] = nowArray[j].val;
                result += timeArray[i];
                break;
            } else if (j === (nowArray.length - 1)) {
                result += timeArray[i];
            }
        }
    }
    return result;
};


window.app = new Vue({
    el: '#app',
    data: {
        message: '123',
        list: [{ "id": 508, "deleted": 0, "status": 1, "user_id": 196639, "source_id": 40447, "type": "poster", "platform_id": 64, "title": "换季清仓手机海报", "preview": { "url": "https://st-gdx.dancf.com/file/2528230/makeshot_20180126034400_9cb23_72415/out.png", "width": 1242, "height": 2208 }, "preview_lock": 0, "flags": "", "categories": 4, "colors": 272, "styles": 66064, "businesses": 550, "features": 0, "roles": 3, "ratios": 0, "festivals": 0, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "115.239.170.134", "last_download_at": null, "download_count": 0, "created_at": 1516938241, "updated_at": 1516938241, "user": { "id": 196639, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "ae1ddd35e0c20c113e5bdb208a0e43b7", "nick": "", "mobile": "", "avatar": "", "source": "", "last_ip": "115.239.170.134", "last_screen_width": 1440, "last_screen_height": 900, "last_ua": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36", "created_at": 1516938207, "updated_at": 1516938207 } }, { "id": 507, "deleted": 0, "status": 1, "user_id": 196646, "source_id": 40332, "type": "poster", "platform_id": 32, "title": "过年不打烊电商banner", "preview": { "url": "https://st-gdx.dancf.com/file/2528230/makeshot_20180126034358_3ed74_176/out.png", "width": 1920, "height": 520 }, "preview_lock": 0, "flags": "", "categories": 4, "colors": 2120, "styles": 65672, "businesses": 112, "features": 0, "roles": 7, "ratios": 0, "festivals": 125, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "113.26.226.151", "last_download_at": null, "download_count": 0, "created_at": 1516938238, "updated_at": 1516938238, "user": { "id": 196646, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "5e284cfba79b47f4b00488aeef207875", "nick": "", "mobile": "", "avatar": "", "source": "", "last_ip": "113.26.226.151", "last_screen_width": 1920, "last_screen_height": 1080, "last_ua": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36", "created_at": 1516938230, "updated_at": 1516938230 } }, { "id": 506, "deleted": 0, "status": 1, "user_id": 145097, "source_id": 40294, "type": "poster", "platform_id": 64, "title": "新年新资讯关注二维码", "preview": { "url": "https://st-gdx.dancf.com/file/2528230/makeshot_20180126034215_caab0_132/out.png", "width": 900, "height": 500 }, "preview_lock": 0, "flags": "", "categories": 8, "colors": 64, "styles": 98464, "businesses": 1, "features": 0, "roles": 1089, "ratios": 0, "festivals": 123, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "175.11.31.143", "last_download_at": null, "download_count": 0, "created_at": 1516938135, "updated_at": 1516938135, "user": { "id": 145097, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "596ed34beb824093b062adbb8e718b38", "nick": "", "mobile": "", "avatar": "", "source": "ps_menu", "last_ip": "175.11.31.143", "last_screen_width": 1600, "last_screen_height": 900, "last_ua": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36", "created_at": 1516246272, "updated_at": 1516937507 } }, { "id": 505, "deleted": 0, "status": 1, "user_id": 196540, "source_id": 40190, "type": "poster", "platform_id": 64, "title": "腊八抢年货公众号首图", "preview": { "url": "https://st-gdx.dancf.com/file/2528230/makeshot_20180126034106_4f42a_216/out.png", "width": 900, "height": 500 }, "preview_lock": 0, "flags": "", "categories": 1, "colors": 4160, "styles": 65672, "businesses": 614, "features": 0, "roles": 1, "ratios": 0, "festivals": 2, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "117.44.183.121", "last_download_at": null, "download_count": 0, "created_at": 1516938066, "updated_at": 1516938066, "user": { "id": 196540, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "0d545f95375c6a080e5f7bf1094c1445", "nick": "", "mobile": "", "avatar": "", "source": "", "last_ip": "117.44.183.121", "last_screen_width": 1600, "last_screen_height": 900, "last_ua": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36", "created_at": 1516937933, "updated_at": 1516937933 } }, { "id": 504, "deleted": 0, "status": 1, "user_id": 103645, "source_id": 40297, "type": "poster", "platform_id": 64, "title": "你好二月公众号次图", "preview": { "url": "https://st-gdx.dancf.com/file/2528230/makeshot_20180126034148_000f6_126/out.png", "width": 200, "height": 200 }, "preview_lock": 0, "flags": "", "categories": 2, "colors": 260, "styles": 65808, "businesses": 1, "features": 0, "roles": 128, "ratios": 0, "festivals": 0, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "223.155.47.111", "last_download_at": null, "download_count": 0, "created_at": 1516937997, "updated_at": 1516937997, "user": { "id": 103645, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "7661c4e0df6e0d470bb0a86556646e76", "nick": "", "mobile": "", "avatar": "", "source": "ps_menu", "last_ip": "223.155.47.111", "last_screen_width": 1920, "last_screen_height": 1080, "last_ua": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36", "created_at": 1515474156, "updated_at": 1516937431 } }, { "id": 503, "deleted": 0, "status": 1, "user_id": 66968, "source_id": 40302, "type": "poster", "platform_id": 64, "title": "新年快乐手机海报", "preview": { "url": "https://st-gdx.dancf.com/file/2528229/makeshot_20180126033726_431fd_126063/out.png", "width": 1242, "height": 2208 }, "preview_lock": 0, "flags": "", "categories": 4, "colors": 4160, "styles": 66688, "businesses": 1, "features": 0, "roles": 1, "ratios": 0, "festivals": 125, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "111.113.87.245", "last_download_at": null, "download_count": 0, "created_at": 1516937822, "updated_at": 1516937822, "user": { "id": 66968, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "21f4197b490571c7f67df63ef53ab947", "nick": "", "mobile": "", "avatar": "", "source": "tool", "last_ip": "111.113.87.245", "last_screen_width": 1920, "last_screen_height": 1080, "last_ua": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36", "created_at": 1514793872, "updated_at": 1516936664 } }, { "id": 502, "deleted": 0, "status": 1, "user_id": 195731, "source_id": 40393, "type": "poster", "platform_id": 64, "title": "2018迎新春手机海报", "preview": { "url": "https://st-gdx.dancf.com/file/2528229/makeshot_20180126033135_64a78_125979/out.png", "width": 1242, "height": 2208 }, "preview_lock": 0, "flags": "", "categories": 4, "colors": 4162, "styles": 1154, "businesses": 4095, "features": 0, "roles": 7, "ratios": 0, "festivals": 57, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "117.34.140.15", "last_download_at": null, "download_count": 0, "created_at": 1516937489, "updated_at": 1516937489, "user": { "id": 195731, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "9c4b85ad19555882eaf456627afd2585", "nick": "", "mobile": "", "avatar": "", "source": "ps_menu", "last_ip": "117.34.140.15", "last_screen_width": 1920, "last_screen_height": 1080, "last_ua": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1", "created_at": 1516936078, "updated_at": 1516936078 } }, { "id": 501, "deleted": 0, "status": 1, "user_id": 195731, "source_id": 40280, "type": "poster", "platform_id": 64, "title": "全民年终奖公众号首图", "preview": { "url": "https://st-gdx.dancf.com/file/2528228/makeshot_20180126032929_33b88_138295/out.png", "width": 900, "height": 500 }, "preview_lock": 0, "flags": "", "categories": 1, "colors": 2116, "styles": 65560, "businesses": 96, "features": 0, "roles": 5, "ratios": 0, "festivals": 56, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "117.34.140.15", "last_download_at": null, "download_count": 0, "created_at": 1516937307, "updated_at": 1516937307, "user": { "id": 195731, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "9c4b85ad19555882eaf456627afd2585", "nick": "", "mobile": "", "avatar": "", "source": "ps_menu", "last_ip": "117.34.140.15", "last_screen_width": 1920, "last_screen_height": 1080, "last_ua": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1", "created_at": 1516936078, "updated_at": 1516936078 } }, { "id": 500, "deleted": 0, "status": 1, "user_id": 66968, "source_id": 40231, "type": "poster", "platform_id": 64, "title": "2018年会总结新征程公众号首图", "preview": { "url": "https://st-gdx.dancf.com/file/2528228/makeshot_20180126032852_2c9d0_225036/out.png", "width": 900, "height": 500 }, "preview_lock": 0, "flags": "", "categories": 1, "colors": 6145, "styles": 4634, "businesses": 1, "features": 0, "roles": 164, "ratios": 0, "festivals": 0, "solar_term": 0, "priority": 10, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "111.113.87.245", "last_download_at": null, "download_count": 0, "created_at": 1516937296, "updated_at": 1516937296, "user": { "id": 66968, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "21f4197b490571c7f67df63ef53ab947", "nick": "", "mobile": "", "avatar": "", "source": "tool", "last_ip": "111.113.87.245", "last_screen_width": 1920, "last_screen_height": 1080, "last_ua": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36", "created_at": 1514793872, "updated_at": 1516936664 } }, { "id": 499, "deleted": 0, "status": 1, "user_id": 196112, "source_id": 40197, "type": "poster", "platform_id": 64, "title": "年货来啦公众号首图", "preview": { "url": "https://st-gdx.dancf.com/file/2528228/makeshot_20180126032718_85062_125820/out.png", "width": 900, "height": 500 }, "preview_lock": 0, "flags": "", "categories": 1, "colors": 8258, "styles": 130, "businesses": 1, "features": 0, "roles": 3, "ratios": 0, "festivals": 2, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "111.121.52.18", "last_download_at": null, "download_count": 0, "created_at": 1516937238, "updated_at": 1516937238, "user": { "id": 196112, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "a248a6fa33c8761d009267d4a9d04de9", "nick": "", "mobile": "", "avatar": "", "source": "", "last_ip": "111.121.52.18", "last_screen_width": 1366, "last_screen_height": 768, "last_ua": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36", "created_at": 1516937009, "updated_at": 1516937009 } }, { "id": 498, "deleted": 0, "status": 1, "user_id": 196131, "source_id": 40231, "type": "poster", "platform_id": 64, "title": "2018年会总结新征程公众号首图", "preview": { "url": "https://st-gdx.dancf.com/file/2528228/makeshot_20180126032653_0e84a_138248/out.png", "width": 900, "height": 500 }, "preview_lock": 0, "flags": "", "categories": 1, "colors": 6145, "styles": 4634, "businesses": 1, "features": 0, "roles": 164, "ratios": 0, "festivals": 0, "solar_term": 0, "priority": 10, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "116.6.195.86", "last_download_at": null, "download_count": 0, "created_at": 1516937214, "updated_at": 1516937214, "user": { "id": 196131, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "0c46bafb959531473e4701088485221a", "nick": "", "mobile": "", "avatar": "", "source": "", "last_ip": "116.6.195.86", "last_screen_width": 1600, "last_screen_height": 900, "last_ua": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36", "created_at": 1516937061, "updated_at": 1516937062 } }, { "id": 497, "deleted": 0, "status": 1, "user_id": 192526, "source_id": 40314, "type": "poster", "platform_id": 64, "title": "年终盛典倒计时1天手机海报", "preview": { "url": "https://st-gdx.dancf.com/file/2528228/makeshot_20180126032432_2b67c_71923/out.png", "width": 1242, "height": 2208 }, "preview_lock": 0, "flags": "", "categories": 4, "colors": 4129, "styles": 578, "businesses": 1, "features": 0, "roles": 36, "ratios": 0, "festivals": 0, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "115.204.155.247", "last_download_at": null, "download_count": 0, "created_at": 1516937073, "updated_at": 1516937073, "user": { "id": 192526, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "5d0fa89668c20a50c71e8d1bc79a88d6", "nick": "", "mobile": "", "avatar": "", "source": "", "last_ip": "115.204.155.247", "last_screen_width": 1920, "last_screen_height": 1080, "last_ua": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36", "created_at": 1516929556, "updated_at": 1516929556 } }, { "id": 496, "deleted": 0, "status": 1, "user_id": 178232, "source_id": 40290, "type": "poster", "platform_id": 64, "title": "关注光荣关注二维码", "preview": { "url": "https://st-gdx.dancf.com/file/2528228/makeshot_20180126032433_589eb_224933/out.png", "width": 900, "height": 500 }, "preview_lock": 0, "flags": "", "categories": 8, "colors": 321, "styles": 98440, "businesses": 1, "features": 0, "roles": 1153, "ratios": 0, "festivals": 0, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "180.111.94.45", "last_download_at": null, "download_count": 0, "created_at": 1516937060, "updated_at": 1516937060, "user": { "id": 178232, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "ffb79aa431948eb1c738a2853d94eda7", "nick": "", "mobile": "", "avatar": "", "source": "", "last_ip": "180.111.94.45", "last_screen_width": 1920, "last_screen_height": 1080, "last_ua": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.104 Safari/537.36 Core/1.53.4399.400 QQBrowser/9.7.12828.400", "created_at": 1516870681, "updated_at": 1516870681 } }, { "id": 495, "deleted": 0, "status": 1, "user_id": 194750, "source_id": 40439, "type": "poster", "platform_id": 32, "title": "换季清货全场折扣主图直通车", "preview": { "url": "https://st-gdx.dancf.com/file/2528228/makeshot_20180126032525_cf5d9_230932/out.png", "width": 1242, "height": 1242 }, "preview_lock": 0, "flags": "", "categories": 1, "colors": 2, "styles": 2052, "businesses": 58721278, "features": 0, "roles": 10, "ratios": 0, "festivals": 0, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "121.18.115.50", "last_download_at": null, "download_count": 0, "created_at": 1516937054, "updated_at": 1516937054, "user": { "id": 194750, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "a69702e3bf9a563555ca9932b1e6c73c", "nick": "", "mobile": "", "avatar": "", "source": "", "last_ip": "121.18.115.50", "last_screen_width": 1680, "last_screen_height": 1050, "last_ua": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36", "created_at": 1516933948, "updated_at": 1516933948 } }, { "id": 494, "deleted": 0, "status": 1, "user_id": 185840, "source_id": 40453, "type": "poster", "platform_id": 64, "title": "塑造百万大V手机海报", "preview": { "url": "https://st-gdx.dancf.com/file/2528228/makeshot_20180126032158_6d014_138132/out.png", "width": 1242, "height": 2208 }, "preview_lock": 0, "flags": "", "categories": 4, "colors": 17, "styles": 576, "businesses": 1638, "features": 0, "roles": 384, "ratios": 0, "festivals": 0, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "111.142.133.117", "last_download_at": null, "download_count": 0, "created_at": 1516936919, "updated_at": 1516936919, "user": { "id": 185840, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "d7ba4ab51b05a3c088e1917a46ced132", "nick": "", "mobile": "", "avatar": "", "source": "", "last_ip": "111.142.133.125", "last_screen_width": 1366, "last_screen_height": 768, "last_ua": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0", "created_at": 1516894951, "updated_at": 1516894951 } }, { "id": 493, "deleted": 0, "status": 1, "user_id": 195894, "source_id": 40231, "type": "poster", "platform_id": 64, "title": "2018年会总结新征程公众号首图", "preview": { "url": "https://st-gdx.dancf.com/file/2528227/makeshot_20180126031944_2ed14_125675/out.png", "width": 900, "height": 500 }, "preview_lock": 0, "flags": "", "categories": 1, "colors": 6145, "styles": 4634, "businesses": 1, "features": 0, "roles": 164, "ratios": 0, "festivals": 0, "solar_term": 0, "priority": 10, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "42.92.237.241", "last_download_at": null, "download_count": 0, "created_at": 1516936784, "updated_at": 1516936784, "user": { "id": 195894, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "3c63126670f975da4b66b35523b7c434", "nick": "", "mobile": "", "avatar": "", "source": "", "last_ip": "42.92.237.241", "last_screen_width": 1366, "last_screen_height": 768, "last_ua": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.104 Safari/537.36 Core/1.53.4399.400 QQBrowser/9.7.12777.400", "created_at": 1516936494, "updated_at": 1516936494 } }, { "id": 492, "deleted": 0, "status": 1, "user_id": 195894, "source_id": 40293, "type": "poster", "platform_id": 64, "title": "先定小目标关注二维码", "preview": { "url": "https://st-gdx.dancf.com/file/2528227/makeshot_20180126031857_32bb5_125668/out.png", "width": 900, "height": 500 }, "preview_lock": 0, "flags": "", "categories": 8, "colors": 4160, "styles": 98440, "businesses": 1, "features": 0, "roles": 1153, "ratios": 0, "festivals": 123, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "42.92.237.241", "last_download_at": null, "download_count": 0, "created_at": 1516936738, "updated_at": 1516936738, "user": { "id": 195894, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "3c63126670f975da4b66b35523b7c434", "nick": "", "mobile": "", "avatar": "", "source": "", "last_ip": "42.92.237.241", "last_screen_width": 1366, "last_screen_height": 768, "last_ua": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.104 Safari/537.36 Core/1.53.4399.400 QQBrowser/9.7.12777.400", "created_at": 1516936494, "updated_at": 1516936494 } }, { "id": 491, "deleted": 0, "status": 1, "user_id": 176161, "source_id": 40303, "type": "poster", "platform_id": 64, "title": "新年旺旺手机海报", "preview": { "url": "https://st-gdx.dancf.com/file/2528227/makeshot_20180126031854_9913e_224867/out.png", "width": 1242, "height": 2208 }, "preview_lock": 0, "flags": "", "categories": 4, "colors": 4160, "styles": 33920, "businesses": 548, "features": 0, "roles": 3, "ratios": 0, "festivals": 123, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "222.184.236.180", "last_download_at": null, "download_count": 0, "created_at": 1516936735, "updated_at": 1516936735, "user": { "id": 176161, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "3bdc74152699b647acbdd702fe6c8569", "nick": "", "mobile": "", "avatar": "", "source": "ps_menu", "last_ip": "222.184.236.180", "last_screen_width": 1920, "last_screen_height": 1080, "last_ua": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36", "created_at": 1516849572, "updated_at": 1516936580 } }, { "id": 490, "deleted": 0, "status": 1, "user_id": 195904, "source_id": 40229, "type": "poster", "platform_id": 64, "title": "大寒不向冷势力低头公众号首图", "preview": { "url": "https://st-gdx.dancf.com/file/2528227/makeshot_20180126031743_18c85_224863/out.png", "width": 900, "height": 500 }, "preview_lock": 0, "flags": "", "categories": 1, "colors": 1796, "styles": 33073, "businesses": 1, "features": 0, "roles": 9, "ratios": 0, "festivals": 0, "solar_term": 8388608, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "58.57.77.54", "last_download_at": null, "download_count": 0, "created_at": 1516936664, "updated_at": 1516936664, "user": { "id": 195904, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "c2c05850e6451ab93807de532ae23a2c", "nick": "", "mobile": "", "avatar": "", "source": "", "last_ip": "58.57.77.54", "last_screen_width": 1920, "last_screen_height": 1080, "last_ua": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 BIDUBrowser/8.7 Safari/537.36", "created_at": 1516936516, "updated_at": 1516936516 } }, { "id": 489, "deleted": 0, "status": 1, "user_id": 176161, "source_id": 40392, "type": "poster", "platform_id": 64, "title": "腊八要囤货手机海报", "preview": { "url": "https://st-gdx.dancf.com/file/2528227/makeshot_20180126031737_e7dcc_125663/out.png", "width": 1242, "height": 2208 }, "preview_lock": 0, "flags": "", "categories": 4, "colors": 4160, "styles": 33930, "businesses": 1910, "features": 0, "roles": 1, "ratios": 0, "festivals": 2, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "222.184.236.180", "last_download_at": null, "download_count": 0, "created_at": 1516936657, "updated_at": 1516936657, "user": { "id": 176161, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "3bdc74152699b647acbdd702fe6c8569", "nick": "", "mobile": "", "avatar": "", "source": "ps_menu", "last_ip": "222.184.236.180", "last_screen_width": 1920, "last_screen_height": 1080, "last_ua": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36", "created_at": 1516849572, "updated_at": 1516936580 } }, { "id": 488, "deleted": 0, "status": 1, "user_id": 195901, "source_id": 40294, "type": "poster", "platform_id": 64, "title": "新年新资讯关注二维码", "preview": { "url": "https://st-gdx.dancf.com/file/2528227/makeshot_20180126031728_e232d_27429/out.png", "width": 900, "height": 500 }, "preview_lock": 0, "flags": "", "categories": 8, "colors": 64, "styles": 98464, "businesses": 1, "features": 0, "roles": 1089, "ratios": 0, "festivals": 123, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "36.100.61.255", "last_download_at": null, "download_count": 0, "created_at": 1516936648, "updated_at": 1516936648, "user": { "id": 195901, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "86983bbab980cc9149b2a3327c9935a0", "nick": "", "mobile": "", "avatar": "", "source": "ps_menu", "last_ip": "36.100.61.255", "last_screen_width": 1366, "last_screen_height": 768, "last_ua": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36 2345Explorer/6.2.0.9202", "created_at": 1516936509, "updated_at": 1516936509 } }, { "id": 487, "deleted": 0, "status": 1, "user_id": 75224, "source_id": 40287, "type": "poster", "platform_id": 64, "title": "hello2018励志手机海报", "preview": { "url": "https://st-gdx.dancf.com/file/2528227/makeshot_20180126031520_4daaf_71846/out.png", "width": 1242, "height": 2208 }, "preview_lock": 0, "flags": "", "categories": 4, "colors": 8192, "styles": 2321, "businesses": 1178, "features": 0, "roles": 72, "ratios": 0, "festivals": 0, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "121.22.36.12", "last_download_at": null, "download_count": 0, "created_at": 1516936521, "updated_at": 1516936521, "user": { "id": 75224, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "e80458c5f0771dfb63fa51a37e6babac", "nick": "", "mobile": "", "avatar": "", "source": "pop", "last_ip": "121.22.36.12", "last_screen_width": 1600, "last_screen_height": 900, "last_ua": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36", "created_at": 1514959546, "updated_at": 1516935470 } }, { "id": 486, "deleted": 0, "status": 1, "user_id": 194792, "source_id": 40290, "type": "poster", "platform_id": 64, "title": "关注光荣关注二维码", "preview": { "url": "https://st-gdx.dancf.com/file/2528228/makeshot_20180126032301_79f68_125695/out.png", "width": 900, "height": 500 }, "preview_lock": 0, "flags": "", "categories": 8, "colors": 321, "styles": 98440, "businesses": 1, "features": 0, "roles": 1153, "ratios": 0, "festivals": 0, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "106.57.238.235", "last_download_at": null, "download_count": 0, "created_at": 1516936505, "updated_at": 1516936505, "user": { "id": 194792, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "89197878c14054ae2dbfc60d5a964788", "nick": "", "mobile": "", "avatar": "", "source": "ps_menu", "last_ip": "106.57.238.235", "last_screen_width": 1366, "last_screen_height": 768, "last_ua": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.108 Safari/537.36 2345Explorer/8.8.3.16721", "created_at": 1516934024, "updated_at": 1516934024 } }, { "id": 485, "deleted": 0, "status": 1, "user_id": 195310, "source_id": 40294, "type": "poster", "platform_id": 64, "title": "新年新资讯关注二维码", "preview": { "url": "https://st-gdx.dancf.com/file/2528227/makeshot_20180126031730_4320e_220961/out.png", "width": 900, "height": 500 }, "preview_lock": 0, "flags": "", "categories": 8, "colors": 64, "styles": 98464, "businesses": 1, "features": 0, "roles": 1089, "ratios": 0, "festivals": 123, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "182.109.182.105", "last_download_at": null, "download_count": 0, "created_at": 1516936419, "updated_at": 1516936419, "user": { "id": 195310, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "244d8c55c24ea98393a7591a83671425", "nick": "", "mobile": "", "avatar": "", "source": "", "last_ip": "182.109.182.105", "last_screen_width": 1366, "last_screen_height": 768, "last_ua": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 SE 2.X MetaSr 1.0", "created_at": 1516935139, "updated_at": 1516935139 } }, { "id": 484, "deleted": 0, "status": 1, "user_id": 90226, "source_id": 40235, "type": "poster", "platform_id": 64, "title": "年会正确打开方式公众号首图", "preview": { "url": "https://st-gdx.dancf.com/file/2528230/makeshot_20180126034305_650df_126224/out.png", "width": 900, "height": 500 }, "preview_lock": 0, "flags": "", "categories": 1, "colors": 12324, "styles": 237728, "businesses": 1, "features": 0, "roles": 4, "ratios": 0, "festivals": 0, "solar_term": 0, "priority": 10, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "139.227.5.151", "last_download_at": null, "download_count": 0, "created_at": 1516935862, "updated_at": 1516935862, "user": { "id": 90226, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "f00e5047a38ba5287a7b25ae062fc2d6", "nick": "", "mobile": "", "avatar": "", "source": "tool", "last_ip": "139.227.5.151", "last_screen_width": 1536, "last_screen_height": 864, "last_ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/15.15063", "created_at": 1515220741, "updated_at": 1516935555 } }, { "id": 483, "deleted": 0, "status": 1, "user_id": 195504, "source_id": 40216, "type": "poster", "platform_id": 64, "title": "通用长按扫码关注二维码", "preview": { "url": "https://st-gdx.dancf.com/file/2528226/makeshot_20180126030902_03a81_137994/out.png", "width": 900, "height": 500 }, "preview_lock": 0, "flags": "", "categories": 8, "colors": 776, "styles": 784, "businesses": 1, "features": 0, "roles": 1024, "ratios": 0, "festivals": 0, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "116.231.64.56", "last_download_at": null, "download_count": 0, "created_at": 1516935671, "updated_at": 1516935671, "user": { "id": 195504, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "13f53db66f08cc89bc4037a2961bdc3b", "nick": "", "mobile": "", "avatar": "", "source": "", "last_ip": "116.231.64.56", "last_screen_width": 1920, "last_screen_height": 1080, "last_ua": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.104 Safari/537.36 Core/1.53.3538.400 QQBrowser/9.6.12501.400", "created_at": 1516935588, "updated_at": 1516935588 } }, { "id": 482, "deleted": 0, "status": 1, "user_id": 75224, "source_id": 40584, "type": "poster", "platform_id": 32, "title": "最IN男装强势来袭电商banner", "preview": { "url": "https://st-gdx.dancf.com/file/2528226/makeshot_20180126030103_7283d_125479/out.png", "width": 1920, "height": 520 }, "preview_lock": 0, "flags": "", "categories": 4, "colors": 264, "styles": 65680, "businesses": 80, "features": 0, "roles": 3, "ratios": 0, "festivals": 32, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "121.22.36.12", "last_download_at": null, "download_count": 0, "created_at": 1516935664, "updated_at": 1516935664, "user": { "id": 75224, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "e80458c5f0771dfb63fa51a37e6babac", "nick": "", "mobile": "", "avatar": "", "source": "pop", "last_ip": "121.22.36.12", "last_screen_width": 1600, "last_screen_height": 900, "last_ua": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36", "created_at": 1514959546, "updated_at": 1516935470 } }, { "id": 481, "deleted": 0, "status": 1, "user_id": 194959, "source_id": 40221, "type": "poster", "platform_id": 64, "title": "稿定工作室关注二维码", "preview": { "url": "https://st-gdx.dancf.com/file/2528227/makeshot_20180126031631_f9da6_27425/out.png", "width": 900, "height": 500 }, "preview_lock": 0, "flags": "", "categories": 8, "colors": 769, "styles": 90964, "businesses": 4094, "features": 0, "roles": 1024, "ratios": 0, "festivals": 0, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "124.64.227.230", "last_download_at": null, "download_count": 0, "created_at": 1516935536, "updated_at": 1516935536, "user": { "id": 194959, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "b20d2ab8525e44d78df9fe84958ae5f9", "nick": "", "mobile": "", "avatar": "", "source": "", "last_ip": "124.64.227.230", "last_screen_width": 1920, "last_screen_height": 1080, "last_ua": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36", "created_at": 1516934329, "updated_at": 1516934329 } }, { "id": 480, "deleted": 0, "status": 1, "user_id": 193925, "source_id": 40319, "type": "poster", "platform_id": 64, "title": "超级好看关注二维码", "preview": { "url": "https://st-gdx.dancf.com/file/2528225/makeshot_20180126025705_f2a26_230602/out.png", "width": 900, "height": 500 }, "preview_lock": 0, "flags": "", "categories": 8, "colors": 8193, "styles": 139264, "businesses": 1, "features": 0, "roles": 1040, "ratios": 0, "festivals": 0, "solar_term": 0, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "14.114.215.40", "last_download_at": null, "download_count": 0, "created_at": 1516935425, "updated_at": 1516935425, "user": { "id": 193925, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "64306ca4ec20ea2dfcb1ca1209748e80", "nick": "", "mobile": "", "avatar": "", "source": "", "last_ip": "14.114.215.40", "last_screen_width": 1920, "last_screen_height": 1080, "last_ua": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0", "created_at": 1516932326, "updated_at": 1516932326 } }, { "id": 479, "deleted": 0, "status": 1, "user_id": 195269, "source_id": 40173, "type": "poster", "platform_id": 64, "title": "二十四节气大寒公众号首图", "preview": { "url": "https://st-gdx.dancf.com/file/2528225/makeshot_20180126025457_16e12_125465/out.png", "width": 900, "height": 500 }, "preview_lock": 0, "flags": "", "categories": 1, "colors": 1600, "styles": 1297, "businesses": 1, "features": 0, "roles": 9, "ratios": 0, "festivals": 0, "solar_term": 8388608, "priority": 1, "rules_count": 0, "image_width": 0, "image_height": 0, "last_save_ip": "125.67.78.21", "last_download_at": null, "download_count": 0, "created_at": 1516935297, "updated_at": 1516935297, "user": { "id": 195269, "deleted": 0, "status": 0, "type": 0, "username": "", "guest_finger": "fd144c1448f817a359b92658704d2bb0", "nick": "", "mobile": "", "avatar": "", "source": "", "last_ip": "125.67.78.21", "last_screen_width": 1600, "last_screen_height": 900, "last_ua": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36", "created_at": 1516935026, "updated_at": 1516935026 } }],
        ztList: [],
        bannerList: [],
        stList: [],
        ctList: [],
        sjList: [],
        ewmList: [],

        max3: [],
        max1List: [],
        max2List: [],
        max3List: [],
        max4List: [],

    },
    watch: {
        list: function () {
            if (!this.list.length) return;
            const maxArr = [];
            this.list.map(({ attributes }, idx) => {
                // attributes['preview'] = JSON.parse(attributes['preview']);
                console.log(attributes);
                attributes.updated_at = timeConvert(Number(attributes.updated_at + '000'), 'h:m');
                // 统计平台和分类
                if (attributes.platform_id === 32) {
                    if (attributes.categories === 1) {
                        this.ztList.push(attributes);
                    } else if (attributes.categories === 4) {
                        this.bannerList.push(attributes);
                    }
                } else {
                    if (attributes.categories === 1) {
                        this.stList.push(attributes);
                    } else if (attributes.categories === 2) {
                        this.ctList.push(attributes);
                    } else if (attributes.categories === 4) {
                        this.sjList.push(attributes);
                    } else {
                        this.ewmList.push(attributes);
                    }
                }
                // 统计最多的模板ID
                maxArr.push(attributes.source_id);
            });




            this.max3 = getCount(maxArr, 5);
            this.list.map(({ attributes }, idx) => {
                // 统计平台和分类
                if (attributes.source_id.toString() === this.max3[1].el) {
                    this.max1List.push(attributes);
                } else if (attributes.source_id.toString() === this.max3[2].el) {
                    this.max2List.push(attributes);
                } else if (attributes.source_id.toString() === this.max3[3].el) {
                    this.max3List.push(attributes);
                } else if (attributes.source_id.toString() === this.max3[4].el) {
                    this.max4List.push(attributes);
                }
            });

        }
    },
    created: function () {


        var HistoryScore = Bmob.Object.extend("GameScore");
        var query = new Bmob.Query(HistoryScore);
        query.limit(1000);
        query.find({
            success: (results) => {
                this.list = results
            },
            error: (error) => {
                console.log("查询失败: " + error.code + " " + error.message);
            }
        });


        // // 测试插入数据
        // this.list.map((item, idx) => {
        //     var gameScore = new HistoryScore();
        //     var query = new Bmob.Query(HistoryScore);
        //     query.equalTo("history_id", item.id);
        //     query.find({
        //         success: (results) => {
        //             console.log(results);
        //             if (!results.length) {
        //                 item['history_id'] = item.id;
        //                 delete item['id'];
        //                 delete item['preview_lock'];
        //                 delete item['rules_count'];
        //                 delete item['image_width'];
        //                 delete item['image_height'];
        //                 delete item['download_count'];
        //                 delete item['businesses'];
        //                 delete item['flags'];
        //                 delete item['solar_term'];
        //                 delete item['last_save_ip'];
        //                 delete item['priority'];
        //                 delete item['festivals'];
        //                 delete item['ratios'];
        //                 delete item['roles'];
        //                 delete item['features'];
        //                 delete item['ratios'];
        //                 delete item['type'];
        //                 delete item['colors'];
        //                 delete item['styles'];
        //                 if (typeof item['preview'] !== "object") {
        //                     item['preview'] = {}
        //                 }
        //                 gameScore.save(item, {
        //                     success: function (object) {
        //                         console.log("create object success, object id:", object.id);
        //                     },
        //                     error: function (gameScore, error) {
        //                         console.log("create object fail", error);
        //                     }
        //                 });
        //             }
        //         },
        //         error: (error) => {
        //             console.log("查询失败: " + error.code + " " + error.message);
        //         }
        //     });
        // });

    }
})




