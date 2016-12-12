<template>
    <div class="updateInfo">
        <div class="info_item">
            <div class="info_head">
                <span class="info_font">修改资料</span>
            </div>
            <div class="info_body">

                <div class="info_cell info_base">
                    <div class="cell_header">
                        <span class="cell_name">基本信息</span>
                        <span class="cell_btn"@click="modifyInfo()">保存</span>
                        <span class="clearfix"></span>
                    </div>
                    <div class="cell_body">
                        <el-form :model="baseObj":label-width="infoLabelWidth":rules="rule" ref="baseObj" >
                            <el-form-item label="昵称" prop="nickName">
                                <el-input v-model="baseObj.nickName"auto-complete="off"placeholder="请输入昵称"class="cell_input"></el-input>
                            </el-form-item>
                            <el-form-item label="性别" >
                                <el-radio class="radio cell_radio" v-model="baseObj.sex" label="0">男</el-radio>
                                <el-radio class="radio cell_radio" v-model="baseObj.sex" label="1">女</el-radio>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model="baseObj.email"auto-complete="off"placeholder="请输入邮箱"class="cell_input"></el-input>
                            </el-form-item>


                        </el-form>




                    </div>
                </div>
                <div class="info_cell info_addr">
                    <div class="cell_header">
                        <span class="cell_name">地址信息</span>
                        <el-button class="cell_btn" type="text" @click.native="addressUpdate(addressObj,0)" style="margin: -15px 0">
                            <strong>+</strong>新增地址
                        </el-button>



                        <el-dialog title="新增地址" v-model="addressVisible"size="tiny">
                            <el-form :model="addressObj" :rules="rule"label-position="right" ref="addressObj" label-width="86px">
                                <el-form-item label="收件人" prop="name">
                                    <el-input v-model="addressObj.name"auto-complete="off"class="cell_input"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码" prop="mobile">
                                    <el-input v-model="addressObj.mobile"auto-complete="off"class="cell_input"></el-input>
                                </el-form-item>

                                <el-form-item label="详细地址" prop="detail">
                                    <el-input type="textarea":autosize="{ minRows:3, maxRows: 6}" placeholder="请输入详细地址"
                                              v-model="addressObj.detail"auto-complete="off"class="cell_input"></el-input>
                                </el-form-item>
                                <el-form-item label=" "  style="text-align: left">
                                    <el-checkbox v-model="addressObj.defaultFlag">设置为默认地址</el-checkbox>
                                </el-form-item>
                                <el-form-item style="text-align: left;margin-left: 40px">
                                    <el-button type="primary" @click="addressSave(addressObj.addressId)" style="padding: 10px 100px;">保存</el-button>
                                </el-form-item>

                            </el-form>

                        </el-dialog>







                        <span class="clearfix"></span>
                    </div>
                    <div class="cell_body" style="padding: 0 0">
                        <ul>
                            <li class="cell_list"v-for="(el,index) in addressList">
                                <ul >
                                    <li v-text="el.name"></li>
                                    <li v-text="el.detail"style="width: 30%;line-height: 25px"></li>
                                    <li v-text="el.mobile"></li>
                                    <li >
                                        <el-button type="text" @click="addressUpdate(el,1)">修改</el-button> &nbsp;&nbsp;|
                                        <el-button type="text"@click="addressDel(el.addressId,index)">删除</el-button>
                                    </li>
                                    <li v-show="el.defaultFlag==1"><el-button type="primary" size="mini" style="height: 30px">默认地址</el-button></li>
                                    <span class="clearfix"></span>
                                </ul>
                            </li>
                        </ul>


                    </div>
                </div>
                <div class="info_cell info_bank">
                    <div class="cell_header">
                        <span class="cell_name">银行卡信息</span>
                        <el-button class="cell_btn" type="text" @click.native="bankVisible = true" style="margin: -15px 0">
                            <strong>+</strong>新增账号
                        </el-button>

                        <el-dialog title="添加银行卡" v-model="bankVisible"size="tiny">

                            <el-form :model="bankObj" :rules="rule"label-position="right" ref="bankObj" label-width="86px">
                                <el-form-item label="账户姓名" prop="customerName">
                                    <el-input v-model="bankObj.customerName"auto-complete="off"class="cell_input"></el-input>
                                </el-form-item>
                                <el-form-item label="银行卡号" prop="bankCard">
                                    <el-input v-model="bankObj.bankCard"auto-complete="off"class="cell_input"></el-input>
                                </el-form-item>
                                <el-form-item label="选择银行"prop="bankName" >


                                    <el-select v-model="bankObj.bankName" class="cell_input" placeholder="请选择银行" >

                                        <el-option
                                                v-for="item in BankOptions"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>











                                </el-form-item>

                                <el-form-item label="所在支行"prop="bankBranch" >
                                    <el-input v-model="bankObj.bankBranch"auto-complete="off"class="cell_input"></el-input>
                                </el-form-item>
                                <el-form-item label=" "  style="text-align: left">
                                    <el-checkbox v-model="bankObj.defaultFlag">设置为默认银行卡</el-checkbox>
                                </el-form-item>
                                <el-form-item style="text-align: left;margin-left: 40px">
                                    <el-button type="primary" @click.native="bankSave()" style="padding: 10px 100px;">保存</el-button>
                                </el-form-item>

                            </el-form>

                        </el-dialog>





                        <span class="clearfix"></span>
                    </div>
                    <div class="cell_body">
                        <!--<ul>
                            <li class="cell_list"v-for="(el,index) in listBankCard">
                                <ul >
                                    <li v-text="el.bankName"style="width: 50%;text-align: left;padding-left: 15px"></li>
                                    <li v-text="el.bankCard"  style="width: 50%;text-align: right;padding-right: 15px"></li>
                                    <span class="clearfix"></span>
                                </ul>
                            </li>
                        </ul>-->

                        <ul>
                            <li class="cell_list"v-for="(el,index) in listBankCard">
                                <ul >
                                    <li v-text="el.bankName"></li>
                                    <li style="width: 47%;">
                                        *************<span v-text="el.bankCard"></span>
                                    </li>
                                  <!--  <li v-text="el.mobile"></li>-->
                                    <li >
                                      <!--  <el-button type="text" @click="addressUpdate(el,1)">修改</el-button> &nbsp;&nbsp;|-->
                                        <el-button type="text"@click="bankDel(el.bankCardId,index)">删除</el-button>
                                    </li>
                                    <li v-show="el.defaultFlag==1"><el-button type="primary" size="mini" style="height: 30px">默认银行卡</el-button></li>
                                    <span class="clearfix"></span>
                                </ul>
                            </li>
                        </ul>













                    </div>
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
        name: 'UpdateInfo',
        data() { //属性
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入正确的姓名'));
                }  else {
                    callback();
                }
            };
            var validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入邮箱'));
                } else if (!API.checkEmail(value)) {
                    callback(new Error('您输入正确的邮箱'));
                } else {
                    callback();
                }
            };
            var validateMobile = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else if(!API.checkTel(value)) {
                    callback(new Error('请输入正确的手机号码'));
                }else {
                    callback();
                }
            };
            var validateDetail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入详细地址'));
                } else {
                    callback();
                }
            };
            var validateBankCard = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入正确的银行卡号'));
                }else if(!API.checkBankCard(value)) {
                    callback(new Error('请输入16位或19位的银行卡号'));
                } else {
                    callback();
                }
            };

            return {
                BankOptions: [{
                    value: '工行',
                    label: '工商银行'
                }, {
                    value: '广发',
                    label: '广发银行'
                }, {
                    value: '交行',
                    label: '交通银行'
                }, {
                    value: '民生',
                    label: '民生银行'
                },{
                    value: '平安',
                    label: '平安银行'
                }, {
                    value: '浦发',
                    label: '浦发银行'
                }, {
                    value: '兴业',
                    label: '兴业银行'
                }, {
                    value: '中信',
                    label: '中信银行'
                }, {
                    value: '中行',
                    label: '中国银行'
                }, {
                    value: '建行',
                    label: '建设银行'
                }, {
                    value: '招行',
                    label: '招商银行'
                }, {
                    value: '农行',
                    label: '农业银行'
                }, {
                    value: '光大',
                    label: '光大银行'
                }, {
                    value: '其他',
                    label: '其他银行'
                }
                ],
                infoLabelWidth:"100px",
                addressVisible:false,
                addressList:[],//地址列表
                bankVisible:false,
                listBankCard:[],//银行卡列表
                baseObj:{
                    nickName:'',
                    sex:3,
                    email:''
                },
                addressObj:{},
                addressObj_base:{
                    addressId:0,
                    name:'',
                    mobile:'',
                    detail:'',
                    defaultFlag:false,
                },
                bankObj:{
                    bankCardId:0,
                    IDCard :"0",
                    customerName:'',
                    bankCard:'',
                    bankName:'工行',
                    bankBranch:'',
                    defaultFlag:0
                },

                rule: {
                    /*个人信息检验*/
                    nickName: [
                        { required: true, message: '请输入正确的昵称', trigger: 'blur' },
                        { validator: validateName }
                    ],
                    email: [
                        { required: true, message: '请输入正确的邮箱', trigger: 'blur' },
                        { validator: validateEmail }
                    ],
                    /*收获地址校验*/
                    name: [
                        { required: true, message: '请输入收件人姓名', trigger: 'blur' },
                        { validator: validateName }
                    ],
                    mobile: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { validator: validateMobile }
                    ],
                    detail: [
                        { required: true, message: '请输入详细地址', trigger: 'blur' },
                        { validator: validateDetail, trigger: 'blur' }
                    ],
                    /*银行卡校验*/
                    customerName:[
                        { required: true, message: '请输入正确的姓名', trigger: 'blur' },
                        { validator: validateName }
                    ],
                    bankCard:[
                        { required: true, message: '请输入16位或19位的银行卡号', trigger: 'blur' },
                        { validator: validateBankCard }
                    ],
                    bankName:[
                        { required: true, message: '请选择正确的银行名字', trigger: 'blur' },
//                        { validator: validateBankCard }
                    ],
                    bankBranch:[
                        { required: true, message: '请输入正确支行的名字', trigger: 'blur' },
                    ],
                },


            }
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            'this.addressList': 'init'
        },
        /**
         * 初始化工作
         */
        mounted() {
            /*获取基本信息*/
           this.getUserInfo();

            /*获取地址列表*/
            this.getListAddress();

            /*获取银行卡列表*/
            this.getListBankCard();

        },
        /**
         *  方法
         */
        methods:{
            /*获取用户信息*/
            getUserInfo:function () {
                API.$getUserInfo(res => {
                    if (res.head.ret == 0) {
                        this.baseObj=res.body;
                        this.baseObj.sex=(this.baseObj.sex).toString();
                    }else {
                    }

                });
            },
            /*修改基本信息*/
            modifyInfo:function () {
                this.$refs.baseObj.validate((valid) => {
                    if (valid) {
                        API.$modifyUserInfo(this.baseObj.nickName,this.baseObj.sex,this.baseObj.email,res=>{
                            if(res.head.ret==0){
//                                this.getUserInfo();
                            }
                            console.log(res);
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            /*获取地址列表*/
            getListAddress:function () {
                API.$listAddress(res =>{
                    if (res.head.ret == 0) {
                        console.log(res);
                        this.addressList=res.body.listAddress;
                    }else {
                    }
                });

            },
            /*获取银行卡列表*/
            getListBankCard:function () {
                API.$listBankCard(res =>{
                    if (res.head.ret == 0) {
                        console.log(res);
                        this.listBankCard=res.body.listBankCard;
                    }else {
                    }
                })
            },
            /*
             * 将数值转换成string
             * */
            numberToString:function (number) {
                return number.toString();
            },
            /*
             * 将boolean类型转换成0或1
             * */
            booleanToString:function (boo) {
                return (boo==true)?1:0;
            },
            /*
             * 将0或1转换成boolean类型
             * */
            numberToBoolean:function (num) {
                return (num==1)?true:false;
            },
            /*
            * 新建和修改地址提交
            *
            * */
            addressSave:function (id) {

                this.addressObj.defaultFlag=this.booleanToString(this.addressObj.defaultFlag);
                if(id!=0){
                    console.log("id----不等于----->"+id);
                    this.$refs.addressObj.validate((valid) => {
                        if (valid) {
                            API.$updateAddress(this.addressObj,res=>{
                                this.addressVisible=false;
                                if(res.head.ret==0){
                                    this.getListAddress();
                                }
                            });

                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });

                }else{
                    console.log("id----等于0----->"+id);
                    API.$addAddress(this.addressObj,res=>{
                        this.addressVisible=false;
                        if(res.head.ret==0){
                            this.getListAddress();
                        }
                    });

                }




            },
            /*
            * 初始化地址对象
            * */
            initAddress:function(){

                var result={};
                var source=this.addressObj_base;
                for (var key in source) {
                    result[key] = source[key];
                }
                this.addressObj=result;

            },
            /*
             *新建和修改地址打开弹窗
             * */
            addressUpdate:function(el,type){

                this.addressVisible=true;
                if(type==1){
                    this.addressObj=el;
                    this.addressObj.defaultFlag=this.numberToBoolean(this.addressObj.defaultFlag);
                    console.log("JSON.stringify(el)------"+JSON.stringify(el));
                }else{
                    this.initAddress();
//                    this.addressObj={};

                }
            },
            /*
            * 删除地址
            * */
            addressDel:function (id,index) {
                console.log("id---------->"+id);
                this.addressList.splice(index,1);
                API.$deleteAddress(id,res=>{
                    if(res.head.ret==0){

                        console.log(res);
                    }
                })
            },

            /*
             * 新建和修改银行提交
             *
             * */
            bankSave:function () {
                this.$refs.bankObj.validate((valid) => {
                    if (valid) {
                        this.bankObj.defaultFlag=this.booleanToString(this.bankObj.defaultFlag);
                        console.log("this.bankObj------>"+JSON.stringify(this.bankObj));
                        API.$addBankCard(this.bankObj,res=>{
                            this.bankVisible=false;
                            if(res.head.ret==0){
                                this.getListBankCard();
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            /*
            *删除银行卡信息
            * */
            bankDel:function (id,index) {
                console.log("id---------->"+id);
                this.listBankCard.splice(index,1);
                API.$deleteBankCard(id,res=>{
                    if(res.head.ret==0){

                        console.log(res);
                    }
                })
            },

        }

    }
</script>
<style scoped>
    @import './updateInfo.css';
</style>