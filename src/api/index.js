//引用axios二次封装的函数
import http from '../utils/request';
//请求首页数据并暴露

export const getData = () => {
    //返回一个Promise对象形式的数据
    return http.get('/home/getData');
}
//用户管理的数据
//返回用户列表
export const getUser = (params) => {
    console.log('params',params);
    return http.get('/user/getUser', params);
}
//添加用户信息
export const addUser = (data) => {
    return http.post('/user/add', data);
}
//修改用户信息
export const editUser = (data) => {
    return http.post('/user/edit', data);
}
//删除用户信息
export const delUser = (data) => {
    return http.post('/user/del', data);
}

//获取订单数据

export const getOrderData=(params)=>{
    //console.log('params',params)
    return http.get('/order/getOrder',params)
}
//删除订单管理数据
export const delOrder = (data) => {
    return http.post('/order/del', data);
}
//获取商品列表数据
export const getCommidData=(params)=>{
    //console.log('params',params)
    return http.get('/commid/getCommid',params)
}

//修改商品列表数据
export const editCommid=(data)=>{
    //console.log('params',params)
    return http.post('/commid/editCommid',data);
}

//删除商品数据

export const delCommid=(data)=>{
  return http.post('/commid/delCommid',data);
}

//新增商品列表数据
export const addCommids=(data)=>{
    return http.post('/commid/add',data);
  }

  //获取权限列表数据
  export const getCompentData=(params)=>{
    //console.log('params',params)
    return http.get('/compent/getCompent',params)
}

 //新增权限列表数据
 export const addCompent=(data)=>{
    //console.log('params',params)
    return http.post('/compent/add',data)
}

//删除权限列表数据
export const delCompent=(data)=>{
    //console.log('params',params)
    return http.post('/compent/del',data)
}

//修改权限列表数据
export const editCompent=(data)=>{
    //console.log('params',params)
    return http.post('/compent/edit',data)
}


 //获取权限角色列表数据
 export const getRolesData=(params)=>{
    //console.log('params',params)
    return http.get('/roles/getRoles',params)
}

 //新增权限角色列表数据
 export const addRoles=(data)=>{
    //console.log('params',params)
    return http.post('/roles/add',data)
}

//删除权限角色列表数据
export const delRoles=(data)=>{
    //console.log('params',params)
    return http.post('/roles/del',data)
}

//修改权限角色列表数据
export const editRoles=(data)=>{
    //console.log('params',params)
    return http.post('/roles/edit',data)
}


 //获取分类管理列表数据
 export const getClassrData=(params)=>{
    //console.log('params',params)
    return http.get('/classr/getClassr',params)
}

 //新增分类管理列表数据
 export const addClassr=(data)=>{
    //console.log('params',params)
    return http.post('/classr/add',data)
}

//删除分类管理列表数据
export const delClassr=(data)=>{
    //console.log('params',params)
    return http.post('/classr/del',data)
}

//修改分类管理列表数据
export const editClassr=(data)=>{
    //console.log('params',params)
    return http.post('/classr/edit',data)
}

 //获取参数管理列表数据
 export const getParamData=(params)=>{
    //console.log('params',params)
    return http.get('/param/getParam',params)
}

 //新增参数管理列表数据
 export const addParam=(data)=>{
    //console.log('params',params)
    return http.post('/param/add',data)
}

//删除参数管理列表数据
export const delParam=(data)=>{
    //console.log('params',params)
    return http.post('/param/del',data)
}

//修改参数管理列表数据
export const editParam=(data)=>{
    //console.log('params',params)
    return http.post('/param/edit',data)
}

//登陆权限数据
export const getMenu=(data)=>{
    return http.post('/login/getMenu',data)
}