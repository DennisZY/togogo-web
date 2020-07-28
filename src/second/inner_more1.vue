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
            <button to="outer_more1" style="color: rgb(36, 177, 241);">发布</button>
            <button @click="toAsk" style="border-bottom:0.5px solid black;margin-bottom:5px">问一问</button>
          </div>
          <el-button
            type="primary"
            @click="change"
            style="width:65px;height:28px;margin-bottom:10px;"
          >编辑</el-button>
          <el-dialog title :visible.sync="accountVisible">
            <el-form label-width="104px" size="small" ref="imfor" :model="imfor">
              <el-form-item
                label="昵称"
                :rules="[
                { required: true, message: '昵称不能为空',trigger: 'blur'}
              ]"
              >
                <el-input style="width:210px;float:left" v-model="imfor.userName"></el-input>
              </el-form-item>
              <el-form-item
                label="头像"
                prop="userImage"
                :rules="[
                { required: true, message: '请上传图片'}
              ]"
              >
                <el-upload
                  style="float: left;margin-left:5px"
                  class="avatar-uploader"
                  action="https://api.hzycjy.top/upload/uploadImg"
                  :headers="myHeaders"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imfor.userImage" :src="imfor.userImage" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item
                label="院校"
                :rules="[
                { required: true, message: '院校不能为空',trigger: 'blur'}
              ]"
              >
                <el-input style="width:210px;float: left" v-model="imfor.userSchool"></el-input>
              </el-form-item>
              <el-form-item label="公司（选填）">
                <el-input style="width:210px;float: left" v-model="imfor.userCompany"></el-input>
              </el-form-item>
              <el-form-item label="职位（选填）">
                <el-input style="width:210px;float: left" v-model="imfor.userPosttype"></el-input>
              </el-form-item>
              <el-form-item
                label="联系方式"
                :rules="[
                { required: true, message: '联系方式不能为空',trigger: 'blur'}
              ]"
              >
                <el-input style="width:210px;float: left" v-model="imfor.userPhonePhone"></el-input>
              </el-form-item>
              <el-form-item
                label="趣言"
                :rules="[
                { required: true, message: '趣言不能为空',trigger: 'blur'}
              ]"
              >
                <el-input
                  type="textarea"
                  :rows="3"
                  style="width:210px;float:left"
                  v-model="imfor.userSignature"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="accountVisible = false">取 消</el-button>
              <el-button type="primary" @click="accountConfirm('imfor')">确认</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="two">
          <div>
            <div class="formName" style="margin-left: 30px;">
              <p>发布列表</p>
            </div>
            <el-button type="primary" @click="fabu" class="new_btn">新增发布</el-button>
            <el-dialog title :visible.sync="outerVisible" class="jump">
              <div style="background-color:rgb(242, 242, 242);  width: 270px;" @click="open1">
                <p>
                  发送
                  <span style="color:red">实习</span>招聘信息
                </p>
                <p
                  style="line-height: 18px;margin: 10px 30px;font-size:40px;color:rgb(170, 170, 170);position: relative;top: 5px"
                >></p>
              </div>
              <br />
              <div style="background-color:rgb(242, 242, 242); width: 270px;" @click="open2">
                <p>
                  发送
                  <span style="color:red">校招</span>招聘信息
                </p>
                <p
                  style="line-height: 18px;margin: 10px 30px;font-size:40px;color:rgb(170, 170, 170);position: relative;top: 5px;"
                >></p>
              </div>
            </el-dialog>
            <el-dialog title :visible.sync="innerVisible">
              <div>
                <el-form
                  :inline="true"
                  ref="form"
                  :model="form"
                  label-width="70px"
                  :hide-required-asterisk="true"
                >
                  <!-- <el-form-item
                    label="公司名称"
                    :rules="[
                    { required: true, message: '公司名称不能为空',trigger: 'blur'}
                  ]"
                  >
                    <el-select v-model="form.companyId" placeholder="请进行公司选择" size="small">
                      <el-option
                        v-for="item in company"
                        :key="item.companyId"
                        :label="item.companyName"
                        :value="item.companyId"
                      ></el-option>
                    </el-select>
                  </el-form-item>-->
                  <el-form-item
                    label="公司名称"
                    size="small"
                    :rules="[
                      { required: true, message: '公司名称不能为空',trigger: 'blur'}
                    ]"
                  >
                    <el-input style="width:210px" v-model="form.companyName" placeholder="请填写职位名称"></el-input>
                  </el-form-item>
                  <el-form-item
                    label="职位名称"
                    size="small"
                    :rules="[
                      { required: true, message: '职位名称不能为空',trigger: 'blur'}
                    ]"
                  >
                    <el-input style="width:210px" v-model="form.title" placeholder="请填写职位名称"></el-input>
                  </el-form-item>
                  <el-form-item
                    label="职位类型"
                    size="small"
                    :rules="[
                      { required: true, message: '职位类型不能为空',trigger: 'blur'}
                    ]"
                  >
                    <el-select v-model="form.typeId" placeholder="请选择职位类型">
                      <el-option
                        v-for="item in Type"
                        :key="item.typeId"
                        :label="item.typeName"
                        :value="item.typeId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="城市"
                    size="small"
                    :rules="[
                      { required: true, message: '城市不能为空',trigger: 'blur'}
                    ]"
                  >
                    <el-select v-model="form.cityId" placeholder="请选择城市">
                      <el-option
                        v-for="item in city_list"
                        :key="item.cityId"
                        :label="item.cityName"
                        :value="item.cityId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    v-if="open"
                    label="实习时长"
                    size="small"
                    :rules="[
                      { required: true, message: '实习时长不能为空',trigger: 'blur'}
                    ]"
                  >
                    <el-select v-model="form.internshipTime" placeholder="请选择实习时长">
                      <el-option label="1个月" value="1个月"></el-option>
                      <el-option label="2个月" value="2个月"></el-option>
                      <el-option label="3个月" value="3个月"></el-option>
                      <el-option label="4个月" value="4个月"></el-option>
                      <el-option label="5个月" value="5个月"></el-option>
                      <el-option label="6个月" value="6个月"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    v-else
                    label="入职时间"
                    size="small"
                    :rules="[
                      { required: true, message: '请选择入职时间',trigger: 'blur'}
                    ]"
                  >
                    <el-select v-model="form.entryTime" placeholder="请选择入职时间">
                      <el-option label="1月" value="1月"></el-option>
                      <el-option label="2月" value="2月"></el-option>
                      <el-option label="3月" value="3月"></el-option>
                      <el-option label="4月" value="4月"></el-option>
                      <el-option label="5月" value="5月"></el-option>
                      <el-option label="6月" value="6月"></el-option>
                      <el-option label="7月" value="7月"></el-option>
                      <el-option label="8月" value="8月"></el-option>
                      <el-option label="9月" value="9月"></el-option>
                      <el-option label="10月" value="10月"></el-option>
                      <el-option label="11月" value="11月"></el-option>
                      <el-option label="12月" value="12月"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="投递方式"
                    size="small"
                    :rules="[
                      { required: true, message: '投递方式不能为空',trigger: 'blur'}
                    ]"
                  >
                    <el-input
                      style="width:210px"
                      v-model="form.deliveryMethod"
                      placeholder="请输入邮箱或微信号"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="职位描述"
                    size="small"
                    :rules="[
                      { required: true, message: '职位描述不能为空',trigger: 'blur'}
                    ]"
                  >
                    <el-input
                      style="width:260%"
                      type="textarea"
                      :rows="5"
                      v-model="form.jobDescription"
                      placeholder="请输入职位详情、申请要求、工作概要、薪酬、福利等"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm('form')">确认</el-button>
              </div>
            </el-dialog>
          </div>
          <div id="page" style="margin-left:10px">
            <el-table
              default-expand-all
              size="mini"
              style="width: 99%;"
              :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            >
              <el-table-column label="序号" prop="postId" width></el-table-column>
              <el-table-column label="城市" prop="cityName" width></el-table-column>
              <el-table-column label="岗位" prop="postType" width></el-table-column>
              <el-table-column label="类型" prop="jobType" width></el-table-column>
              <el-table-column label="公司" prop="companyName" width></el-table-column>
              <el-table-column label="时间" prop="postTime" width="140"></el-table-column>
              <el-table-column label="操作" prop="text" width>
                <template slot-scope="scope">
                  <div id="text">
                    <button @click="chakan(scope.$index)" style="padding:0px">查看</button>
                    <button @click="deletePost(scope.$index)">删除</button>
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
      open: true,
      jobType: "",
      accountVisible: false,
      outerVisible: false,
      innerVisible: false,
      currentPage: 1,
      pageSize: 10,
      imfor: [],
      form: {
        companyName: "",
        internshipTime: "",
        title: "",
        deliveryMethod: "",
        cityId: "",
        typeId: "",
        jobDescription: "",
        workAddress: "",
        entryTime: "",
      },
      list: [],
      Type: [], //岗位类型
      city_list: [], //城市
      company: [], //公司
      myHeaders: { Authorization: token },
    };
  },
  created() {
    this.RobotUserIssueList();
    this.getRobotUserById();
    this.handleCommand3();
    this.handleCommand2();
    // this.handleCommand1();
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
      //查看详情
      this.$router.push({
        path: "/more",
        query: {
          id: this.list[index + (this.currentPage - 1) * this.pageSize].postId,
        },
      });
    },
    handleCommand3() {
      //获取岗位信息
      var that = this;
      this.$axios({
        methods: "get",
        url: "https://api.hzycjy.top/label/postType/list",
      })
        .then((res) => {
          that.Type = res.data.oData;
        })
        .catch((err) => {
          that.$message.error("职位列表请求失败");
        });
    },
    handleCommand2() {
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
    toAsk() {
      //跳至问一问
      this.$router.push({
        path: "/inner_more2",
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
    RobotUserIssueList() {
      //获取虚拟用户数据
      var that = this;
      var num = this.$route.query.id;
      this.$axios({
        methods: "get",
        url: "https://api.hzycjy.top/userInfo/UserIssueList?openId=" + num,
      })
        .then((res) => {
          that.list = res.data.oData;
        })
        .catch((err) => {
          that.$message.error("展示列表请求失败");
        });
    },
    deletePost(index) {
      //删除信息
      var dataList = this.list.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //确定删除
        var that = this;
        that
          .$axios({
            method: "delete",
            url:
              "https://api.hzycjy.top/api/post/deletePost?postId=" +
              dataList[index].postId,
          })
          .then(() => {
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

    change() {
      this.accountVisible = true;
    },
    accountConfirm(formName) {
      var that = this;
      var num = this.$route.query.id;
      var num1 = num.toString();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url =
            "https://api.hzycjy.top/robot/updateRobotUser?openId=" +
            num1 +
            "&userName=" +
            this.imfor.userName +
            "&userImage=" +
            this.imfor.userImage +
            "&userSchool=" +
            this.imfor.userSchool +
            "&userCompany=" +
            this.imfor.userCompany +
            "&userPosttype=" +
            this.imfor.userPosttype +
            "&userPhone=" +
            this.imfor.userPhone +
            "&userSignature=" +
            this.imfor.userSignature;
          let data = {
            openId: num1,
            userName: this.imfor.userName,
            userImage: this.imfor.userImage,
            userSchool: this.imfor.userSchool,
            userCompany: this.imfor.userCompany,
            userPosttype: this.imfor.userPosttype,
            userPhone: this.imfor.userPhone,
            userSignature: this.imfor.userSignature,
          };
          axios
            .put(url, qs.stringify(data))
            .then((res) => {
              that.$message({
                type: "success",
                message: "编辑成功",
              });
              that.getRobotUserById();
              that.accountVisible = false;
            })
            .catch((err) => {
              that.$message.error("编辑失败");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    _return() {
      this.$router.go(-1);
    },
    fabu() {
      this.outerVisible = true;
    },
    open1() {
      (this.open = true), (this.outerVisible = false);
      this.innerVisible = true;
      this.jobType = "实习";
      this.form = {
        companyName: "",
        internshipTime: "",
        title: "",
        deliveryMethod: "",
        cityId: "",
        typeId: "",
        jobDescription: "",
        workAddress: "",
        entryTime: "",
      };
    },
    open2() {
      this.open = false;
      this.outerVisible = false;
      this.innerVisible = true;
      this.jobType = "校招";
      this.form = {
        companyName: "",
        internshipTime: "",
        title: "",
        deliveryMethod: "",
        cityId: "",
        typeId: "",
        jobDescription: "",
        workAddress: "",
        entryTime: "",
      };
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var that = this;
          let url = "https://api.hzycjy.top/api/pushPost/pushPost";
          let data = {
            cityId: this.form.cityId,
            typeId: this.form.typeId,
            companyName: this.form.companyName,
            jobType: this.jobType,
            internshipTime: this.form.internshipTime,
            workAddress: this.form.workAddress,
            title: this.form.title,
            deliveryMethod: this.form.deliveryMethod,
            openId: this.$route.query.id,
            jobDescription: this.form.jobDescription,
            requirement: this.form.jobDescription,
            entryTime: this.form.entryTime,
          };
          axios
            .post(url, qs.stringify(data))
            .then((res) => {
              this.innerVisible = false;
              this.RobotUserIssueList();
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
    handleAvatarSuccess(res, file) {
      this.imfor.userImage = res.return_url;
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
.avatar-uploader {
  width: 60px;
  height: 60px;
}
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
.jump p {
  display: inline-block;
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