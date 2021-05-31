<template>
  <div>
    <el-backtop target=""></el-backtop>
    <el-timeline>
      <br>

      <el-timeline-item timestamp="2021/5/28" placement="top" align="left" color="green"
                        :icon="iconImportant"
                        size="large">
        <el-card align="left">
          <h4>v0.1.0</h4>
          <ul>
            <li>修改README.md</li>
            <li>正式push到github！</li>
          </ul>
        </el-card>
      </el-timeline-item>

      <el-timeline-item timestamp="2021/5/28" placement="top" align="left">
        <el-card align="left">
          <h4>v0.0.8</h4>
          <ul>
            <li>欢迎小猫“田田”加入网站</li>
            <li>优化书本详情页</li>
            <li>优化个人信息页</li>
          </ul>
        </el-card>
      </el-timeline-item>

      <el-timeline-item timestamp="2021/5/27" placement="top" align="left">
        <el-card align="left">
          <h4>v0.0.7</h4>
          <ul>
            <li>新增登录界面</li>
            <li>优化书本详情页</li>
            <li>新增个人信息页</li>
          </ul>
        </el-card>
      </el-timeline-item>

      <el-timeline-item timestamp="2021/5/26" placement="top" align="left">
        <el-card align="left">
          <h4>v0.0.6</h4>
          <ul>
            <li>完善书本详情页</li>
            <li>优化日志页,大仙板块结构</li>
          </ul>
        </el-card>
      </el-timeline-item>

      <el-timeline-item timestamp="2021/5/25" placement="top" align="left">
        <el-card align="left">
          <h4>v0.0.5</h4>
          <ul>
            <li>新增快速返回顶部功能</li>
            <li>新增小黑档案室板块</li>
            <li>新增书本详情页子板块（用于课设）</li>
            <li>优化支持小黑按钮</li>
          </ul>
        </el-card>
      </el-timeline-item>

      <el-timeline-item timestamp="2021/4/26" placement="top" align="left">
        <el-card align="left">
          <h4>v0.0.4</h4>
          <ul>
            <li>新增Log页翻页功能（未实装）</li>
            <li>新增大仙分区内容</li>
            <li>修复因API使用不当导致的bug</li>
            <li>新增反debug模块</li>
          </ul>
        </el-card>
      </el-timeline-item>

      <el-timeline-item timestamp="2021/4/24" placement="top" align="left">
        <el-card align="left">
          <h4>v0.0.3</h4>
          <ul>
            <li>新增背景音乐</li>
            <li>新增板块目录标签（未实装效果）</li>
            <li>分区内部结构优化</li>
            <li>完善关于作者界面</li>
          </ul>
        </el-card>
      </el-timeline-item>

      <el-timeline-item timestamp="2021/4/22" placement="top" align="left">
        <el-card align="left">
          <h4>v0.0.2</h4>
          <ul>
            <li>优化网站结构</li>
            <li>完善关于作者界面</li>
            <li>首页轮播图</li>
          </ul>
        </el-card>
      </el-timeline-item>

      <el-timeline-item timestamp="2021/4/21" placement="top" color="green" align="left" id="2021/4/21"
                        :icon="iconImportant"
                        size="large">
        <el-card align="left">
          <h4>v0.0.1</h4>
          <ul>
            <li>网站正式建立，并进行了一些基础配置</li>
          </ul>
        </el-card>
      </el-timeline-item>

    </el-timeline>
  </div>
</template>

<script>

export default {
  name: "Log",
  data() {
    return {
      iconImportant: 'el-icon-trophy',
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>