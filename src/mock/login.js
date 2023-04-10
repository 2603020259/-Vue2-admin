import Mock from 'mockjs';
var time = new Date();
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body)
        // 先判断用户是否存在
        // 判断账号和密码是否对应
        //admin / jiangxinle 超级管理员
        if (username === 'admin' || username === 'jiangxinle' && password === '123456') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'Home/Home',
                            urls:'Home.vue',
                            meta: { title: '首页' },
                        },
                        {
                            path: '/personl',
                            label:'个人主页',
                            name: 'personl',
                            url:'Personl/Personl',
                            urls:'Personl.vue',
                            meta: { title: '个人主页' },
                        },
                        {
                            label: '商品管理',
                            icon: 'video-play',
                            children: [
                                {
                                    path: 'commid',
                                    name: 'commid',
                                    label: '商品列表',
                                    icon: 'setting',
                                    url: 'Other/Commid',
                                    urls:'Commid.vue',
                                    meta: { title: '商品列表' },
                                },
                                {
                                    path: 'classr',
                                    name: 'classr',
                                    label: '分类管理',
                                    icon: 'setting',
                                    url: 'Other/Classr',
                                    urls:'Classr.vue',
                                    meta: { title: '分类管理' },
                                },
                                {
                                    path: 'param',
                                    name: 'param',
                                    label: '参数管理',
                                    icon: 'setting',
                                    url: 'Other/Param',
                                    urls:'Param.vue',
                                    meta: { title: '参数管理' },
                                },
                            ]
                        },
                        {
                            path: 'user',
                            name: 'user',
                            label: '用户管理',
                            icon: 'user',
                            urls:'User.vue',
                            url:'User/User',
                            meta: { title: '用户管理' },
                        },
                        {
                            label: '权限管理',
                            icon: 'lock',
                            children: [
                                {
                                    path: 'roles',
                                    name: 'roles',
                                    label: '角色列表',
                                    icon: 'setting',
                                    url: 'Other/Roles',
                                    urls:'Roles.vue',
                                    meta: { title: '角色列表' },
                                },
                                {
                                    path: 'compent',
                                    name: 'compent',
                                    label: '权限列表',
                                    icon: 'key',
                                    url: 'Other/Compent',
                                    urls:'Compent.vue',
                                    meta: { title: '权限列表' },
                                },
                            ]
                        },
                        {
                            path: 'order',
                            name: 'order',
                            label: '订单管理',
                            icon: 'setting',
                            url: 'Other/Order',
                            urls:'Order.vue',
                            meta: { title: '订单管理' },
                        },
                        {
                            path: 'stat',
                            name: 'stat',
                            label: '数据统计',
                            icon: 'view',
                            url: 'Other/Stat',
                            urls:'Stat.vue',
                            meta: { title: '数据统计' },
                        },
                    ],
                    Infrom: {
                        url: 1,
                        name: '小红喵',
                        time: (time).Format('yyyy-MM-dd'),
                        addre: '江苏南京',
                        address: ' 南京市玄武区孝陵卫街道',
                        sex: '男',
                        company: '星乐猫咖',
                        position: '超级管理员',
                        grade: 'A-',
                        iphoneNamber: '13240722710',
                    },
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if (username === 'userAdmin' && password === '123456') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'Home/Home',
                            urls:'Home.vue',
                            meta: { title: '首页' },
                        },
                        {
                            path: '/personl',
                            label:'个人主页',
                            name: 'personl',
                            url:'Personl/Personl',
                            urls:'Personl.vue',
                            meta: { title: '个人主页' },
                        },
                        {
                            path: 'user',
                            name: 'user',
                            label: '用户管理',
                            icon: 'user',
                            urls:'User.vue',
                            meta: { title: '用户管理' },
                        },
                    ],
                    Infrom: {
                        url: 2,
                        name: '程序喵',
                        time: (time).Format('yyyy-MM-dd'),
                        addre: '江苏南京',
                        address: ' 南京市玄武区孝陵卫街道',
                        sex: '男',
                        company: '星乐猫咖',
                        position: '用户管理员',
                        grade: 'B-',
                        iphoneNamber: '13240715793',
                    },
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }

            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'Home/Home'
                        },
                        {
                            label: '商品管理',
                            icon: 'video-play',
                            children: [
                                {
                                    path: '/commid',
                                    name: 'commid',
                                    label: '商品列表',
                                    icon: 'setting',
                                    url: 'Other/Commid'
                                },
                                {
                                    path: '/classr',
                                    name: 'classr',
                                    label: '分类管理',
                                    icon: 'setting',
                                    url: 'Other/Classr'
                                },
                                {
                                    path: '/param',
                                    name: 'param',
                                    label: '参数管理',
                                    icon: 'setting',
                                    url: 'Other/Param'
                                },
                            ]
                        },
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if (username === 'commidAdmin' && password === '123456') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'Home/Home',
                            urls:'Home.vue',
                            meta: { title: '首页' },
                        },
                        {
                            path: '/personl',
                            label:'个人主页',
                            name: 'personl',
                            url:'Personl/Personl',
                            urls:'Personl.vue',
                            meta: { title: '个人主页' },
                        },
                        {
                            label: '商品管理',
                            icon: 'video-play',
                            children: [
                                {
                                    path: 'commid',
                                    name: 'commid',
                                    label: '商品列表',
                                    icon: 'setting',
                                    url: 'Other/Commid',
                                    urls:'Commid.vue',
                                    meta: { title: '商品列表' },
                                },
                                {
                                    path: 'classr',
                                    name: 'classr',
                                    label: '分类管理',
                                    icon: 'setting',
                                    url: 'Other/Classr',
                                    urls:'Classr.vue',
                                    meta: { title: '分类管理' },
                                },
                                {
                                    path: 'param',
                                    name: 'param',
                                    label: '参数管理',
                                    icon: 'setting',
                                    url: 'Other/Param',
                                    urls:'Param.vue',
                                    meta: { title: '参数管理' },
                                },
                            ]
                        },
                    ],
                    Infrom: {
                        url: 3,
                        name: '文化喵',
                        time: (time).Format('yyyy-MM-dd'),
                        addre: '江苏南京',
                        address: ' 南京市玄武区孝陵卫街道',
                        sex: '女',
                        company: '星乐猫咖',
                        position: '商品管理员',
                        grade: 'B',
                        iphoneNamber: '18245622710',
                    },
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if (username === 'orderAdmin' && password === '123456') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'Home/Home',
                            urls:'Home.vue',
                            meta: { title: '首页' },
                        },
                        {
                            path: '/personl',
                            label:'个人主页',
                            name: 'personl',
                            url:'Personl/Personl',
                            urls:'Personl.vue',
                            meta: { title: '个人主页' },
                        },
                        {
                            path: 'order',
                            name: 'order',
                            label: '订单管理',
                            icon: 'setting',
                            url: 'Other/Order',
                            urls:'Order.vue',
                            meta: { title: '订单管理' },
                        },
                    ],
                    Infrom: {
                        url: 4,
                        name: '霸总喵',
                        time: (time).Format('yyyy-MM-dd'),
                        addre: '江苏南京',
                        address: ' 南京市玄武区孝陵卫街道',
                        sex: '男',
                        company: '星乐猫咖',
                        position: '订单管理员',
                        grade: 'B',
                        iphoneNamber: '18230722710',
                    },
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if (username === 'rolesAdmin' && password === '123456') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: 'home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'Home/Home',
                            urls:'Home.vue',
                            meta: { title: '首页' },
                        },
                        {
                            path: '/personl',
                            label:'个人主页',
                            name: 'personl',
                            url:'Personl/Personl',
                            urls:'Personl.vue',
                            meta: { title: '个人主页' },
                        },
                        {
                            label: '权限管理',
                            icon: 'lock',
                            children: [
                                {
                                    path: 'roles',
                                    name: 'roles',
                                    label: '角色列表',
                                    icon: 'setting',
                                    url: 'Other/Roles',
                                    urls:'Roles.vue',
                                    meta: { title: '角色列表' },
                                },
                                {
                                    path: 'compent',
                                    name: 'compent',
                                    label: '权限列表',
                                    icon: 'key',
                                    url: 'Other/Compent',
                                    urls:'Compent.vue',
                                    meta: { title: '权限列表' },
                                },
                            ]
                        },
                    ],
                    Infrom: {
                        url: 5,
                        name: '富豪喵',
                        time: (time).Format('yyyy-MM-dd'),
                        addre: '江苏南京',
                        address: ' 南京市玄武区孝陵卫街道',
                        sex: '男',
                        company: '星乐猫咖',
                        position: '权限管理员',
                        grade: 'A-',
                        iphoneNamber: '15821876839',
                    },
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message: '账号或密码输入错误'
                }
            }
        }
    }
}
