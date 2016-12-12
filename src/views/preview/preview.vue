<template>
        <div  id="preview" @click="selectHide()" class="container">
        <div class="navbar-header my_navbar_header">
            <div>
                <ol class="breadcrumb pre_breadcrumb">
                    <li style="margin-left: 33px;"><a>{{prodName}}</a></li>
                    <li><a>预览材料</a></li>
                </ol>
            </div>
            <div class="pre_breadcrumb"style="height:40px;border-bottom: none"></div>
        </div>
        <div class="container">
            <div class="preview_left">
                <div class="preview_doc">
                    <ul v-for="(el,index) in docList">
                        <li @click="show_pdf(index)">
                            <span class="item" v-text="el.fileName" :class="[{active:currentIndex==index}]"></span>
                            <a @click="downloadFile(el.fileName,el.downUrl)" style="cursor: pointer"><span class="icon_down"><img src="../../assets/img/icon_download.png" alt="诚壹财富顾问，壹财富"/></span></a>
                        </li>
                    </ul>
                </div>
                <div class="doc_btn" :visible="docList.length>0"><button @click="allDown()">全部下载</button></div>


            </div>


            <div class="preview_right"style="z-index: 111;" id="embedDiv">
                <embed width="100%" height="800px" :src="pdfUrl"  type="application/pdf" internalinstanceid="8" id="embed" />
            </div>

            <!--<div class="container_right"style="z-index: 111;" >
                <ul v-for="(item,index) in previewUrlList">
                    <li>
                        <embed width="100%" height="800px" :src="item"type="application/pdf" internalinstanceid="8" id="embed" />
                    </li>
                </ul>
    
            </div>-->
        </div>

    </div>
</template>

<script>
    import * as API from '../../store/api.js'

    let _this = this;
    export default {
        name: 'Preview',
        data() { //属性
            return {
                proId:0,
                prodName:"",
                currentIndex:0,
                docList:[],
                //pdfUrl:"http://7xudc8.com1.z0.glb.clouddn.com/01%E4%BA%A7%E5%93%81%E7%AE%80%E7%89%88-%E6%85%A7%E9%87%91961%E5%8F%B7-%E6%96%B0%E6%97%B6%E4%BB%A3%E4%BF%A1%E6%89%98.pdf",
                pdfUrl:"",
                previewUrlList:[],//预览地址
                downUrlList:[]//下载地址
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
            show_pdf:function(index){
                this.currentIndex=index;

                //this.pdfUrl="http://7xudc8.com1.z0.glb.clouddn.com/"+encodeURIComponent("03产品说明书-慧金961号-新时代信托.pdf");
                this.pdfUrl=this.downUrlList[index];
                document.getElementById("embedDiv").removeChild(document.getElementById("embed"));
                var embed='<embed width="100%" height="800px" src="'+this.pdfUrl+'"  type="application/pdf" internalinstanceid="8" id="embed" />';
//                console.log("ssssssssssss"+embed);
                document.getElementById("embedDiv").innerHTML=embed;
            },
            downloadFile:function(fileName,url){
                console.debug("fileName:"+fileName+"  url:"+url);
                API.downloadFile(fileName,url);
            },
            /**
             * 搜索下拉框隐藏
             */
            selectHide:function(){
//                $(".select-group").css("display","none");
            },
            /**
             * 获取产品详情
             */
            getProductDetail:function(){
                API.$getProductDetail(this.prodId, res=> {
                    this.prodName= res.body.prodName;
                });
            },

            getDoc:function(id){//获取文档下载列表
                API.$getProductDocument(id,res=>{
                    console.log(res);
                    if (res.head.ret == 0) {
                        var list=res.body.list;
                        for(var i= 0,length=list.length;i<length;i++){
                            if(i==0){
                                this.pdfUrl=list[0].downUrl;
                                console.log(this.pdfUrl);
                                document.getElementById("embedDiv").removeChild(document.getElementById("embed"));
                                var embed='<embed width="100%" height="800px" src="'+this.pdfUrl+'"  type="application/pdf" internalinstanceid="8" id="embed" />';
                                console.log("ssssss1111111111111111ssssss"+embed);
                                document.getElementById("embedDiv").innerHTML=embed;
                            }
                            this.previewUrlList.push(list[i].previewUrl);
                            this.downUrlList.push(list[i].downUrl);

                        }
                        this.docList=list;
                        console.log(this.previewUrlList);
                    }
                    if (res.body.totalCount == 0){

                        this.$alert('该项目暂时还没有上传文档!', '提示', {
                          confirmButtonText: ' 确定 '
                        });
                        window.close();
                    }
                })
            },
            /**
             * 下载全部文件
             */
            allDown:function(){
                for (var i = 0; i < this.docList.length; i++) {
                    API.downloadFile(this.docList[i].fileName,this.docList[i].downUrl);
                }
            },

            init: function () {//页面初始化
                this.prodId = this.$route.params.productId;
                var path=this.$route.path;
                console.log("this.$route.path--->"+this.$route.path);
                console.log("1---------------------->"+this.$route.path.match (/\/preview\//));
                this.getDoc(this.prodId);
                this.getProductDetail();
                this.pdfUrl=this.downUrlList[0];
            }
        }
    }
</script>
<style scoped>
    @import './preview.css';
</style>