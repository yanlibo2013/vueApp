<template>
    <div class="userBill">
        <div class="bill_item">
            <div class="info_head">
                <span class="info_font">账单记录</span>
            </div>
            <div class="info_body">
                <div class="info_date">
                    <div class="block" >
                        <span class="demonstration"style="margin-right: 15px">交易时间</span>
                        <el-date-picker style="background-color: #f3f3f3;"
                                v-model="beginTime"
                                align="right"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions1">
                        </el-date-picker>
                        <span>-</span>
                        <el-date-picker style="background-color: #f3f3f3;"
                                        v-model="endTime"
                                        align="right"
                                        type="date"
                                        placeholder="选择日期"
                                        :picker-options="pickerOptions1">
                        </el-date-picker>
                    </div>

                </div>
                <div class="info_search">
                    <el-button class="info_btn"
                               type="primary"
                               @click ="search()"
                    >搜 索</el-button>
                </div>
                <div class="bill_header">
                    <ul class="bill_nav">
                        <li v-for="(el,index) in listTab"  class="default" @click="shiftTab(index)" :class="[{active:checkActiveByIndex(index)}]">{{el}}</li>
                        <li class="clearfix"></li>
                    </ul>
                </div>
                <span class="clearfix"></span>
                <div class="bill_body" >
                    <div v-if="totalCount!=0">
                        <ul class="bill_list item_all" v-show="checkActiveByIndex(0)">
                            <li class="item item_head">
                                <ul>
                                    <li class="item_first">时间</li>
                                    <li class="item_first">操作</li>
                                    <li class="item_first">金额</li>
                                    <li class="item_first">状态</li>
                                </ul>
                                <span class="clearfix"></span>
                            </li>
                            <li class="item item_tail" v-for="el in listBill">
                                <ul>
                                    <li class="item_first" v-text="el.createTime"></li>
                                    <li class="item_first" v-text="el.display"></li>
                                    <li class="item_first" v-text="el.amount"></li>
                                    <li class="item_first" v-text="el.statusDesc"></li>
                                </ul>
                                <span class="clearfix"></span>
                            </li>

                        </ul>
                        <ul class="bill_list export" v-show="checkActiveByIndex(1)">
                            <li class="item item_head">
                                <ul>
                                    <li>名称</li>
                                    <li>打款金额</li>
                                    <li>时间</li>
                                    <li>交易项目</li>
                                    <li>客户姓名</li>
                                    <li>金额</li>
                                    <li>状态</li>
                                </ul>
                                <span class="clearfix"></span>
                            </li>
                            <li class="item item_tail" v-for="el in listBill">
                                <ul>
                                    <li v-text="el.display"></li>
                                    <li v-text="el.amount"></li>
                                    <li v-text="el.createTime"></li>
                                    <li v-text="el.title"></li>
                                    <li v-text="el.customerName"></li>
                                    <li v-text="el.content"></li>
                                    <li v-text="el.statusDesc"></li>
                                </ul>
                                <span class="clearfix"></span>
                            </li>

                        </ul>
                        <ul class="bill_list import" v-show="checkActiveByIndex(2)">
                            <li class="item item_head">
                                <ul>
                                    <li class="item_third">时间</li>
                                    <li class="item_third">操作</li>
                                    <li class="item_third">提现银行</li>
                                    <li class="item_third">提现账户</li>
                                    <li class="item_third">金额</li>
                                    <li class="item_third">状态</li>
                                </ul>
                                <span class="clearfix"></span>
                            </li>
                            <li class="item item_tail" v-for="el in listBill">
                                <ul>
                                    <li class="item_third"v-text="el.createTime"></li>
                                    <li class="item_third"v-text="el.display"></li>
                                    <li class="item_third"v-text="el.title"></li>
                                    <li class="item_third"v-text="el.content"></li>
                                    <li class="item_third"v-text="el.amount"></li>
                                    <li class="item_third"v-text="el.statusDesc"></li>
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
                        <h1>暂无记录</h1>
                        <div class="nullImg">
                            <img class="img" style="width: 200px;"src="../../assets/img/bg_null_bill.png" alt="">
                            <h4>没有账单记录，出入入账记录都会显示在这里</h4>
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
        name: 'UserBill',
        data() { //属性
            return {
                pickerOptions1: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                opType:-1,
                beginTime: '',
                endTime: '',
                listTab:["全部","收入","支出"],
                listBill:[],
                currentIndex:0,

                pageSize: 10,
                start: 0,
                totalCount: -1, //产品总数
                currentPage: 1, // 当前浏览的页数
                noselect:false

            }
        },
        /**
         * 初始化工作
         */
        mounted() {
            this.getListDetail(this.start,this.opType);


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
                    this.getListDetail(this.start,this.valToBillStatus(this.currentIndex));
                }

            },
            /*获取账单记录列表*/
            getListDetail:function (start,opType,beginTime,endTime) {
                API.$getAccountDetailList(start,this.pageSize,beginTime,endTime,opType,res =>{
                    if(res.head.ret==0){
                    this.listBill=res.body.list;
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
            shiftTab: function(val){
                this.getListDetail(0,this.valToBillStatus(val));
                this.currentIndex = val;
            },

            checkActiveByIndex: function (index) {
                return this.currentIndex == index;
            },
            /*
             * 将当前下标转换成账单状态
             * */
            valToBillStatus:function (value) {
                switch(value){
                    case 0:
                        return -1;
                    case 1:
                        return 0;
                    case 2:
                        return 1;
                    default:
                        return -1;
                }
            },
            /*
             *日期搜索*/
            search:function () {
                let opType=this.valToBillStatus(this.currentIndex);

                let beginDateTime=Date.parse(this.beginTime)/1000;
//                console.log("this.beginDateTime----->"+beginDateTime);
                //一天相差的毫秒数为86400 减1为前一天的23:59:59
                let endDateTime=Date.parse(this.endTime)/1000+86400-1;
//                console.log("endDateTime----->"+endDateTime);
                this.getListDetail(0,opType,beginDateTime,endDateTime);

            }
        }

    }
</script>
<style scoped>
    @import './userBill.css';
</style>