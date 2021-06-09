<template>
  <tabBar></tabBar>
  <div style="margin-top: 150px">
    <el-row>
      <el-col :span="8" :push="8">

        <el-tabs v-model="activeName" type="border-card">
          <!--登录框验证-->
          <el-tab-pane label="登录" name="first">
            <br>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                     class="demo-ruleForm">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form>
          </el-tab-pane>

          <!--注册表单验证-->
          <el-tab-pane label="注册" name="second">
            <br>
            <el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" label-width="100px"
                     class="demo-ruleForm">
              <el-form-item label="用户名" prop="username2">
                <el-input v-model="ruleForm2.username2" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass2">
                <el-input type="password" v-model="ruleForm2.pass2" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass2">
                <el-input type="password" v-model="ruleForm2.checkPass2" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="昵称" prop="name2">
                <el-input v-model="ruleForm2.name2"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email2">
                <el-input v-model="ruleForm2.email2"></el-input>
              </el-form-item>
              <el-button type="primary" @click="submitForm2('ruleForm2')">注册</el-button>
            </el-form>

          </el-tab-pane>

        </el-tabs>
      </el-col>
    </el-row>
  </div>
  <br><br><br><br><br><br><br><br><br>
  <bottom></bottom>
</template>

<script>
import tabBar from "@/components/common/tabBar";
import bottom from "@/components/common/bottom";

export default {
  name: "Login",
  components: {
    tabBar, bottom
  },
  data() {
    const username = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    var password = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var password2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass2 !== '') {
          this.$refs.ruleForm2.validateField('checkPass2');
        }
        callback();
      }
    };
    var checkPassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.pass2) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var name2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入昵称'));
      } else {
        callback();
      }
    };
    var email2 = (rule, value, callback) => {
      let isMatch = this.checkEmail(value);
      if (value === '') {
        callback(new Error('请输入邮箱~'));
      } else if (!isMatch) {
        callback(new Error('邮箱格式不正确~'));
      } else {
        callback();
      }
    };
    return {
      activeName: 'first',
      ruleForm: {
        username: '',
        pass: '',
      },
      ruleForm2: {
        username2: '',
        pass2: '',
        checkPass2: '',
        name2: '',
        email2: ''
      },
      rules: {
        username: [
          {validator: username, trigger: 'blur'}
        ],
        pass: [
          {validator: password, trigger: 'blur'}
        ],
        username2: [
          {validator: username, trigger: 'blur'}
        ],
        pass2: [
          {validator: password2, trigger: 'blur'}
        ],
        checkPass2: [
          {validator: checkPassword2, trigger: 'blur'}
        ],
        name2: [
          {validator: name2, trigger: 'blur'}
        ],
        email2: [
          {validator: email2, trigger: 'blur'}
        ],
      },
    }
  },
  methods: {
    submitForm() {
      this.resetForm('ruleForm');
      this.$alert('功能未实装~', '提示', {
        confirmButtonText: '确定',
        center: false
      })
    },
    submitForm2() {
      this.resetForm('ruleForm2');
      this.$alert('功能未实装~', '提示', {
        confirmButtonText: '确定',
        center: false
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    checkEmail(value){
      var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
      if(myReg.test(value)){
        return true;
      }else{
        return false;
      }
    },
  }
}
</script>

<style scoped>

</style>