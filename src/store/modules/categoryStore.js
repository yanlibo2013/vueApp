/**
 * @author zst@chengyiwm.com
 * @since 2016-11-22 10:33:03
 */
import Vue from 'vue'
import * as CACHE_API from '../cache_api'

/**
 * 重置筛选项
 */
function cleanFilterLists(cleanList) {
	cleanList.forEach(function(filter) {
		filter.child.forEach(function(childFilter) {
			if(childFilter.name == "全部") {
				childFilter.sel = true;
			} else {
				childFilter.sel = false;
			}
		});
	});
}


const state = {
	activeCategoryId:1,//设置当前激活的产品分类id
	categoryList: {} // 分类列表
}


const actions = {

	/**
	 * 获取产品分类列表
	 * 
	 * 有缓存直接输出，
	 * 没缓存调用api请求，并加入缓存
	 */
	FETCH_CATEGORY_LIST: ({commit,dispatch,state}) => {
		const {categoryList} = state
		if(categoryList.length > 0) {
			return Promise.resolve(categoryList);
		} else {
			return CACHE_API.$getAppInfo()
				.then(function(res) {
					let categoryList = res.body.categoryList;
					commit('SET_CATEGORY_LIST', {
						categoryList: categoryList
					})
				})
				.catch(error => console.log(error));
		}

	},
	
	/**
	 * 缓存产品分类列表
	 */
	SET_CATEGORY_ID: (state, {categoryId}) => {
		state.activeCategoryId = categoryId;
	}
}

const mutations = {
	/**
	 * 缓存产品分类列表
	 */
	SET_CATEGORY_LIST: (state, {categoryList}) => {
		state.categoryList = categoryList;
	}
}

const getters = {
	// 获取当前缓存的产品列表
	categoryList(state, getters) {
		const {activeCategoryId, categoryList} = state;
		return categoryList;
	},
	
	/**
	 *  获取具体某一个产品分类的排序列表
	 */
	categorySortList(state, getters) {
		const {activeCategoryId, categoryList} = state;
		
		if(categoryList.length != 0) {
			var list = categoryList;
			for(var i = 0, length = list.length; i < length; i++) {
				if(list[i].dictId == activeCategoryId) {
					return list[i].sortList;
				}
			}
		}
		return [];
	},
	/**
	 * 获取具体某一个产品分类的筛选列表
	 */
	categoryFilterList(state, getters) {
		const {activeCategoryId, categoryList} = state;
		if(categoryList && categoryList.length != 0) {
			var list = categoryList;
			for(var i = 0, length = list.length; i < length; i++) {
				if(list[i].dictId == activeCategoryId) {
					cleanFilterLists(list[i].filterList);
					return list[i].filterList;
				}
			}
		}
		return [];
	},
	
	/**
	 * 获取具体某一个产品分类的名称
	 */
	categoryName(state, getters) {
		const {activeCategoryId, categoryList} = state;
		if(categoryList.length != 0) {
			var list = categoryList;
			for(var i = 0, length = list.length; i < length; i++) {
				if(list[i].dictId == activeCategoryId) {
					return list[i].name;
				}
			}
		}
		return [];
	}
}


export default {
  state,
  actions,
  mutations,
  getters
}
