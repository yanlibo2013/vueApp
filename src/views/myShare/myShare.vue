<template>
    <div  class="myShare">
        <div class="share_item">
            <div class="info_head">
                <span class="info_font":class="[{info_font_active:shareVisable}]" @click="hideDetail()">我的分享</span>
                <span v-show="!shareVisable">/</span>
                <span class="info_detail"v-show="!shareVisable" >分享详情</span>
            </div>
            <div class="info_body">
                <div v-if="totalCount!=0">
                    <div class="share_detail" v-if="shareVisable">
                        <ul class="share_list" >
                            <li class="share_item" v-for="el in productList">

                                <div class="row">
                                    <div class="col-md-9" >
                                        <div class="item_head" v-text="el.prodName">
                                        </div>
                                        <div class="item_detail">
                                            <span class="item_key">募集状态</span>
                                            <span class="item_value"v-text="el.fundRaisingStatusDesc"></span>
                                            <span class="item_key">最后分享时间</span>
                                            <span class="item_value"v-text="el.shareTime"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <el-button type="primary" @click="showShareDetail(el.prodId)">查看详情</el-button>
                                    </div>
                                </div>
                            </li>

                        </ul>

                    </div>
                    <div class="share_again" v-else="!shareVisable">
                        <div class="share_head" v-text="prodName"></div>
                        <div class="share_body">
                            <ul class="share_list">
                                <li class="item item_head">
                                    <ul>
                                        <li>分享时间</li>
                                        <li>分享人</li>
                                        <li>阅读情况</li>
                                        <li>分享方式</li>
                                    </ul>
                                    <span class="clearfix"></span>
                                </li>
                                <li class="item item_body" v-for="item in shareDateList">
                                    <ul v-for="el in item.shareDetailList">
                                        <li v-text="item.shareDate"></li>
                                        <li v-text="item.shareDate"></li>
                                        <li v-text="el.readStatus"></li>
                                        <li v-text="el.shareChannelDesc"></li>
                                    </ul>
                                    <span class="clearfix"></span>
                                </li>

                            </ul>
                        </div>
                        <div class="share_btn">
                            <el-button type="primary" size="large" style="padding: 10px 100px">再次分享</el-button>
                        </div>

                    </div>
                </div>


                <div class="isNull"v-else="totalCount==0">
                    <h1>暂无记录</h1>
                    <div class="nullImg">
                        <img class="img" src="../../assets/img/bg_null_share.png" alt="">
                        <h4>没有分享记录，快将好产品分享出去</h4>
                    </div>

                    <router-link :to="{name:'xintuo'}" >
                        <el-button class="btn"size="larger"type="primary">前往产品列表</el-button>
                    </router-link>
                </div>







            </div>
        </div>

    </div>

</template>

<script>
    import * as API from '../../store/api.js'

    let _this = this;
    export default {
        name: 'UserChange',
        data() { //属性
            return {
                shareVisable:true,
                prodName:"",
                productList:[],//分享列表
                totalCount: -1,//分享列表总数
                shareDateList:[],//分享详情列表
                currentIndex:0,
            }
        },
        /**
         * 初始化工作
         */
        mounted() {
            API.$getProductShareList(res=>{
                if(res.head.ret==0){
                    this.productList=res.body.productList;
                    this.totalCount=this.productList.length;
                }
                console.log(this.totalCount);
            });
        
        },
        /**
         *  方法
         */
        methods:{
            /*
            *
            * */
            hideDetail:function () {
                this.shareVisable=true;
            },
            /**
             *打开分享列表
             * */
            showShareDetail:function (id) {
                this.shareVisable=false;
                API.$getProductShareDetail(id,res=>{
                    this.prodName=res.body.prodName;
                    this.shareDateList=res.body.shareDateList;
                    console.log("this.shareDateList-->"+JSON.stringify(this.shareDateList));
                });
            },
            
        }

    }
</script>
<style scoped>
    @import './myShare.css';
</style>