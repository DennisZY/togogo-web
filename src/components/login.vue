<template>
  <div id="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <h2 style="margin-top:40px">求职招聘管理系统</h2>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入账号"
          style="width:300px;height:43px;margin-top:20px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          show-password
          @keyup.enter.native="login"
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
          style="width:300px;height:43px;margin-top:20px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="user_type" style="width:300px;height:43px;margin-top:10px">
        <input type="radio" name="radios" value="1" v-model="loginForm.user_type" />
        <label>管理员</label>
        <input type="radio" name="radios" value="2" v-model="loginForm.user_type" />
        <label>用户</label>
      </el-form-item>
      <el-form-item>
        <el-button @click="login" type="primary" style="width:100px;height:43px;margin-top:30px">登陆</el-button>
        <el-button
          @click="register"
          type="primary"
          style="width:100px;height:43px;margin-top:30px"
        >用户注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: "",
  data() {
    return {
      loginForm: {
        username: window.localStorage.pwnName,
        password: "",
        user_type: 1,
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    register() {
      this.$router.push("/register");
    },
    login() {
      let _this = this;
      if (this.loginForm.username === "" || this.loginForm.password === "") {
        alert("账号或密码不能为空");
      } else {
        console.log(this.loginForm.username);
        console.log(this.loginForm.password);
        if (!window.localStorage) {
          alert("浏览器不支持localstorage");
          return false;
        } else {
          window.localStorage.pwnName = _this.loginForm.username;
          console.log("已储存用户名");
        }
        var loginData = new FormData();
        loginData.append("adminName", this.loginForm.username);
        loginData.append("adminPwd", this.loginForm.password);
        loginData.append("userState", this.loginForm.user_type);
        this.$axios({
          method: "post",
          url: "https://api.hzycjy.top/admin/login",
          data: loginData,
        })
          .then((res) => {
            console.log(res);
            if (res.data.status == 200) {
              _this.userToken = res.data.oData.token;
              // 将用户token保存到vuex中
              _this.changeLogin({ Authorization: _this.userToken });
              if (_this.loginForm.user_type == 1) _this.$router.push("/main");
              else if (_this.loginForm.user_type == 2) {
                window.localStorage.setItem("token", res.data.oData.token);
                window.localStorage.setItem(
                  "openId",
                  res.data.oData.tbUser.openId
                );
                window.localStorage.setItem(
                  "userImage",
                  res.data.oData.tbUser.userImage
                );
                _this.$router.push("/recruit");
              }
            } else {
              alert("账号或密码错误");
            }
          })
          .catch((error) => {
            alert("账号或密码错误login.vue");
            window.localStorage.removeItem("Authorization");
            console.log(error);
          });
      }
    },
  },
};
</script>
<style>
#login {
  width: 400px;
  height: 332px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  border: 1px solid #888888;
  box-shadow: 5px 5px 5px #888888;
  border-radius: 8px;
  text-align: center;
}
</style>
