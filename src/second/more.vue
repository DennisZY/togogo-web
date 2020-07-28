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
        <p id="choosen">
          <router-link to="main">
            <strong>信息管理</strong>
          </router-link>
        </p>
        <p>
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
      <div class="btn_top">
        <el-button style="margin-top:5px;height:35px" type="primary" @click="_return">返回</el-button>
        <el-button style="margin-top:5px;height:35px" type="primary" @click="deletePost">删除信息</el-button>
      </div>
      <div class="right">
        <div class="formName">
          <p>招聘信息详情</p>
        </div>
        <div class="zuo">
          <!-- <img :src="company.companyLogo" alt id="logo" style="height:50px"/>   -->
          <p id="title">
            <strong>标题</strong>
          </p>
          <p id="name">{{company.companyName}}</p>
          <p id="watch_num" style="color:red">浏览量：{{company.count}}</p>
          <p id="style">{{company.jobType}}</p>
          <p id="company_imfor">{{company.cityName}}</p>
          <p id="company_imfor">{{company.internshipTime}}</p>
          <p id="company_imfor">发布时间：{{company.postTime}}</p>
          <p id="company_imfor">投递方式：{{company.deliveryMethod}}</p>
        </div>
        <div class="you">
          <p id="description">职位描述:{{company.jobDescription}}</p>
        </div>
      </div>
      <div class="right">
        <div class="formName" style="margin-right:50px;border-bottom:0.8px solid rgb(121,121,121)">
          <p>全部问答</p>
          <el-button type="primary" style="position:relative;left:660px;" @click="_add">提问</el-button>
        </div>
        <div
          class="ask_form"
          v-for="(item,index) in list.slice((currentPage-
                    1)*pageSize,currentPage*pageSize)"
          :key="index"
        >
          <div class="ask">
            <img :src="item.userImage" alt />
            <a
              class="name"
              @click="turn_user(item.userState,item.fromId)"
              style="cursor: pointer;color:#409eff;"
            >{{item.userName}}</a>
            <span v-if="item.userState==1">*</span>
            <span class="time">{{item.commentTime}}</span>
            <p style="display:block;margin-left:50px" class="post">{{item.content}}</p>
            <el-button type="primary" @click="_tellouter(index+pageSize*(currentPage-1))">回复</el-button>
            <el-button type="primary" @click="_delete(index)">删除</el-button>
          </div>
          <div v-if="item.commentList.length<2&&item.commentList.length>0">
            <div
              class="comment"
              style="position:relative;boeder-bottom:1px dashed rgb(121,121,121)"
            >
              <img :src="item.commentList[0].userImage" alt />
              <span>
                <a
                  style="color:#409eff;cursor: pointer"
                  @click="turn_user(item.commentList[0].userState,item.commentList[0].fromId)"
                >{{item.commentList[0].userName}}</a>
                <span v-if="item.commentList[0].userState==1">*</span>
                回复&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.commentList[0].commentTime}}
              </span>
              <p style="display:block">{{item.commentList[0].content}}</p>
              <el-button type="text" @click="deleteReply(index+pageSize*(currentPage-1),0)">删除</el-button>
            </div>
          </div>
          <div v-else-if="item.commentList.length>=2">
            <div v-if="!item.replyState" key="1">
              <div
                class="comment"
                style="position:relative;boeder-bottom:1px dashed rgb(121,121,121)"
                v-for="(reply,lilindex) in list[index+pageSize*(currentPage-1)].commentList"
                :key="reply.lilindex"
              >
                <img :src="reply.userImage" alt />
                <span>
                  <a
                    style="color:#409eff;cursor: pointer"
                    @click="turn_user(reply.userState,reply.fromId)"
                  >{{reply.userName}}</a>
                  <span v-if="reply.userState==1">*</span>
                  回复&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{reply.commentTime}}
                </span>
                <p style="display:block">{{reply.content}}</p>
                <el-button
                  type="text"
                  @click="deleteReply(index+pageSize*(currentPage-1),lilindex)"
                >删除</el-button>
              </div>
              <button
                class="reply_btn"
                style="font-size:16px;margin-left:370px;color:rgb(36, 177, 241);"
                @click="change_reply(index+pageSize*(currentPage-1))"
              >点击收起</button>
            </div>
            <div v-else class="comment" key="2">
              <img :src="item.commentList[0].userImage" alt />
              <span>
                <a
                  style="color:#409eff;cursor: pointer"
                  @click="turn_user(item.commentList[0].userState,item.commentList[0].fromId)"
                >{{item.commentList[0].userName}}</a>
                <span v-if="item.commentList[0].userState==1">*</span>
                回复&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.commentList[0].commentTime}}
              </span>
              <p style="display:block">{{item.commentList[0].content}}</p>
              <el-button type="text" @click="deleteReply(index+pageSize*(currentPage-1),0)">删除</el-button>
              <button
                style="font-size:16px;margin-left:270px;color:rgb(36, 177, 241);"
                class="reply_btn"
                @click="change_reply(index+pageSize*(currentPage-1))"
              >查看全部</button>
            </div>
          </div>
        </div>
        <el-pagination
          background
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="this.list.length"
          style="margin-top:25px"
        ></el-pagination>
      </div>
      <template>
        <el-dialog title="请选择发言账号" :visible.sync="out_ask">
          <!-- 评论 -->
          <el-table
            ref="singleTable"
            :data="account"
            highlight-current-row
            @current-change="handleCurrentChange"
            @row-click="showRow"
            style="width: 100%"
          >
            <el-table-column label="选择" width="70" center>
              <template slot-scope="scope">
                <el-radio
                  class="radio"
                  v-model="radio"
                  :label="scope.$index"
                  @change.native="getCurrentRow(scope.$index)"
                >&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column label="序号" width="120" prop>
              <template slot-scope="scope">
                <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="头像" prop width>
              <template slot-scope="scope">
                <img :src="scope.row.userImage" alt width="160px" style="height:30px;width:30px" />
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="昵称" show-overflow-tooltip></el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="out_ask = false">取 消</el-button>
            <el-button type="primary" @click="addConfirm">确认</el-button>
          </div>
        </el-dialog>
        <el-dialog width="40%" :visible.sync="in_ask" append-to-body>
          <el-form :model="form" ref="form">
            <el-form-item
              prop="something"
              :rules="[
                      { required: true, message: '名称不能为空',trigger: 'blur'}
                    ]"
            >
              <el-input :rows="5" type="textarea" v-model="form.something" placeholder="请发表你的想法"></el-input>
            </el-form-item>
            <el-button @click="in_ask = false">取 消</el-button>
            <el-button type="primary" @click="ask_comfirm('form')">确认</el-button>
          </el-form>
        </el-dialog>
        <el-dialog title="请选择发言账号" :visible.sync="outerVisible">
          <!-- 回复 -->
          <el-table
            ref="singleTable"
            :data="account"
            highlight-current-row
            @current-change="handleCurrentChange"
            @row-click="showRow"
            style="width: 100%"
          >
            <el-table-column label="选择" width="70" center>
              <template slot-scope="scope">
                <el-radio
                  class="radio"
                  v-model="radio"
                  :label="scope.$index"
                  @change.native="getCurrentRow(scope.$index)"
                >&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column label="序号" width="120" prop>
              <template slot-scope="scope">
                <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="头像" prop width>
              <template slot-scope="scope">
                <img :src="scope.row.userImage" alt width="160px" style="height:30px;width:30px" />
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="昵称" show-overflow-tooltip></el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="outerVisible = false">取 消</el-button>
            <el-button type="primary" @click="_tellinner">确认</el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="innerVisible" append-to-body>
          <el-form :model="form" ref="form">
            <el-form-item
              prop="something"
              :rules="[
                    { required: true, message: '名称不能为空',trigger: 'blur'}
                  ]"
            >
              <el-input :rows="5" type="textarea" v-model="form.something" placeholder="请发表你的想法"></el-input>
            </el-form-item>
            <el-button @click="innerVisible = false">取 消</el-button>
            <el-button type="primary" @click="_confirm('form')">确认</el-button>
          </el-form>
        </el-dialog>
      </template>
      <div style="clear:both"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      showMissionList: false, //默认回复收起
      ask_user: "", //回复的对象的index
      who: "", //提问的所选账号数组
      radio: "", //单选的切换
      in_ask: false,
      out_ask: false,
      innerVisible: false,
      outerVisible: false,
      num: 0,
      currentPage: 1,
      pageSize: 5,
      company: [],
      form: {
        something: "",
      },
      list: [],
      account: [],
      a: [],
      show: [],
    };
  },
  created() {
    this.postDetail();
    //this.getUserInfoById()
    this.getUserChoose();
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
    turn_user(userState, fromId) {
      if (userState == 0) {
        //用户
        this.$router.push({ path: "/user_more1", query: { id: fromId } });
      }
      if (userState == 1) {
        //机器人
        this.$router.push({ path: "/inner_more1", query: { id: fromId } });
      }
    },
    deletePost() {
      //删除信息
      var num = this.$route.query.id;
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
            url: "https://api.hzycjy.top/api/post/deletePost?postId=" + num,
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.$router.push("/main");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "删除失败",
            });
          });
      });
    },

    getUserChoose() {
      //获取选择虚拟用户数据
      var that = this;
      var num = this.$route.query.id;
      this.$axios({
        methods: "get",
        url: "https://api.hzycjy.top/robot/getAllRobotUser",
      })
        .then((res) => {
          that.account = res.data.oData;
        })
        .catch((err) => {
          that.$message.error("展示列表请求失败");
        });
    },
    postDetail() {
      //获取问答数据
      var that = this;
      var num = this.$route.query.id;
      this.$axios({
        methods: "get",
        url: "https://api.hzycjy.top/api/post/postDetail?postId=" + num,
      })
        .then((res) => {
          that.company = res.data.oData;
          that.list = res.data.oData.commentsVoList;
        })
        .catch((err) => {
          that.$message.error("展示列表请求失败");
          console.log(err);
        });
    },
    showRow(row) {
      this.radio = this.account.indexOf(row);
    },
    handleCurrentChange(val, index) {
      this.$emit("data", val.pkg);
      this.who = val;
    },

    getCurrentRow(index) {
      // console.log(index);
    },
    _return() {
      this.$router.go(-1);
    },
    _add() {
      //提问
      this.out_ask = true;
    },
    addConfirm() {
      //选定提问对象
      this.out_ask = false;
      this.in_ask = true;
      this.form.something = "";
    },
    ask_comfirm(formName) {
      //判断是否为空并提问
      var num = this.$route.query.id;
      // console.log(num);
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var that = this;
          let url = "https://api.hzycjy.top/api/post/comment";
          let data = {
            commentId: this.who.openId,
            postId: num,
            content: this.form.something,
            openId: that.who.openId,
            toId: that.company.openId,
          };
          axios
            .post(url, qs.stringify(data))
            .then((res) => {
              this.dialogFormVisible4 = false;
              this.postDetail();
            })
            .catch((err) => {
              that.$message.error("新建请求失败");
            });
          this.in_ask = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    _tellouter(val) {
      //打开回复，向某个对象
      this.outerVisible = true;
      this.form.something = "";
      this.ask_user = val;
    },
    _tellinner() {
      //确认虚拟对象
      this.outerVisible = false;
      this.innerVisible = true;
      this.radio = "";
    },
    _confirm(formName) {
      //发送回复
      var num = this.$route.query.id;
      // console.log(num);
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var that = this;
          let url = "https://api.hzycjy.top/api/post/comment";
          let data = {
            commentId: this.who.openId,
            postId: num,
            content: this.form.something,
            openId: that.who.openId,
            toId: that.list[that.ask_user].fromId,
            replyId: that.list[that.ask_user].commentId,
          };
          axios
            .post(url, qs.stringify(data))
            .then((res) => {
              this.innerVisible = false;
              this.postDetail();
            })
            .catch((err) => {
              that.$message.error("新建请求失败");
            });
          this.in_ask = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    deleteReply(index, lilindex) {
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
              "https://api.hzycjy.top/api/post/deleteComment?commentId=" +
              this.list[index].commentList[lilindex].commentId,
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.postDetail();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "删除失败",
            });
          });
      });
    },
    _delete(index) {
      var dataList = this.list.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      this.$confirm("确定要删除此信息吗？", "提示", {
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
              "https://api.hzycjy.top/api/post/deleteComment?commentId=" +
              dataList[index].commentId,
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.postDetail();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "删除失败",
            });
          });
      });
    },
    change_reply(index) {
      this.list[index].replyState = !this.list[index].replyState;
    },
  },
};
</script>
<style  scoped>
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
.formName {
  margin-left: 50px;
}
.formName p {
  font-size: 16px;
}
.btn_top {
  float: right;
  margin-right: 77px;
}
.right {
  position: relative;
  top: -285px;
  margin-bottom: 10px;
}
p {
  display: inline-block;
  font-size: 14px;
}
.zuo {
  width: 43%;
  border-right: 0.5px solid rgb(121, 121, 121);
  margin: 10px 0px 10px 50px;
  display: inline-block;
}
.you {
  width: 50%;
  float: right;
  font-size: 11px;
}
#title {
  top: -33px;
  left: 16px;
  font-size: 14px;
  position: relative;
}
#name {
  position: relative;
  position: relative;
  left: -33px;
  top: 0px;
}
#watch_num {
  margin-left: 12px;
}
#company_imfor {
  margin-right: 30px;
}
#style {
  margin: 0px 14px;
  width: 60px;
  height: 25px;
  font-size: 15px;
  text-align: center;
  border: 1px solid red;
}
.ask_form {
  margin-left: 50px;
  padding-bottom: 10px;
  border-bottom: 0.6px solid rgb(121, 121, 121);
}
.ask_form p {
  font-size: 14px;
}
.ask_form span {
  display: inline-block;
  font-size: 14px;
}
.ask_form .el-button {
  position: relative;
  top: -68px;
}
.comment {
  margin-left: 100px;
  margin-right: 60px;
  border-bottom: 0.6px dashed;
}
.ask .el-button {
  border: 0;
  background-color: transparent;
  color: rgb(36, 177, 241);
  float: right;
}
.ask img {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  position: relative;
  top: 6px;
}
.comment .el-button {
  float: right;
  margin-right: 20px;
}
.reply_btn {
  border: 0;
  background-color: transparent;
  display: block;
}
.comment img {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  position: relative;
  top: 6px;
}
</style>