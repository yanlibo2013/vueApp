<template>
    <div  class="userChange">
        <div class="order_item">
            <div class="info_head">
                <span class="info_font">交易记录</span>
            </div>
            <div class="info_body">

                <div class="order_detail"v-if="totalCount!=0" >
                    <ul class="order_list " >
                        <li class="change_item " v-for="(el,index) in listProd">
                            <div class="item_head">
                                <span class="item_name" v-text="el.prodName"></span>
                                <span class="item_btn"@click="showDetail(el.prodId,index)">查看详情</span>
                                <span class="clearfix" ></span>
                            </div>

                            <div class="item_change"v-show="index==currentIndex" >
                                <ul>
                                    <li style="border-right: 1px solid #F0F0F0;">客户</li>
                                    <li style="border-right: 1px solid #F0F0F0;">认购金额(万元)</li>
                                    <li>认购时间</li>
                                </ul>
                                <span class="clearfix"></span>
                                <ul v-for="item in listOrder">
                                    <li v-text="item.customerName"></li>
                                    <li v-text="item.subscribeAmount"></li>
                                    <li v-text="item.orderTime"></li>
                                </ul>
                                <span class="clearfix"></span>
                            </div>

                        </li>

                    </ul>

                </div>
                <div class="isNull"v-else="totalCount==0">
                    <h1>暂无记录</h1>
                    <div class="nullImg">
                        <img class="img" src="../../assets/img/noselect.png" alt="">
                        <h4>已完成的交易记录将显示在这里</h4>
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
                listTab:[],
                start:0,
                pageSize:10,
                orderStatus:30,
                listProd:[],//交易记录列表
                totalCount:0,//交易记录列表总数
                listOrder:[],//交易记录详情列表
                currentIndex:-1
            }
        },
        /**
         * 初始化工作
         */
        mounted() {
         this.getOrderedProd();

        },
        /**
         *  方法
         */
        methods:{
            /*获取交易记录*/
            getOrderedProd:function (opType) {
                API.$getOrderedProd(this.start,this.pageSize,opType,res=>{
                    if(res.head.ret==0){
                    console.log("res---------->"+JSON.stringify(res));
                    this.listProd=res.body.listProd;
                    this.totalCount=res.body.totalCount;
                }

            });

                
                
                
                
                
                
                
                
            },
            showDetail:function (id,index) {
                if(this.currentIndex ==index){
                    this.currentIndex=-1;
                }else {
                    this.currentIndex=index;
                    API.$searchOrder(this.start, this.pageSize,this.orderStatus,id, res =>{
                        console.log("res------------>"+ JSON.stringify(res));
                        if (res.head.ret == 0) {
                            console.log(res);
                            this.listOrder= res.body.listOrder;
                        } else {
                        }
                    });
                }
//                this.currentIndex = index;

            },



        }

    }
</script>
<style scoped>
    @import './userChange.css';
</style>