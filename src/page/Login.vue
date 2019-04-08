<template>
  <div class="hello">
    <el-card class="login">
      <div slot="header">
        Login
      </div>
      <div class="content">
        <el-input prefix-icon="el-icon-service" v-model="name">
        </el-input>
        <el-input prefix-icon="el-icon-goods" show-password v-model="passWord">
        </el-input>
        <el-button size="small" type="primary" @click="register">注册</el-button>
        <el-button size="small" type="primary" @click="login">登陆</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as http from "@/request/user"
export default {
  name: "HelloWorld",
  data() {
    return {
      name: "",
      passWord: ""
    }
  },
  methods: {
    register() {
      http.register(this.name, this.passWord).then(res => {
        this.$message(res.data.message);
      })
    },
    login() {
      http.login(this.name, this.passWord).then(res => {
        this.$message(res.data.message);
        if (!res.data.failed) {
          this.$router.push({ path: '/todo', query: { userId: this.name } })
        }
      })
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 600px;
  background-color: #2d3a4be6;
  color: #eee;
  font-size: 26px;
  font-weight: 700;
  margin: 0 auto 40px auto;
}
.content {
  margin: 0 auto;
  width: 70%;
}
.content .el-input {
  margin: 5px 0;
}
/deep/.el-input__inner {
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  color: #eee;
}
.el-button {
  margin: 20px 10px 10px;
  width: 20%;
}
</style>
