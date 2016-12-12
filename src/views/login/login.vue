<template>
    <div id="login" @click="selectHide()">

        <div class="login" >
            <!--登录页面-->
            <div class="login_main">
                <!-- 内容头部 -->
                <div class="login_head">
                    <hr>
                    <div class="login_head_text"><p>账户登录 </p></div>
                </div>
                <!-- 登录主体 -->
                <div class="login_content">
                    <!--跳转注册-->
                    <div class="login_reg">
                        <router-link :to="{name:'reg'}">
                            立即注册>
                        </router-link>
                    </div>
<!--
                    &lt;!&ndash; 用户名 &ndash;&gt;
                    <div class="control general">
                        <img src="../../assets/img/icon_control.png" alt="诚壹财富顾问，壹财富">
                        <input type="text" id="wsc-username" placeholder="请输入手机号" maxlength="20" v-model="tel">
                    </div>
                    <p class="tips tel">&nbsp;</p>


                    &lt;!&ndash; 密码 &ndash;&gt;
                    <div class="password general">
                        <img src="../../assets/img/icon_password.png" alt="诚壹财富顾问，壹财富">
                        <input type="password" id="wsc-password" placeholder="请输入密码" maxlength="16" minlength="6" v-model="pwd">
                    </div>
                    <span class="tips pwd">&nbsp;</span>-->

                    <el-form :model="loginObj" :rules="rule" ref="loginObj" label-width="">
                        <el-form-item prop="tel">

                            <el-input type="text" placeholder="手机号"v-model="loginObj.tel" auto-complete="off"class="login_input"
                            >
                                <template slot="prepend">
                                    <img style="margin-right: 4px"src="../../assets/img/icon_phone.png" alt="诚壹财富顾问，壹财富">
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="pwd">

                            <el-input type="password" placeholder="密码"v-model="loginObj.pwd" auto-complete="off"class="login_input">
                                <template slot="prepend">
                                    <img src="../../assets/img/icon_password.png" alt="诚壹财富顾问，壹财富">
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox v-model="defaultFlag">记住密码</el-checkbox>

                            <router-link :to="{name:'findPwd'}" style="float: right;">
                                忘记密码?
                            </router-link>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary"
                                       size="large"
                                       class="login_btn"
                                       v-text="loginName"
                                       :disabled="loginDisabled"
                                       :style="{background:loginBackGround}"
                                       @click="loginBtn()">登 录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <span class="clearfix"></span>
        </div>

    </div>
</template>

<script>
//  import $ from '../../assets/js/jquery-2.1.0.min'
    import * as API from '../../store/api.js'
    import {hex_md5} from '../../assets/js/md5.js'
    /**
     * 读取cookies
     * @param cookiename cookie的name
     * @return  cookie的value
     * */
    function getCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            return unescape(arr[2]);
        } else{
            return null;
        }

    }
    /**
     * 删除cookies
     * @param cookiename cookie的name
     * @return  cookie的value
     * */
    function delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=getCookie(name);
        if(cval!=null) {
            document.cookie= name + "="+cval+";expires="+exp.toGMTString();
        }
    }
    /**
     *设置Cookie
     * @param name cookie的key
     * @param value cookie的value
     * @param time cookie的过期时间
     */
    function setCookie(name,value,time) {
        var strsec = getsec(time);
        var exp = new Date();
        exp.setTime(exp.getTime() + strsec*1);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }
    /**
     * 设定过期时间
     * @param str
     * @returns {number}
     */
    function getsec(str) {
        var str1=str.substring(1,str.length)*1;
        var str2=str.substring(0,1);
        if (str2=="s")
        {
            return str1*1000;
        }
        else if (str2=="h")
        {
            return str1*60*60*1000;
        }
        else if (str2=="d")
        {
            return str1*24*60*60*1000;
        }
    }

   /* function saveUserInfo() {
      if ($("input[type='checkbox']").is(':checked')) {
          var userName = $("#wsc-username").val();
          var pwd = $("#wsc-password").val();
          var passWord;
          if(pwd.length<18){
              passWord = hex_md5(pwd).toUpperCase();
          }else{
              passWord=pwd;
          }


          //这是有设定过期时间的使用示例：
          //s20是代表20秒
          //h是指小时，如12小时则是：h12
          //d是天数，30天则：d30
          setCookie("userName",userName,"d7");
          setCookie("passWord",passWord,"d7");


      }
      else {
          delCookie("userName");
          delCookie("passWord");
      }
    }*/

    export default {
        name: 'Login',
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
                loginObj: {
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
                userId:"",
                loginVisable:false,
                defaultFlag:true,
                fadeContent: "",
                fadeVisible: false,
                loginDisabled: false,
                loginName: "登 录",
                userIdVisable:false,
                loginText:"登 录",
                nickname: '',
                loginBackGround: 'background: rgb(0, 108, 191);'
            }
        },
        /**
         * 初始化工作
         */
        mounted() {
            this.init();
        },
        /**
         *  方法
         */
        methods:{
            /**
             * 搜索下拉框隐藏
             */
            selectHide:function(){
//                $(".select-group").css("display","none");
            },


            /*
             * 登录按钮
             * */
            loginBtn:function() {
                this.$refs.loginObj.validate((valid) => {
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
                var password;
                if(!getCookie("passWord")){
                    password = hex_md5(this.loginObj.pwd).toUpperCase();
                }else{
                    password=this.loginObj.pwd;
                }

                API.$login(this.loginObj.tel,password,res=>{
                    if(res.head.ret == 0) {
                    this.loginVisable=false;
                    API.setUserId(res.body.userId);
                    API.setSkey(res.body.skey);
                    API.setUserName(res.body.nickName);
                    this.userId=API.getUserId();
                    this.nickname=API.getUserName();

//                    saveUserInfo();
                    history.go(-1);
                } else  {
                    this.loginVisable=false;
                    alert(res.head.msg);
                }
                this.loginName = "登 录";
                this.loginDisabled = false;
                this.loginBackGround = "#f6762b";
            });

            },

            init:function(){
                if(getCookie("userName")){
                    this.loginObj.tel=getCookie("userName");
                }
                if(getCookie("passWord")){
                    this.loginObj.pwd=getCookie("passWord");
                }
            }
        }
    }
</script>
<style scoped>
    @import './login.css';
</style>