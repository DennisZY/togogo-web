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
        <p id="choosen">
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
        <p>
          <router-link to="inner">
            <strong>内部账号管理</strong>
          </router-link>
        </p>
      </div>
      <div class="right">
        <div class="formName">
          <p>标签管理</p>
        </div>
        <div>
          <el-tabs v-model="activeName" style="margin:0px 50px">
            <el-tab-pane label="城市" name="first">
              <!-- 新建标签与编辑标签 -->
              <el-button class="jian" type="primary" @click="bianji1">新建标签</el-button>
              <el-dialog title="新建标签" :visible.sync="dialogFormVisible1">
                <el-form ref="form" :model="form">
                  <el-form-item
                    label="标签名称"
                    prop="something"
                    :rules="[
                                { required: true, message: '标签名称不能为空',trigger: 'blur'}
                                ]"
                  >
                    <el-input
                      type="textarea"
                      style="width:200px;height:40px"
                      v-model="form.something"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible1= false">取 消</el-button>
                  <el-button type="primary" @click="confirm1('form')">确 定</el-button>
                </div>
              </el-dialog>
              <el-dialog title="编辑标签" :visible.sync="dialogFormVisible2">
                <div style="margin-top:30px;">
                  <p style="margin-right:50px">城市标签</p>
                  <el-input
                    type="textarea"
                    style="width:200px;height:40px"
                    v-model="form.something"
                  ></el-input>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible2 = false">取消</el-button>
                  <el-button type="primary" @click="confirm2">确 定</el-button>
                </div>
              </el-dialog>
              <!-- 表格 -->
              <el-table size="mini" style="width: 99%;" :data="tab1">
                <el-table-column label="序号" type="index" width></el-table-column>
                <el-table-column label="标签名" prop="cityName" width></el-table-column>
                <el-table-column label="修改时间" prop="cityNewDate" width></el-table-column>
                <el-table-column label="操作" prop width>
                  <template slot-scope="scope">
                    <div id="text">
                      <el-button type="text" @click="bianji2(scope.$index)" style="padding:0px">编辑</el-button>
                      <el-button type="text" @click="_delete2(scope.$index)">删除</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="岗位" name="second">
              <!-- 新建标签与编辑标签 -->
              <el-button class="jian" type="primary" @click="bianji3">新建标签</el-button>
              <el-dialog title="新建标签" :visible.sync="dialogFormVisible3">
                <el-form ref="form" :model="form">
                  <el-form-item
                    label="标签名称"
                    prop="something"
                    :rules="[
                                    { required: true, message: '标签名称不能为空',trigger: 'blur'}
                                    ]"
                  >
                    <el-input
                      type="textarea"
                      style="width:200px;height:40px"
                      v-model="form.something"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible3 = false">取 消</el-button>
                  <el-button type="primary" @click="confirm3('form')">确 定</el-button>
                </div>
              </el-dialog>
              <el-dialog title="编辑标签" :visible.sync="dialogFormVisible4">
                <div style="margin-top:30px;">
                  <p style="margin-right:20px">岗位标签</p>
                  <el-input
                    type="textarea"
                    style="width:200px;height:40px"
                    v-model="form.something"
                  ></el-input>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible4 = false">取 消</el-button>
                  <el-button type="primary" @click="confirm4">确 定</el-button>
                </div>
              </el-dialog>
              <!-- 表格 -->
              <el-table size="mini" style="width: 90%;" :data="tab2">
                <el-table-column label="序号" type="index" width></el-table-column>
                <el-table-column label="标签名" prop="typeName" width></el-table-column>
                <el-table-column label="修改时间" prop="typeNewDate" width></el-table-column>
                <el-table-column label="操作" prop width>
                  <template slot-scope="scope">
                    <div id="text">
                      <el-button type="text" @click="bianji4(scope.$index)" style="padding:0px">编辑</el-button>
                      <el-button type="text" @click="_delete4(scope.$index)">删除</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
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
  data() {
    return {
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      a: "",
      theSame: false,
      activeName: "first",
      tab1: [],
      tab2: [],
      form: {
        something: "",
      },
    };
  },
  created() {
    this.getPostTypeList();
    this.getCityList();
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
    getCityList() {
      //获取城市数据
      var that = this;
      this.$axios({
        methods: "get",
        url: "http://api.hzycjy.top/label/city/list",
      })
        .then((res) => {
          that.tab1 = res.data.oData;
        })
        .catch((err) => {
          that.$message.error("展示列表请求失败");
        });
    },
    getPostTypeList() {
      //获取岗位数据
      var that = this;
      this.$axios({
        methods: "get",
        url: "http://api.hzycjy.top/label/postType/list",
      })
        .then((res) => {
          that.tab2 = res.data.oData;
        })
        .catch((err) => {
          that.$message.error("展示列表请求失败");
        });
    },
    bianji1() {
      (this.dialogFormVisible1 = true), (this.form.something = "");
    },
    confirm1(formName) {
      for (var i = 0; i < this.tab1.length; i++) {
        if (this.form.something == this.tab1[i].cityName) {
          this.theSame = true;
        }
      }
      if (!this.theSame && this.form.something != "") {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that = this;
            let url = "http://api.hzycjy.top/label/city/add";
            let data = {
              cityName: that.form.something,
            };
            axios
              .post(url, qs.stringify(data))
              .then((res) => {
                this.dialogFormVisible1 = false;
                this.getCityList();
              })
              .catch((err) => {
                that.$message.error("新建请求失败");
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.$message.error("已有相同标签或仅输入空格");
        this.theSame = false;
      }
    },
    bianji2(index) {
      (this.dialogFormVisible2 = true),
        (this.form.something = this.tab1[index].cityName),
        (this.a = index);
    },
    confirm2() {
      //编辑城市标签
      for (var i = 0; i < this.tab1.length; i++) {
        if (this.form.something == this.tab1[i].cityName) {
          this.theSame = true;
        }
      }
      if (!this.theSame && this.form.something != "") {
        var that = this;
        let url =
          "http://api.hzycjy.top/label/city/update?cityId=" +
          this.tab1[this.a].cityId +
          "&cityName=" +
          that.form.something;
        let data = {
          cityName: that.form.something,
        };
        axios
          .put(url, qs.stringify(data))
          .then((res) => {
            this.dialogFormVisible2 = false;
            this.getCityList();
          })
          .catch((err) => {
            that.$message.error("编辑请求失败");
          });
      } else {
        this.$message.error("已有相同标签或仅输入空格");
        this.theSame = false;
      }
    },
    bianji3() {
      (this.dialogFormVisible3 = true), (this.form.something = "");
    },
    confirm3(formName) {
      for (var i = 0; i < this.tab2.length; i++) {
        if (this.form.something == this.tab2[i].typeName) {
          this.theSame = true;
        }
      }
      if (!this.theSame && this.form.something != "") {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that = this;
            let url = "http://api.hzycjy.top/label/postType/add";
            let data = {
              typeName: that.form.something,
            };
            axios
              .post(url, qs.stringify(data))
              .then((res) => {
                this.dialogFormVisible3 = false;
                this.getPostTypeList();
              })
              .catch((err) => {
                that.$message.error("新建请求失败");
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.$message.error("已有相同标签或仅输入空格");
        this.theSame = false;
      }
    },
    bianji4(index) {
      (this.dialogFormVisible4 = true),
        (this.form.something = this.tab2[index].typeName),
        (this.a = index);
    },
    confirm4() {
      for (var i = 0; i < this.tab2.length; i++) {
        if (this.form.something == this.tab2[i].typeName) {
          this.theSame = true;
        }
      }
      if (!this.theSame && this.form.something != "") {
        var that = this;
        let url =
          "http://api.hzycjy.top/label/postType/update?typeId=" +
          that.tab2[that.a].typeId +
          "&typeName=" +
          that.form.something;
        let data = {
          typeName: that.form.something,
        };
        axios
          .put(url, qs.stringify(data))
          .then((res) => {
            this.dialogFormVisible4 = false;
            this.getPostTypeList();
          })
          .catch((err) => {
            that.$message.error("编辑请求失败");
          });
      } else {
        this.$message.error("已有相同标签或仅输入空格");
        this.theSame = false;
      }
    },

    // 删除城市标签
    _delete2(index) {
      var that = this;
      this.$confirm("确定要删除此标签吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //确定删除
        that
          .$axios({
            method: "delete",
            url:
              "http://api.hzycjy.top/label/city/delete?cityId=" +
              that.tab1[index].cityId,
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getCityList();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "删除失败",
            });
          });
      });
    },
    // 删除岗位标签
    _delete4(index) {
      this.$confirm("确定要删除此标签吗？", "提示", {
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
              "http://api.hzycjy.top/label/postType/delete?typeId=" +
              that.tab2[index].typeId,
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getPostTypeList();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "删除失败",
            });
          });
      });
    },
  },
};
</script>
<style scoped>
@import "../assets/main.css";
.formName {
  margin-left: 40px;
}
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