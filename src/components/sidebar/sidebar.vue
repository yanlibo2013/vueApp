<template>
    <div class="sidebar">
        <div v-show="showBookmark" class="aside_collection">
            <div class="aside_collection_title">我的收藏(<span v-text="bookmarkProductList.length"></span>)
                <img class="close" @click="toggleBookmark()" src="../../assets/img/login_close.png" alt=""/>
            </div>
            <div class="bookmark" v-for="bookmark in bookmarkProductList">
                <span class="name"v-text="bookmark.prodName"></span>
                <div  class="info">
                    <div class="col-md-8"  style="padding:0;">
                        <div >产品类别：<span v-text="bookmark.categoryName"></span></div>
                        <div><span v-text="bookmark.periodName"></span>：<span v-text="bookmark.period"></span></div>
                    </div>
                    <div  class="col-md-4" style="padding:0;">
                        <div class="yield"v-text="bookmark.yield"></div>
                        <div class="yieldName" v-text="bookmark.yieldName"></div>
                    </div>
                </div>
                <div style="margin-top:8px;">
                    <button class="btn-cy-default"></button>
                    <el-button type="primary">立即预约</el-button>
                    <el-button @click="openUrl('/detail/0/'+bookmark.productId+'.html')">查看详情</el-button>
                    <el-button @click="cancelBookmark(bookmark.productId)">删除</el-button>

                </div>
            </div>
        </div>
        <div class="aside_bar" @mouseover="refreshCompareList()">
            <ul>
                <li style="cursor: pointer"@click="toggleBookmark()">
                    <div class="aside_default">
                        <img  class="aside_img" src="../../assets/img/icon_collect.png" alt="">
                        <span >我的收藏</span>
                    </div>
                    <div class="aside_reverse">
                        <img  class="aside_img" src="../../assets/img/icon_collect_reverse.png" alt="">
                        <span >我的收藏</span>
                    </div>
                </li>
                <li id="aside_compare" style="cursor: pointer">
                    <!--v-show="categoryId==1||categoryId==2"-->
                    <div class="aside_default">
                        <img  class="aside_img" src="../../assets/img/icon_compare.png" alt="">
                        <span >对比</span>
                    </div>
                    <div class="aside_reverse">
                        <img  class="aside_img" src="../../assets/img/icon_compare_hover.png" alt="">
                        <span >对比</span>
                    </div>
                    <div class="aside_content" style="background: #fff;color: #000;">
                        <div>
                            <ul>
                                <li class="list_item" v-for="(el,index) in prodNameList" @click="openUrl('/detail/0/'+el.prodId+'.html')">
                                    {{el.prodName}}<img style="float:right" @click.stop="removeCompare(index)" src="../../assets/img/close.png" alt="">
                                </li>
                            </ul>
                        </div>

                        <el-button type="primary" style="width:90%" @click="goCompare()">开始对比({{prodNameList.length}}/4 )</el-button>
                    </div>
                </li>
                <li >
                    <div class="aside_default">
                        <img  class="aside_img" src="../../assets/img/icon_erweima.png" alt="">
                        <span >二维码</span>
                    </div>
                    <div class="aside_reverse">
                        <img  class="aside_img" src="../../assets/img/icon_erweima_reverse.png" alt="">
                        <span >二维码</span>
                    </div>



                    <div class="aside_content">
                        <div class="aside_erweima">
                            <div class="aside_pic">
                                <img  src="../../assets/img/aside_code_wechat.png" alt=""/>
                            </div>

                            <span>扫一扫关注公众号</span>
                        </div>
                        <div class="aside_erweima">
                            <div class="aside_pic">
                                <img  src="../../assets/img/aside_code_app.png" alt=""/>
                            </div>
                            <span>扫一扫下载APP</span>
                        </div>


                    </div>
                </li>
                <li >
                    <div class="aside_default">
                        <img  class="aside_img" src="../../assets/img/icon_kefu.png" alt="">
                        <span >联系客服</span>
                    </div>
                    <div class="aside_reverse">
                        <img  class="aside_img" src="../../assets/img/icon_kefu_reverse.png" alt="">
                        <span >联系客服</span>
                    </div>


                    <div class="aside_content">
                        <h4  style="line-height: 25px">联系我们</h4>
                        <h4  style="line-height: 25px">4006-222-500</h4>
                        <h5  style="line-height: 25px">周一到周五：9:30-18:30</h5>
                    </div>
                </li>
                <li style="border-bottom:none;height:70px;margin-bottom:-10px;padding-bottom: 0;cursor: pointer"@click="goTop()">
                    <div class="aside_default">
                        <img  class="aside_img" src="../../assets/img/icon_goTop.png" alt="">
                        <span >回到顶部</span>
                    </div>
                    <div class="aside_reverse">
                        <img  class="aside_img" src="../../assets/img/icon_goTop_reverse.png" alt="">
                        <span >回到顶部</span>
                    </div>

                </li>
            </ul>
        </div>
    </div>

