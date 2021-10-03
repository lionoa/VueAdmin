<template>
  <el-row
    type="flex"
    justify="center"
  >
    <el-col :span="7">
      <h2>欢迎登录管理系统</h2>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="loginForm"
      >
        <el-form-item
          prop="username"
          style="width: 310px;"
        >
          <el-input
            placeholder="用户名"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="password"
          style="width: 310px;"
        >
          <el-input
            placeholder="密码"
            type="password"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="code"
          style="width: 310px;"
        >
          <el-input
            placeholder="验证码"
            v-model="loginForm.code"
            style="width: 210px; float: left;"
          ></el-input>
          <el-image
            :src="codeImg"
            style="width: 90px; float: left; margin-left: 10px; border-radius: 3px;"
            @click="getCodeImg"
          ></el-image>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('loginForm')"
          >登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>

      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import qs from "qs";
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
        code: "",
        key: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 5, max: 5, message: "长度应为5个字符", trigger: "blur" },
        ],
      },
      codeImg: "",
    };
  },
  methods: {
    // 表单提交
    submitForm(formName) {
      // 校验
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 校验通过
          this.$axios
            .post("/login?" + qs.stringify(this.loginForm))
            .then((res) => {
              // 获取响应头中的 authorization 字段
              const jwt = res.headers["authorization"];
              // 将 token 保存到 store 中
              this.$store.commit("setToken", jwt);
              this.$message.success("登录成功");
              // 路由跳转
              this.$router.push("/index");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取验证码
    getCodeImg() {
      axios.get("/captcha", this.loginForm).then((res) => {
        this.loginForm.key = res.data.data.token;
        this.codeImg = res.data.data.captchaImg;
        this.loginForm.code = "";
      });
    },
  },
  created() {
    this.getCodeImg();
  },
};
</script>
<style scoped>
h2 {
  text-align: center;
}
.el-col {
  border: 1px solid #afafaf;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 8px;
  background-color: #ffffffd7;
  width: 400px;
}
.el-row {
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #4b29294f;
}
.el-form {
  text-align: center;
}
</style>