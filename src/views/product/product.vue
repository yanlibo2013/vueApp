<template>

    <div id="prod" class="product">

        <!-- 产品列表-->
        <div class="container my_container">

            <!--导航栏-->
            <div class="navbar-header my_navbar_header">
                    <ul class="breadcrumb my_breadcrumb">
                        <li>
                            <router-link :to="{name:'index'}">首页</router-link>
                        </li>
                        <li v-if="queryDecode==''">
                            <a href="#" class="active" v-text="categoryName"></a>
                        </li>
                        <li v-else="queryDecode!=''" style="font-size: 1.2em">搜索 <span class="active" style="font-size: 1.2em" v-text="[queryDecode]"></span></li>

                    </ul>
            </div>


            <!-- 筛选 -->
            <div class="container my_container select" style="margin-left: -15px; background-color: #fff;">
                <div class="select_item" v-for="el in filterList">
                    <div class="row">
                        <div class="item_label">{{el.name}} :</div>
                        <div class="item_detail">
                            <ul>
                                <li v-for="item in el.child">
                                    <span v-text="item.name" @click="toggleSelectItem(el, item)" class="item_child," :class="[{active:item.sel!=''}]"></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="select_item select_condition" v-show="totalCount>0">
                    <div class="row">
                        <div class="item_label" style="padding-bottom: 1%" v-show="categoryId!=-1">已选条件：</div>
                        <div class="item_detail" style="padding-left: 10px;width: 70%;text-align: left" v-show="categoryId!=-1">
                            <ul style="float:left; text-align:left;">
                                <li v-for="filter in selectedFilters"><span class="select_del" @click="deleteSelectFilter(filter)">{{filter.name}}<img  src="../../assets/img/close.png" alt="诚壹财富顾问，壹财富" ></span>
                                    <span class="clearfix"></span>
                                </li>
                                <span class="clearfix"></span>
                                <li v-show="selectedFilters.length > 0" class="clean" @click="cleanFilterLists(null)">
                                    清除条件
                                </li>
                            </ul>
                        </div>
                        <div class="select_requirements">
                            <div style="margin-top: 20%;font-size: inherit">共 <span style="color: #f6762b;font-size: inherit" v-text="totalCount"></span> 款产品符合要求
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <!-- 排序 -->
            <div class="container my_container" v-show="totalCount>0">
                <div class="select_item select_default">
                    <div class="row">
                        <div class="item_detail">
                            <ul>
                                <li><span class="item_sort" :class="[{active:currentSortIndex==0}]" @click="productSort(0)">默认排序</span>
                                </li>
                                <li v-for="el in defaultSortList">
                                    <span v-text="el.name" class="item_sort" :class="[{active:currentSortIndex==el.sortIndex}]" @click="productSort(el.sortIndex)"></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 没找到产品 -->
            <div class="noselect_body" v-if="!noselect">
                <div class="noselect_center">
                    <div class="noselect_img">
                        <img src="../../assets/img/noselect.png" alt="诚壹财富顾问，壹财富" />
                    </div>
                    <div class="noselect_text">
                        <ul>
                            <li>非常抱歉，未能找到相关结果</li>
                            <li>您可致电<b> 4006-222-500</b>，将由专业的渠道经理为您服务!</li>
                        </ul>
                    </div>
                </div>
            </div>



            <!-- 产品列表item -->
            <div v-else="noselect" v-loading.body="loading">
               <!-- <ProductItem v-for="el in productList"  :key="el.productId" :item="el" ></ProductItem>-->


                <div class="container" v-for="el in productList" >
                    <div class="select product_item " :class="[{sale_out:!!el.saleOut}]">
                        <div class="select_item" style="margin: 0 15px">
                            <div class="row">
                                <div class="col-md-2 text-center" style="margin-top:3%;margin-left: 3%;margin-bottom: 2%;" v-if="!!el.productImgUrl">
                                     <img width="100px" :src="el.productImgUrl" alt="诚壹财富顾问，壹财富" :id="'productImg'+el.productId"/>
                                </div>
                                <div class="col-md-7" style="border-right: solid 1px #F3F3F3;margin:3% 0 1% -3%;">

                                    <a :href='"/detail/" + el.platform +"/"+el.productId+".html"' class="item_title" target="_blank">{{el.prodName}}</a>
                                    <div class="item_all_mark">
                                        <label v-for="item in el.tag" v-if="!!item.word" style="display: inline-block">
                                            <a class="item_mark" :href='"/search/" + item.word +".html"' target="_blank">{{item.word}}</a>
                                        </label>
                                    </div>
                                    <ul class="item_attr">
                                        <li>
                                            <div class="item_value" v-text="el.yield"></div>
                                            <span class="item_key" v-text="el.yieldName"></span>
                                        </li>
                                        <li>
                                            <div class="item_value" v-text="el.period"></div>
                                            <span class="item_key" v-text="el.periodName"></span>
                                        </li>
                                        <li>
                                            <div class="item_value" v-text="el.minimiumInvestmentAmount"></div>
                                            <span class="item_key" v-text="el.minimiumInvestmentAmountName"></span>
                                        </li>
                                        <li>
                                            <div class="item_value" v-text="el.invsetmentTargetValue"></div>
                                            <span class="item_key" v-text="el.invsetmentTargetName"></span>
                                        </li>
                                        <li>
                                            <div v-if="!useIdIsNull">

                                                <span v-if="el.rebate.word=='登录可见'">
                                                     <router-link :to="{name:'login'}" class="item_value"
                                                                  style="color: #f6762b; cursor: pointer"
                                                                  v-text="el.rebate.word">
                                                    </router-link>
                                                </span>
                                                <span v-if="el.rebate.word=='认证可见'">
                                                     <router-link :to="{name:'myAuth'}" class="item_value"
                                                                  style="color: #f6762b; cursor: pointer"
                                                                  v-text="el.rebate.word">
                                                    </router-link>
                                                </span>
                                            </div>
                                            <div v-else="useIdIsNull" class="item_value" v-text="el.rebate.word"></div>
                                            <span class="item_key" v-text="el.rebateName"></span>
                                        </li>
                                    </ul>
                                </div>
                                <img  v-if="el.saleOut" class="item_sale_out" src="../../assets/img/sale_out.png" alt="诚壹财富顾问，壹财富"/>
                                <div class="col-md-3 item_appointment" style="width:25%;">
                                    <el-button class="item_appointment_btn" type="info" @click.native="orderVisible = true">立即预约</el-button>

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
                                <div class="row text-right" style="margin-right: 30px; padding:10px;">
                                    <el-button v-show="category=='xintuo'||category=='ziguan'" class="item_text_compare" style="padding-left: 36px;" @click="addCompare(el.prodName, el.productId)">加入对比</el-button>
                                    <el-button class="item_text_pre" style="padding-left: 36px;" @click='openUrl("/preview/" + el.productId + ".html")'>预览材料</el-button>
                                    <el-button class="item_text_download" style="padding-left: 30px;" @click="getDoc(el.productId)">资料下载</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


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
                <el-dialog title="资料下载" v-model="docVisible" size="tiny" close-on-press-escape>

                    <div class="modal-body">
                        <button class="btn btn-default" v-for="doc in docList" v-text="doc.fileName" @click="downloadFile(doc.fileName, doc.downUrl)" style="margin: 6px;" />
                        <br>
                        <button class="btn btn-default" @click="allDown()">全部下载</button>
                    </div>
                </el-dialog>
				<div class="container" v-show="totalCount>10" style="text-align: center;background: white;margin-left: -15px">
					<div class="" style="line-height: 30px;margin-top: 5px;">
						<el-pagination small @current-change="handleCurrentChange"
									   layout="prev, pager, next"
									   :total="totalCount">
						</el-pagination>
					</div>
				</div>
            </div>
        </div>


        <div class="sidebar">
            <sidebar></sidebar>
        </div>


    </div>

