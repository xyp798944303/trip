<template>
  <el-form :rules="rules" :model="form" class="form" ref="from" >
    <el-form-item prop="username">
      <el-input v-model="form.username" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <el-form-item  prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
    </el-form-item>
    <p>
      <a href="javascript:''" class="forget">忘记密码</a>
    </p>
    <el-form-item>
      <el-button type="primary" class="login" @click="accounts">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import {accounts} from "@/axios/index.js"
export default {
  data() {
    return {
      form: {
          password:'123456', //密码
          username:'13800138000'//用户名
      },
        rules: {
            username: [
                { 
                    required: true, 
                    message: '请输入用户名', 
                    trigger: 'blur' 
                },
            ],
            password: [
                { 
                    required: true, 
                    message: '请输入密码', 
                    trigger: 'blur' 
                },
            ],
        },
    }
  },
  methods:{
       accounts(){
          this.$refs["from"].validate((valid) => {
          if (valid) {
            //  accounts(this.form).then((res)=>{
            //      console.log(res.data)
            //  })
          this.$store.dispatch('user/login',this.form).then((res)=>{
            //   console.log(res);
            //   console.log(this.$store.state.user.userInfo);
            this.$message({
                message:"登录成功,正在跳转",
                type:"success"
            });
            setTimeout(()=>{
                this.$router.replace("/")
                let data = JSON.stringify(this.$store.state.user.userInfo)
                console.log(data);
                // localStorage.setItem("vuex",data)
            },1000)
          })
          }
          //返回的token存到vuex里面去 
      })
  }
}
}
</script>

<style lang="less" scoped>
.form {
  padding: 25px 25px 0 25px;
}
.forget {
  float: right;
  margin-bottom: 15px;
}
.login {
  width: 100%;
}
</style>