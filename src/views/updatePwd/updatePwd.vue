<template>
    <div class="updateInfo">
        <div class="pwd_item">
            <div class="pwd_head">
                <span class="pwd_font">修改密码</span>
            </div>
            <div class="pwd_body">



                <el-form :model="pwdFormObj" :rules="rule"label-position="left" ref="pwdFormObj" label-width="112px" class="pwdRuleForm">
                    <el-form-item label="请输入旧密码" prop="oldpwd">
                        <el-input type="password" v-model="pwdFormObj.oldpwd" auto-complete="off"class="pwd_input"></el-input>
                    </el-form-item>
                    <el-form-item label="请输入新密码" prop="pwd">
                        <el-input type="password" v-model="pwdFormObj.pwd" auto-complete="off"class="pwd_input"></el-input>
                    </el-form-item>
                    <el-form-item label="请确认新密码" prop="pwdCompare">
                        <el-input type="password" v-model="pwdFormObj.pwdCompare" auto-complete="off"class="pwd_input"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="large" style="padding: 10px 100px" @click="pwdCommit()">确认修改</el-button>

                    </el-form-item>
                </el-form>















            </div>
        </div>
        <span class="clearfix"></span>
    </div>
</template>

<script>
    import * as API from '../../store/api.js'
    import {hex_md5} from '../../assets/js/md5.js'

    let _this = this;
    export default {
        name: 'UpdatePwd',
        data() { //属性

            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if(!API.checkPwd(value)){
                    callback(new Error('密码由6-18位的数字字母或任意字符组合而成'));
                }else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.pwdFormObj.pwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                pwdFormObj: {
                    oldpwd: '',
                    pwd: '',
                    pwdCompare: ''
                },
                rule: {
                    oldpwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { validator: validatePass }
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { validator: validatePass }
                    ],
                    pwdCompare: [
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                        { validator: validatePass2, trigger: 'change' }
                    ]
                },

                pwdLabelWidth:"160px",

            }
        },
        /**
         * 初始化工作
         */
        mounted() {
        },
        /**
         *  方法
         */
        methods:{

            /**
             * 密码提交
             * @param oldpwd 旧密码
             * @param pwd 新密码
             */
            pwdCommit:function () {
                this.$refs.pwdFormObj.validate((valid) => {
                    if (valid) {
                         var oldpwd = this.pwdFormObj.oldpwd;
                         oldpwd = hex_md5(oldpwd).toUpperCase();
                         var pwd = this.pwdFormObj.pwd;
                         pwd = hex_md5(pwd).toUpperCase();
                         API.$modifyPwd(oldpwd,pwd,res=>{
                             if (res.head.ret == 0) {
                                 alert(res.head.msg);
                             } else {
                                 alert(res.head.msg);
                             }


                         })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            }
        }

    }
</script>
<style scoped>
    @import './updatePwd.css';
</style>