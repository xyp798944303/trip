//这里是vuex  vue存储数据的地方       vuex里面state得数据是不能直接赋值的 只能用 mutations的方法来改值
// 用户管理
import {accounts} from "@/axios/index.js"
export const state = ()=>{
    //采用接口返回数据结构 
    // 赋予初始值 来接收 
    return {
        userInfo:{
            token:'',
            user : {}
        }
    }
}

export const mutations = {  
    setUserInfo(state, data){
        state.userInfo = data;
    },
    clearUserInfo(state,data){
        state.userInfo = {
            token:'',
            user : {}
        }
    }
};  //vux修改数据的地方  只能用store.commit来调用

export const actions = {
    // 登录 
    login({commit}, data){
        // {commit}等价于以下代码 
        // login(store,data){
        //     const {commit} = state
        // }
         return  accounts(data).then((res)=>{
            commit("setUserInfo",res.data)
            return res.data
        })
    }
};
