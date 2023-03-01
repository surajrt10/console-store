<template>
  <div class="consoles">
    <div>
      <h2 class="subheading text-center text-white">
        Buy Consoles at a Price You Have Never Seen Before!
      </h2>
    </div>
    <div class="products">
      <!-- <div class="product" v-for="console in consoleData" :key="console.index">
      <img class="productImage" color="white" :src="console.image" alt="console image">
      <h3>{{console.name}}</h3>
      <p>{{console.price}}</p>
    </div> -->
      <v-card
        class="product"
        width="300"
        v-for="item in consoleData"
        :key="item.index"
      >
        <v-card-title>
          <img class="productImage" :src="item.image" alt="console image" />
          <h3 class="subheading text-center">{{ item.name }}</h3>
        </v-card-title>

        <v-card-subtitle>
          <p class="text-h6">
            ${{ item.price }}
          </p>
        </v-card-subtitle>

        <v-card-text>
          Specs: <br />
          <ul>
            <li>CPU : {{ item.specs.cpu }}</li>
            <li>Memory : {{ item.specs.memory }}</li>
            <li>Storage size*: {{ item.specs.storage }}</li>
            <li>Weight: {{ item.specs.weight }}</li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="isUser" variant="elevated" color="success" @click="addToCart(item)" text
            >Add to Cart</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
    <v-snackbar
     v-model="addSnackbar"
     timeout="2000"
     absolute
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
import { ref } from "@vue/reactivity";
import { consoleData } from "../data/consoleData.js";
import { useStore } from "vuex";
import { computed, onMounted } from '@vue/runtime-core';
export default {
  name: "Consoles",
  setup() {
    const show = ref(false);
    const addSnackbar = ref(false);
    const store = useStore();
    const addToCart = (item) => {
      console.log("consoleData", item);
      store.dispatch("addToCart", item);
      addSnackbar.value = true;
    };
    const isUser = ref(computed(()=>store.getters.isUser).value);
    // onMounted(() => {
    //     // isUser.value = computed(()=>store.getters.isUser).value;
    //     console.log('isUser', isUser.value);  
    // });
    return {
      consoleData,
      // addToCart: (console) => store.dispatch("addToCart", console),
      addToCart,
      addSnackbar,
      store,
      isUser
    };
  },
};
</script>

<style scoped>
.consoles {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.products {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}
.product {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  background: white;
  width: 300px;
}
.v-card-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.productImage {
  height: 110px;
  filter: grayscale(0%);
}
</style>