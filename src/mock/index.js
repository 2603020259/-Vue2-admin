import Mock from "mockjs";
//主页数据根路径
import homeData from "./homeData";
//用户管理根路径
import user from "./user";
//订单管理根路径
import order from "./order";

//商品列表根路径
import commid from './commid';

//这是权限角色列表根路径
import roles from "./roles";

//这是权限列表的根路径
import compent from './compent';

//这是分类管理的根路径
import classr from './classr';

//这是参数管理根路径
import param from './param';

//这是登陆权限根路径
import login from './login';

Mock.setup({
    timeout:500,
});
//这是home首页路由的数据
Mock.mock('/api/home/getData',homeData.getHomeData);
//用户管理的数据
Mock.mock(/api\/user\/getUser/,'get',user.getUserList);
Mock.mock('/api/user/add','post',user.createUser);
Mock.mock('/api/user/edit','post',user.updateUser);
Mock.mock('/api/user/del','post',user.deleteUser);

//订单管理数据
Mock.mock(/api\/order\/getOrder/,'get',order.getOrderList);

//订单管理的删除

Mock.mock('/api/order/del','post',order.deleteOrder);

//商品列表数据
Mock.mock(/api\/commid\/getCommid/,'get',commid.getCommidList);

//修改商品数据

Mock.mock('/api/commid/editCommid',commid.updateCommid);

//删除商品列表数据

Mock.mock('/api/commid/delCommid',commid.deleteCommid);

//新增商品列表数据
Mock.mock('/api/commid/add','post',commid.createCommids);

//权限角色列表数据
Mock.mock(/api\/roles\/getRoles/,'get',roles.getRolesList);

//新增权限角色列表数据

Mock.mock('/api/roles/add','post',roles.createRoles);

//删除权限角色列表数据
Mock.mock('/api/roles/del','post',roles.deleteRoles);

//修改权限角色列表数据
Mock.mock('/api/roles/edit','post',roles.updateRoles);



//权限列表数据
Mock.mock(/api\/compent\/getCompent/,'get',compent.getCompentList);

//新增权限列表数据

Mock.mock('/api/compent/add','post',compent.createCompent);

//删除权限列表数据
Mock.mock('/api/compent/del','post',compent.deleteCompent);

//修改权限列表数据
Mock.mock('/api/compent/edit','post',compent.updateCompent);


//分类管理列表数据
Mock.mock(/api\/classr\/getClassr/,'get',classr.getClassrList);

//新增分类管理列表数据

Mock.mock('/api/classr/add','post',classr.createClassr);

//删除分类管理列表数据
Mock.mock('/api/classr/del','post',classr.deleteClassr);

//修改分类管理列表数据
Mock.mock('/api/classr/edit','post',classr.updateClassr);


//参数管理列表数据
Mock.mock(/api\/param\/getParam/,'get',param.getParamList);

//新增参数管理列表数据

Mock.mock('/api/param/add','post',param.createParam);

//修改参数管理列表数据
Mock.mock('/api/param/edit','post',param.updateParam);

//删除参数管理列表数据
Mock.mock('/api/param/del','post',param.deleteParam);

//修改参数管理列表数据
Mock.mock(/api\/login\/getMenu/,'post',login.getMenu);
