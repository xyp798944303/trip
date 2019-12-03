//这是登录接口
import axios from 'axios'
axios.defaults.baseURL = "http://157.122.54.189:9095"
export  const accounts = (data)=>{
    return axios({
        method: 'post',
        url: '/accounts/login',
        data
    })
}


