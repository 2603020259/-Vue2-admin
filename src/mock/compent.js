import Mock from 'mockjs'
// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
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
const count = 0
var nameArr = ['超级管理员', '订单管理员', '商品管理员', '用户管理员'];
//var describeArr=['拥有所有查看和操作的功能','只能操作和查看用户','只能操作和查看订单','只能操作和查看商品']
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      number: Mock.Random.natural(10, 100),
      name: Mock.Random.first(),
      username: Mock.Random.first(),
      password: Mock.Random.natural(100000, 999999),
      email: Mock.Random.email(),
      addTime: Mock.Random.date('yyyy-MM-dd'),
      isEnab: Mock.Random.boolean(),
      names: nameArr[Mock.Random.natural(0, 3)],
      iphoneNamber: Mock.Random.natural(10000000000, 19999999999),
      sex: Mock.Random.natural(0, 1) ? '男' : '女',
    })
  )
}

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getCompentList: config => {
    console.log(config, 'config')
    const { name, page = 1, limit = 8 } = param2Obj(config.url)
    console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
    const mockList = List.filter(user => {
      //console.log('user',user);
      console.log('name', name);
      if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false
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
   * @param number, name, username, password, email, addTime, isEnab, names, iphoneNamber, sex
   * @return {{code: number, data: {message: string}}}
   */
  createCompent: config => {
    const { number, name, username, password, email, addTime, isEnab, names, iphoneNamber, sex } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    List.unshift({
      id: Mock.Random.guid(),
      number: number,
      name: name,
      username: username,
      password: password,
      email: email,
      addTime: addTime,
      isEnab: isEnab,
      names: names,
      iphoneNamber: iphoneNamber,
      sex: sex,
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
  deleteCompent: config => {
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
   * @param  id, name, username, password, email, names,isEnab
   * @return {{code: number, data: {message: string}}}
   */
  updateCompent: config => {
    console.log('updata');
    const {  id, name, username, password, email, names,isEnab } = JSON.parse(config.body)
    //const sex_num = (sex)
    List.some(u => {
      if (u.id === id) {
        u.name = name
        u.username = username
        u.password = password
        u.email = email
        u.isEnab = isEnab
        u.names = names
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