<template>
  <el-form :model="form" ref="formName" :rules="rules" class="form" status-icon>
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha" :disabled="flag">{{text}}</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="昵称" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkpassword">
      <el-input v-model="form.checkpassword" placeholder="确认密码" type="password"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
import { captchas, register } from "@/axios/index.js";
export default {
  data() {
    return {
      // 表单数据
      form: {
        username: "13535206978",
        nickname: "123",
        captcha: "000000",
        password: "123",
        checkpassword: "123"
      },
      text: "获取验证码",
      flag: false,
      // 表单规则
      rules: {
        username: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        captcha: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        checkpassword: [
          {
            validator: this.validatorpassword,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //自定义校验方法
    validatorpassword(rule, value, callback) {
      if (this.form.password) {
        if (!(this.form.password === value)) {
          callback("两次输入密码不一致");
        }else{
            callback()
        }
      } else {
        callback("请先输入密码,再输入确认密码");
      }
    },
    // 发送验证码
    async handleSendCaptcha() {
      var reg = new RegExp(/^[1]([3-9])[0-9]{9}$/);
      if (reg.test(this.form.username)) {
        let res = await captchas({ tel: this.form.username });
        this.$message({
          message: `验证码是${res.data.code}`,
          type: "success"
        });
        //阻止验证码多次发送
        let time = 10;
        this.flag = true;
        let InterValObj = setInterval(() => {
          if (time === 1) {
            this.flag = false;
            this.text = "获取验证码";
            time = 10;
            clearInterval(InterValObj);
          } else {
            time--;
            this.text = `${time}秒重新获取`;
          }
        }, 1000);
      } else {
        this.$message({
          message: `请输入正确的手机号`,
          type: "success"
        });
      }
    },

    // 注册
    handleRegSubmit() {
      this.$refs["formName"].validate(valid => {
        if (valid) {
            const {checkpassword,...data} = this.form  //rest 参数 es6 新增方法  。。。变量名
            console.log(data);
          register(data).then(res => {
            console.log(res);
            this.$emit("currentTab")
            this.$message({
            type: "success",
            message: "注册成功"
          })
          });
        } else {
          this.$message({
            type: "warning",
            message: "请输入完整的信息"
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>