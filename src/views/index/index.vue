<template name="fade">
	<div id="index" v-loading="fullscreenLoading" @click="selectHide()">
	<!-- 头部-->
    <nav id="index_nav" class="navbar navbar-fixed-top">
        <div class="container" >
            <ul class="nav navbar-nav" >
                <li style="margin-left:41px;">
                    <router-link to="/jhxt.html"><span>集合信托</span></router-link>
                </li>
                <li style="margin-left:41px;">
                    <router-link to="/zgjh.html"><span>资管计划</span></router-link>
                </li>
                <li style="margin-left:41px;">
                    <router-link to="/zqjj.html"><span>证券基金</span></router-link>
                </li>
                <li style="margin-left:41px;">
                    <router-link to="/gqjj.html"><span>股权基金</span></router-link>
                </li>
                <li style="margin-left:41px;">
                    <router-link to="/hwtz.html"><span>海外投资</span></router-link>
                </li>
            </ul>
            <div class="index_login_reg" v-show="useIdIsNull">
                <div  class="login_outer" >
                               <span class="login_reg_common">
                                   登录
                               </span>

                    <!-- 登录框 -->
                    <div class="login_bg" >
                        <!-- 登录框头部 -->
                        <div class="login_head">
                            <p>欢迎回来，<a href="">请登录</a></p>
                        </div>

                        <!-- 登录主体 -->
                        <div class="login_content" style="margin-top:15px;">


                            <el-form :model="loginIndexObj" :rules="rule" ref="loginIndexObj" label-width="">
                                <el-form-item prop="tel">

                                    <el-input type="text" placeholder="手机号"v-model="loginIndexObj.tel" auto-complete="off"class="head_pwd_input"
                                    >
                                        <template slot="prepend">
                                            <img style="margin-right: 4px"src="../../assets/img/icon_phone.png" alt="诚壹财富顾问，壹财富">
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="pwd">

                                    <el-input type="password" placeholder="密码"v-model="loginIndexObj.pwd" auto-complete="off"class="head_pwd_input">
                                        <template slot="prepend">
                                            <img src="../../assets/img/icon_password.png" alt="诚壹财富顾问，壹财富">
                                        </template>
                                    </el-input>
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="primary"
                                               size="mini"
                                               class="login_btn"
                                               v-text="loginName"
                                               :disabled="loginDisabled"
                                               :style="{background:loginBackGround}"
                                               @click="loginBtn()">登 录</el-button>

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

                <router-link :to="{name:'reg'}" class="reg" v-if="useIdIsNull">
                    注册
                </router-link>
            </div>
            <div class="index_login_reg" v-show="!useIdIsNull">

                <div style="display: inline-block">
                    <router-link :to="{name:'updateInfo'}">
                        <span v-text="nickname" style="color: #f6762b"></span>
                    </router-link>

                </div>
                <div class="reg" @click="goBack()" style="display: inline-block">退出</div>
              
            </div>
        </div>
    </nav>
    <div class="body">
        <div class="index_main">
            <div class="index_search">
                <div class="index_logo">
                    <img src="../../assets/img/index_logo.png" class="logo_img" alt="诚壹财富顾问，壹财富">
                    <span class="logo_text">诚壹财富顾问</span>

                </div>
                <div class="index_search_input"  @click.stop="selectShow()">
                    <div class="index_search_input_bg" >
                        <img src="../../assets/img/search.png" alt="诚壹财富顾问，壹财富">
                        <input type="text" placeholder="搜索您想要的产品" id="index_query"
                               @click="refreshSug()"
                               @keyup="refreshSug()"
                               @keypress.enter="search()"
                               v-model="query"/>
                        <button @click="search()">搜索</button>
                        <div class="select-group" v-show="showSearchSug()">
                            <ul id="selectModel" class="selectModel">
                                <li class="item-hot" v-show="!hasQuery">热门推荐</li>
                                <li @hover="searchFocus()" class="item" value="1" v-for="el in engines" >
                                    <div v-html="el.sug" @click="goDetail(el.platform, el.productId)"></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">

            <div class="row index_img">
                <div class="index_mark"><img src="../../assets/img/index_mark.png" alt=""/></div>

                <div class="col-md-3 item" v-for="el in hotProductList">

                    <a :href='"/detail/" + el.productId + ".html"' target="_blank">
                        <div class="img_item">
                            <img src="../../assets/img/index_banner2.jpg" width="100%" alt=""/>
                        </div>
                        <div class="img_bg"></div>
                    </a>
                </div>
              <!--  <div class="col-md-3 item">
                    <div class="img_item">
                        <img src="../../assets/img/index_banner2.jpg" width="100%" alt=""/>
                    </div>
                    <div class="img_bg"></div>
                </div>
                <div class="col-md-3 item">
                    <div class="img_item">
                        <img src="../../assets/img/index_banner3.jpg" width="100%" alt=""/>
                    </div>
                    <div class="img_bg"></div>
                </div>
                <div class="col-md-3 item">
                    <div class="img_item">
                        <img src="../../assets/img/index_banner4.jpg" width="100%" alt=""/>
                    </div>
                    <div class="img_bg"></div>
                </div>-->
            </div>
            <div class="row index_img">
                <div class="col-md-12 item_bottom">
                    <div class="img_item">
                        <img src="../../assets/img/index_banner_top.jpg" width="100%" alt=""/>
                    </div>
                    <div class="img_bg_bootom"></div>
                </div>
            </div>
        </div>
    </div>
	</div>
