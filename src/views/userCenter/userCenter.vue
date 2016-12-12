<template>
    <div class="userCenter">
        <div class="container">
            <div class="navbar-header my_navbar_header">
                <div>
                    <ol class="breadcrumb center_breadcrumb">
                        <li style="margin-left: 33px;">
                            <router-link :to="{name:'index'}">首页</router-link>
                        </li>
                        <li><a class="active">个人中心</a></li>
                    </ol>
                </div>
            </div>
            <div class="">
                <div class="center_left">
                    <div class="userLeft">
                        <ul class="left_item myOrder">
                            <li class="item_head"><img class="item_img" src="../../assets/img/icon_left.png" alt="壹财富，诚壹财富顾问"/>我的交易</li>
                            <li :class="[{active:($route.name=='userOrder')}]">
                                <router-link :to="{name:'userOrder'}">订单管理</router-link>
                            </li>
                            <li :class="[{active:($route.name=='userChange')}]">
                                <router-link :to="{name:'userChange'}">交易记录</router-link>
                            </li>
                            <li :class="[{active:($route.name=='userBill')}]">
                                <router-link :to="{name:'userBill'}">账单记录</router-link>
                            </li>
                        </ul>


                        <ul class="left_item myInfo">
                            <li class="item_head"><img class="item_img" src="../../assets/img/icon_left.png" alt="壹财富，诚壹财富顾问"/>个人信息</li>
                            <li :class="[{active:($route.name=='updateInfo')}]">
                                <router-link :to="{name:'updateInfo'}">修改资料</router-link>
                            </li>
                            <li :class="[{active:($route.name=='updatePwd')}]">
                                <router-link :to="{name:'updatePwd'}">修改密码</router-link>
                            </li>
                            <li :class="[{active:($route.name=='myCollect')}]">
                                <router-link :to="{name:'myCollect'}">我的收藏</router-link>
                            </li>
                            <li :class="[{active:($route.name=='myShare')}]">
                                <router-link :to="{name:'myShare'}">我的分享</router-link>
                            </li>
                            <li :class="[{active:($route.name=='myAuth')}]">
                                <router-link :to="{name:'myAuth'}">我的认证</router-link>
                            </li>
                        </ul>
                        <ul class="left_item other">
                            <li class="item_head"><img class="item_img" src="../../assets/img/icon_left.png" alt="壹财富，诚壹财富顾问"/>其他</li>
                            <li :class="[{active:($route.name=='feedback')}]">
                                <router-link :to="{name:'feedback'}">意见反馈</router-link>
                            </li>
                            <li @click="loginOut()" style="cursor: pointer">
                                退出登录
                            </li>
                        </ul>
                    </div>

                </div>


                <div class="center_right">
                    <transition name="slide" mode="out-in">
                        <router-view class="view">
                        </router-view>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as API from '../../store/api.js'
//    let _this = this;
    export default {
        name: 'UserCenter',
        data() { //属性
            return {

            }
        },
        /**
         * 初始化工作
         */
        mounted() {
                console.log(this.$route);
        },
        /**
         *  方法
         */
        methods:{
            loginOut:function () {
                API.$logout(res =>{
                    if (res.head.ret == 0) {
                    this.$router.push({ name: 'index' });
                        API.clearUserData();
                    } else {
//                        showFadeBox(res.head.msg);
                    }


                })
            }
        },


    }
</script>
<style scoped>
    @import './userCenter.css';
</style>