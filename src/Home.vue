<template>
  <el-col class="container">
	  <el-col :span="24" class="headerStatement">
       <div class="home-title">
				 <div>众汇金控商业智能系统</div>
			 </div>
			 <div class="userInfo">
				 <el-dropdown trigger="click">
					 <div class="userName">
						  <span>张三</span>
						  <i class="el-icon-setting"></i>
					 </div>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item  @click.native="logout" class="loginout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			 </div>
       <!-- 全屏 -->
      <div  class="fullScreen" @click="launchFullScreen()"><i :class="fullScreen ? 'iconfont icon-tuichuquanping' : 'iconfont icon-quanping'"></i></div>	 
    </el-col> 

    <!-- BI图表 -->
    <el-col class="statementBox">
      <Supersystem ></Supersystem>
    </el-col>
  </el-col>
</template>

<script>
import Supersystem from './Supersystem'
import axios from 'axios'
import util from '../src/api/util.js'
export default {
  components:{
    Supersystem
  },
	data(){
    return{
      fullScreen: false
    }
  },
  	methods:{
    launchFullScreen(element){ //全屏
      util.launchFullScreen(element,this)
    },

		logout(){//退出登录
			var _this = this;
			this.showNav = false;
			this.$confirm('确认退出吗?', '提示', {
				// type: 'warning'
			}).then(() => {
				sessionStorage.removeItem('token');
				sessionStorage.removeItem('userInfoData');
				this.muenData = [];
				_this.$router.push('/login');
			})
    }
		
	}
}
</script>

<style lang="scss">
	// ::-webkit-scrollbar{
	//   display:none;
	// }
  .statementBox{
	  height: 100%;
  }
  .loginout{
	  background: #fff;
	  color:#66b1ff;
  }
	.container{
		position: absolute;
		top:0;
		bottom: 0;
		widows: 100%;
		overflow: hidden;
	}
  .headerStatement{
    height:60px;
		width:100%;
		background:#3a3e53;
    z-index: 9;
  }
	.userInfo{
		position: absolute;
		top: 9px;
    right: -20px;
		text-align:right;
		margin-right:35px;
    float: right;
    cursor: pointer;
	}	
	.userName{
		color:#fff;
		font-size:16px;
		border:1px solid #80dcf5;
		-moz-box-shadow:0 0 13px #22bfd2 inset;             
		-webkit-box-shadow:0 0 13px #22bfd2 inset;  
		box-shadow:0 0 13px #22bfd2 inset; 
		padding:10px 20px;
	}
	.el-dropdown-menu{
    background: rgba(13, 50, 92, 0.6);
    padding: 11px 0 0;
	}
	.el-dropdown-menu li{
		-moz-box-shadow:0 0 13px #22bfd2 inset;             
		-webkit-box-shadow:0 0 13px #22bfd2 inset;  
		box-shadow:0 0 13px #22bfd2 inset; 
		height:50px;
		line-height: 50px;
	}
	.el-dropdown-menu li:first-child{
		margin-top:-11px;
		// border:1px solid #80dcf5;
	}
  .home-title{
    float: left;
    width: 388px;
    height: 60px;
    float: left;
    line-height: 60px;
    text-align: center;
    color: #fff;
    background-color:#28282e;
    font-size: 24px;
  }
  // 全屏
  .fullScreen{
    width: 24px;
    height: 28px;
    color: rgb(255, 255, 255);
    float: right;
    margin: 20px 148px 0 0;
    cursor: pointer;
  }
  .icon-quanping, .icon-tuichuquanping{
    font-size: 25px !important;
  }
</style>

