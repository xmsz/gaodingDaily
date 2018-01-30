Bmob.initialize("1f83c3fb0dd43f84fb2e7c5b659c3d26", "e48ecaadf867fcf9dc94340b6dcf22aa");
var $http = axios.create({
    baseURL: 'https://mmmm.gaoding.com/api/',
});
function $timeConvert(time, type = 'Y/M/D h:m', zero = true) {
    let result = '';
    const now = new Date(time);
    const weekCn = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const getWeekCn = (week) => weekCn[week];
    const nowArray = [
        {
            name: 'Y',
            val: now.getFullYear(),
        },
        {
            name: 'M',
            val: now.getMonth() + 1,
        },
        {
            name: 'D',
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

//返回的是对象形式的参数  
function getDate() {
    const nowDate = new Date();
    let startDate = null;
    let endDate = null;
    const query = location.search.substring(1);//获取查询串  
    if (!query) {
        startDate = new Date(
            nowDate.getFullYear(),
            nowDate.getMonth(),
            nowDate.getDate(),
        ).getTime();
        window.location.href = window.location.href + `?date=${$timeConvert(startDate, type = 'Y-M-D')}`
        endDate = dateEnd(nowDate);
    } else {
        const pairs = query.split("=");
        if (pairs[1] === 'all') {
            startDate = 1000000000000;
            endDate = dateEnd(2000000000000);
        } else {
            const date = pairs[1].replace(/-/g, '/');
            startDate = new Date(date).getTime();
            endDate = dateEnd(date);
        }
    }

    return {
        startDate: Number(startDate.toString().substring(0, 10)),
        endDate: Number(endDate.toString().substring(0, 10)),
    };
}

function dateEnd(date) {
    let dateEnd = new Date(date);
    dateEnd.setDate(dateEnd.getDate() + 1);
    return dateEnd.getTime();
}


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
        updateBtn: {
            disable: false,
            text: '更新数据'
        },
    },
    methods: {
        update: function () {
            this.updateBtn = {
                disable: true,
                text: '更新中'
            }
            $http.get('https://apiab.zuolem.com/api/gaoDing/getHistory').then(({ data }) => {
                console.log(data)
                if (data.data.stderr === '') {
                    alert('暂无更新')
                } else {
                    location.reload();
                }
                this.updateBtn = {
                    disable: false,
                    text: '获取更新'
                }
            });

        }
    },
    computed: {
    },
    watch: {
        list: function () {
            if (!this.list.length) return;
            const maxArr = [];
            this.updateTime = $timeConvert(Number(this.list[0]['attributes']['created_at'] + '000'), 'Y/M/D h:m');
            list = JSON.parse(JSON.stringify(this.list)).reverse();
            list.map((attributes, idx) => {
                attributes.updated_at = $timeConvert(Number(attributes.updated_at + '000'), 'h:m');
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
                if (attributes.source_id) maxArr.push(attributes.source_id);
            });
            this.max3 = getCount(maxArr, 5);
            list.map((attributes, idx) => {
                // 统计平台和分类
                if (this.max3.length > 0 && attributes.source_id.toString() === this.max3[0].el) {
                    this.max1List.push(attributes);
                } else if (this.max3.length > 1 && attributes.source_id.toString() === this.max3[1].el) {
                    this.max2List.push(attributes);
                } else if (this.max3.length > 2 && attributes.source_id.toString() === this.max3[2].el) {
                    this.max3List.push(attributes);
                } else if (this.max3.length > 3 && attributes.source_id.toString() === this.max3[3].el) {
                    this.max4List.push(attributes);
                }
            });
        }
    },
    created: function () {

        const { startDate, endDate } = getDate();
        const HistoryScore = Bmob.Object.extend("history");
        const query = new Bmob.Query(HistoryScore);
        let list = [];
        query.greaterThan("created_at", startDate);
        query.lessThan("created_at", endDate);
        query.limit(500);

        query.count({
            success: (count) => {
                // 查询成功，返回记录数量
                console.log("共有 " + count + " 条记录");
                if (count > 500) {
                    for (var i = 0; i < Math.ceil(count / 500); i++) {
                        query.skip(i * 500)
                        query.find({
                            success: (results) => {
                                list.push.apply(list, results);
                                this.list = list;
                            }
                        });
                    }
                }
                query.find({
                    success: (results) => {
                        this.list = results;
                    }
                });
            },
            error: (error) => {
                // 查询失败
            }
        });






    }
})



