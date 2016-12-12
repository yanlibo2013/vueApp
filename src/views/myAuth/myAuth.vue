<template>
    <div class="myAuth">
        <div class="auth_item">
            <div class="auth_head">
                <span class="auth_font">我的认证</span>
            </div>
            <div class="auth_body">
               <div class="auth_upImg" @click="chooseFile()">

                   <div id="dragger"class="el-dragger" v-show="IsFirstUp">
                       <i class="el-icon-upload"></i>
                       <div class="el-dragger__text"><em>点击上传</em></div>
                   </div>
                    <div id="dragger2"v-show="!IsFirstUp">
                        <img id="authImg"width="360px" :src="authInfo.img" alt="">
                    </div>
               </div>
                <div class="auth_profession">

                   <el-form>
                       <el-form-item label="所在行业" :label-width="authLabelWidth">


                           <el-select v-model="authInfo.industry"style="width: 150px">
                               <el-option
                                       v-for="item in industryOptions"
                                       :label="item.label"
                                       :value="item.value">
                               </el-option>
                           </el-select>

                       </el-form-item>
                   </el-form>
               </div>
                <div class="auth_btn">
                    <el-button
                            type="primary"
                            size="large"
                            style="padding: 10px 100px"
                            v-text="btnText"
                            :disabled="status==1||status==2"
                            @click="uploadAuthInfo()"
                    ></el-button>
                </div>
            </div>
        </div>
        <span class="clearfix"></span>
    </div>
</template>

<script>
    import * as API from '../../store/api.js'
    /*认证状态数值转换成文字*/
    function numToStr(value) {
        switch(value){
            case 0:
                return "未认证";
            case 1:
                return "正在认证";
            case 2:
                return "认证成功";
            case 200:
                return "认证失败";
            default:
                return "认证成功";
        }
    }
    let uploader;
//    let IsFirstUp2=true;
    let _this = this;
    export default {
        name: 'UpdateInfo',

        data() { //属性
            return {
                IsFirstUp:true,
                status:0,
                btnText:"确认提交",
                industryOptions: [{
                    value: '银行机构',
                    label: '银行机构'
                }, {
                    value: '证券公司',
                    label: '证券公司'
                }, {
                    value: '保险公司',
                    label: '保险公司'
                }, {
                    value: '基金公司',
                    label: '基金公司'
                },{
                    value: '信托公司',
                    label: '信托公司'
                }, {
                    value: '三方理财',
                    label: '三方理财'
                }, {
                    value: '互联网金融',
                    label: '互联网金融'
                }, {
                    value: '钜派投资',
                    label: '钜派投资'
                }, {
                    value: '其他',
                    label: '其他'
                }],

                authInfo:{
                    img:'',
                    industry:''
                },
                authLabelWidth:"100px",



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
            init:function () {
                API.$getAuthInfo(res=>{
                    if(res.head.ret==0){
                        this.authInfo=res.body.authInfo;
                        this.status=res.body.authInfo.status;
                        this.btnText=numToStr(this.status);
                        if(this.status=0||this.status){
                            this.IsFirstUp=false;
                        }else{
                            this.IsFirstUp=true;
                            this.getQiniu();
                        }
                    }else if(res.head.ret=='-20026'){
                        this.getQiniu();
                    }


                });
            },
            /*
            * 获取七牛文件上传
            * */
            getQiniu:function () {
                var _this = this;
                var qiniu = require("../../store/qiniu.js");
                uploader= qiniu.$QiniuUpLoad("chengyiwm-test",function (task) {
                    console.log("callback: "+JSON.stringify(task)+"  "+(typeof task));
                    console.log("task[0]._result: "+task[0]._result.key);
//                    IsFirstUp2=false;
                    API.getDomById("dragger").style.display="none";
                    API.getDomById("dragger2").style.display="block";
                    var authImg=API.getDomById("authImg");
                    authImg.src=qiniu.QINIU_BUCKET_ENUM.chengyiwm_test+task[0]._result.key;
                    _this.authInfo.img= authImg.src;
                });
                console.group("upload");
                console.dir(uploader);
                console.groupEnd();
            },
            chooseFile:function () {
//                console.log("chooseFile");
                uploader.chooseFile();
            },
            uploadAuthInfo:function () {
                API.$uploadAuthInfo(this.authInfo,res=>{
                })
            }
        }

    }
</script>
<style scoped>
    @import './myAuth.css';
</style>