import axios from "axios";
//创建一个axios的二次封装
const http=axios.create({
  baseURL:'/api', //通用请求的地址前缀
  timeout:10000 //请求的超时时间
});
//添加一个请求拦截器
http.interceptors.request.use(function(config){
    //在发送请求之前做些什么
return config;
},function(error){
    //对请求错误做些什么
    return Promise.reject(error);
});
//添加响应拦截器
http.interceptors.request.use(function(response){
    //对响应过来的数据做点什么
return response;
},function(error){
    //对响应回来的错误做点什么
return Promise.reject(error);
});
export default http //暴露接口是 http