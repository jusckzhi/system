import axios from "axios";
import Vue from "vue";

var vm = new Vue();




// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //若token存在，则在每次请求头中加入token
  if (sessionStorage.getItem('logintoken')) {
    axios.defaults.headers.commom['token'] = sessionStorage.getItem('logintoken')
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data && response.data.code) {
    if (parseInt(response.data.code) === 108 || parseInt(response.data.code) === 109 || response.data.msg === 'TOKEN失效，请重新登录' || response.data.msg === 'TOKEN不存在') {
      response.data.msg = "登录信息已失效，请重新登录";
      road.$message.error(response.data.msg);
      routerIndex.push('/login');
    }
    if (parseInt(response.data.code) === -1) {
      road.$message.error("请求失败");
    }
  }
  return response;
}, function (error) {
  console.dir(error);
  // road.$message.error("服务器连接失败");
  return Promise.reject(error);
})




// 基础路径
const baseUrl = "http://192.168.0.117:8080"; //测试路径


// 公共接口
export const api = ({
  apiurl,
  data
}) => {
  return axios.post(baseUrl + apiurl, JSON.stringify(data));
};