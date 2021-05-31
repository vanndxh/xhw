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
              <el-avatar :size="80" :src="info.urlPortrait"></el-avatar>
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
                      {{changePasswordButton }}
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
          <el-card v-for="item in carts" :key="item">
            <el-row>
              <el-col :span="4">
                <img :src="item.bookPic" alt="bookPic" style="width: 180px; height: 180px;">
              </el-col>
              <el-col :span="18" :push="1">
                <el-descriptions class="margin-top" title="商品详情" :column="2" :size="''" border>
                  <el-descriptions-item>
                    <template #label>
                      <i class="el-icon-s-management"></i>
                      书本名称
                    </template>
                    {{ item.bookName }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <i class="el-icon-s-custom"></i>
                      书本作者
                    </template>
                    {{ item.bookAuthor }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <i class="el-icon-shopping-cart-2"></i>
                      书本售价
                    </template>
                    {{ item.bookPrice }}
                  </el-descriptions-item>
                </el-descriptions>
                <br>
                <!--其他按钮操作-->
                <el-row>
                  <el-col :span="4" :push="16">
                    <el-button type="primary" plain @click="viewItems" size="small">查看详情</el-button>
                  </el-col>
                  <el-col :span="4" :push="16">
                    <el-button type="danger" plain @click="removeTrolley" size="small">移除购物车</el-button>
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
          <el-card shadow="hover" class="item" v-for="item in comments" :key="item" align="left">
            <el-row>
              <el-col :span="1">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                           size="small"></el-avatar>
              </el-col>
              <el-col :span="4" style="margin-top: 6px">
                <h4 style="margin-top: 2px">{{ item.username }}</h4>
              </el-col>
              <el-col :span="8" style="margin-top: 6px">
                <el-rate
                    v-model="item.score"
                    disabled
                    show-score
                    text-color="#ff9900">
                </el-rate>
              </el-col>
            </el-row>
            <p class="c">{{ item.content }}</p>
            <div align="right">
              <el-button v-if="info.username === 'vanndxh'" size="mini" type="danger" plain>删除</el-button>
            </div>
          </el-card>
          <!--分页-->
          <br>
          <el-pagination
              background
              layout="prev, pager, next"
              :total="10">
          </el-pagination>

        </el-tab-pane>

        <!--管理书籍-->
        <el-tab-pane label="管理书籍" v-if="info.username === 'vanndxh'">
          <h4>管理书籍</h4>
          <el-table
              :data="tableData"
              style="width: 100%"
              :stripe="true"
              :border="true"
              size="small">

            <el-table-column
                label="书本名称"
                width="200"
                align="center">
              <template #default="scope">
                <span style="margin-left: 10px">{{ scope.row.bookName }}</span>
              </template>
            </el-table-column>

            <el-table-column
                label="作者"
                width="200px"
                align="center">
              <template #default="scope">
                <span style="margin-left: 10px">{{ scope.row.bookAuthor }}</span>
              </template>
            </el-table-column>

            <el-table-column
                label="价格"
                width="200"
                align="center">
              <template #default="scope">
                <span style="margin-left: 10px">￥{{ scope.row.bookPrice }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button size="small" type="primary" plain
                           @click="handleEnter(scope.$index)">进入
                </el-button>
                <el-button size="small" type="danger" plain
                           @click="handleDelete(scope.$index)">删除
                </el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-tab-pane>

      </el-tabs>
    </el-col>
  </el-row>
  <bottom></bottom>
</template>

<script>
import tabBar from "@/components/common/tabBar";
import bottom from "@/components/common/bottom";

export default {
  name: "Mine",
  components: {
    tabBar, bottom
  },
  data() {
    return {
      comments: [
        {
          username: "wyz",
          score: 3,
          content: "this is content 1"
        },
        {
          username: "wyz",
          score: 4,
          content: "this is content 2"
        },
        {
          username: "wyz",
          score: 4,
          content: "this is content 3"
        },
        {
          username: "wyz",
          score: 4,
          content: "this is content 4"
        },
        {
          username: "wyz",
          score: 4,
          content: "this is content 5"
        }
      ],
      carts: [
        {
          bookName: '《论如何给小黑钱》',
          bookAuthor: '小黑',
          bookPrice: '88.88',
          bookPic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1017432341,1254182363&fm=224&gp=0.jpg'
        }
      ],
      tableData: [
        {
          bookName: '《论如何给小黑钱》',
          bookAuthor: '小黑',
          bookPrice: '88.88',
        },
        {
          bookName: '《计算机科学导论》',
          bookAuthor: '佛罗赞',
          bookPrice: '50.00',
        },
        {
          bookName: '《考研数学复习大全》',
          bookAuthor: '汤家凤',
          bookPrice: '80.00',
        },
      ],
      info: {
        username: 'vanndxh',
        password: '123456',
        name: 'van能的小黑',
        email: '1025196468@qq.com',
        urlPortrait: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2178438322,2539713157&fm=26&gp=0.jpg",
      },
      disable: true,
      disable2: true,
      changeNameButton: '修改名称',
      changePasswordButton: '修改密码',
    }
  },
  methods: {
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
    removeTrolley() {
      this.$alert('功能未实装~', '提示', {
        confirmButtonText: '确定',
        center: false
      })
    },
    handleDelete(index) {
      console.log(index);
      //  给你传了个index帮助你删除对应的数据
    },
    viewItems() {
      this.$alert('功能未实装~', '提示', {
        confirmButtonText: '确定',
        center: false
      })
    }
  }
}
</script>

<style scoped>

</style>