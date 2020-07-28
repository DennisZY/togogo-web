<template>
  <div id="register">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
      autocomplete="on"
      label-position="left"
    >
      <h2 style="margin-top:40px">用户注册页面</h2>
      <el-form-item prop="username">
        <el-input
          v-model="registerForm.username"
          placeholder="请输入账号"
          style="width:300px;height:43px;margin-top:20px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password_01">
        <el-input
          show-password
          @keyup.enter.native="register"
          v-model="registerForm.password_01"
          type="password"
          placeholder="请输入密码"
          style="width:300px;height:43px;margin-top:10px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password_02">
        <el-input
          show-password
          @keyup.enter.native="register"
          v-model="registerForm.password_02"
          type="password"
          placeholder="请再次输入密码"
          style="width:300px;height:43px;margin-top:10px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="return_login"
          type="primary"
          style="width:100px;height:43px;margin-top:30px"
        >返回</el-button>
        <el-button
          @click="register"
          type="primary"
          style="width:100px;height:43px;margin-top:30px"
        >确认注册</el-button>
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
      registerForm: {
        username: "",
        password_01: "",
        password_02: "",
      },
      registerRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password_01: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        password_02: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapMutations(["changeregister"]),
    return_login() {
      this.$router.push("/");
    },
    register() {
      let _this = this;
      if (
        this.registerForm.username === "" ||
        this.registerForm.password_01 == ""
      ) {
        alert("用户名或密码不能为空");
      } else if (
        this.registerForm.password_01 != this.registerForm.password_02
      ) {
        alert("两次密码输入不一致");
      } else {
        var registerData = new FormData();
        registerData.append("userName", this.registerForm.username);
        registerData.append("userPwd", this.registerForm.password_01);
        this.$axios({
          method: "post",
          url: "https://api.hzycjy.top/admin/register",
          data: registerData,
        })
          .then((res) => {
            console.log(res);
            if (res.data.status == 200) {
              _this.$router.push("/");
            } else {
              alert("该用户已存在，请重新注册");
            }
          })
          .catch((err) => {
            this.$message.error("该用户已存在，请重新注册");
          });
      }
    },
  },
};
</script>
<style>
#register {
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
