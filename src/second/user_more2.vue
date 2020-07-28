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
        <div>
          <el-button type="primary" @click="_return" class="btn_return">返回</el-button>
        </div>
        <div class="one">
          <el-avatar style="margin-top:10px" :src="imfor.userImage"></el-avatar>
          <p>{{imfor.userName}}</p>
          <p
            style="display: inline-block;border-right: 0.5px solid rgb(121, 121, 121);width: 35px;margin-right:2px"
          >{{imfor.userGender}}</p>
          <p style="display: inline-block">{{imfor.userSchool}}</p>
          <br />
          <p style="display: inline-block">{{imfor.userCompany}}·</p>
          <p style="display: inline-block">{{imfor.userPosttype}}</p>
          <p>趣言：{{imfor.state}}</p>
          <div class="go">
            <button @click="user_more1">发布</button>
            <button style="color: rgb(36, 177, 241);">收藏</button>
            <button
              @click="user_more3"
              style="border-bottom:0.5px solid black;margin-bottom:5px"
            >问一问</button>
          </div>
        </div>
        <div class="two">
          <div class="title">
            <p>收藏列表</p>
          </div>
          <div id="page">
            <el-table
              size="mini"
              style="width: 99%;margin-left:1px"
              :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            >
              <el-table-column label="序号" align="center" width="70">
                <template slot-scope="scope">
                  <span>{{scope.$index+(currentPage - 1) * pageSize + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column label="城市" prop="cityName"></el-table-column>
              <el-table-column label="岗位" prop="postType"></el-table-column>
              <el-table-column label="类型" prop="jobType"></el-table-column>
              <el-table-column label="公司" prop="companyName"></el-table-column>
              <el-table-column label="时间" prop="postTime" width="200"></el-table-column>
              <el-table-column label="操作" prop="text">
                <template slot-scope="scope">
                  <div id="text">
                    <button @click="chakan(scope.$index)">查看</button>
                    <button @click="_delete(scope.$index)">删除</button>
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
export default {
  data: function () {
    return {
      currentPage: 1,
      pageSize: 10,
      imfor: [],
      list: [],
    };
  },
  created() {
    this.getUserInfoById(), this.UserCollectList();
  },
  methods: {
    logout() {
      var that = this;
      let url = "https://api.hzycjy.top/admin/logout";
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
    user_more1() {
      this.$router.push({
        path: "/user_more1",
        query: { id: this.$route.query.id },
      });
    },
    user_more3() {
      this.$router.push({
        path: "/user_more3",
        query: { id: this.$route.query.id },
      });
    },
    getUserInfoById() {
      //获取虚拟用户数据
      var that = this;
      var num = this.$route.query.id;
      this.$axios({
        methods: "get",
        url: "https://api.hzycjy.top/userInfo/getUserInfoById?openId=" + num,
      })
        .then((res) => {
          that.imfor = res.data.oData;
        })
        .catch((err) => {
          that.$message.error("展示列表请求失败");
        });
    },
    _delete(index) {
      var num = this.$route.query.id;
      var dataList = this.list.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      this.$confirm("确定要删除此收藏吗？", "提示", {
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
              "https://api.hzycjy.top/userInfo/deleteCollection?postId=" +
              dataList[index].postId +
              "&openId=" +
              num,
          })
          .then(() => {
            this.UserCollectList();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "删除失败",
            });
          });
      });
    },
    UserCollectList() {
      //获取虚拟用户数据
      var that = this;
      var num = this.$route.query.id;
      this.$axios({
        methods: "get",
        url: "https://api.hzycjy.top/userInfo/UserCollectList?openId=" + num,
      })
        .then((res) => {
          that.list = res.data.oData;
        })
        .catch((err) => {
          that.$message.error("展示列表请求失败");
        });
    },
    chakan(index) {
      //查看用户详情
      this.$router.push({
        path: "/more",
        query: {
          id: this.list[index + (this.currentPage - 1) * this.pageSize].postId,
        },
      });
    },
    _return() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
@import "../assets/main.css";
.right {
  float: right;
  margin: 10px 80px 50px 0px;
  border-radius: 4px;
  width: 77%;
}
.one {
  display: inline-block;
  width: 22%;
  background-color: white;
  border: 1px solid rgb(121, 121, 121);
  text-align: center;
}
.one p {
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 0px;
}
.btn_return {
  margin: 5px 0px;
  position: relative;
  left: 860px;
}
.one a {
  text-decoration: none;
  font-size: 12px;
  font-weight: 800;
  border-top: 0.6px solid rgb(121, 121, 121);
  height: 26px;
  width: 140px;
  display: block;
  line-height: 25px;
  margin-left: 10px;
  color: black;
}
.go button {
  display: block;
  border: 0px;
  background-color: transparent;
  height: 32px;
  border-top: 0.5px solid black;
  width: 180px;
  margin-left: 20px;
  margin-top: 5px;
  font-weight: bolder;
}
#text button {
  border: 0;
  background-color: transparent;
  color: rgb(36, 177, 241);
}
.two {
  width: 76%;
  float: right;
  border: 1px solid rgb(121, 121, 121);
  background-color: white;
  border-radius: 4px;
}
.el-avatar {
  width: 80px;
  height: 80px;
}
</style>