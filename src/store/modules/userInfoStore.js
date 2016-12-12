/**
 * @author zst@chengyiwm.com
 * @since 2016-11-22 10:33:03
 */

const state = {
	userId:'',
	skey:'',
	userName:'',
}


const mutations = {
	/**
	 * 设置当前激活的产品id
	 */
	SET_USER_ID: (state, {userId}) => {
		state.userId = userId
	},
		/**
	 * 设置当前激活的产品key
	 */
	SET_SKEY: (state, {skey}) => {
		state.skey = skey
	},
		/**
	 * 设置当前激活的产品用户名
	 */
	SET_USER_NAME: (state, {userName}) => {
		state.userName = userName
	},
}

const getters = {
	/**
	 * 获取当前缓存的userId
	 */
	getUserId(state, getters) {
		const {userId, skey, userName} = state;
		return userId;
	},
	/**
	 * 获取当前缓存的userSkey
	 */
	getSkey(state, getters) {
		const {userId, skey, userName} = state;
		return skey;
	},
	/**
	 * 获取当前缓存的userName
	 */
	getUserName(state, getters) {
		const {userId, skey, userName} = state;
		return userName;
	}

};

export default {
  state,
  mutations,
  getters
}
