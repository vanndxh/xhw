<template>
  <tabBar></tabBar>
  <el-row>
    <el-col :span="16" :push="4">
      <el-tabs tab-position="left" style="height: 100%;">
        <!--个人信息-->
        <el-tab-pane label="个人信息">
          <!--头像-->
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar :size="80" :src="urlPortrait"></el-avatar>
            </div>
          </div>
          <h1 style="font-family: 华文行楷">{{ info.name }}</h1>
          <!--主要内容-->
          <div>
            <el-row>
              <el-col :span="18" :push="3">
                <el-descriptions class="margin-top" title="" :column="1" :size="''" border>
                  <el-descriptions-item>
                    <template #label>
                      <i class="el-icon-s-custom"></i>
                      用户名
                    </template>
                    {{ info.username }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <i class="el-icon-user"></i>
                      昵称
                    </template>
                    <el-input v-model="info.name" :disabled="disable" style="width: 80%" id="nameInput"></el-input>
                    <el-button size="small" type="primary" @click="changeName" id="changeName" plain>
                      {{ changeNameButton }}
                    </el-button>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <i class="el-icon-tickets"></i>
                      密码
                    </template>
                    <el-input type="password" v-model="info.password" :disabled="disable2" style="width: 80%"
                              id="passwordInput"></el-input>
                    <el-button size="small" type="primary" @click="changePassword" plain>
                      {{ changePasswordButton }}
                    </el-button>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <i class="el-icon-message"></i>
                      邮箱
                    </template>
                    {{ info.email }}
                  </el-descriptions-item>
                </el-descriptions>
              </el-col>
            </el-row>
          </div>
          <br>
        </el-tab-pane>

        <!--购物车-->
        <el-tab-pane label="购物车">
          <h4>购物车</h4>
          <el-card v-for="(item,index) in carts" :key="item">
            <el-row>
              <el-col :span="4">
                <img :src="bookPic" alt="bookPic" style="width: 180px; height: 180px;">
              </el-col>
              <el-col :span="18" :push="1">
                <el-descriptions class="margin-top" title="商品详情" :column="2" :size="''" border>
                  <el-descriptions-item>
                    <template #label>
                      <i class="el-icon-s-management"></i>
                      书本名称
                    </template>
                    {{ item.name }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <i class="el-icon-s-custom"></i>
                      书本作者
                    </template>
                    {{ item.author }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <i class="el-icon-shopping-cart-2"></i>
                      书本售价
                    </template>
                    ￥{{ item.price }}
                  </el-descriptions-item>
                </el-descriptions>
                <br>
                <!--其他按钮操作-->
                <el-row>
                  <el-col :span="4" :push="16">
                    <el-button type="primary" plain @click="viewItems" size="small">查看详情</el-button>
                  </el-col>
                  <el-col :span="4" :push="16">
                    <el-button type="danger" plain @click="removeTrolley(index)" size="small">移除购物车</el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-tab-pane>

        <!--评论-->
        <el-tab-pane label="历史评论">
          <h4>历史评论</h4>
          <!--评论区-->
          <el-card shadow="hover" class="item" v-for="(item,index) in comments" :key="item" align="left">
            <el-row>
              <el-col :span="1">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                           size="small"></el-avatar>
              </el-col>
              <el-col :span="4" style="margin-top: 6px">
                <h4 style="margin-top: 2px">{{ item.UserID }}</h4>
              </el-col>
              <el-col :span="8" style="margin-top: 6px">
                <el-rate
                    v-model="item.Star"
                    disabled
                    show-score
                    text-color="#ff9900">
                </el-rate>
              </el-col>
            </el-row>
            <p class="c">{{ item.Content }}</p>
            <div align="right">
              <el-button v-if="info.username === 'vanndxh'" size="mini" type="danger" plain
                         @click="deleteComments(index)">删除
              </el-button>
            </div>
          </el-card>

        </el-tab-pane>

        <!--管理-->
        <el-tab-pane label="管理" v-if="isAdmin">
          <h4>管理员管理</h4>
          <el-tabs v-model="activeName" type="border-card">

            <el-tab-pane label="新增书籍" name="addBook">
              <br>
              <!--新增书籍的表单-->
              <el-form :model="ruleForm3" status-icon :rules="rules" ref="ruleForm2" label-width="100px"
                       class="demo-ruleForm">
                <el-form-item label="书籍名称" prop="bookName3">
                  <el-input v-model="ruleForm3.bookName3" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="书籍价格" prop="bookPrice3">
                  <el-input v-model="ruleForm3.bookPrice3" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="bookAuthor3">
                  <el-input v-model="ruleForm3.bookAuthor3" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="书籍内容" prop="bookContent3">
                  <el-input v-model="ruleForm3.bookContent3"></el-input>
                </el-form-item>
                <el-form-item label="分类" prop="bookCategory3">
                  <el-input v-model="ruleForm3.bookCategory3"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm3('ruleForm3')">添加</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <el-tab-pane label="新增分类" name="addCate">
              <br>
              <!--新增分类的表单-->
              <el-form :model="ruleForm4" status-icon :rules="rules" ref="ruleForm2" label-width="100px"
                       class="demo-ruleForm">
                <el-form-item label="分类名称" prop="cateName4">
                  <el-input v-model="ruleForm4.cateName4" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm4('ruleForm4')">添加</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>

          </el-tabs>

        </el-tab-pane>

      </el-tabs>
    </el-col>
  </el-row>
  <bottom></bottom>
</template>

<script>
import tabBar from "@/components/common/tabBar";
import bottom from "@/components/common/bottom";
import {ElMessage} from "element-plus";

export default {
  name: "Mine",
  components: {
    tabBar, bottom
  },
  setup() {
    let id = 1
    return {
      id
    }
  },
  data() {
    var bookName3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入书籍名称'));
      } else {
        callback();
      }
    };
    var bookPrice3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入书籍价格'));
      } else {
        callback();
      }
    };
    var bookContent3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入书籍内容'));
      } else {
        callback();
      }
    };
    var bookAuthor3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入书籍作者'));
      } else {
        callback();
      }
    };
    var bookCategory3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入书籍分类'));
      } else {
        callback();
      }
    };
    var cateName4 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入分类名称'));
      } else {
        callback();
      }
    };
    return {
      ruleForm3: {
        bookName3: '',
        bookPrice3: '',
        bookContent3: '',
        bookAuthor3: '',
        bookCategory3: '',
      },
      ruleForm4: {
        cateName4: '',
      },
      rules: {
        bookName3: [
          {validator: bookName3, trigger: 'blur'}
        ],
        bookPrice3: [
          {validator: bookPrice3, trigger: 'blur'}
        ],
        bookContent3: [
          {validator: bookContent3, trigger: 'blur'}
        ],
        bookAuthor3: [
          {validator: bookAuthor3, trigger: 'blur'}
        ],
        bookCategory3: [
          {validator: bookCategory3, trigger: 'blur'}
        ],
        cateName4: [
          {validator: cateName4, trigger: 'blur'}
        ],
      },
      activeName: 'addBook',
      isAdmin: true,
      urlPortrait: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2178438322,2539713157&fm=26&gp=0.jpg",
      bookPic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1017432341,1254182363&fm=224&gp=0.jpg',
      comments: [],
      carts: [],
      info: {
        username: 'vanndxh',
        password: '123456',
        name: 'van能的小黑',
        email: '1025196468@qq.com',

      },
      disable: true,
      disable2: true,
      changeNameButton: '修改名称',
      changePasswordButton: '修改密码',
    }
  },
  mounted() {
    // this.getCarts()
    // this.getComments()
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm3(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.resetForm('ruleForm3');
          this.$alert('成功了，但是功能未实装~', '提示', {
            confirmButtonText: '确定',
            center: false
          })
        } else {
          this.$alert('功能未实装~', '提示', {
            confirmButtonText: '确定',
            center: false
          })
          return false;
        }
      });
    },
    submitForm4(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.resetForm('ruleForm4');
          this.$alert('成功了，但是功能未实装~', '提示', {
            confirmButtonText: '确定',
            center: false
          })
        } else {
          this.$alert('功能未实装~', '提示', {
            confirmButtonText: '确定',
            center: false
          })
          return false;
        }
      });
    },
    getCarts() {
      this.$store.state.axios({
        url: '/go/carts/',
        method: 'get',
      }).then(r => {
        console.log(r.data.data);
        this.carts = r.data.data
      })
    },
    getComments() {
      this.$store.state.axios({
        url: '/go/comments/',
        method: 'get',
      }).then(r => {
        this.comments = r.data.data
      })
    },
    deleteComments(index) {
      this.$store.state.axios({
        url: '/go/comments/' + this.comments[index].ID,
        method: 'delete',
        // eslint-disable-next-line no-unused-vars
      }).then(r => {
        ElMessage.success({
          message: '恭喜你，评论已删除!',
          type: 'success'
        })
        this.getComments()
      })
    },
    changePassword() {
      if (this.disable2 === true) {
        this.disable2 = false;
        this.changePasswordButton = "保存";
      } else {
        this.disable2 = true;
        this.changePasswordButton = "修改密码";
        this.$notify({
          title: '提示',
          message: '修改成功！',
          type: 'success',
          duration: 1500
        });
      }
    },
    changeName() {
      if (this.disable === true) {
        this.disable = false;
        this.changeNameButton = "保存";
      } else {
        this.disable = true;
        this.changeNameButton = "修改名称";
        this.$notify({
          title: '提示',
          message: '修改成功！',
          type: 'success',
          duration: 1500,
        });
      }
    },
    removeTrolley(index) {
      this.$store.state.axios({
        url: '/go/carts/' + this.carts[index].id,
        method: 'delete',
      }).then(r => {
        if (r.data.status === 200) {
          ElMessage.success({
            message: '恭喜你，已经成功从购物车删除!',
            type: 'success'
          })
          this.getCarts()
        }
      })
    },
    viewItems(index) {
      console.log(index);
    }
  }
}
</script>

<style scoped>

</style>