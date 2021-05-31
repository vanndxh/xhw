<template>
  <el-backtop target=""></el-backtop>
  <tabBar></tabBar>
  <br>
  <br>
  <br>
  <br>
  <br>
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
        <el-descriptions class="margin-top" title="商品详情" :column="1" :size="''" border>
          <el-descriptions-item>
            <template #label>
              <i class="el-icon-s-management"></i>
              书本名称
            </template>
            {{ name }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <i class="el-icon-s-custom"></i>
              书本作者
            </template>
            小黑
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <i class="el-icon-shopping-cart-2"></i>
              书本售价
            </template>
            ￥88.88
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <i class="el-icon-office-building"></i>
              书本简介
            </template>
            去关于作者界面，点击支持小黑即可
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <i class="el-icon-tickets"></i>
              备注
            </template>
            事实上暂时并没有备注
          </el-descriptions-item>
        </el-descriptions>
        <br>
        <br>
        <br>
        <!--操作按钮-->
        <el-row>
          <el-col :span="6">
            <el-button type="primary" plain @click="addTrolley" v-if="!inCart">加入购物车</el-button>
            <el-button type="primary" plain @click="removeTrolley" v-else>移除购物车</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="danger" plain @click="buy" v-if="!have">购买书本</el-button>
            <el-button type="success" plain @click="read" v-else>阅读书本</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="danger" plain>删除</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--这里是read按钮应该弹出的试读内容-->
    <el-row v-show="showText">
      <el-col :span="16" :push="4">
        <br>
        <el-card class="b">
          <h4 align="center">试读书本</h4>
          <p align="left" class="c">
            双向链表也叫双链表，是链表的一种，它的每个数据结点中都有两个指针，分别指向直接后继和直接前驱。所以，从双向链表中的任意一个结点开始，
            都可以很方便地访问它的前驱结点和后继结点。一般我们都构造双向循环链表。
          </p>
          <p>asd</p>
          <p>asd</p>
          <p>asd</p>
          <p>asd</p>
          <p>asd</p>
          <p>asd</p>
          <p>asd</p>
          <p>asd</p>
          <p>asd</p>
          <p>asd</p>
          <p>asd</p>
          <p>asd</p>
        </el-card>
      </el-col>
    </el-row>
    <br>
    <br>
    <br>
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
        <!--评论输入框-->
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
      <el-col :span="5" :push="4">
        <!--排行榜-->
        <el-scrollbar height="400px">
          <el-card>
            <el-row>
              <el-col class="num-box" :span="4">
                <span class="num1">1</span>
              </el-col>
              <el-col class="name-box" :span="16">
                <div align="left">
                  《test》
                </div>
              </el-col>
              <el-col :span="4">
                <i class="score">4.9</i>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="num-box" :span="4">
                <span class="num2">2</span>
              </el-col>
              <el-col class="name-box" :span="16">
                <div align="left">
                  《test》
                </div>
              </el-col>
              <el-col :span="4">
                <i class="score">4.8</i>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="num-box" :span="4">
                <span class="num3">3</span>
              </el-col>
              <el-col class="name-box" :span="16">
                <div align="left">
                  《test》
                </div>
              </el-col>
              <el-col :span="4">
                <i class="score">4.7</i>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="num-box" :span="4">
                <span class="num4">4</span>
              </el-col>
              <el-col class="name-box" :span="16">
                <div align="left">
                  《test》
                </div>
              </el-col>
              <el-col :span="4">
                <div class="score">4.7</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="num-box" :span="4">
                <span class="num4">5</span>
              </el-col>
              <el-col class="name-box" :span="16">
                <div align="left">
                  《test》
                </div>
              </el-col>
              <el-col :span="4">
                <i class="score">4.7</i>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="num-box" :span="4">
                <span class="num4">6</span>
              </el-col>
              <el-col class="name-box" :span="16">
                <div align="left">
                  《test》
                </div>
              </el-col>
              <el-col :span="4">
                <i class="score">4.7</i>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="num-box" :span="4">
                <span class="num4">7</span>
              </el-col>
              <el-col class="name-box" :span="16">
                <div align="left">
                  《test》
                </div>
              </el-col>
              <el-col :span="4">
                <i class="score">4.7</i>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="num-box" :span="4">
                <span class="num4">8</span>
              </el-col>
              <el-col class="name-box" :span="16">
                <div align="left">
                  《test》
                </div>
              </el-col>
              <el-col :span="4">
                <i class="score">4.7</i>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="num-box" :span="4">
                <span class="num4">9</span>
              </el-col>
              <el-col class="name-box" :span="16">
                <div align="left">
                  《test》
                </div>
              </el-col>
              <el-col :span="4">
                <i class="score">4.7</i>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="num-box" :span="4">
                <span class="num4">10</span>
              </el-col>
              <el-col class="name-box" :span="16">
                <div align="left">
                  《test》
                </div>
              </el-col>
              <el-col :span="4">
                <i class="score">4.7</i>
              </el-col>
            </el-row>
          </el-card>
        </el-scrollbar>
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

export default {
  name: "Items",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    tabBar, bottom, defineComponent
  },
  data() {
    return {
      info: {
        username: 'vanndxh',
        password: '123456',
        name: 'van能的小黑',
        email: '1025196468@qq.com',
        urlPortrait: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2178438322,2539713157&fm=26&gp=0.jpg",
      },
      name: '《论如何给小黑钱》',
      inCart: true,
      have: true,
      picUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1017432341,1254182363&fm=224&gp=0.jpg',
      bigPicUrl: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      showText: false,
      comments: [{
        username: "wyz",
        score: 3,
        content: "this is long long long long long long long long long long long long long long long long " +
            "long long long long long long long long long long long long long long long long long long long long long long content 1"
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
      value: null,
      value_choose: null
    }
  },
  setup() {
    return {
      text: ref(''),
      textarea: ref('')
    }
  },
  methods: {
    addTrolley() {
      this.$alert('功能未实装~', '提示', {
        confirmButtonText: '确定',
        center: false
      })
    },
    removeTrolley() {
      this.$alert('功能未实装~', '提示', {
        confirmButtonText: '确定',
        center: false
      })
    },
    buy() {
      this.$alert('功能未实装~', '提示', {
        confirmButtonText: '确定',
        center: false
      })
    },
    read() {
      if (!this.showText) {
        this.showText = true;
        this.$notify.info({
          title: '提示',
          message: '再次点击按钮关闭试读',
          duration: 2500
        });
      } else {
        this.showText = false
      }
    },
    submit() {
      document.getElementById("comment").value = "";
      this.value_choose = null
      this.$alert('提交成功，审核中~', '提示', {
        confirmButtonText: '确定',
        center: false
      })
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
  /*background: rgb(237, 246, 255);*/
  word-wrap: break-word;
  font-size: 14px;
}

.d {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
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

.num1 {
  color: #FFFFFF;
  background: darkred;
}

.num2 {
  color: #fff;
  background: #e67225;
}

.num3 {
  color: #FFFFFF;
  background: #e6bf25;
}

.num4 {
  color: #FFFFFF;
  background: #C0C4CC;
}

.score {
  float: right;
}
</style>