</template>

<script>
	import * as API from '../../store/api.js'
    import {hex_md5} from '../../assets/js/md5.js'
	let _this = this;
	export default {
		name: 'Index',
		data() { //属性
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
                loginIndexObj: {
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
                fullscreenLoading: false,
                hotProductList:[
                    {productId:938,imgUrl:"http://odqn23waz.bkt.clouddn.com/%E4%B8%AD%E6%B1%9F%E4%BF%A1%E6%89%98.jpg"},
                    {productId:927,imgUrl:"../../assets/img/index_banner2.jpg"},
                    {productId:1051,imgUrl:"../../assets/img/index_banner3.jpg"},
                    {productId:1052,imgUrl:"../../assets/img/index_banner4.jpg"},
                ],
				CATEGORY_TYPE : [{dictId:1,name:"集合信托"},{dictId:2,name:"资管计划"},{dictId:4,name:"证券基金"},{dictId:16,name:"股权基金"},{dictId:128,name:"海外投资"}],
				useIdIsNull:true,
                dialogVisible:false,
				start:0,
				pageSize : 5,
				sortId : "",
				filterId: "",
				query : "",
				categoryList:[],
				engines:[],
				hasQuery:false, // 是否存在搜索词
				selectVisable:false,
				//登录的相关属性----begin
				loginVisable:false,
				tel: "",
				pwd: "",
				fadeContent: "",
				fadeVisible: false,
				loginDisabled: false,
				loginName: "登录",
				userNameVisable:false,
				nickname:'',
				loginBackGround: 'background: rgb(0, 108, 191);'
			}
		},
		/**
		 * 初始化工作
		 */
		mounted() {
			    this.init();
			// 获取产品分类
			API.$getAppInfo(res => {
				if(res.head.ret == 0) {
					this.categoryList = res.body.categoryList;
					API.pushObj("categoryList", this.categoryList);
				}
			});
		},
		/**
		 *  方法
		 */
		methods: {
		    init:function () {
                if(API.getUserId()== "") {
                    this.useIdIsNull = true;
                } else {
                    this.useIdIsNull = false;
                    this.nickname=API.getUserName();
                }
            },
            goBack: function() {
                API.clearUserData();
                this.init();
            },

            /*
            * 登录提交
            * */
			loginBtn: function() {
                this.$refs.loginIndexObj.validate((valid) => {
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
	
				this.loginName = "登录中..";
				this.loginDisabled = true;
				this.loginBackGround = "#ddd";
				var password = hex_md5(this.loginIndexObj.pwd).toUpperCase();
				API.$login(this.loginIndexObj.tel, password, res=> {
					if(res.head.ret == 0) {
						this.loginVisable = false;
						API.setUserId(res.body.userId);
                        API.setSkey(res.body.skey);
                        API.setUserName(res.body.nickName);
                        this.init();
					} else {
					    alert(res.head.msg);
						this.loginVisable = false;
					}
	
					this.loginName = "登录";
					this.loginDisabled = false;
					this.loginBackGround = "#f6762b";
				});
	
			},
			//登录的相关属性----end
	
			/**
			 * 获取搜索词
			 */
			getQuery: function() {
				return this.query.trim();
			},
	
			/**
			 *  获取搜索建议词
			 */
			refreshSug: function() {
				var query = this.getQuery();
				this.hasQuery = !!query;
				this.selectVisable = true;
				API.$getSearchSug(query, res => {
					if(res.head.ret == 0) {
						if(this.hasQuery && !!res.body.list) {
							for(var i = 0; i < res.body.list.length; i++) {
								res.body.list[i].sug = res.body.list[i].sug.replace(query, '<b style="color:#333">' + query + '</b>');
							}
						}
						this.engines = res.body.list;
						this.size = res.body.totalCount;
					}
				});
			},
	
			searchFocus: function() {
				this.selectVisable = true;
			},
			selectHide: function() {
				if(this.selectVisable) {
					this.selectVisable = false;
				}
			},
			selectShow: function() {
				this.selectVisable = true;
			},

	
			/**
			 * 搜索
			 */
			search: function() {
				var query = this.getQuery();
				if(!query) {
					return;
				}
				this.$router.replace({ name: 'search',params: { 'query': query } });
			},

			showSearchSug: function() {
				return (this.selectVisable && (this.engines.length > 0));
			},

            goDetail: function(platform, productId) {
                this.$router.push({ name: 'detail', params: { 'platform':platform, 'productId':productId }});
            }
		}
	}
</script>
<style scoped>
	@import './index.css';
</style>