<template>
  <div class="LoginBox">
    <el-form ref="Login-Form" :model="user" :rules="formRules">
      <!-- Logo -->
      <!-- <div class="LogoBox">
        <img
          class="logo"
          src="../assets/icon/2.png"
          alt="如鱼科技"
        />
      </div> -->
      <!-- 表单 -->
      <div class="InputBox">
        <el-form-item prop="username">
          <el-input
            v-model="user.username"
            placeholder="请输入账号"
            prefix-icon="iconfont icon-icon_zhanghao"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="user.password"
            prefix-icon="iconfont icon-mima"
            show-password
          ></el-input>
        </el-form-item>
      </div>
      <div class="lognBtn">
        <el-button type="primary" @click="onLogin"> 登录 </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
// import QS from "qs";
export default {
  name: "Home",
  data() {
    //   :rules="formRules"自定义验证
    return {
      user: {
        username: "",
        password: "",
      },
      formRules: {
        // 手机号
        username: [
          // required 必填项  message 提示消息  trigger 触发条件
          { required: true, message: "请输入账号", trigger: "blur" },
          // pattern 是正则验证
          {
            pattern: /^[a-zA-Z0-9]{4,15}$/,
            message: "账号格式不正确",
            trigger: "blur",
          },
        ],
        // 验证码
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9]{5,15}$/,
            message: "密码格式不正确",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onLogin() {
      this.$refs["Login-Form"].validate((valid) => {
        // 如果不通过直接返回
        if (!valid) {
          return;
        }
        this.login();
      });
    },
    login() {
      var user = {
        key: "D3069A3F7C5E262F83ACEE108C4F309D",
        userName: this.user.username,
        passWord: this.user.password,
      };
      this.$axios
        .post(
          "http://user.360ruyu.cn/GymManage.asmx/Login",
          JSON.stringify(user)
        )
        .then((res) => {
          if (res.data.code == 1) {
            this.$message({
              message: "登录成功",
              type: "success",
            });
            window.localStorage.setItem("username", this.user.username);
            this.$router.push("/layout");
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
  },
};
</script>

<style scoped>
.LoginBox {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-image: url("../assets/icon/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-form {
  width: 400px;
  height: 340px;
  background-color: #fff;
  border-radius: 6px;
}

.LogoBox {
  width: 170px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
}
.logo {
  width: 40px;
  height: 40px;
}

.InputBox {
  padding-top: 90px;
  width: 300px;
  margin: auto;
}
.el-input {
  width: 300px;
}
.lognBtn {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.el-button {
  margin: 0 auto;
  width: 300px;
}
</style>