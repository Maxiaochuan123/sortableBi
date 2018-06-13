<template>
  <div class="login-body">
        <div class="grid-content bg-purple">
          <el-form :model="loginForm" :rules="rules2" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h3 class="title">众汇智能系统</h3>
            <h5 class="title2">ZhongHui Intelligence System</h5>
            <el-form-item prop="username" style="padding: 0 35px;">
              <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入账号">
                <i slot="prefix" class="iconfont icon-icon-test" style="margin-left: 3px;"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password" style="padding: 0 35px;">
              <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码" @keyup.enter.native="handleSubmit2">
                <i slot="prefix" class="iconfont icon-mima" style="margin-left: 3px;"></i>
              </el-input>
            </el-form-item>
            <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
            <el-form-item style="padding: 0 35px;">
              <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
              <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
            </el-form-item>
          </el-form>
        </div>
  </div>
</template>

<script>
  import { requestLogin } from './api/api'

  export default {
    data() {
      return {
        logining: false,
        loginForm: {
          username: '',
          password: ''
        },
        rules2: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true,
      };
    },
    methods: {
      handleReset2() {
        this.$refs.loginForm.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { username: this.loginForm.username, password: this.loginForm.password };
            requestLogin(loginParams).then(data => {
              this.logining = false;
              if (data.result.code != 0) {
                this.$message({
                  message: '登录失败',
                  type: 'error'
                });
              } else {//登陆成功时
                this.$message({
                  message: '欢迎您，登录成功！',
                  type: 'success'
                });
                sessionStorage.setItem('token', data.data.token);
                sessionStorage.setItem('userInfoData', JSON.stringify(data.data));
                this.$router.push({ path: '/' });
              }
            });
          } else {
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-body {
    width: 100%;
    height: 100%;
    position: absolute;
    left:0;
    top:0;
    background: url('./assets/background.jpg') no-repeat;
    overflow: hidden;
    background-size:100%; 
  }
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 100%;
    // background: #fff;
    padding: 35px 0;
    .title {
      margin: 0px auto;
      text-align: center;
      font-size:80px;
      color: #fff;
      font-weight: normal;
      letter-spacing:20px;
    }
    .title2{
      text-align: center;
      color:#fff;
      font-size:30px;
      margin:0 0 120px 0;
      font-weight: normal;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
    .el-form-item{
      width: 450px;
      margin: 30px auto;
    }
    .iconfont {
      color:#666;
      font-size:18px;
      margin-left:5px;
    }
  }
    	/* 媒体查询 */
	@media (min-width: 1024px) { 
		
	 }
	@media (min-width: 416px) and (max-width:1023px) { 

	 }
	@media (min-width: 375px) and (max-width:414px) { 
      .login-body{
        overflow: auto;
        width:100%;
      }
      .title{
        font-size:20px;
      }
	 }
	@media (min-width: 320px) and (max-width:374px) { 

	}

</style>
