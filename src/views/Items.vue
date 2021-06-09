<template>
  <el-backtop target=""></el-backtop>
  <tabBar></tabBar>
  <br><br><br><br><br>
  <div>
    <el-row :gutter="100">
      <el-col :span="4"></el-col>
      <el-col :span="5">
        <!--书本图片详情，可以点击查看大图，大图是一个列表-->
        <div class="demo-image__preview">
          <el-image
              style="width: 300px; height: 280px"
              :src="picUrl"
              :preview-src-list="bigPicUrl">
          </el-image>
          <p class="a">点击可查看大图</p>
        </div>
      </el-col>
      <el-col :span="12">
        <!--这里是书本属性详情页面-->
        <el-descriptions class="margin-top" title="商品详情" :column="2" :size="''" border>
          <el-descriptions-item>
            <template #label>
              <i class="el-icon-s-management"></i>
              书本名称
            </template>
            {{ info.name }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <i class="el-icon-s-custom"></i>
              书本作者
            </template>
            {{ info.Author }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <i class="el-icon-shopping-cart-2"></i>
              书本售价
            </template>
            ￥{{ info.Price }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <i class="el-icon-office-building"></i>
              评分
            </template>
            <el-rate
                v-model="getStar"
                disabled
                show-score
                text-color="#ff9900" />
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <i class="el-icon-tickets"></i>
              购买人数
            </template>
            {{ info.PayNumber }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <i class="el-icon-tickets"></i>
              分类
            </template>
            {{ info.Category }}
          </el-descriptions-item>
        </el-descriptions>
        <br><br><br>
        <!--操作按钮-->
        <el-row>
          <el-col :span="6" v-if="!have">
            <el-button type="primary" plain @click="addTrolley" v-if="!inCart">加入购物车</el-button>
            <el-button type="danger" plain @click="removeTrolley" v-else>移除购物车</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="danger" plain @click="buy" v-if="!have">购买书本</el-button>
            <el-button type="success" plain @click="read" v-else>阅读书本</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="danger" plain @click="removeBook">删除</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--这里是read按钮应该弹出的试读内容-->
    <el-row v-show="showText">
      <el-col :span="16" :push="4">
        <br>
        <el-card class="b">
          <h4 align="center">阅读书本</h4>
          <p align="left" class="c">
            {{ bookContent }}
          </p>
        </el-card>
      </el-col>
    </el-row>
    <br><br><br>
    <!--左边评论区，右边排行榜-->
    <el-row :gutter="100">
      <el-col :span="12" :push="4">
        <h4 align="center">评论区</h4>
      </el-col>
      <el-col :span="5" :push="4">
        <h4 align="center">排行榜</h4>
      </el-col>
    </el-row>
    <el-row :gutter="100">
      <el-col :span="12" :push="4">
        <!--评论区-->
        <el-card shadow="hover" class="item" v-for="(comment,index) in comments" :key="comment" align="left">
          <el-row>
            <el-col :span="1">
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                         size="small"></el-avatar>
            </el-col>
            <el-col :span="4" style="margin-top: 6px">
              <h4 style="margin-top: 2px">{{ comment.UserID }}</h4>
            </el-col>
            <el-col :span="8" style="margin-top: 6px">
              <el-rate
                  v-model="comment.Star"
                  disabled
                  show-score
                  text-color="#ff9900">
              </el-rate>
            </el-col>
          </el-row>
          <p class="c">{{ comment.Content }}</p>
          <div align="right">
            <el-button size="mini" type="danger" plain @click="deleteComments(index)">删除</el-button>
          </div>
        </el-card>

        <!--评论输入框-->
        <br>
        <el-row>
          <el-col :span="20">
            <el-rate v-model="value_choose" align="left" id="rate"></el-rate>
            <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="textarea"
                maxlength="100"
                show-word-limit
                id="comment"
            >
            </el-input>
          </el-col>
          <el-col :span="4">
            <br>
            <el-button type="primary" round @click="submit">提交</el-button>
          </el-col>
        </el-row>

      </el-col>
      <el-col :span="7" :push="3">
        <!--排行榜-->
        <el-card>
          <div v-for="(item,index) in Rankings" :key="item">
            <el-row>
              <el-col class="num-box" :span="4">
                <span class="num">{{ index + 1 }}</span>
              </el-col>
              <el-col class="name-box" :span="16">
                <div align="left">
                  {{ item.Name }}
                </div>
              </el-col>
              <el-col :span="4">
                <i class="score">{{ item.Star / 2 }}</i>
              </el-col>
            </el-row>
            <br>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <br>
  </div>
  <bottom></bottom>
</template>

<script>
import tabBar from "@/components/common/tabBar";
import bottom from "@/components/common/bottom";
import {defineComponent, ref} from 'vue'
import { ElMessage } from 'element-plus';

export default {
  name: "Items",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    tabBar, bottom, defineComponent
  },
  setup() {
    // 从url截取id
    let id = 60
    return {
      id,
      text: ref(''),
      textarea: ref('')
    }
  },
  computed:{
    getStar(){
      return this.info.Star / 2
    }
  },
  data() {
    return {
      info: {},
      comments: [],
      Rankings: {},
      bookContent: '',
      value_choose: null,
      inCart: false,
      have: false,
      picUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1017432341,1254182363&fm=224&gp=0.jpg',
      bigPicUrl: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      showText: false
    }
  },
  mounted() {
    this.getInfo()
    this.getComments()
    this.getRanking()
    this.getHave()
    this.getInCart()
  },
  methods: {
    getInfo() {
      this.$store.state.axios({
        url: '/go/book/' + this.id,
        method: 'get',
      }).then(r => {
        this.info = r.data.data
      })
    },
    getComments() {
      this.$store.state.axios({
        url: '/go/comments/',
        method: 'get',
        params: {book: this.id},
      }).then(r => {
        this.comments = r.data.data
      })
    },
    getRanking() {
      this.$store.state.axios({
        url: '/go/book/',
        method: 'get',
        params: {
          category: this.info.cateID,
          hot: 1
        },
      }).then(r => {
        this.Rankings = r.data.data
      })
    },
    getHave() {
      this.$store.state.axios({
        url: '/go/purchased/' + this.id,
        method: 'get',
      }).then(r => {
        if(r.data.status === 200)
          this.have = true
      }).catch(() => {
        this.have = false
      })
    },
    getInCart() {
      this.$store.state.axios({
        url: '/go/carts/',
        method: 'get',
      }).then(r => {
        r.data.data.forEach(i => {
          if(i.id === this.id) {
            this.inCart = true
          }
        })
      })
    },
    removeBook() {
      this.$store.state.axios({
        url: '/go/book/' + this.id,
        method: 'delete',
      }).then(r => {
        console.log(r.data.status);
        if (r.data.status === 200){
          ElMessage.success({
            message: '恭喜你，已经成功删除!',
            type: 'success'
          });
        }
      })
      location.href = "/"
    },
    addTrolley() {
      this.$store.state.axios({
        url: '/go/carts/',
        method: 'post',
        data: {
          BookID: this.id
        },
      }).then(r => {
        if (r.data.status === 200) {
          ElMessage.success({
            message: '恭喜你，已经成功添加到购物车!',
            type: 'success'
          })
          this.inCart = true;
        }
      })
    },
    removeTrolley() {
      this.$store.state.axios({
        url: '/go/carts/' + this.id,
        method: 'delete',
      }).then(r => {
        if (r.data.status === 200) {
          ElMessage.success({
            message: '恭喜你，已经成功从购物车删除!',
            type: 'success'
          })
          this.inCart = false
        }
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
    buy() {
      this.$store.state.axios({
        url: '/go/purchased/' + this.id,
        method: 'post',
      }).then(r => {
        if (r.data.status === 200){
          ElMessage.success({
            message: '恭喜你，已经成功购买!',
            type: 'success'
          });
          this.have = true;
        }
      });
    },
    read() {
      this.$store.state.axios({
        url: '/go/purchased/' + this.id,
        method: 'get',
      }).then(r => {
        this.bookContent = r.data.data.content;
      });
      if (!this.showText) {
        this.showText = true;
        this.$notify.info({
          title: '提示',
          message: '再次点击按钮关闭窗口',
          duration: 2500
        });
      } else {
        this.showText = false
      }
    },
    submit() {
      if (document.getElementById("comment").value === ""
      || this.value_choose == null){
        this.$alert('内容和评分不能为空~', '提示', {
          confirmButtonText: '确定',
          center: false
        })
      } else {
        this.$store.state.axios({
          url: '/go/comments/',
          method: 'post',
          data: {
            BookID: this.id,
            Star: this.value_choose,
            Content: document.getElementById("comment").value
          },
        }).then(r => {
          if (r.data.status === 200) {
            ElMessage.success({
              message: '恭喜你，评论成功!',
              type: 'success'
            })
            this.getComments()
            document.getElementById("comment").value = "";
            this.value_choose = null
          }
        });
      }
    }
  }
}
</script>

<style scoped>
.a {
  font-size: 12px;
  color: #475669;
}

.b {
  font-size: 14px;
}

.c {
  text-indent: 2em
}

.item {
  word-wrap: break-word;
  font-size: 14px;
}

.num-box {
  width: 32px;
  height: 32px;
  margin: auto;
}

.name-box {
  height: 30px;
  margin: 0;
  line-height: 18px;
}

.num {
  color: #FFFFFF;
  background: #C0C4CC;
}

.score {
  float: right;
}
</style>