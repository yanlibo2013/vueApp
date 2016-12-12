<template>

	<div id="header">
			<nav class="navbar navbar-default navbar-fixed-top myNavbar">
				<div class="header_spi">
					<div class="container">
						<div >
							<div id="logo_search">
								<div class="logo">
									<router-link :to="{name:'index'}" style="float: left;">
										<img src="../../assets/img/index_logo.png" class="logo_img" alt="诚壹财富顾问，壹财富" />
										<div class="logo_text">诚壹财富顾问</div>
									</router-link>
								</div>

								<div class="head_search " @click.stop="isShow()">
									<img src="../../assets/img/search.png" alt="诚壹财富顾问，壹财富">
									<input type="text" placeholder="搜索您想要的产品"
										   @click="refreshSug()"
										   @keyup="refreshSug()"
										   @blur="selectHide()"
										   @keypress.enter="input_keypress()"
										   v-model="decodeQuery"/>

									<button @click.stop="head_search()">搜索</button>
									<div class="select-group" v-show="showSearchSug()" @click="isShow()">
										<ul id="selectModel" class="selectModel">
											<li class="item-hot" v-show="!hasQuery">热门推荐</li>
											<li @hover="searchFocus()" class="item" value="1" v-for="el in engines" >
												<a :href='"/detail/" + el.platform +"/"+el.productId+".html"'target="_blank">
													<div v-html="el.sug"></div>
												</a>
											</li>
										</ul>
									</div>

								</div>


							</div>
							<div id="head_login">
								<div class="head_loginReg" v-if="useIdIsNull">
									<div class="login_outer">

									<el-button class="login_outer_btn" type="primary">登 录</el-button>
										<!-- 登录框 -->
										<div class="login_bg">
											<!-- 登录框头部 -->
											<div class="login_head">
												<div class="head_title">欢迎回来，
													<a href="javascript:void(0)">请登录</a>
												</div>
											</div>

											<!-- 登录主体 -->
											<div class="login_content" style="margin-top:15px;">

												<el-form :model="loginHeadObj" :rules="rule" ref="loginHeadObj" label-width="">
													<el-form-item prop="tel">

														<el-input type="text" placeholder="手机号"v-model="loginHeadObj.tel" auto-complete="off"class="head_pwd_input"
																   >
															<template slot="prepend">
																<img style="margin-right: 4px"src="../../assets/img/icon_phone.png" alt="诚壹财富顾问，壹财富">
															</template>
														</el-input>
													</el-form-item>
													<el-form-item prop="pwd">

														<el-input type="password" placeholder="密码"v-model="loginHeadObj.pwd" auto-complete="off"class="head_pwd_input">
															<template slot="prepend">
																<img src="../../assets/img/icon_password.png" alt="诚壹财富顾问，壹财富">
															</template>
														</el-input>
													</el-form-item>

													<el-form-item>
														<el-button type="primary"
																   class="login_btn"
																   v-text="loginName"
																   :disabled="loginDisabled"
																   :style="{background:loginBackGround}"
																   @click="headLogin()">登 录</el-button>

													</el-form-item>
												</el-form>

												<span style="float:right;margin-top: -10px;margin-right: 5px">
													<router-link :to="{name:'findPwd'}" >
														忘记密码?
													</router-link>
												</span>
												<span class="clearfix"></span>
											</div>
										</div>
										<!-- 登录框END -->
									</div>
                                    <router-link :to="{name:'reg'}" >
										<el-button class="login_outer_btn reg" type="primary">注 册</el-button>

                                    </router-link>
								</div>
								<div class="head_loginReg" v-else="!useIdIsNull">

									<div style="display: inline-block;margin-left: 10px">
										<router-link :to="{name:'updateInfo'}">
											<span v-text="nickname" style="color: #f6762b"></span>
										</router-link>

									</div>
										<el-button class="login_outer_btn reg" type="primary" @click="goBack()">退出</el-button>

								</div>
							</div>
						</div>

						<span class="clearfix"></span>
						<div>
							<ul class="nav navbar-nav mynav">
								<li>
                                    <router-link :to="{name:'index'}" :class="[{active:headcategoryId == 0}]">首页</router-link>
								</li>
								<li v-for="el in navList">
                                    <router-link :to="el.path">
                                        <span :class="[{active:headcategoryId ==el.categoryId}]" v-text="el.categoryName"></span>
                                    </router-link>
								</li>

							</ul>
							<div id="dowm_input">
								<div class="head_search2 " @click.stop="isShow()">
									<img src="../../assets/img/search.png" alt="诚壹财富顾问，壹财富">
									<input type="text" placeholder="搜索您想要的产品"
										   @click="refreshSug()"
										   @keyup="refreshSug()"
										   @keypress.enter="input_keypress()"
										   @blur="selectHide()"
										   v-model="decodeQuery">
									<button @click.stop="head_search()">搜索</button>
									<div class="select-group" v-show="showSearchSug()" @click="isShow()">
										<ul class="selectModel">
											<li class="item-hot" v-show="!hasQuery">热门推荐</li>

											<li @hover="searchFocus()" class="item" value="1" v-for="el in engines" >
												<a :href='"/detail/" + el.platform +"/"+el.productId+".html"' target="_blank">
													<div v-html="el.sug"></div>
												</a>
											</li>
										</ul>
									</div>
								</div>
								<div class="head_login2">
									<div class="head_loginReg2" v-if="useIdIsNull">
										<div class="login_outer">

											<el-button class="login_outer_btn" type="primary">登录</el-button>
											<!-- 登录框 -->
											<div class="login_bg" style="top:50px">
												<!-- 登录框头部 -->
												<div class="login_head">
													<div class="head_title">欢迎回来，
														<a href="javascript:void(0)">请登录</a>
													</div>
												</div>

												<!-- 登录主体 -->
												<div class="login_content" style="margin-top:15px;">

													<el-form :model="loginHeadObj" :rules="rule" ref="loginHeadObj" label-width="">
														<el-form-item prop="tel">

															<el-input type="text" placeholder="手机号"v-model="loginHeadObj.tel" auto-complete="off"class="head_pwd_input"
															>
																<template slot="prepend">
																	<img style="margin-right: 4px"src="../../assets/img/icon_phone.png" alt="诚壹财富顾问，壹财富">
																</template>
															</el-input>
														</el-form-item>
														<el-form-item prop="pwd">

															<el-input type="password" placeholder="密码"v-model="loginHeadObj.pwd" auto-complete="off"class="head_pwd_input">
																<template slot="prepend">
																	<img src="../../assets/img/icon_password.png" alt="诚壹财富顾问，壹财富">
																</template>
															</el-input>
														</el-form-item>

														<el-form-item>
															<el-button type="primary"
																	   class="login_btn"
																	   v-text="loginName"
																	   :disabled="loginDisabled"
																	   :style="{background:loginBackGround}"
																	   @click="headLogin()">登 录</el-button>

														</el-form-item>
													</el-form>

													<span style="float:right;margin-top: -10px;margin-right: 5px">
													<router-link :to="{name:'findPwd'}" >
														忘记密码?
													</router-link>
												</span>
													<span class="clearfix"></span>
												</div>
											</div>
											<!-- 登录框END -->
										</div>
										<router-link :to="{name:'reg'}" >
											<el-button class="login_outer_btn reg" type="primary">注册</el-button>

										</router-link>
									</div>
									<div class="head_loginReg2" v-else="!useIdIsNull">

										<div style="display: inline-block;margin-left: 20px">
											<router-link :to="{name:'updateInfo'}">
												<span v-text="nickname" style="color: #f6762b"></span>
											</router-link>
										</div>
											<el-button class="login_outer_btn reg"
													   type="primary"
													   @click="goBack()"
											>退出</el-button>

									</div>
								</div>
							</div>

						</div>

					</div>
				</div>

			</nav>

	</div>
