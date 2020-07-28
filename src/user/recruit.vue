<template>
  <div id="body">
    <div class="title">
      <p>求职招聘管理系统</p>
      <div style="float:right;display:inline-block;margin-right:80px;">
        <a
          @click="logout"
          style="font-size:18px;margin-right:8px;color:#409eff;cursor: pointer"
        >{{user_name}}</a>
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
        <p id="choosen">
          <router-link to>
            <strong>招聘信息</strong>
          </router-link>
        </p>
        <p>
          <router-link to="owner_info">
            <strong>个人主页</strong>
          </router-link>
        </p>
      </div>
      <div class="right">
        <div class="formName">
          <p>招聘信息列表</p>
        </div>
        <div style="float:left">
          <el-dropdown id="one" @command="handleCommand1">
            <span class="el-dropdown-link">
              {{choose1}}
              <!-- 选择类型 -->
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in Type" :key="item" :command="item">{{item}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="handleCommand2">
            <span class="el-dropdown-link">
              <!-- 选择城市 -->
              {{choose2}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in city_list"
                :key="item.cityId"
                :command="item.cityName"
              >{{item.cityName}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="handleCommand3">
            <span class="el-dropdown-link">
              <!-- 选择岗位 -->
              {{choose3}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in city_jobType"
                :key="item.typeId"
                :command="item.typeName"
              >{{item.typeName}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="handleCommand4">
            <span class="el-dropdown-link">
              <!-- 选择岗位 -->
              {{choose4}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="浏览量">浏览量</el-dropdown-item>
              <el-dropdown-item command="时间">时间</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="search">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label>
              <el-input v-model="formInline.user" placeholder="请输入公司"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="search_btn" type="primary" @click="searchCompany">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div id="page">
          <el-table
            size="small"
            style="width: 100%;"
            :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          >
            <el-table-column label="序号" align="center" width="70">
              <template slot-scope="scope">
                <span>{{scope.$index+(currentPage - 1) * pageSize + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="城市" prop="cityName" width></el-table-column>
            <el-table-column label="岗位" prop="postType" width></el-table-column>
            <el-table-column label="类型" prop="jobType" width></el-table-column>
            <el-table-column label="公司" prop="companyName" width></el-table-column>
            <el-table-column label="浏览量" prop="count"></el-table-column>
            <el-table-column label="时间" prop="postTime" width="150"></el-table-column>
            <el-table-column label="操作" prop="text" width>
              <template slot-scope="scope">
                <div id="text">
                  <button @click="chakan(scope.$index)" style="padding:0px">查看</button>
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
      <div style="clear:both"></div>
    </div>
  </div>
</template> 
<script>
import axios from "axios";
import qs from "qs";
export default {
  data: function () {
    return {
      choose1: "选择类型",
      choose2: "选择城市",
      choose3: "选择岗位",
      choose4: "选择排序",
      postType: "", //招聘类型
      city: "", //招聘城市
      jobType: "", //招聘岗位
      sorting: "", //排序方式
      currentPage: 1,
      pageSize: 10,
      tableDataEnd: [],
      city_list: [],
      city_jobType: [],
      Type: [],
      list: [],
      formInline: {
        user: "",
      },
      user_name: window.localStorage.getItem("openId"),
    };
  },
  created() {
    this.getCity();
    this.getPostType();
    this.getShowCompany();
    this.getType();
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
    searchCompany() {
      //筛选信息
      var that = this;
      this.$axios({
        methods: "get",
        url:
          "https://api.hzycjy.top/api/home/select?cityName=" +
          that.city +
          "&jobType=" +
          that.jobType +
          "&postType=" +
          that.postType +
          "&companyName=" +
          that.formInline.user,
      })
        .then((res) => {
          that.list = res.data.oData;
        })
        .catch((err) => {
          that.$message.error("职位列表请求失败");
        });
    },
    getType() {
      //类型信息
      var that = this;
      this.$axios({
        methods: "get",
        url: "https://api.hzycjy.top/api/home/postType",
      })
        .then((res) => {
          that.Type = res.data.oData;
          console.log(that.Type);
        })
        .catch((err) => {
          that.$message.error("选择类型请求失败");
          console.log(err);
        });
    },
    getCity() {
      //城市信息
      var that = this;
      this.$axios({
        methods: "get",
        url: "https://api.hzycjy.top/api/home/city",
      })
        .then((res) => {
          that.city_list = res.data.oData;
        })
        .catch((err) => {
          that.$message.error("城市列表请求失败");
        });
    },
    getPostType() {
      //职位信息
      var that = this;
      this.$axios({
        methods: "get",
        url: "https://api.hzycjy.top/api/home/jobType",
      })
        .then((res) => {
          that.city_jobType = res.data.oData;
        })
        .catch((err) => {
          that.$message.error("职位列表请求失败");
        });
    },
    getShowCompany() {
      var that = this;
      this.$axios({
        methods: "get",
        url:
          "https://api.hzycjy.top/api/home/index?pageNum=" + that.currentPage,
      })
        .then((res) => {
          that.list = res.data.oData;
        })
        .catch((err) => {
          that.$message.error("展示列表请求失败");
        });
    },
    handleCommand1(command) {
      //点击返回筛选信息——招聘
      this.jobType = encodeURI(command);
      var that = this;
      this.choose1 = command;
      this.$axios({
        methods: "get",
        url:
          "https://api.hzycjy.top/api/home/select?cityName=" +
          that.city +
          "&jobType=" +
          that.jobType +
          "&postType=" +
          that.postType +
          "&companyName=" +
          that.formInline.user,
      })
        .then((res) => {
          that.list = res.data.oData;
        })
        .catch((err) => {
          that.$message.error("职位列表请求失败");
        });
    },
    handleCommand2(command) {
      //点击返回筛选信息——招聘
      this.city = encodeURI(command);
      this.choose2 = command;
      var that = this;
      this.$axios({
        methods: "get",
        url:
          "https://api.hzycjy.top/api/home/select?cityName=" +
          that.city +
          "&jobType=" +
          that.jobType +
          "&postType=" +
          that.postType +
          "&companyName=" +
          that.formInline.user,
      })
        .then((res) => {
          that.list = res.data.oData;
        })
        .catch((err) => {
          that.$message.error("职位列表请求失败");
        });
    },
    handleCommand3(command) {
      //点击返回筛选信息——招聘
      this.postType = encodeURI(command);
      this.choose3 = command;
      var that = this;
      this.$axios({
        methods: "get",
        url:
          "https://api.hzycjy.top/api/home/select?cityName=" +
          that.city +
          "&jobType=" +
          that.jobType +
          "&postType=" +
          that.postType +
          "&companyName=" +
          that.formInline.user,
      })
        .then((res) => {
          that.list = res.data.oData;
        })
        .catch((err) => {
          that.$message.error("职位列表请求失败");
        });
    },
    handleCommand4(command) {
      //点击返回筛选信息——招聘
      this.sorting = encodeURI(command);
      this.choose4 = command;
      var that = this;
      this.$axios({
        methods: "get",
        url:
          "https://api.hzycjy.top/api/home/select?cityName=" +
          that.city +
          "&jobType=" +
          that.jobType +
          "&postType=" +
          that.postType +
          "&companyName=" +
          that.formInline.user +
          "&sortWay=" +
          that.sorting,
      })
        .then((res) => {
          that.list = res.data.oData;
        })
        .catch((err) => {
          that.$message.error("职位列表请求失败");
        });
    },
    chakan(index) {
      //查看详情
      this.$router.push({
        path: "/postDetail",
        query: {
          id: this.list[index + (this.currentPage - 1) * this.pageSize].postId,
        },
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