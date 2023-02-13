<template>
  <v-container>
    <p class="text-h6 text-white">Cart</p>
    <p class="text-subtitle-1 text-white">
      Items Added in your cart will show up here
    </p>
    <p></p>
    <div v-if="cartItems.length > 0" class="mb-2">
      <p class="text-subtitle-1 text-white">
        Cart items : {{ cartItems.length }} &nbsp; Cart Total : {{ cartTotal }}
      </p>
      <v-row>
        <v-col class="cartItemColumn" cols="3" v-for="(item, i) in cartItems"  :key="i">
          <v-card height="235px" width="220px"  class="pa-2 rounded">
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
            <v-card-subtitle class="text-subtitle-2 text-center text-wrap">
              <p class="text-subtitle-2 text-center pt-1">
                {{ item.name }}
              </p>
              <p class="text-subtitle-2 text-center">
                ${{ item.price }}
              </p>
              <p class="text-subtitle-2 text-center">
                Quantity: {{ item.quantity }}
              </p>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
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
import { computed, onMounted, ref } from "@vue/runtime-core";
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
    onMounted(() =>{
      console.log('cartTotal', cartTotal);
    })
    return {
      cartItemsCount: computed(() => store.getters.cartItemsCount),
      cartItems: computed(() => store.getters.cartItems),
      cartTotal,
      removeFromCart: (game) => store.dispatch("removeFromCart", game),
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