</template>
<style scoped>
	@import './head_footer.css';
</style>

<script>

	import * as API from '../../store/api.js'
	import {hex_md5} from '../../assets/js/md5.js'
	export default {
		name: 'cyheader',
		data() { //属性
		   	const isInitialRender = !this.$root._isMounted;
		   	var validateTel = (rule, value, callback) => {
			   if (value === '') {
				  callback(new Error('请输入手机号'));
			   } else if(!API.checkTel(value)) {
				  callback(new Error('请输入正确的手机号码'));
			   }else {
				  callback();
			   }
			};
			var validatePwd = (rule, value, callback) => {
			   if (value === '') {
				  callback(new Error('请输入密码'));
			   } else if(!API.checkPwd(value)){
				  callback(new Error('密码由6-18位的数字字母或任意字符组合而成'));
			   }else {
				  callback();
			   }
			};
			return {
				loginHeadObj: {
					tel: '',
					pwd: '',
				},
				/*
				* 属性校验规则
				* */
				rule: {
					tel: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ validator: validateTel }
					],
					pwd: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ validator: validatePwd }
					]

				},
				dictId: 0,
				headVisable:true,
				headcategoryId: isInitialRender ? this.$store.getters.activeCategoryId : 0,
				search: "",
				decodeQuery:"",
				categoryListHead: "",
				selectVisable: false,
				engines: [],
				hasQuery: false, // 是否存在搜索词
				size: 0,
				useIdIsNull: true,
                navList:[
                    {categoryId:1, path:"/jhxt.html", categoryName:"集合信托"},
                    {categoryId:2, path:"/zgjh.html", categoryName:"资管计划"},
                    {categoryId:4, path:"/zqjj.html", categoryName:"证券基金"},
                    {categoryId:16, path:"/gqjj.html", categoryName:"股权基金"},
                    {categoryId:128, path:"/hwtz.html", categoryName:"海外投资"},
                ],
				//登录的相关属性----begin
				userId: "",
				loginVisable: false,
				fadeContent: "",
				fadeVisible: false,
				loginDisabled: false,
				loginName: "登录",
				userIdVisable: false,

				nickname: '',
				loginBackGround: 'rgb(0, 108, 191);'
			}
		},

		/**
		 * 初始化工作
		 */
		mounted() {

			window.onscroll=function() {

				//变量t就是滚动条滚动时，到顶部的距离
				var t = document.documentElement.scrollTop || document.body.scrollTop;
				if(t>150){
					API.getDomById("logo_search").style.display="none";
					API.getDomById("head_login").style.display="none";
					API.getDomById("dowm_input").style.display="block";
				}else{
					API.getDomById("logo_search").style.display="block";
					API.getDomById("head_login").style.display="block";
					API.getDomById("dowm_input").style.display="none";
				}

			};
			this.init();
		},
		watch:{
            // 如果路由有变化，会再次执行该方法
            '$route': 'init'
		},
		methods: {

			setHeadQuery: function(query) {
				this.decodeQuery = query;
			},


			searchFocus: function() {
				this.selectVisable = true;
			},


			/**
			 * 判斷按下的是“回車”執行搜索
			 */
			input_keypress: function() {
				var e = window.event || arguments.callee.caller.arguments[0];
				if(e && e.keyCode == 13) {
					this.head_search();
					this.selectVisable = false;
				}
			},
			head_search: function() {
				var query = this.decodeQuery;
				if(!query) {
					return;
				}
				this.$router.replace({ name: 'search',params: { 'query': query } });
			},

			/**
			 * 获取搜索词
			 */
			getQuery: function() {
				var query = this.decodeQuery;
				return this.decodeQuery.trim();

			},
			/*搜索框失焦事件*/
			selectHide: function() {
				var _this=this;
				setTimeout(function () {
					_this.isHide();
				},200);

			},
			/*隐藏搜索框*/
			isHide:function () {
				this.selectVisable = false;
			},
			/*显示搜索框*/
			isShow: function() {
				this.selectVisable = true;
			},
			/**
			 *  获取搜索建议词
			 */
			refreshSug: function() {
				this.selectVisable = true;
				var query = this.getQuery();
				this.hasQuery = !!query;
				API.$getSearchSug(query, res=> {
					if(res.head.ret == 0) {
						console.log(res);
						if(this.hasQuery && !!res.body.list) {
							for(var i = 0; i < res.body.list.length; i++) {
								res.body.list[i].sug = res.body.list[i].sug.replace(query, '<b style="color:#333">' + query + '</b>');
							}
						}
						this.engines = res.body.list;
						this.size = res.body.totalCount;
					} else {
						alert(res.head.msg);
					}
				});

			},
			goBack: function() {
				API.clearUserData();
				this.init();
			},
				/*
				* 提交按钮
				* */
			headLogin: function() {
				this.$refs.loginHeadObj.validate((valid) => {
					if (valid) {
						this.postData();
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			

			// 登录请求
			postData: function() {

				this.loginName = "登录中";
				this.loginDisabled = true;
				this.loginBackGround = "#ddd";

				var password = hex_md5(this.loginHeadObj.pwd).toUpperCase();
				API.$login(this.loginHeadObj.tel, password, res=> {
					if(res.head.ret == 0) {
						this.loginVisable = false;
						API.setUserId(res.body.userId);
						API.setSkey(res.body.skey);
						API.setUserName(res.body.nickName);
						this.init();
					} else {
						alert(res.head.msg);
					}

					this.loginName = "登录";
					this.loginDisabled = false;
					this.loginBackGround = "#f6762b";
				});

			},
			//登录的相关属性----end

			showSearchSug: function() {

				return (this.selectVisable && (this.engines.length > 0));

			},
			init: function() {
				if(!!this.$route.params.query){
					this.decodeQuery=decodeURI(this.$route.params.query);
				}

				if(API.getUserId()!= "") {
					this.useIdIsNull = false;
					this.nickname=API.getUserName();
				} else {
					this.useIdIsNull = true;
				}
				this.userId = API.getUserId();

				this.categoryListHead =API.fetchObj("categoryList");
				if(!this.categoryListHead) {
					API.$getAppInfo(res=> {
						if(res.head.ret == 0) {
							this.categoryListHead = res.body.categoryList;
							API.pushObj("categoryList", this.categoryListHead);
						}

					});
				}
			}
		}

	}

</script>