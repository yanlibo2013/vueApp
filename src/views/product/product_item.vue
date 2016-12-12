<template>
    <div class="container">
        <div class="select product_item " :class="[{sale_out:!!el.saleOut}]">
            <div class="select_item" style="margin: 0 15px">
                <div class="row">
                    <div class="col-md-2 text-center" style="margin-top:3%;margin-left: 3%;margin-bottom: 2%;">
                        <span v-if="!!el.productImgUrl">
                            <img width="100px" :src="el.productImgUrl" alt="诚壹财富顾问，壹财富" :id="'productImg'+el.productId"/>
                        </span>
                    </div>
                    <div class="col-md-7" style="border-right: solid 1px #F3F3F3;margin:3% 0 1% -3%;">

                        <a :href='"/detail/" + el.platform +"/"+el.productId+".html"' target="_blank">
                            <div class="item_title" style="cursor: pointer" v-text="el.prodName"></div>
                        </a>
                        <div class="item_all_mark">
                            <label v-for="item in el.tag" v-if="!!item.word" style="display: inline-block">
                            	<a class="item_mark" :href='"/search/" + item.word +".html"' target="_blank">{{item.word}}</a>
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

                                        <div v-if="useIdIsNull">
                                            <router-link :to="{name:'login'}" class="item_value"
                                                         style="color: #f6762b; cursor: pointer"
                                                         v-text="el.rebate.word">
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
                    <div v-if="el.saleOut" class="item_sale_out">
                        <img src="../../assets/img/sale_out.png" alt="诚壹财富顾问，壹财富"/>
                    </div>
                    <div class="col-md-3 item_appointment" style="width:25%;">

                        <el-button class="item_appointment_btn" type="info" @click.native="orderVisible = true">立即预约</el-button>

                        <el-dialog title="尊敬的客户" v-model="orderVisible" size="tiny" close-on-press-escape>
                            <div class="modal-body" style="color:#CCCCCC">
                                <h5 style="padding-left: 5px;color:#CCCCCC">您好！为了更好的为您服务，请使用app进行预约</h5>

                                <div style="text-align: center;width: 100%  ">
                                    <img style="margin: 0 auto" src="../../assets/img/aside_code_app.png" alt="诚壹财富顾问，壹财富" />
                                    <h5 style="padding: 15px 0">请使用微信扫一扫</h5>
                                    <h4>咨询热线：4006-222-500</h4>
                                </div>
                                <div>

                                </div>
                            </div>
                        </el-dialog>

                    </div>
                    <div style="position: absolute;top: -2px;right: -20px;" v-if="el.flag!=0">
                        <img v-if="el.flag==1" src="../../assets/img/product_hot.png" alt="诚壹财富顾问，壹财富" />
                        <img v-if="el.flag==2" src="../../assets/img/product_new.png" alt="诚壹财富顾问，壹财富" />
                    </div>
                </div>

            </div>
            <div class="row">
                <div class="item_investhightlights" v-show="el.investmentHightlights!=''">
                    亮点：<span v-text="el.investmentHightlights"></span>
                </div>
                <div class=" item_operation">

                    <div class="row text-right" style="margin-right: 30px;">
                        <div v-show="category=='xintuo'||category=='ziguan'"
                             class="item_btn text-center">
                            <div class="text">
                                <div class="item_text item_text_compare" @click="addCompare(el.prodName, el.productId)">
                                    加入对比
                                </div>
                            </div>
                        </div>
                        <div class="item_btn text-center">
                            <div class="text">

                        		<a :href='"/preview/" + el.productId + ".html"' target="_blank">
                                    <div class="item_text item_text_pre">
                                        预览材料
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="item_btn text-center">
                            <div class="text">
                                <el-button class="item_text item_text_download" @click.native="docVisible = true" @click="getDoc(el.productId)">资料下载</el-button>

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
    </div>
</template>

<script>
import * as API from '../../store/api.js'
import { timeAgo } from '../../filters'

export default {
  name: 'product_item',
  props: ['item'],
  data(){
  	return {
  		el:this.item,
        docVisible:false,
        orderVisible:false,
        useIdIsNull: true,

        category:"",
        docList: [], // 产品文档列表
		imgSrcList: [
			"../../assets/img/product_hot.png",
			"http://odqn23waz.bkt.clouddn.com/%E4%B8%AD%E6%B1%9F%E4%BF%A1%E6%89%98.jpg",
			"../../assets/img/product_new.png",
			"../../assets/img/product_hot.png"],
  	}
  },
    /**
     * 初始化工作
     */

    beforeMount() {
       this.init();
    },
  methods: {
      init:function () {
          this.category=this.$route.name;
          console.log(this.$route.name);
      },
      /**
       * 添加对比产品
       */
      addCompare: function(prodName, prodId) {
          if(this.prodNameList.length >= 4) {

              alert("仅能同时对比4款产品！");
              return;
          }
          if(!this.checkExist(prodId)) {
              API.$getCompareProductData(prodId, res=> {
                  if(res.head.ret == 0) {
                      console.log("after");
                      this.prodNameList.push({
                          "prodName": prodName,
                          "prodId": prodId,
                          "list": res.body.list
                      });
                      // 存储对比产品
                      API.pushObj("compareList", this.prodNameList);
                  }
              });
              API.flyTo("#productImg" + prodId, "#aside_compare");

          } else {
              alert("该产品已存在，不能重复添加！");
          }
      },

      /**
		 * 获取文档下载列表
		 * @param id 产品id
		 */
		getDoc: function(prodId) {
			API.$getProductDocument(prodId, res=> {
				if(res.head.ret == 0) {
					this.docList = res.body.list;
				}
				if(res.body.totalCount == 0) {
	                alert("改项目暂时还没有上传文档!");
				} else {
//						$('#documentModal').modal();
				}
			})
		},
		downloadFile:function(fileName,downUrl){
			API.downloadFile(fileName,downUrl);
		},
		/**
		 * 下载全部文件
		 */
		allDown: function() {
			for(var i = 0; i < this.docList.length; i++) {
				API.downloadFile(this.docList[i].fileName, this.docList[i].downUrl);
			}
		}
  },
  // https://github.com/vuejs/vue/blob/next/packages/vue-server-renderer/README.md#component-caching
  serverCacheKey: props => {
    return `${
      props.item.id
    }::${
      props.item.__lastUpdated
    }::${
      timeAgo(props.item.time)
    }`
  }
}

</script>

<style scoped>
	@import './product.css';

</style>