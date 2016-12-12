<template>
    <div class="userOrder ">
        <div class="order_item">
            <div class="info_head">
                <span class="info_font">账户信息</span>
            </div>
            <div class="info_body">
                <div class="info_item">
                    <span>可提佣金（元）</span>
                    <div class="item_value"v-text="baseObj.availableCash"></div>
                </div>
                <div class="info_item">
                    <span>已结佣金（元）</span>
                    <div class="item_value"v-text="baseObj.openCommission"></div>
                </div>
                <div class="info_item"style="border-right:none">
                    <span>待结佣金（元）</span>
                    <div class="item_value" v-text="baseObj.closeCommission"></div>
                </div>

            </div>
        </div>
        <div class="order_item">
            <div class="info_head">
                <span class="info_font">订单管理</span>
            </div>
            <div class="info_body">
                <div class="order_header">
                    <ul class="order_nav">
                        <li v-for="(el, index) in listTab" href="javascript:void(0);" class="default" @click="shiftTab(index)" :class="[{active:checkActiveByIndex(index)}]">{{el}}</li>
                        <li class="clearfix"></li>
                    </ul>
                </div>
                <span class="clearfix"></span>
                <div class="order_body" >
                    <div v-if="totalCount!=0">
                        <ul class="order_list appoint" v-show="checkActiveByIndex(0)">
                            <li class="item item_head">
                                <ul>
                                    <li style="width: 25%">产品名称</li>
                                    <li >客户</li>
                                    <li>认购</li>
                                    <li>佣金</li>
                                    <li>返佣时间</li>
                                    <li>返佣状态</li>
                                </ul>
                                <span class="clearfix"></span>
                            </li>
                            <li class="item item_tail" v-for="(el,index) in listOrder">
                                <ul>
                                    <li style="width: 25%;" v-text="el.prodName"></li>
                                    <li v-text="el.customerName" v-if="el.customerName!=''"></li>
                                    <li  v-else="el.customerName==''">-</li>
                                    <li v-text="el.subscribeAmount"></li>
                                    <li v-text="el.expectRebate"></li>
                                    <li>{{el.orderTime |formatDate}}</li>
                                    <li v-text="el.fundRaisingStatusDesc"></li>
                                    <li style="width: 5%" @click="orderDel(el.orderId,index)"><img src="../../assets/img/close.png" alt=""></li>
                                </ul>
                                <span class="clearfix"></span>
                            </li>

                        </ul>
                        <ul class="order_list money" v-show="checkActiveByIndex(1)">
                            <li class="item item_head">
                                <ul>
                                    <li style="width: 25%">产品名称</li>
                                    <li >客户</li>
                                    <li>认购</li>
                                    <li>佣金</li>
                                    <li>返佣时间</li>
                                    <li>返佣状态</li>
                                </ul>
                                <span class="clearfix"></span>
                            </li>
                            <li class="item item_tail" v-for="(el,index) in listOrder">
                                <ul>
                                    <li style="width: 25%;" v-text="el.prodName"></li>
                                    <li v-text="el.customerName" v-if="el.customerName!=''"></li>
                                    <li  v-else="el.customerName==''">-</li>
                                    <li v-text="el.subscribeAmount"></li>
                                    <li v-text="el.expectRebate"></li>
                                    <li v-text="el.orderTime"></li>
                                    <li v-text="el.fundRaisingStatusDesc"></li>
                                    <li style="width: 5%" @click="orderDel(el.orderId,index)"><img src="../../assets/img/close.png" alt=""></li>
                                </ul>
                                <span class="clearfix"></span>
                            </li>

                        </ul>
                        <ul class="order_list commission" v-show="checkActiveByIndex(2)">
                            <li class="item item_head">
                                <ul>
                                    <li style="width: 25%">产品名称</li>
                                    <li >客户</li>
                                    <li>认购</li>
                                    <li>佣金</li>
                                    <li>返佣时间</li>
                                    <li>返佣状态</li>
                                </ul>
                                <span class="clearfix"></span>
                            </li>
                            <li class="item item_tail" v-for="(el,index) in listOrder">
                                <ul>
                                    <li style="width: 25%;" v-text="el.prodName"></li>
                                    <li v-text="el.customerName" v-if="el.customerName!=''"></li>
                                    <li  v-else="el.customerName==''">-</li>
                                    <li v-text="el.subscribeAmount"></li>
                                    <li v-text="el.expectRebate"></li>
                                    <li v-text="el.orderTime"></li>
                                    <li v-text="el.fundRaisingStatusDesc"></li>
                                    <li style="width: 5%" @click="orderDel(el.orderId,index)"><img src="../../assets/img/close.png" alt=""></li>
                                </ul>
                                <span class="clearfix"></span>
                            </li>

                        </ul>
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
                        <h1>暂无订单</h1>
                        <div class="nullImg">
                            <img class="img" src="../../assets/img/noselect.png" alt="">
                            <h4>暂未有产品订单，快去选择产品吧</h4>
                        </div>

                        <router-link :to="{name:'xintuo'}" >
                            <el-button class="btn"size="larger"type="primary">前往产品列表</el-button>
                        </router-link>
                    </div>







                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as API from '../../store/api.js'



    let _this = this;
    export default {
        name: 'UserOrder',
        data() { //属性
            return {
                baseObj:{},
                prodId:"",

                start: 0,
                pageSize: 10,
                totalCount: -1, //产品总数
                noselect:false,
                currentPage: 1, // 当前浏览的页数1

                orderStatus:0,//订单状态
                listTab:["预约审核","打款审核","返佣记录"],
                listOrder:[],//订单列表
                currentIndex:0
            }
        },
        /**
         * 初始化工作
         */
        mounted() {
            API.$getUserInfo(res => {
                if (res.head.ret == 0) {
//                    console.table(res);
                    this.baseObj=res.body;
                }else {
                }

            });
            API.$searchOrder(this.start,this.pageSize,this.orderStatus,this.prodId,res =>{
                console.log("res------------>"+JSON.stringify(res));
                if (res.head.ret == 0) {
                    console.log(res);
                    this.listOrder=res.body.listOrder;
                    this.totalCount=res.body.totalCount;
                }else {
                }
            });
        },
        /*
        * 过滤器
        * 将时间戳转换成为年-月-日的格式
        * */
        filters:{
            formatDate:function (now) {
                var dd=new Date(now*1000);
                var year = dd.getFullYear();
                var month = dd.getMonth() + 1;
                var date = dd.getDate();
                return year + "-" + month + "-" + date;
            }
        },
        /**
         *  方法
         */
        methods: {
            /**
             *分页
             */
            handleCurrentChange(val) {
                console.log("this.start---"+this.start);
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                if(this.currentPage>0){
                    this.start = (this.currentPage - 1) * this.pageSize;
                    this.searchOrder(this.valToOrderStatus(this.currentIndex));
                }

            },
            /*
            *获取订单列表
            * */
            searchOrder: function (orderStatus) {
                API.$searchOrder(this.start, this.pageSize, orderStatus,this.prodId, res =>{
                    console.log("res------------>"+ JSON.stringify(res));
                    if (res.head.ret == 0) {
                        console.log(res);
                        this.listOrder= res.body.listOrder;
                        this.totalCount=res.body.totalCount;
                    } else {
                    }
                });
            },
            orderDel: function (id, index) {
                this.listOrder.splice(index, 1);
                API.$deleteOrder(id,res =>{
                    console.log(res);
                })
            },
            shiftTab: function(val){
                this.searchOrder(this.valToOrderStatus(val));
                this.currentIndex = val;
            },
            checkActiveByIndex: function (index) {
                return this.currentIndex == index;
            },
            /*
            * 将当前下标转换成订单状态
            * */
            valToOrderStatus:function (value) {
                switch(value){
                    case 0:
                        return 0;
                    case 1:
                        return 10;
                    case 2:
                        return 30;
                    default:
                        return 0;
                }
        }
        }
    }
</script>
<style scoped>
    @import './userOrder.css';
</style>