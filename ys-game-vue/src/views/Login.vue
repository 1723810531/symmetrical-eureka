<template>
	<div>
		<el-form :rules="rules" ref="loginFrom" :model="loginFrom" class="loginContainer">
			<h3 class="loginTitle">系统登录</h3>
			<el-form-item prop='userName'>
				<el-input type="text" auto-complete="false" v-model="loginFrom.userName" 
					placeholder="请输入用户名" style="margin-bottom: 10px;"></el-input>
			</el-form-item>
			
			<el-form-item prop='passWord'>
				<el-input type="passWord" auto-complete="false" v-model="loginFrom.passWord"
					placeholder="请输入密码" style="margin-bottom: 10px;"></el-input>
			</el-form-item>
			
			<el-form-item prop='code'>
				<el-input type="text" auto-complete="false" v-model="loginFrom.code" 
					placeholder="点击图片更换验证码" style="width: 250px;margin-right: 5px;margin-bottom: 10px;"></el-input>
				<img src="../../img/login/captcha.jpg">
			</el-form-item>
			
			<el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
			<el-button type="primary" style="width: 100%;" @click="submitLogin">登录</el-button>
		
		</el-form>

	</div>
</template>

<script>
	import {
	  checkLogin
	} from '@/api/login.js'
	 import md5 from 'js-md5';
	export default {
		name: "Login",
		data() {
			return {
				// captchaUrl: '/captcha?time='+new Date(),
				loginFrom: {
					userName: "admin",
					passWord: "123456",
					code: "YFX5"
				},
				checked: true,
				rules: {
					userName: [{required: true,message: '请输入用户名',trigger: 'blur'}],
					passWord: [{required: true,message: '请输入密码',trigger: 'blur'}],
					code: [{required: true,message: '请输入验证码',trigger: 'blur'}]
				}
			}
		},
		methods: {
			submitLogin() {
				this.$refs.loginFrom.validate((valid) => {
				          if (valid) {
							  // this.$router.replace('/music/favoriteMusic')
							  // this.$router.replace('/home'); //直接跳转
								this.checkLogin()   
				          } else {
				            this.$message.error('请输入所有字段！');
				            return false;
				          }
				        });
			},
			checkLogin(){
				let login = {}
				login.userName = this.loginFrom.userName 
				login.passWord = md5(this.loginFrom.passWord)
				checkLogin(login).then(res => {
					if(JSON.stringify(res) === "true"){
						this.$router.replace('/home');
					}
					})
			},
			// updateCaptcha(){
			// 	this.captchaUrl = '/captcha?time='+new Date();
			// }
		}
	}
</script>

<style scoped>
	.loginContainer {
		border-radius: 15px;
		background-clip: padding-box;
		margin: 180px auto;
		width: 350px;
		padding: 15px 35px 15px 35px;
		background-color: #fff;
		border: 1px solid #eaeaea;
		box-shadow: 0 0 25px #cac6c6;
	}

	.loginTitle {
		margin: 0px auto 40px auto;
		text-align: center;
	}

	.loginRemember {
		margin: 0px 0px 15px 0px;
		text-align: left;
	}
	.el-form-item__content{
		display: flex;
		align-items: center;
	}
	
	img{
		height: 50px;
	}
</style>
