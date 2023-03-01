export const CartStore = {
  state: {
    cartItems: [],
    cartItemsCount: 0,
    cartTotal: 0,
  },
  mutations: {
    addToCart(state,payload){
      if(state.cartItems.find(item => item.id === payload.id)) 
      {
        state.cartItems.map(item => {
          if(item.id === payload.id){
            item.quantity++;
          }
        })
      }
      else{
        payload.quantity=1;
        state.cartItems.push(payload);
        state.cartItemsCount++;
      }
    },
    removeFromCart(state,payload){
      state.cartItems=state.cartItems.filter(item => item.id !== payload.id);
      state.cartItemsCount= state.cartItems.length;
    },
    emptyCart(state){
      state.cartItems = [];
      state.cartItemsCount = 0;
      state.cartTotal = 0;
    },
  },
  actions:{
    addToCart(context,payload){
     context.commit('addToCart',payload)
    },
    removeFromCart(context,payload){

      context.commit('removeFromCart',payload)
  
    },
    getCartItems(context){
      console.log('getCartItems',context.state.cartItems)
      return context.state.cartItems
    },
    emptyCart(context){
      context.commit('emptyCart')
    }
  },
  getters:{
    cartItems(state){
      return state.cartItems
    },
    cartItemsCount(state){
      return state.cartItemsCount
    },
    cartTotal(state){
      return state.cartTotal = state.cartItems.reduce((total,item) => total + item.price * item.quantity,0)
    }
  }

 
};