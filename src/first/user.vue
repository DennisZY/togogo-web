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
      <div class="left" style="display:inline-block;">
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
        <p id="choosen">
          <router-link to="user">
            <strong>用户管理</strong>
          </router-link>
        </p>
        <p>
          <router-link to="inner">
            <strong>内部账号管理</strong>
          </router-link>
        </p>
      </div>
      <div class="right">
        <div class="formName">
          <p>用户列表</p>
          <div class="search">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item style="height:28px" label>
                <el-input v-model="formInline.user" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchUser">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="num" style="width:200px;margin:0;float:right">
            <p v-if="list.length==user_num" style="font-size:18px">用户人数：{{user_num}}</p>
            <p v-if="list.length<user_num" style="font-size:18px">搜索用户人数：{{list.length}}</p>
          </div>
          <div id="page">
            <el-table
              size="mini"
              style="width: 100%;font-weight: normal"
              :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            >
              <el-table-column label="序号" prop="id" width="100px">
                <template slot-scope="scope">
                  <span>{{scope.$index+(currentPage - 1) * pageSize + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column label="头像" prop="city" width="60">
                <template slot-scope="scope">
                  <img
                    style="height:30px;width:30px"
                    :src="list[scope.$index+(currentPage - 1) * pageSize].userImage"
                    alt
                  />
                </template>
              </el-table-column>
              <el-table-column label="昵称" prop="userName"></el-table-column>
              <el-table-column label="性别" prop="userGender"></el-table-column>
              <el-table-column label="院校" prop="userSchool"></el-table-column>
              <el-table-column label="手机号" prop="userPhone"></el-table-column>
              <el-table-column label="操作" prop="text" width="122">
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
      </div>
      <div class="clear" style="clear:both"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "",
  data: function () {
    return {
      currentPage: 1,
      pageSize: 10,
      tableDataEnd: [],
      user_num: "", //用户总人数
      list: [],
      formInline: {
        user: "",
        region: "",
      },
    };
  },
  created() {
    this.getAllUser();
    var lett = this;
    document.onkeydown = function (e) {
      var key = window.event.keyCode;
      if (key == 13) {
        lett.searchUser();
      }
    };
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
    getAllUser() {
      //获取虚拟用户数据
      var that = this;
      this.$axios({
        methods: "get",
        url: "http://api.hzycjy.top/userInfo/getAllUser",
      })
        .then((res) => {
          that.list = res.data.oData.userDetailVoList;
          that.user_num = res.data.oData.totalCount;
          console.log(that.list);
        })
        .catch((err) => {
          that.$message.error("展示列表请求失败");
        });
    },
    chakan(index) {
      //查看用户详情
      this.$router.push({
        path: "/user_more1",
        query: {
          id: this.list[index + (this.currentPage - 1) * this.pageSize].openId,
        },
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
            this.list.splice(index, 1);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "删除失败",
            });
          });
      });
    },
    searchUser() {
      var that = this;
      this.$axios({
        methods: "get",
        url:
          "http://api.hzycjy.top/userInfo/searchUserInfo?userName=" +
          that.formInline.user,
      })
        .then((res) => {
          if (that.formInline.user) {
            that.list = res.data.oData;
          } else {
            that.getAllUser();
          }
        })
        .catch((err) => {
          that.$message.error("用户列表搜索请求失败");
        });
    },
  },
};
</script>
<style scoped>
@import "../assets/main.css";
.right {
  float: right;
  margin: 10px 136px 50px 0px;
  background-color: white;
  border: 1px solid rgb(121, 121, 121);
  border-bottom: 1px solid rgb(121, 121, 121);
  border-radius: 4px;
  width: 72%;
}
</style>