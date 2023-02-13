<template>
  <div class="accessories rounded">
    <div class="accessoriesTitle text-white">
        <v-icon>mdi-headphones</v-icon>
        <h1>Accessories</h1>
    </div>
    <v-row>
      <v-col v-for="accessory in accessories" :key="accessory.id" cols="4" md="3">
        <v-card class="mx-auto pa-4" max-width="344">
          <v-img
            :src="accessory.image"
            height="200px"
          ></v-img>
          <v-card-title>
            <div>
              <h6 class="headline mb-0">{{accessory.name}}</h6>
              <div>${{accessory.price}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary" text @click="addToCart(accessory)">Add to Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
     v-model="addSnackbar"
     timeout="2000"
    >
      Added to cart!
      <v-btn
        variant="text"
        class="float-right"
        router
        to="/cart">
        Go to Cart
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from "vuex";
import { accessoriesData } from "../data/AccessoriesData";
import { computed } from '@vue/runtime-core';
export default {
  name: "Accessories",
  setup() {
    const store = useStore();
    const addSnackbar = ref(false);
    const accessories = ref(accessoriesData);
    const addToCart = (accessory) => {
      store.dispatch("addToCart", accessory);
      addSnackbar.value = true;
    };
    return {
      cartItemsCount: computed(() => store.getters.cartItemsCount),
      cartItems: computed(() => store.getters.cartItems),
      accessories,
      addSnackbar,
      addToCart,
      addToCart,
    };
  },
};
</script>

<style scoped>
.accessories{
  display: flex;
  flex-direction: column;
  align-items: center;

}
.accessoriesTitle{
  display: flex;
  align-items: center;

}
</style>