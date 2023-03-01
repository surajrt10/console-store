<template>
  <v-container class="rounded pa-2">
    <p class="text-h6 text-white">Cart</p>
    <p class="text-subtitle-1 text-white ">
      Items Added in your cart will show up here
    </p>
    <p></p>
    <div v-if="cartItems.length > 0" class="mb-2">
      <p class="text-subtitle-1 text-white">
        Cart items : {{ cartItems.length }} &nbsp; Cart Total : {{ cartTotal }}
      </p>
      <v-btn variant="tonal" class="text-white" @click="emptyCart">Empty Cart</v-btn>
          <div class="d-flex flex-wrap">
          <v-card height="" v-for="(item, i) in cartItems"  :key="i" width="220px"  class="pa-2 ma-2 rounded">
          <v-chip
            color="red"
            size="small"
            class="float-right pa-1 "
            @click="removeFromCart(item)"
          >
            <v-icon>mdi-close</v-icon>
            <v-tooltip activator="parent" location="top">
              Remove from cart
            </v-tooltip>
          </v-chip>
            <v-card-title class="cartItems">
              <v-img :src="item.image" width="130px" height="140px"></v-img>
            </v-card-title>
            <v-card-subtitle class="text-subtitle-2 pb-2 text-center text-wrap">
              <p class="text-subtitle-2 text-center pt-1">
                {{ item.name }}
              </p>
              <p class="text-subtitle-2 text-center">
                ${{ item.price }}
              </p>
              <p class="text-h6 text-center">
                Quantity:
              </p>
              <p class="text-h6 text-center">
               <v-btn icon="mdi-minus" size="small" @click="item.quantity--"></v-btn>
               {{ item.quantity }}
              <v-btn icon="mdi-plus" size="small" @click="item.quantity++"></v-btn>
              </p>
            </v-card-subtitle>
          </v-card>
          </div>
    </div>
    <p v-if="cartItems.length === 0" class="text-h6 text-white">
          No items in cart
        </p>
    <v-card v-if="cartItemsCount > 0" class="cartSummary">
      <v-card-title class="text-subtitle-1 text-center opacity-1">
          <p class="text-h6 text-left">
            Cart Summary
          </p>
          <p class="text-subtitle-1 text-left">
            Items Added in Cart : {{ cartItemsCount }}
          </p>
          <p class="text-subtitle-1 text-left">
            Cart Total : $ {{ cartTotal }}
          </p>
          <v-btn color="blue-lighten-1" class="float-right" router to="/checkout">
            Checkout
          </v-btn>
      </v-card-title>
    </v-card>
  </v-container>
</template>
<script>
import { computed, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  name: "Cart",
  setup() {
    const store = useStore();
    const cartTotal = computed(() => store.getters.cartTotal.toFixed(2) )
    // onMounted(()=>{
    //   console.log('cartItems', store.state.cartItems)
    //   console.log('cartItems', cartItems)
    // });
    const cartItems = computed(() => store.getters.cartItems);
    const removeFromCart = (game) => store.dispatch("removeFromCart", game);
    const emptyCart = () => store.dispatch("emptyCart");
    watch(cartItems, (newVal)=>{
        cartItems.value.map((item) => {
          if (item.quantity < 1) {
            removeFromCart(item);
          }
        });
    }, {deep: true})
    return {
      cartItemsCount: computed(() => store.getters.cartItemsCount),
      cartItems: computed(() => store.getters.cartItems),
      cartTotal,
      removeFromCart: (game) => store.dispatch("removeFromCart", game),
      emptyCart,
    };
  },
};
</script>

<style scoped>
.cartItems {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cartSummary{
  width: 300px;
}
</style>