<template>
  <div id="body">
    <div class="title">
      <p>求职招聘管理系统</p>
      <div style="float:right;display:inline-block;margin-right:80px;">
        <a
          @click="logout"
          style="font-size:18px;margin-right:8px;color:#409eff;cursor: pointer"
        >退出登录</a>
        <img
          style="position:relative;top:5px"
          src="https://axhub.im/ax9/d83f1323d364c46b/images/%E4%BF%A1%E6%81%AF%E7%AE%A1%E7%90%86%EF%BC%88%E9%A6%96%E9%A1%B5%EF%BC%89/u18.svg"
          alt
        />
      </div>
    </div>
    <div class="content">
      <div class="left">
        <p>
          <router-link to="banner">
            <strong>标签管理</strong>
          </router-link>
        </p>
        <p>
          <router-link to="main">
            <strong>信息管理</strong>
          </router-link>
        </p>
        <p>
          <router-link to="user">
            <strong>用户管理</strong>
          </router-link>
        </p>
        <p id="choosen">
          <router-link to="inner">
            <strong>内部账号管理</strong>
          </router-link>
        </p>
      </div>
      <div class="right">
        <div class="formName">
          <p>用户列表</p>
        </div>
        <el-button type="primary" @click="newAccount" id="new_banner">新建账号</el-button>
        <el-dialog title="新建账号" :visible.sync="newFormVisible">
          <el-form
            :model="form"
            :rules="rules"
            ref="form"
            label-width="90px"
            size="small"
            style="width: 300px;"
          >
            <el-form-item label="昵称" prop="id">
              <el-input placeholder="请填写昵称" style="width:250px" v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="上传logo" prop="imageUrl">
              <el-upload
                style="height:60px;width:60px;border: 0.5px solid rgb(121, 121, 121);"
                class="avatar-uploader"
                :headers="myHeaders"
                action="http://api.hzycjy.top/upload/uploadImg"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="院校" prop="school">
              <el-input placeholder="请输入院校名称" style="width:250px" v-model="form.school"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="Gender">
              <el-select v-model="form.Gender" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="公司(选填)" prop="company">
              <el-input placeholder="请输入公司名称" style="width:250px" v-model="form.company"></el-input>
            </el-form-item>
            <el-form-item label="职位(选填)" prop="position">
              <el-input placeholder="请输入职位名称" style="width:250px" v-model="form.position"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
              <el-input placeholder="请输入手机号" style="width:250px" v-model.number="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="趣言" prop="talk">
              <el-input
                placeholder="50字以内"
                :rows="2"
                type="textarea"
                style="width:250px;"
                v-model="form.talk"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="newFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit('form')">确 定</el-button>
          </div>
        </el-dialog>
        <div id="page">
          <el-table
            size="mini"
            style="width: 100%;"
            :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          >
            <el-table-column label="序号" align="center" width="70">
              <template slot-scope="scope">
                <span>{{scope.$index+(currentPage - 1) * pageSize + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="头像" prop width>
              <template slot-scope="scope">
                <img
                  style="height:30px;width:30px"
                  :src="list[scope.$index+(currentPage - 1) * pageSize].userImage"
                  alt
                />
              </template>
            </el-table-column>
            <el-table-column label="昵称" prop="userName" width></el-table-column>
            <el-table-column label="性别" prop="userGender" width></el-table-column>
            <el-table-column label="院校" prop="userSchool" width></el-table-column>
            <el-table-column label="手机号" prop="userPhone" width></el-table-column>
            <el-table-column label="操作" prop="text">
              <template slot-scope="scope">
                <div id="text">
                  <button @click="chakan(scope.$index)">查看</button>
                  <button @click="_delete(scope.$index)">注销</button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="this.list.length"
          ></el-pagination>
        </div>
      </div>
      <div class="clear" style="clear:both"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
var token = localStorage.getItem("Authorization"); // 要保证取到
export default {
  data: function () {
    return {
      myHeaders: { Authorization: token },
      newFormVisible: false,
      currentPage: 1,
      pageSize: 10,
      tableDataEnd: [],
      list: [],
      form: {
        id: "",
        phone: "",
        Gender: "",
        school: "",
        talk: "",
        company: "",
        imageUrl: "",
      },
      rules: {
        id: [
          { required: true, message: "请输入账号名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        Gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        phone: [
          { required: true, message: "号码不能为空", trigger: "blur" },
          { type: "number", message: "年龄必须为数字值" },
        ],
        school: [
          { required: true, message: "请输入院校名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        imageUrl: [{ required: true, message: "请上传图片" }],
      },
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    logout() {
      var that = this;
      let url = "http://api.hzycjy.top/admin/logout";
      axios
        .post(url)
        .then((res) => {
          this.$router.push({ path: "/" });
          window.localStorage.removeItem("Authorization");
        })
        .catch((err) => {
          that.message.error("退出登陆失败");
          console.log(err);
        });
    },
    chakan(index) {
      //查看用户详情
      this.$router.push({
        path: "/inner_more1",
        query: { id: this.list[index].openId },
      });
    },
    getUser() {
      //获取虚拟用户数据
      var that = this;
      this.$axios({
        methods: "get",
        url:
          "http://api.hzycjy.top/robot/getAllRobotUser?page=" +
          that.currentPage,
      })
        .then((res) => {
          that.list = res.data.oData;
        })
        .catch((err) => {
          that.$message.error("展示列表请求失败");
        });
    },
    newAccount() {
      (this.newFormVisible = true),
        (this.form.imageUrl = ""),
        (this.form.id = ""),
        (this.form.school = ""),
        (this.form.Gender = ""),
        (this.form.phone = "");
      this.form.company = "";
      this.form.talk = "";
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var that = this;
          let url = "http://api.hzycjy.top/robot/addRobotUser";
          let data = {
            userName: that.form.id,
            userImage: that.form.imageUrl,
            userSchool: that.form.school,
            userPosttype: that.form.company,
            userPhone: that.form.phone,
            userSignature: that.form.talk,
            userGender: that.form.Gender,
          };
          axios
            .post(url, qs.stringify(data))
            .then((res) => {
              this.newFormVisible = false;
              this.getUser();
            })
            .catch((err) => {
              that.$message.error("新建请求失败");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    _delete(index) {
      var dataList = this.list.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      this.$confirm("确定要注销此用户吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //确定删除
        var that = this;
        that
          .$axios({
            method: "post",
            url:
              "http://api.hzycjy.top/userInfo/deleteUser?openId=" +
              dataList[index].openId,
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "注销成功!",
            });
            this.getUser();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "删除失败",
            });
          });
      });
    },
    handleAvatarSuccess(res, file) {
      this.form.imageUrl = res.return_url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      var isIMG = true;
      if (!isJPG) {
        if (!isPNG) {
          this.$message.error("上传图片只能是 JPG, PNG 格式!");
          isIMG = false;
        }
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isIMG && isLt2M;
    },
  },
};
</script>

<style scoped>
@import "../assets/main.css";
.right {
  width: 77%;
  border: 1px solid rgb(121, 121, 121);
  background-color: white;
  float: right;
  margin: 10px 80px 50px 0px;
  border-radius: 4px;
}
.el-dialog {
  width: 450px;
}
.avatar-uploader {
  margin-left: 40px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.avatar {
  width: 60px;
  height: 60px;
  display: block;
}
#new_banner {
  position: relative;
  top: -42px;
  left: 860px;
}
.el-button {
  padding: 8px 12px 8px 12px;
}
</style>