import Mock from 'mockjs'

// 图表数据
let List = []
export default {
    getStatisticalData: () => {
        //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    苹果: Mock.Random.float(100, 8000, 0, 0),
                    vivo: Mock.Random.float(100, 8000, 0, 0),
                    oppo: Mock.Random.float(100, 8000, 0, 0),
                    魅族: Mock.Random.float(100, 8000, 0, 0),
                    三星: Mock.Random.float(100, 8000, 0, 0),
                    小米: Mock.Random.float(100, 8000, 0, 0)
                })
            )
        }
        return {
            code: 20000,
            data: {
                // 饼图
                videoData: [
                    {
                        name: '小米',
                        value: Mock.Random.int(100,1000)
                    },
                    {
                        name: '苹果',
                        value: Mock.Random.int(100,1000)
                    },
                    {
                        name: 'vivo',
                        value: Mock.Random.int(100,1000)
                    },
                    {
                        name: 'oppo',
                        value: Mock.Random.int(100,1000)
                    },
                    {
                        name: '魅族',
                        value: Mock.Random.int(100,1000)
                    },
                    {
                        name: '三星',
                        value: Mock.Random.int(100,1000)
                    }
                ],
                // 柱状图
                userData: [
                    {
                        date: '周一',
                        new: Mock.Random.int(1,20),
                        active: Mock.Random.int(50,200)
                    },
                    {
                        date: '周二',
                        new: Mock.Random.int(1,20),
                        active: Mock.Random.int(50,200)
                    },
                    {
                        date: '周三',
                        new: Mock.Random.int(1,20),
                        active: Mock.Random.int(50,200)
                    },
                    {
                        date: '周四',
                        new: Mock.Random.int(1,20),
                        active: Mock.Random.int(50,200)
                    },
                    {
                        date: '周五',
                        new: Mock.Random.int(1,20),
                        active: Mock.Random.int(50,200)
                    },
                    {
                        date: '周六',
                        new: Mock.Random.int(1,20),
                        active: Mock.Random.int(50,200)
                    },
                    {
                        date: '周日',
                        new: Mock.Random.int(1,20),
                        active: Mock.Random.int(50,200)
                    }
                ],
                // 折线图
                orderData: {
                    date: ['2019-10-01', '2019-10-02', '2019-10-03', '2019-10-04', '2019-10-05', '2019-10-06', '2019-10-07'],
                    data: List
                },
                tableData: [
                    {
                        name: 'oppo',
                        todayBuy: Mock.Random.int(50,300),
                        monthBuy: Mock.Random.int(1000,3000),
                        totalBuy: Mock.Random.int(10000,30000)
                    },
                    {
                        name: 'vivo',
                        todayBuy: Mock.Random.int(50,300),
                        monthBuy: Mock.Random.int(1000,3000),
                        totalBuy: Mock.Random.int(10000,30000)
                    },
                    {
                        name: '苹果',
                        todayBuy: Mock.Random.int(50,300),
                        monthBuy: Mock.Random.int(1000,3000),
                        totalBuy: Mock.Random.int(10000,30000)
                    },
                    {
                        name: '小米',
                        todayBuy: Mock.Random.int(50,300),
                        monthBuy: Mock.Random.int(1000,3000),
                        totalBuy: Mock.Random.int(10000,30000)
                    },
                    {
                        name: '三星',
                        todayBuy: Mock.Random.int(50,300),
                        monthBuy: Mock.Random.int(1000,3000),
                        totalBuy: Mock.Random.int(10000,30000)
                    },
                    {
                        name: '魅族',
                        todayBuy: Mock.Random.int(50,300),
                        monthBuy: Mock.Random.int(1000,3000),
                        totalBuy: Mock.Random.int(10000,30000)
                    }
                ]
            }
        }
    }
}
