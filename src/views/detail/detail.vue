<template>
    <div id="detail" @click="selectHide()">
        <div class="proDetail" style="min-height: 800px">
            <div class="container">
                <div class="navbar-header my_navbar_header">
                    <ol class="breadcrumb detail_breadcrumb">
                        <li>
                            <router-link :to="{name:'index'}">首页</router-link>
                        </li>
                        <li v-for="el in navList" v-if="categoryId == el.categoryId">
                            <router-link :to="el.path">
                                <span  v-text="el.categoryName"></span>
                            </router-link>
                        </li>
                        <li><a><span v-text="productObj.prodName"></span></a></li>
                    </ol>
                </div>
            </div>

            <div class="container">
                <div class="container_left detail_item">
                    <div class="detail_flag" :visible="productObj.flag !=0">
                    	<!--<img v-if="!!imgSrcList[(productObj.flag)]" :src="imgSrcList[(productObj.flag)]" alt=""/>-->
                        <img v-if="productObj.flag==1"src="../../assets/img/product_hot.png" alt="诚壹财富顾问，壹财富">
                        <img v-if="productObj.flag==2"src="../../assets/img/product_new.png" alt="诚壹财富顾问，壹财富">
                    </div>
                    <div class="row">
                        <div class="col-md-1" style="text-align: right;margin:10px 30px"><img
                                v-if="!!productObj.productImgUrl" :src="productObj.productImgUrl" alt=""
                                style="margin-top:36%"></div>
                        <div class="col-md-8" style="width:50%;">
                            <p class="item_title" v-text="productObj.prodName"></p>
                            <p class="item_hightlights" v-text="productObj.investmentHightlights"></p>
                        </div>
                    </div>
                    <!--咨询热线-->

                    <div class="container_right">
                        <div class="order">
                            <div class="order_title">
                                <span>尊敬的用户:</span>
                                <p>您好！为了更好的为您服务，请使用app进行预约</p>
                            </div>

                            <div class="order_img">
                                <img src="../../assets/img/right_qr.png" alt="">
                                <p>请使用微信扫一扫</p>
                            </div>
                            <div class="order_tel">咨询热线：4006-222-500</div>
                        </div>
                        <div class="operation">
                            <div class="row text-center">
                                <div class="col-md-6 item_btn">
                                    <div class="item_operation">
                                        <p class="item_text item_text_collect":class="[{isCollect:bookmark}]" @click="addCollect()">产品收藏</p>
                                    </div>
                                </div>
                                <div class="col-md-6 item_btn">
                                    <div class="item_operation">
                                        <p class="item_text item_text_compare" @click="goCompare()">加入对比</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row text-center">
                                <div class="col-md-6 item_btn item_operation " >
                                    <el-button class="item_text item_text_email" @click.native="emailVisible = true" >邮件分享</el-button>
                                    <el-dialog title="邮件分享" v-model="emailVisible" size="tiny" close-on-press-escape>


                                        <div class="modal-body">
                                            <div class="proDetail_email">
                                                <label for="email" style="color: #444;">邮 件：</label>
                                                <input class="form-control" style="display: inline-block" @keyup.enter="checkEmail(email)"  type="email" id="email" placeholder="请输入邮箱"  v-model="email" />  <p class="tips email">&nbsp;</p>
                                                <div class="emailBtn">
                                                    <button class="btn" @click="goEmail()">确 认</button>
                                                </div>
                                            </div>
                                        </div>
                                    </el-dialog>
                                </div>
                                <div class="col-md-6 item_btn">
                                    <div class="item_operation">
                                        <router-link :to="{name:'preview', params:{productId:prodId}}">
                                            <div class="item_text item_text_pre" >
                                                预览材料
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="row text-center">
                                <div class="col-md-6 item_btn">
                                    <div class="item_operation">
                                        <el-button class="item_text item_text_weixin" @click.native="weixinVisible = true" >微信分享</el-button>
                                        <el-dialog title="微信分享" v-model="weixinVisible" size="tiny" close-on-press-escape>


                                            <div class="modal-body"style="color:#CCCCCC">

                                                <div style="text-align: center;width: 100%  ">
                                                    <h5 style="padding: 15px 0">请您打开微信扫一扫，在手机上查看</h5>
                                                    <img style="margin: 0 auto" :src="qrcodeUrl" alt=""/>

                                                </div>
                                                <div>

                                                </div>
                                            </div>
                                        </el-dialog>
                                    </div>
                                </div>
                                <div class="col-md-6 item_btn">
                                    <div class="item_operation">
                                        <el-button class="item_text item_text_download" @click.native="docVisible = true" @click="getDoc()">资料下载</el-button>

                                        <el-dialog title="资料下载" v-model="docVisible" size="tiny" close-on-press-escape>

                                            <div class="modal-body">
                                                <button class="btn btn-default" v-for="doc in docList" v-text="doc.fileName" @click="downloadFile(doc.fileName, doc.downUrl)" style="margin: 6px;" />
                                                <br>
                                                <button class="btn btn-default" @click="allDown()">全部下载</button>
                                            </div>
                                        </el-dialog>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <ul v-for="el in productList">
                    <li v-for="el in el.list">

                        <!-- 产品概况下第一个小table   -->
                        <div v-if="el.type == 12"  class="container_left detail_item" style="width:720px; margin-top: -440px;">
                            <div class="item_head_one">
                                <img src="../../assets/img/icon_left.png" alt=""/>
                                <span>产品概括</span>
                            </div>
                            <div class="row" style="margin-top:5%; border: 1px solid #ddd;   margin-left:4%">
                                <div  v-for="summary in el.list">
                                    <div class="col-md-2 item_one_even" >{{summary.key}}</div>
                                    <div class="col-md-2 item_one_odd">{{summary.value}}</div>
                                </div>
                            </div>
                        </div>

                        <!-- 收益情况 type = 2-->
                        <div v-if="el.type==2" class="left_table container_left detail_item">
                            <table class="table table-bordered">
                                <tbody>
                                <tr>
                                    <td class="text-center" v-for="(el,index) in el.list" style="padding:0;">
                                        <div class="table_head" v-text="el.key"></div>
                                        <div class="table_body" v-for="rebate in str2List(el.value)">
                                            <span v-text="rebate"v-if="index!=2"></span>
                                            <span v-if="index==2&&!useIdIsNull" style="color: #f6762b; cursor: pointer;">
                                                 <em v-if="rebate=='登录可见'">
                                                     <router-link :to="{name:'login'}" class="item_value"
                                                                  style="color: #f6762b; cursor: pointer"
                                                                  v-text="rebate">
                                                    </router-link>
                                                </em>
                                                <em v-if="rebate=='认证可见'">
                                                     <router-link :to="{name:'myAuth'}" class="item_value"
                                                                  style="color: #f6762b; cursor: pointer"
                                                                  v-text="rebate">
                                                    </router-link>
                                                </em>
                                                <em v-if="rebate!='认证可见' && rebate!='登录可见'">
                                                     {{rebate}}
                                                </em>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- 备注信息 -->
                        <div v-if="el.type==4" class="container_left left_table detail_item" style="margin-top: -90px;">
                            <div class="item_note">
                                <div class="row">
                                    <div class="item_key">备注信息:</div>
                                    <div class="item_value" v-text="el.value"></div>
                                </div>
                            </div>
                        </div>
                        <!--  k上，v下 type = 8-->
                        <div v-if="el.type==8" class="left_table text-center container_left detail_item" style="border: 1px solid #ddd; padding:0;">
                            <div v-for="el in el.list">
                                <div class="col-md-4 table_head" style="border-right: 1px solid #ddd;">{{el.key}}</div>
                            </div>
                            <div v-for="(el,index) in el.list">
                                <div class="col-md-4 table_body"v-if="index!=2" style="border-right: 1px solid #ddd;" v-text="el.value"></div>
                                <div class="col-md-4 "v-if="index==2&&useIdIsNull"  >

                                    <router-link :to="{name:'login'}"class="table_body"  style="color: #f6762b; cursor: pointer"v-text="el.value">
                                    </router-link>
                                </div>
                                <div class="col-md-4 table_body"v-if="index==2&&(!useIdIsNull)" style="color: #f6762b;"v-text="el.value"></div>

                            </div>
                            <div style="clear: both;"></div>
                        </div>



                        <!-- 募集账户信息 -->
                        <div v-if="el.type==1&&el.title=='募集账户'">
                            <div class="container_left detail_item" style="margin:0 -15px -15px;">
                                <div class="item_head">
                                    <img src="../../assets/img/icon_title.png" alt=""/>
                                    <span>更多详情</span>
                                </div>
                                <div class="item_body">
                                    <div class="row" style="height:178px;">
                                        <div style="padding-left:3%; margin-top: 2%;" class="col-md-2 text-title">募集账户：</div>
                                        <div class="col-md-10 text-left"
                                             style="border: 1px solid #c5c1c2;
                                                width: 596px;
                                                padding: 0;
                                                margin-top:3%;
                                                margin-bottom: 5%;
                                                margin-left: -3%">
                                            <ul>

                                                <li v-for="(elem,index) in el.list" :class="[{odd:index%2!=0}]">
                                                    <span class="item_account">&lt;{{elem.key}}:&gt;</span>
                                                    <span v-text="elem.value" class="item_account_value"></span>
                                                </li>
                                            </ul>

                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>

                        <div v-if="el.type==5">
                            <div class="container_left detail_item" style=" margin-top: -3%;">
                                <div class="item_body">
                                    <div class="row"
                                         style="margin-bottom: 2%;">
                                        <div class="col-md-2 text-title"
                                             style="padding-left: 3%;margin-right: -4%;">{{el.title}}:
                                        </div>
                                        <div class="col-md-10 text-left" v-html="el.value">  </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <!-- 产品要素 -->
                        <div v-if="el.type==11">
                            <div class="container_left detail_item">
                                <div class="item_head">
                                    <img src="../../assets/img/icon_title.png" alt=""/>
                                    <span>产品信息</span>
                                </div>
                                <div class="item_body">
                                    <div class="row">
                                        <div v-for="el in el.list" style="margin-left:-8%;">
                                            <div class="col-md-2 text-title" style="text-align: right; line-height:42px;">{{el.key}}: </div>
                                            <div class="col-md-4 text-left" style="text-align: left; line-height:42px;">{{el.value}}</div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>

                        <!-- 产品资料 -->
                        <!--                    <divv-if="el.type==7">
                                                <div class="container_left detail_item">
                                                    <div class="item_body">
                                                        <div class="row">
                                                            <div class="col-md-2">{{el.title}}:</div>
                                                            <div class="col-md-10 text-left">
                                                                <div v-for="el in el.list">
                                                                    <span v-text="el.key"></span>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>-->
                    </li>
                </ul>

            </div>
                <div class="sidebar">
                    <sidebar></sidebar>
                </div>
        </div>


    </div>
