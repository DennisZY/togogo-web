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
      </div>
      <div class="right">
        <div>
          <el-button type="primary" @click="_return" class="btn_return">返回</el-button>
        </div>
        <div class="one" :model="imfor">
          <el-avatar style="margin-top:10px" :src="imfor.userImage"></el-avatar>
          <p>{{imfor.userName}}</p>
          <p
            style="display: inline-block;border-right: 0.5px solid rgb(121, 121, 121);width: 35px;margin-right:2px"
          >{{imfor.userGender}}</p>
          <p style="display: inline-block">{{imfor.userSchool}}</p>
          <br />
          <p style="display: inline-block">{{imfor.userCompany}}·</p>
          <p style="display: inline-block">{{imfor.userPosttype}}</p>
          <p>趣言：{{imfor.userSignature}}</p>
          <div class="go">
            <button @click="toPost" to="outer_more1">发布</button>
            <button style="border-bottom:0.5px solid black;color:rgb(36, 175, 241 );">问一问</button>
          </div>
        </div>
        <div class="two">
          <div class="formName" style="margin-left: 30px;">
            <p>问答列表</p>
          </div>
          <div id="page" style="width:98%;margin-left:10px;">
            <el-table
              default-expand-all
              size="mini"
              style="width: 100%"
              :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              :row-style="changeColor"
            >
              <el-table-column type="expand" width="10px">
                <template slot-scope="props">
                  <span v-if="props.row.isReply === 0">提问：</span>
                  <span v-if="props.row.isReply === 1">回复：</span>
                  {{ props.row.content}}
                </template>
              </el-table-column>
              <el-table-column label="序号" prop="postId" width></el-table-column>
              <el-table-column label="城市" prop="cityName" width></el-table-column>
              <el-table-column label="岗位" prop="postType" width></el-table-column>
              <el-table-column label="类型" prop="jobType" width></el-table-column>
              <el-table-column label="公司" prop="companyName" width></el-table-column>
              <el-table-column label="时间" prop="postTime" width="140"></el-table-column>
              <el-table-column label="操作" prop="text" width>
                <template slot-scope="scope">
                  <div id="text">
                    <button
                      v-if="scope.row.state === 1"
                      @click="chakan(scope.$index)"
                      style="padding:0px"
                    >查看</button>
                    <button
                      v-if="scope.row.state === -1"
                      style="padding:0px"
                      @click="none_delete(scope.$index)"
                    >查看</button>
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
      <div style="clear:both"></div>
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
      imageUrl: "",
      outerVisible: false,
      innerVisible: false,
      currentPage: 1,
      pageSize: 10,
      imfor: [],
      form: {
        company: "",
        time: "",
        position: "",
        way: "",
        city: "",
        style: "",
        description: "",
        phone: "",
      },
      delete_index: [],
      list: [],
      myHeaders: { Authorization: token },
    };
  },
  created() {
    this.getRobotUserById();
    this.UserAskReply();
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
    chakan(index) {
      //查看用户详情
      this.$router.push({
        path: "/postDetail",
        query: {
          id: this.list[index + (this.currentPage - 1) * this.pageSize].postId,
        },
      });
    },
    changeColor({ row, rowIndex }) {
      if (row.state === -1) {
        return "background:rgb(241, 241, 241)";
      }
    },
    toPost() {
      //跳至发布
      this.$router.push({
        path: "/user_info",
        query: { id: this.$route.query.id },
      });
    },
    getRobotUserById() {
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
    UserAskReply() {
      //获取虚拟用户数据 问一问
      var that = this;
      var num = this.$route.query.id;
      this.$axios({
        methods: "get",
        url: "https://api.hzycjy.top/userInfo/UserAskReplyList?openId=" + num,
      })
        .then((res) => {
          that.list = res.data.oData;
        })
        .catch((err) => {
          that.$message.error("展示列表请求失败");
        });
    },
    none_delete(index) {
      this.$alert("该信息已被发布者删除", "", {
        confirmButtonText: "确定",
      });
    },
  },
};
</script>
<style scoped>
@import "../assets/main.css";
.right {
  float: right;
  margin: 10px 60px 50px 0px;
  border-radius: 4px;
  width: 80%;
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
  left: 918px;
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
  width: 185px;
  margin-left: 20px;
  margin-top: 5px;
  font-weight: bolder;
}
.new_btn {
  float: right;
  margin-right: 40px;
}
.el-button {
  padding: 8px 10px 8px 10px;
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
.avatar {
  width: 60px;
  height: 60px;
}
</style>