</template>
<style>
    @import './sidebar.css';
</style>
<script>
    import * as API from '../../store/api.js'
    Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
    export default{
        data(){
            return{
                prodId:0,
//                categoryId:0,
                prodNameList:[],
                showBookmark:false,
                bookmarkProductList:[]
            }
        },
        /**
         * 初始化工作
         */
        mounted() {
            this.prodNameList = API.fetchObj("compareList");
        },
        methods:{
            /**
             * 删除一个对比项
             * @param prodId
             */
            removeCompare: function(index) {
                this.prodNameList.splice(index, 1);
                API.pushObj("compareList", this.prodNameList);
               /* for (var i = 0; i <this.prodNameList.length ; i++) {
                    var item = this.prodNameList[i];
                    if (item.prodId == prodId) {
                        this.prodNameList.remove(item);
                        // 存储对比产品

                        return ;
                    }
                }*/
            },
            /**
             * 书签显示开关
             */
            toggleBookmark: function() {
                if(!API.getUserId()) {

                    this.$alert('您尚未登录，请您先登录！', '提示', {
                      confirmuttonText: '确定'
                    });
                    return;
                }
                this.showBookmark = !this.showBookmark;
                if(this.showBookmark) {
                    this.getBookmarkList();
                }
            },
            /**
             * 获取收藏列表
             */
            getBookmarkList: function() {
                console.log("getBookmarkList");
                API.$getBookmarkProduct(res=> {
                    console.log(res.body);
                    this.bookmarkProductList = res.body.productList;
                });
            },
            /**
             * 取消收藏
             */
            cancelBookmark: function(prodId) {
                for(var i = 0; i < this.bookmarkProductList.length; i++) {
                    if(prodId == this.bookmarkProductList[i].productId) {
                        this.bookmarkProductList.remove(this.bookmarkProductList[i]);
                        break;
                    }
                }
                // 删除收藏
                API.$clearBookmark(prodId, res=> {
                    if(res.head.ret!= 0) {
                        this.$alert(res.head.msg, '提示', {
                          confirmuttonText: '确定'
                        });
                    }
                })
            },
            /*
             * 回到top
             * */
            goTop:function(){
                window.scrollTo(0,0);
            },
            /*
             * 跳转到对比页面
             * */
            goCompare: function() {
                var idArray = new Array();
                console.log(this.prodNameList);
                for (var i = 0; i< 4;i++) {
                    if(this.prodNameList[i]) {
                        idArray.push(this.prodNameList[i].prodId);
                    } else {
                        idArray.push(0);
                    }
                }
                console.log(idArray);
                window.open('/compare/' + idArray.join('_') + '.html');
            },
            /*打开一个新窗口*/
            openUrl: function(url) {
                window.open(url);
            },
            /**
             * 刷新对比列表
             */
            refreshCompareList:function() {
                this.prodNameList = API.fetchObj("compareList");
            }
        }

    }
</script>