</template>

<script>
	import * as API from '../../store/api.js'
	import $ from '../../assets/js/jquery-2.1.0.min.js'
	import Vue from 'vue'
	//import ProductItem from './product_item.vue'
	import sidebar from '../../components/sidebar/sidebar.vue'

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

	/** 默认的排序项 */
	var DEFAULT_SORT_LIST = [{
		name: "返佣从高到低",
		sortIndex: 1
	}, {
		name: "收益从高到低",
		sortIndex: 2
	}, {
		name: "期限从短到长",
		sortIndex: 3
	}];

	
	const vm = Vue.component('product',{
		props: {
			categoryId: Number
		},
		components: {
		    //ProductItem,
			sidebar
		},
		data() { //属性
			
    		const isInitialRender = !this.$root._isMounted
			return {
                category:"",
				orderVisible:false,
				docVisible:false,
				start: 0,
				pageSize: 10,
				totalCount: isInitialRender ? this.$store.getters.activeProductList.body.totalCount || 0 : 0, //产品总数
				currentPage: 1, // 当前浏览的页数
				totalpage: 5, //总页数
				prodNameList: [], //加入对比列表
				filterList: isInitialRender ? this.$store.getters.categoryFilterList :[], // 筛选列表
				sortList: isInitialRender ? this.$store.getters.categorySortList :[], // 排序列表
				selectedFilters: [],
      			displayedPage: isInitialRender ? 1 : -1,
				//产品列表
				productList: isInitialRender ? this.$store.getters.activeProductList.body.list || 0 : [],
				categoryName: isInitialRender ? this.$store.getters.categoryName : "", //产品类别名称
				noselect: true,
				currentSortIndex: 0, // 当前排序的选项
				showFilter: true,
				queryDecode: "",
				useIdIsNull: true,
				// 收藏的产品列表
				showBookmark: false,
				bookmarkProductList: [],
				loading:false,
				defaultSortList: DEFAULT_SORT_LIST
			}
		},
		watch: {
		    // 搜索词变化，更新搜索结果
            '$route.params' (to, from) {
                this.init();
            }
        },
		/**
		 * 初始化工作
		 */
		beforeMount() {
            this.category=this.$route.name;
			if (this.$root._isMounted || !!this.$route.params.query) {
		      this.init();
		   }
		},
		/**
		 *  方法
		 */
		methods: {

			/**
			 * 分页方法开始调用
			 */
			handleCurrentChange(val) {
				this.currentPage = val;
				if(this.currentPage>0){
					this.start = (this.currentPage - 1) * this.pageSize;
					this.getProductList(this.start, this.sortId, this.queryDecode);
				}
				// 页面跳转，回头头部
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
			},
			/**
			 * 获取产品列表
			 * @param start 开始位置
			 * @param sortId 排序的id
			 * @param categoryId 产品分类id
			 * @param query 搜索词
			 */

			getProductList: function(start, sortId, query) {
				this.loading = true;
				// 拼接筛选项
				var filterId = "";
				if(this.selectedFilters.length > 0) {
					for(var i = 0; i < this.selectedFilters.length - 1; i++) {
						filterId += this.selectedFilters[i].dictId + ",";
					}
					filterId += this.selectedFilters[this.selectedFilters.length - 1].dictId;
				}
				
				this.$store.dispatch('FETCH_PRODUCT_LIST', {
					start: start,
					pageSize: this.pageSize,
					sortId: sortId,
					categoryId: this.categoryId,
					filterId: filterId,
					query: query
				}).then(() => {
					let res = this.$store.getters.activeProductList;
					if(res.head.ret == 0) {
						this.productList = res.body.list;
						this.totalCount = res.body.totalCount;
						if(this.totalCount != 0) {
							this.totalpage = Math.ceil(this.totalCount / this.pageSize);
							this.currentPage = start / this.pageSize + 1;
							this.noselect = true;
						} else {// 没有返回结果
							this.noselect = false;
						}
		       		}
		       		this.loading = false;
		       	}).catch(function(error){
		            console.log("失败了:"+error);
		        });
			},


            /**
             * 获取产品列表-搜索
             * @param start 开始位置
             * @param sortId 排序的id
             * @param categoryId 产品分类id
             * @param query 搜索词
             */
            getProductListQuery:function (start,sortId,query) {
                API.$getRichProduct(start,this.pageSize,this.sortId,"" ,"", query,res=> {
                    this.productList = res.body.list;
                    this.totalCount = res.body.totalCount;
                    if(this.totalCount != 0) {
                        this.totalpage = Math.ceil(this.totalCount / this.pageSize);
                        this.currentPage = start / this.pageSize + 1;
                        this.noselect = true;
                    } else {// 没有返回结果
                        this.noselect = false;
                    }
                });
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
                        this.docVisible=false;

                        this.$alert('该项目暂时还没有上传文档!', '提示', {
                          confirmButtonText: ' 确定 '
                        });
                    } else {
                        this.docVisible=true;
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
            },
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

			/**

			 * 初始化方法
			 */
			init: function() {
				if(!!this.$route.params.query) {
					this.queryDecode = this.$route.params.query;
				}


				if(API.getUserId()!= null) {
                    this.useIdIsNull = false;
				} else {
                    this.useIdIsNull = true;
				}

				// 初始化筛选列表
				this.filterList = this.getCategoryFilterList(this.categoryId);
				this.showFilter = true;
				this.sortList = this.getCategorySortList(this.categoryId);
				this.categoryName = this.getCategoryName(this.categoryId);
				if(!!this.categoryName) {
					document.title = this.categoryName + "_诚壹财富顾问";
				}
				this.getProductList(this.start, this.sortId, this.queryDecode);

			},

			/**
			 * 选中某一个排序项
			 * @param index sortIndex
			 */
			productSort: function(index) {

				this.currentSortIndex = index;
				this.sortId = index;
				this.getProductList(this.start, this.sortId, this.queryDecode);
			},

			/**
			 * 动态的获取已经选中的筛选项
			 */
			refreshSelectedFilterItems: function() {
				this.selectedFilters = [];
				this.filterList.forEach( filter => {
					// “全部” 这一项
					var allItem = {};
					// 是否 非“全部”选中
					var isOtherSelected = false;
					// 是否 “全部” 选中
					var isAllSelected = true;
					filter.child.forEach(childFilter => {
						if(childFilter.name == "全部") {
							allItem = childFilter;
							isAllSelected = allItem.sel;
						} else if(childFilter.name != "全部") {
							if(isAllSelected) {
								childFilter.sel = false;
							} else if(childFilter.sel == true) {
								isOtherSelected = true;
								this.selectedFilters.push(childFilter);
							}
						}
					});
					// 所有的都没有选中，则默认选中“全部”
					if(!isOtherSelected) {
						allItem.sel = true;
					}
				});

			},

			/**
			 * 删除一个已选中的筛选项
			 * @param filter 待删除的筛选项
			 */
			deleteSelectFilter: function(filter) {
				filter.sel = !filter.sel;
				this.selectedFilters.remove(filter);
				this.refreshSelectedFilterItems();
			},
			/**
			 * 切换一个item的选中与不选中
			 *
			 *
			 * @param parent 父节点
			 * @param item 待切换item
			 */
			toggleSelectItem: function(parent, item) {
				item.sel = !item.sel;
				if(item.name == "全部") {
					// 如果选中的是“全部”，清除其他的
					parent.child.forEach(function(childFilter) {
						if(childFilter.name == "全部") {
							childFilter.sel = true;
						} else {
							childFilter.sel = false;
						}
					});
				} else {
					// 如果选中的不是“全部” ，清除“全部”
					parent.child.forEach(function(childFilter) {
						if(childFilter.name == "全部") {
							childFilter.sel = false;
						}
					});
				}
				this.refreshSelectedFilterItems();
				this.getProductList(this.start, this.sortId, this.queryDecode);
			},

			/**
			 * 重置筛选项
			 */
			cleanFilterLists: function(cleanList) {
				if(!cleanList) {
					cleanList = this.filterList;
				}
				cleanList.forEach(function(filter) {
					filter.child.forEach(function(childFilter) {
						if(childFilter.name == "全部") {
							childFilter.sel = true;
						} else {
							childFilter.sel = false;
						}
					});
				});
				this.refreshSelectedFilterItems();
				this.getProductList(this.start, this.sortId, this.queryDecode);
			},

			/**
			 * 获取具体某一个产品分类的筛选列表
			 * @param categoryId 产品类别id
			 * @returns {*} 筛选列表
			 */
			getCategoryFilterList: function(categoryId) {
				var categoryList = API.fetchObj("categoryList");
				if(categoryList && categoryList.length != 0) {
					var list = categoryList;
					for(var i = 0, length = list.length; i < length; i++) {
						if(list[i].dictId == categoryId) {
							this.cleanFilterLists(list[i].filterList);
							return list[i].filterList;
						}
					}
				}
				return [];
			},
			/**
			 * 获取具体某一个产品分类的排序列表
			 * @param categoryId 产品类别id
			 * @returns {*} 排序列表
			 */
			getCategorySortList: function(categoryId) {
				var categoryList = API.fetchObj("categoryList");
				if(categoryList.length != 0) {
					var list = categoryList;
					for(var i = 0, length = list.length; i < length; i++) {
						if(list[i].dictId == categoryId) {
							return list[i].sortList;
						}
					}
				}
				return [];
			},
			/**
			 * 获取具体某一个产品分类的名称
			 * @param categoryId 产品类别id
			 * @returns {*} 分类名称
			 */
			getCategoryName: function(categoryId) {
				var categoryList = API.fetchObj("categoryList");
				if(categoryList.length != 0) {
					var list = categoryList;
					for(var i = 0, length = list.length; i < length; i++) {
						if(list[i].dictId == categoryId) {
							return list[i].name;
						}
					}
				}
				return "";
			},
			checkExist: function(prodId) {
				for(var i = 0; i < this.prodNameList.length; i++) {
					var item = this.prodNameList[i];
					if(item.prodId == prodId) {
						return true;
					}
				}
				return false;
			},
			/**
			 * 添加对比产品
			 */
			addCompare: function(prodName, prodId) {
				this.prodNameList = API.fetchObj("compareList");
				if(this.prodNameList.length >= 4) {
                    this.$alert('仅能同时对比4款产品！', '提示', {
                      confirmButtonText: ' 确定 '
                    });
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
					this.flyTo("#productImg" + prodId, "#aside_compare");

				} else {

                    this.$alert('该产品已存在，不能重复添加！', '提示', {
                      confirmButtonText: ' 确定 '
                    });
				}
			},

			/**
			 * 显示详情页
			 * @param id 产品id
			 */
			goDetail: function(id) {
				window.open('/detail/' +id+'.html');
			},
			openUrl: function(url) {
				window.open(url);
			},



            /**
             * 收藏飞入动画
             * @param from 飞入的id
             * @param target 目标飞入的id
             * @param callback 动画完成回调
             */
            flyTo:function(from, target , callback) {
                var flyElm = $(from).clone().css('opacity', '0.7');
                flyElm.css({
                    'z-index': 99999,
                    'display': 'block',
                    'position': 'absolute',
                    'top': $(from).offset().top + 'px',
                    'left': $(from).offset().left + 'px',
                    'width': $(from).width() + 'px',
                    'height': $(from).height() + 'px'
                });
                $('body').append(flyElm);
                flyElm.animate({
                    top: $(target).offset().top,
                    left: $(target).offset().left,
                    width: 50,
                    height: 50
                }, 'slow','swing',function(){
                    flyElm.hide();
                });
            }
		}
	});
	
	export default vm;
</script>
<style scoped>
	@import './product.css';
</style>