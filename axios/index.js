//这是登录接口
import axios from 'axios'
import {Message} from "element-ui";
axios.defaults.baseURL = "http://157.122.54.189:9095"
export  const accounts = (data)=>{
    return axios({
        method: 'post',
        url: '/accounts/login',
        data
    })
}

//这个是注册 
export  const register = (data)=>{
    return axios({
        method: 'post',
        url: '/accounts/register',
        data
    })
}

//这个是验证码 
export  const captchas = (data)=>{
    return axios({
        method: 'post',
        url: '/captchas',
        data
    })
}

//这个是获取城市
export  const airCities = (data)=>{
    return axios({
        url: `/airs/city`,
        params: {
            name: data
        }
    })
}



axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    console.dir(error);
    console.log(error.response.data);
    if(error.response.data.statusCode==400){
        Message.warning(error.response.data.message);
    }
    return Promise.reject(error);
  });