</template>

<script>
    import * as API from '../../store/api.js'
    import sidebar from '../../components/sidebar/sidebar.vue'
    export default {
        name: 'Detail',
        data() { //属性
            return {
                emailVisible:false,
                weixinVisible:false,
                docVisible:false,
                productObj:{},//产品对象
                productList:[],//产品属性列表
                docList:[],// 产品文档列表
                prodId:0,
                platform:-1,
                categoryId:0,
                bookmark:false,
                isColl:false,
                categoryName:"",//产品类别名字
                prodName:"",//产品名字
                email:"",//反馈邮箱
                imgSrcList:["","../../assets/img/product_hot.png","../../assets/img/product_new.png","","../../assets/img/search.png","../../assets/../../assets/img/product_new.png"],
                qrcodeUrl:"",
                navList:[
                    {categoryId:1, path:"/jhxt.html", categoryName:"集合信托"},
                    {categoryId:2, path:"/zgjh.html", categoryName:"资管计划"},
                    {categoryId:4, path:"/zqjj.html", categoryName:"证券基金"},
                    {categoryId:16, path:"/gqjj.html", categoryName:"股权基金"},
                    {categoryId:128, path:"/hwtz.html", categoryName:"海外投资"},
                ],
//                prodNameList:[],
                // 收藏的产品列表
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
        methods: {
            str2List: function(key) {
                key = key.replace(/\"/g, "");
                key = key.substring(1, key.length - 1);
                var list = key.split(",");
                return list;
            },
            /**
             * 搜索下拉框隐藏
             */
            selectHide:function(){
//                $(".select-group").css("display","none");
            },
            /*
             * 获取产品详情
             * */
            getProductDetail:function(){
                API.$getProductDetail(this.prodId,this.platform, res=>{
                        this.productObj = res.body;
                        this.categoryId = this.productObj.categoryId;
                        this.categoryName = this.getCategoryName(this.categoryId);
                        document.title = this.productObj.prodName+"_诚壹财富顾问";
                        this.productList = res.body.data;
                        this.bookmark = res.body.bookmark;
                        this.qrcodeUrl = 'http://qr.topscan.com/api.php?text=' + encodeURIComponent(this.productObj.productInfoUrl);
                });
            },
            /*
            * 收藏
            * */
            addCollect:function () {
                API.$setBookmark(this.prodId,res=>{
                    this.bookmark=!this.bookmark;
                    console.log(res);
                });
            },
            openUrl: function(url) {
                window.open(url);
            },
            
            /*
            
             * 预览
             * @param 具体产品的prodName
             * @param 具体产品的prodId
             * */
            goPre:function(){
                window.open("/preview/" + this.prodId + ".html");
            },
            /*
             * 下载
             * @param 具体产品的prodName
             * @param 具体产品的prodId
             * */
            downloadFile:function(fileName,downUrl){
                API.downloadFile(fileName,downUrl);
            },
            /**
             * 邮件分享
             * */
            goEmail:function() {

                if (!API.checkEmail(this.email)) {
                    return false;
                }
                API.$shareProductbyMail(this.prodId, this.email, res => {
                    if (res.head.ret == 0) {
                        alert("已经将产品成功发送至邮箱！");
                    } else {
                        alert(res.head.msg);
                    }
                })
            },
            /**
             * 获取文档下载列表
             * @param id 产品id
             */
            getDoc: function () {
                API.$getProductDocument(this.prodId, res => {
                    if (res.head.ret == 0) {
                        this.docList = res.body.list;
                    }
                    if (res.body.totalCount == 0) {
                        alert("改项目暂时还没有上传文档!");
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
            /*
             * 初始化
             * */
            init:function(){
                if(API.getUserId()!=null){
                    this.useIdIsNull=false;
                }else{
                    this.useIdIsNull=true;
                }
                console.log("this.$route.params"+JSON.stringify(this.$route.params));
                this.prodId = this.$route.params.productId;
                this.platform = this.$route.params.platform;
                console.log("this.prodId"+JSON.stringify(this.prodId));
                this.getProductDetail();



            },
            /**
             * 获取具体某一个产品分类的名称
             * @param categoryId 产品类别id
             * @returns {*} 分类名称
             */
            getCategoryName:function(categoryId) {
                var list = API.CATEGORY_TYPE;
                for (var i = 0, length = list.length; i < length; i++) {
                    if (list[i].dictId == categoryId) {
                        return list[i].name;
                    }
                }
                return "";
            }


    },
        components:{
            sidebar
        }
    }
</script>
<style scoped>
    @import './detail.css';
</style>