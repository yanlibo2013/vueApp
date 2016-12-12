import ProductList from './product.vue'


module.exports = function  (categoryId) {
  return {
    name: `product-${categoryId}-stories-view`,
    
    preFetch (store) {
    	store.dispatch('SET_CATEGORY_ID', {categoryId});
    	store.dispatch('FETCH_CATEGORY_LIST');
      return store.dispatch('FETCH_PRODUCT_LIST', { 
      		start: 0, 
      		pageSize: 10, 
      		sortId: 0, 
      		categoryId: categoryId, 
      		filterId: 0, 
      		query: ''
      	})
    },
    
    render (h) {
      return h(ProductList, { props: { categoryId }})
    }
  }
}
