<template>
    <div class="feedback">
        <div class="back_item">
            <div class="back_head">
                <span class="back_font">意见反馈</span>
            </div>
            <div class="back_body">

                <div class="back_cell back_base">
                    <div class="cell_header">
                        <span class="cell_name">问题和建议</span>
                        <span class="clearfix"></span>
                    </div>
                    <div class="cell_body">

                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 8, maxRows: 10}"
                                placeholder="您可输入200字"
                                  v-model="feedback"
                                >
                        </el-input>



                    </div>
                </div>
                <div class="back_cell ">
                    <div class="cell_header">
                        <span class="cell_name">图片(选项，提供问题截图)</span>
                        <span class="clearfix"></span>
                    </div>
                    <div class="cell_body">

                     <!--   <el-input
                                type="textarea"
                                :autosize="{ minRows: 8, maxRows: 10}"
                                placeholder=""
                                >
                        </el-input>-->

                        <div class="el-textarea__inner"style="height: 180px;">
                           <!-- <textarea  rows="4" style="width: 100%;border:none;"></textarea>-->
                            <img id="upImg"src="../../assets/img/add_3.png" width="100px" alt="" @click="chooseFile()">
                        </div>

                    </div>
                    <div class="cell_header">
                        <span class="cell_name">联系电话(选填)</span>
                        <span class="clearfix"></span>
                    </div>
                    <div class="cell_body">

                        <el-input style="border:none;"
                                type="textarea"
                                :autosize="{ minRows: 4, maxRows: 6}"
                                placeholder="输入您的号码，便于我们与您联系"
                                  v-model="contact"
                                >
                        </el-input>



                    </div>
                </div>
                <div class="back_btn">
                    <el-button
                            type="primary"
                            size="large"
                            :disabled="feedbackDisabled"
                            style="padding: 10px 100px"
                            :class="[{active:feedbackDisabled}]"
                            @click="feedbackBtn()">确认提交
                    </el-button>
                </div>
            </div>
        </div>
        <div>
        </div>
        <span class="clearfix"></span>
    </div>
</template>

<script>
    import * as API from '../../store/api.js'
    let uploader;

    let _this = this;
    export default {
        name: 'UpdateInfo',
        data() { //属性
            return {
                feedback:'',
                pic:'',
                contact:'',
                feedbackDisabled:true,

            }


        },
        watch:{
            feedback(curVal, oldVal){//注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
                if(curVal!=''){
                    this.feedbackDisabled=false;
                }else{
                    this.feedbackDisabled=true;
                }
                    console.log(curVal, oldVal);
//                deep: true


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
                var qiniu = require("../../store/qiniu.js");

                uploader= qiniu.$QiniuUpLoad("chengyiwm-test",function (task) {
                    var upImg=API.getDomById("upImg");
                    upImg.src=qiniu.QINIU_BUCKET_ENUM.chengyiwm_test+task[0]._result.key;
                    console.log("upImg.src--->"+upImg.src);
                });
//                console.group("upload");
//                console.dir(uploader);
//                console.groupEnd();
            },
            /*
            * 上传图片
            * */
            chooseFile:function () {
                uploader.chooseFile();
            },
            /*反馈提交数据*/
            feedbackBtn:function () {
                this.pic=this.imgUpurl;
                API.$feedback(this.feedback,this.pic,this.contact,res=>{
                    if(res.head.ret==0){
                        this.feedbackDisabled=true;
//                    console.table(res);
                    }
                });
            },


        }

    }
</script>
<style scoped>
    @import './feedback.css';
</style>