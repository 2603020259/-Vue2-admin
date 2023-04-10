export default {
    getHomeData: () => {
        return {
            code:2000,
            data:{
                tableData: [{
                    name: '波斯猫',
                    dayBuy: 200,
                    mouBuy: 500,
                    talBuy: 2300
                }, {
                    name: '布偶猫',
                    dayBuy: 370,
                    mouBuy: 540,
                    talBuy: 2600
                }, {
                    name: '斯芬克斯',
                    dayBuy: 600,
                    mouBuy: 230,
                    talBuy: 7300
                }, {
                    name: '埃及猫',
                    dayBuy: 532,
                    mouBuy: 300,
                    talBuy: 5700
                }, {
                    name: '金渐层',
                    dayBuy: 632,
                    mouBuy: 670,
                    talBuy: 2640
                }],
                countData:[
                    {
                        name:'今日支付订单',
                        value:2367,
                        icon:'success',
                        color:'#2ec7c9',
                    },
                    {
                        name:'今日收藏订单',
                        value:1365,
                        icon:'star-on',
                        color:'#ffb980',
                    },
                    {
                        name:'今日未支付订单',
                        value:1587,
                        icon:'s-goods',
                        color:'#5ab1ef',
                    },
                    {
                        name:'本月支付订单',
                        value:5327,
                        icon:'success',
                        color:'#2ec7c9',
                    },
                    {
                        name:'本月收藏订单',
                        value:6335,
                        icon:'star-on',
                        color:'#ffb980',
                    },
                    {
                        name:'本月未支付订单',
                        value:2387,
                        icon:'s-goods',
                        color:'#5ab1ef',
                    },
                ]
            }
        }
    }
}