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
const count = 0
var nameArr=['超级管理员','订单管理员','商品管理员','用户管理员'];
var describeArr=['拥有所有查看和操作的功能','只能操作和查看用户','只能操作和查看订单','只能操作和查看商品']
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      namber:Mock.Random.natural(0,50),
      name:nameArr[Mock.Random.natural(0,3)],
      describe:describeArr[Mock.Random.natural(0,3)],
      userNamber:Mock.Random.natural(20,100),
      addTime:Random.date('yyyy-MM-dd'),
      isEnab:Mock.Random.boolean(),
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
  getRolesList: config => {
    console.log(config, 'config')
    const { name, page = 1, limit = 4 } = param2Obj(config.url)
    console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
    const mockList = List.filter(user => {
      //console.log('user',user);
      console.log('name',name);
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
   * @param namber,name,describe,userNamber,addTime,isEnab
   * @return {{code: number, data: {message: string}}}
   */
  createRoles: config => {
    const {  namber,name,describe,userNamber,addTime,isEnab } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    List.unshift({
      id: Mock.Random.guid(),
      namber:namber,
      name: name,
      describe:describe,
      userNamber:userNamber,
      addTime:addTime,
      isEnab:isEnab,
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
  deleteRoles: config => {
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
   * @param id,namber,name,describe,userNamber,addTime,isEnab
   * @return {{code: number, data: {message: string}}}
   */
  updateRoles: config => {
    const { id,namber,name,describe,userNamber,addTime,isEnab } = JSON.parse(config.body)
    //const sex_num = (sex)
    List.some(u => {
      if (u.id === id) {
        u.namber = namber
        u.name = name
        u.describe = describe
        u.userNamber = userNamber
        u.addTime = addTime
        u.isEnab = isEnab
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