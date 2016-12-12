<template>
    <div class="myCollect">
        <div class="coll_item">
            <div class="coll_head">
                <span class="coll_font">我的收藏</span>
            </div>
            <div class="coll_body">
                <div v-if="totalCount!=0">
                    <div v-for="(el,index) in productList">
                        <div v-if="index == noOursProductIndex" class="other_product_hr">
                            <div class="text-center">
                                <span class="split-text">● 以下搜索结果来源非&lt;诚壹财富顾问&gt;，请注意投资风险 ●</span>
                            </div>
                            <div class="hr"></div>
                        </div>

                        <div class="">
                            <div class="select coll_item " :class="[{sale_out:!!el.saleOut}]">
                                <div class="select_item" style="margin: 0 15px">
                                    <div class="row">
                                        <div class="col-md-2 text-center" style="margin:4% 0 0 3%;">
                                            <span v-if="!!el.productImgUrl"><img width="80px" :src="el.productImgUrl" alt="诚壹财富顾问，壹财富" :id="'productImg'+el.productId"></span>
                                        </div>
                                        <div class="col-md-8" style="margin:3% 0 1% -3%;text-align: left;">

                                            <router-link :to="{name:'detail', params:{productId:el.productId}}" >
                                                <div class="item_title"  style="cursor: pointer" v-text="el.prodName"></div>
                                            </router-link>
                                            <div class="item_all_mark">
                                                <label v-for="item in el.tag" v-if="!!item.word" style="display: inline-block">
                                                    <router-link :to="{name:'search',params:{query:item.word}}"  class="item_mark" v-text="item.word">
                                                    </router-link>
                                                </label>

                                            </div>
                                            <div class="">
                                                <ul class="item_attr">
                                                    <li>
                                                        <div>
                                                            <div class="item_value" v-text="el.yield"></div>
                                                            <span class="item_key" v-text="el.yieldName"></span>
                                                        </div>

                                                    </li>
                                                    <li>
                                                        <div>
                                                            <div class="item_value" v-text="el.period"></div>
                                                            <span class="item_key" v-text="el.periodName"></span>
                                                        </div>

                                                    </li>
                                                    <li>
                                                        <div>
                                                            <div class="item_value" v-text="el.minimiumInvestmentAmount"></div>
                                                            <span class="item_key" v-text="el.minimiumInvestmentAmountName"></span>
                                                        </div>

                                                    </li>
                                                    <li>
                                                        <div>
                                                            <div class="item_value" v-text="el.invsetmentTargetValue"></div>
                                                            <span class="item_key" v-text="el.invsetmentTargetName"></span>
                                                        </div>

                                                    </li>
                                                    <li>
                                                        <div>



                                                            <div v-if="useIdIsNull"  >
                                                                <router-link :to="{name:'login'}"class="item_value"  style="color: #f6762b; cursor: pointer"v-text="el.rebate.word">
                                                                </router-link>
                                                            </div>
                                                            <div v-else="!useIdIsNull" class="item_value" v-text="el.rebate.word"></div>


                                                            <!--:style="{font-size:el.rebate.fontSize}-->
                                                            <span class="item_key" v-text="el.rebateName"></span>
                                                        </div>

                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="col-md-2 item_appointment"style="margin:8% 0 0 0;" @click="clearBookmark(index,el.productId)">
                                            <img  class="" src="../../assets/img/icon_collect_active.png" alt="">
                                        </div>
                                        <div v-if="el.saleOut" class="item_sale_out">
                                            <img src="../../assets/img/sale_out.png" alt="诚壹财富顾问，壹财富" />
                                        </div>

                                        <div style="position: absolute;top: -2px;right: -12px;" v-if="el.flag!=0">
                                            <img v-if="el.flag==1"src="../../assets/img/product_hot.png" alt="诚壹财富顾问，壹财富">
                                            <img v-if="el.flag==2"src="../../assets/img/product_new.png" alt="诚壹财富顾问，壹财富">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="my_container" v-show="totalCount>pageSize" style="text-align: center">
                        <div class="block" style="line-height: 30px;margin-top: 5px;">
                            <el-pagination small @current-change="handleCurrentChange"
                                           layout="prev, pager, next"
                                           :page-size="pageSize"
                                           :total="totalCount">
                            </el-pagination>



                        </div>
                    </div>
                </div>
                <div class="isNull"v-else="totalCount==0">
                    <h1>暂无收藏</h1>
                    <div class="nullImg">
                        <img class="img" style="width: 200px" src="../../assets/img/bg_null_collected.png" alt="">
                        <h4>您没有遇到心动的产品呢</h4>
                    </div>

                    <router-link :to="{name:'xintuo'}" >
                        <el-button class="btn"size="larger"type="primary">前往产品列表</el-button>
                    </router-link>
                </div>






            </div>
        </div>
        <span class="clearfix"></span>
    </div>
</template>

<script>
    import * as API from '../../store/api.js'

    let _this = this;
    export default {
        name: 'myCollect',
        data() { //属性
            return {
                orderVisible:false,
                docVisible:false,
                productList: [], //产品分类

                pageSize: 8,
                start: 0,
                totalCount: -1, //产品总数
                currentPage: 1, // 当前浏览的页数
                noselect:false,

                useIdIsNull: true,
                noOursProductIndex: -1 // 从那一项开始不是我们的产品

            }
        },
        /**
         * 初始化工作
         */
        mounted() {
            this.getBookmarkProduct(0);
        },
        /**
         *  方法
         */
        methods:{
            /**
             *分页
             */
            handleCurrentChange(val) {
                console.log("this.start---"+this.start);
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                if(this.currentPage>0){
                    this.start = (this.currentPage - 1) * this.pageSize;
                    this.getBookmarkProduct(this.start);
                }

            },
            /**
             * 获取收藏产品列表
             * @param start 开始位置
             * @param sortId 排序的id
             * @param categoryId 产品分类id
             * @param query 搜索词
             */
            getBookmarkProduct: function(start) {
                API.$getBookmarkProduct(start,res=>{
                    if(res.head.ret == 0) {
                        this.productList = res.body.productList;
                        this.totalCount = res.body.totalCount;
                        console.log("this.totalCount=======>"+this.totalCount);
                        if(this.totalCount != 0) {
                            this.currentPage = start / this.pageSize + 1;
                            console.log("this.currentPage=======>"+this.currentPage);
                            this.noselect = true;
                        } else {
                            this.noselect = false;
                        }

                    }
                });

            },
           /*
           * 删除收藏列表
           * */
            clearBookmark:function(index,id){
                this.productList.splice(index,1);
                API.$clearBookmark(id,res=>{
                    console.log(res);
                })
            },

            /**
             *  判断渠道是否是诚壹的
             *  @param channel 取代代码
             */
            isFromChengyi: function(channel) {
                return channel == 'chengyiwm';
            },
        }

    }
</script>
<style scoped>
    @import './myCollect.css';
</style>