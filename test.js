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
        list: [],
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
        updateTime: '',
    },
    computed: {
    },
    watch: {
        list: function () {
            if (!this.list.length) return;
            const maxArr = [];
            this.updateTime = timeConvert(Number(this.list[0]['attributes']['created_at'] + '000'), 'y/m/d h:m');

            this.list.map(({ attributes }, idx) => {
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


        var HistoryScore = Bmob.Object.extend("history");
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




