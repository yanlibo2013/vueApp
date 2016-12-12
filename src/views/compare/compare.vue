<template>
    <!--下拉列表-->
    <div id="compareModel"class="compare">
        <div class="container " >
            <table class="table table-bordered table-striped table-hover" style="text-align: center;">
                <tr>
                    <td class="col-lg-1"></td>

                    <td class="table_bg col-lg-2" v-for="index in 4">
                        	<el-dropdown trigger="click" style="width:100%;">
							  <span class="el-dropdown-link listbox" >
							   	 选择产品<i class="el-icon-caret-bottom el-icon--right"></i>
							  </span>
							  <el-dropdown-menu slot="dropdown" class="dropdownclass">
							  	<el-input
							  		@keyup="show(index)"
							  		v-model="searchQuery"
								    placeholder="搜索相关产品">
								</el-input>
							    <el-dropdown-item style="height:25px; "
							    	v-for="prod in productNameList" 
							    	@click.native="selectProduct(index, prod.productId)"
							    	v-show="isShowLabel(prod.sug)" 
							    	v-text="prod.sug">
							    </el-dropdown-item>
							  </el-dropdown-menu>
							</el-dropdown>
                    </td>
                </tr>


                <tr v-for="(el,index) in labelList" class="dataTr">
                    <td style="border-top:1px solid #ddd">{{el.key}}</td>
                    <td v-for="el in 4" class="table_bg">
                        <span v-html="formatterValue(index, el)"></span>
                    </td>
                </tr>

            </table>
        </div>




    </div>
</template>

<script>
    import * as API from '../../store/api.js'
    export default {
        name: 'Compare',
        data(){
            return {
                productNameList:[],
                searchQuery:'',
                labelList:[],
                // avalon bug 不能用列表，别删
                compare1:{
                },
                compare2:{
                },
                compare3:{
                },
                compare4:{
                }
            }
        },
        /**
         * 初始化工作
         */
        mounted() {
        	API.$getCompareProductList( res=> {
                this.productNameList = res.body.list;
        	});
           
//          this.compareList = API.fetchObj("compareList");
            
            var p1 = this.$route.params.p1;
            var p2 = this.$route.params.p2;
            var p3 = this.$route.params.p3;
            var p4 = this.$route.params.p4;
            
            API.$getCompareProductData(p1, data=> {
                this.compare1 = data.body.list;
	            this.labelList = data.body.list;
            });
            API.$getCompareProductData(p2, data=> {
                this.compare2 = data.body.list;
            });
            API.$getCompareProductData(p3, data=> {
                this.compare3 = data.body.list;
            });
            API.$getCompareProductData(p4, data=> {
                this.compare4 = data.body.list;
            });

	        if (p1 == 0 && p2 == 0 && p2 == 0 && p2 == 0) {
	            // 没有对比项，默认拿一个，作为key
	            API.$getCompareProductData(1, data=> {
	                this.labelList = data.body.list;
	            });
            }

        },
        methods:{
			/**
			 * 是否显示该标签
			 * @param {Object} productName 产品名
			 */
            isShowLabel: function(productName) {
            	return(productName.indexOf(this.searchQuery) >= 0);
            },
            
            /**
             * 选择一款产品进行对比
             * @param productId 产品id
             */
            selectProduct: function (selectIndex, productId) {
                console.log("selectProduct = " + productId);
                API.$getCompareProductData(productId, res => {
                    var compareProduct = res.body.list;
                    switch (selectIndex) {
                        case 1:
                            this.compare1 = compareProduct;
                            this.$route.params.p1 = productId;
                            break;
                        case 2:
                            this.compare2 = compareProduct;
                            this.$route.params.p2 = productId;
                            break;
                        case 3:
                            this.compare3 = compareProduct;
                            this.$route.params.p3 = productId;
                            break;
                        case 4:
                            this.compare4 = compareProduct;
                            this.$route.params.p4 = productId;
                            break;
                        default:
                            this.compare1 = compareProduct;
                            this.$route.params.p1 = productId;
                            break;
                    }
                });
            },

            formatterValue:function(index, compareIndex) {
                var compareObj = this.compare1;
            	switch(compareIndex) {
            		case 1:
            			compareObj = this.compare1;
            		break;
            		case 2:
            			compareObj = this.compare2;
            		break;
            		case 3:
            			compareObj = this.compare3;
            		break;
            		case 4:
            			compareObj = this.compare4;
            		break;
            	}
            	
                if(!compareObj ||!compareObj[index]) {
                	return "-";
                }
                
                var value = compareObj[index].value;
                if(!value) {
                    return "-";
                }
                if (value.indexOf("≤ X ≤") >= 0 && value.indexOf(";") >= 0) {
                    value = value.replace(/;/g, ";<br>");
                }
                return value;
            }
        }
    }
</script>
<style>
    @import './compare.css';
</style>