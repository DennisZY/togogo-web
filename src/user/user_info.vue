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
          <router-link to="recruit">
            <strong>招聘信息</strong>
          </router-link>
        </p>
        <p id="choosen">
          <router-link to>
            <strong>其他用户信息</strong>
          </router-link>
        </p>
        <p>
          <router-link to="owner_info">
            <strong>个人主页</strong>
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
            <button style="color: rgb(36, 177, 241);">发布</button>
            <button
              @click="user_info2"
              style="border-bottom:0.5px solid black;margin-bottom:5px"
            >问一问</button>
          </div>
        </div>
        <div class="two">
          <div class="title">
            <p>发布列表</p>
          </div>
          <div id="page">
            <el-table
              size="mini"
              style="width: 99%;margin-left:1px"
              :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            >
              <el-table-column label="序号" width="100">
                <template slot-scope="scope">
                  <span>{{scope.$index+(currentPage - 1) * pageSize + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column label="城市" prop="cityName"></el-table-column>
              <el-table-column label="岗位" prop="postType"></el-table-column>
              <el-table-column label="类型" prop="jobType"></el-table-column>
              <el-table-column label="公司" prop="companyName"></el-table-column>
              <el-table-column label="时间" prop="postTime" width="150"></el-table-column>
              <el-table-column label="操作" prop="text">
                <template slot-scope="scope">
                  <div id="text">
                    <button @click="chakan(scope.$index)">查看</button>
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
    this.getUserInfoById();
    this.UserIssueList();
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
    UserIssueList() {
      //获取用户数据
      var that = this;
      var num = this.$route.query.id;
      this.$axios({
        methods: "get",
        url: "http://api.hzycjy.top/userInfo/UserIssueList?openId=" + num,
      })
        .then((res) => {
          that.list = res.data.oData;
        })
        .catch((err) => {
          that.$message.error("展示列表请求失败");
        });
    },
    getUserInfoById() {
      //获取用户数据
      var that = this;
      var num = this.$route.query.id;
      this.$axios({
        methods: "get",
        url: "http://api.hzycjy.top/userInfo/getUserInfoById?openId=" + num,
      })
        .then((res) => {
          that.imfor = res.data.oData;
        })
        .catch((err) => {
          that.$message.error("展示列表请求失败");
        });
    },

    user_info2() {
      this.$router.push({
        path: "/user_info2",
        query: { id: this.$route.query.id },
      });
    },
    chakan(index) {
      //查看用户详情
      this.$router.push({
        path: "/postDetail",
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