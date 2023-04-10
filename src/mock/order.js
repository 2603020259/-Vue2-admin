import Mock from 'mockjs'
// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

let List = []
const count = 200
const parArr=['现金','支付宝','微信','POS通','闪付','POS通C扫B','银联二维码','会员余额支付'];
const commodityNameArr=['波斯猫','布偶猫','斯芬克斯','埃及猫','金渐层','银渐层'];
const orderStatusArr=['初始化','已支付','出货成功','出货失败','订单超时','退款初始化','退款进行中','退款成功','退款失败','订单处理中'];
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(), 
      //name:Mock.Random.cname(),
      terminal: Mock.Random.natural(), //终端号
      order :Mock.Random.natural(), //订单号
      trading: Mock.Random.natural(), //交易单号
      pay: parArr[Mock.Random.natural( 0, 7 )], //支付方式
      types:Mock.Random.natural( 0,1 ) ? '消费' : '退款', //交易类型
      payName: Mock.Random.natural(2000,4000),  //商品价格，支付金额
      commodityName:commodityNameArr[Mock.Random.natural( 0, 5 )],  //商品名称
      orderStatus :orderStatusArr[Mock.Random.natural( 0, 9 )],  //订单状态
      times: Mock.Random.date('yyyy-MM-dd'),   //创建时间
    })
  )
}
export default {
    /**
     * 获取列表
     * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
     * @param name,page, limit,
     * @return {{code: number, count: number, data: *[]}}
     */
    getOrderList: config => {
        console.log(config, 'config')
        const { name, page = 1, limit = 9 } = param2Obj(config.url)
        console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
        const mockList = List.filter(user => {
          //console.log('user',user);
          //console.log('tttt',terminal);
          //console.log('name',inputPort);
          //console.log(inputPort)
          if ( name && user.name.indexOf(name) === -1) return false
          return true
        })
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
          code: 20000,
          count: mockList.length,
          list: pageList
        }
      },
    /**
     * 增加用户
     * @param name, addr, age, birth, sex
     * @return {{code: number, data: {message: string}}}
     */
    createUser: config => {
      const { name, addr, age, birth, sex } = JSON.parse(config.body)
      console.log(JSON.parse(config.body))
      List.unshift({
        id: Mock.Random.guid(),
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      })
      return {
        code: 20000,
        data: {
          message: '添加成功'
        }
      }
    },
    /**
     * 删除用户
     * @param id
     * @return {*}
     */
    deleteOrder: config => {
      const { id } = JSON.parse(config.body)
      if (!id) {
        return {
          code: -999,
          message: '参数不正确'
        }
      } else {
        List = List.filter(u => u.id !== id)
        return {
          code: 20000,
          message: '删除成功'
        }
      }
    },
    /**
     * 批量删除
     * @param config
     * @return {{code: number, data: {message: string}}}
     */
    batchremove: config => {
      let { ids } = param2Obj(config.url)
      ids = ids.split(',')
      List = List.filter(u => !ids.includes(u.id))
      return {
        code: 20000,
        data: {
          message: '批量删除成功'
        }
      }
    },
    /**
     * 修改用户
     * @param id, name, addr, age, birth, sex
     * @return {{code: number, data: {message: string}}}
     */
    updateUser: config => {
      const { id, name, addr, age, birth, sex } = JSON.parse(config.body)
      const sex_num = parseInt(sex)
      List.some(u => {
        if (u.id === id) {
          u.name = name
          u.addr = addr
          u.age = age
          u.birth = birth
          u.sex = sex_num
          return true
        }
      })
      return {
        code: 20000,
        data: {
          message: '编辑成功'
        }
      }
    }
  }