<template>
  <div class="d-flex flex-grow-1 flex-wrap">
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        class="productCard { 'on-hover': isHovering } ma-2 pa-4"
        width="200"
        v-for="ram in ram"
        :key="ram.id"
        v-bind="props"
        @click="showProduct(ram)"
        :elevation="isHovering ? 16 : 2"
      >
        <v-img :src="ram.image" height="200px"></v-img>
        <v-card-title>
          <div>
            <h6 class="headline mb-0">{{ ram.name }}</h6>
            <h3 class="text-subtitle-1">{{ram.specs.memory}}GB</h3>
            <p>${{ ram.price }}</p>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn v-if="isUser" color="primary" text @click.stop="addToCart(ram)"
            >Add to Cart</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-hover>
    <v-dialog v-model="show" max-width="600px">
      <v-card>
        <v-card-title class="headline">
          {{ highlightProduct.name }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col class="align-self-center" cols="6">
              <v-img :src="highlightProduct.image" height="200px"></v-img>
            </v-col>
            <v-col cols="6">
              <v-list>
                <v-list-item>
                  <v-list-item-title> Manufacturer </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.manufacturer }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Memory </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.memory }}GB
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Capacity </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.memoryType }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Speed </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.speed }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Latency </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.latency }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Voltage </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.voltage }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Bus </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.bus }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card-text>
       <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="show = false">Close</v-btn>
          <v-btn
            v-if="isUser"
            color="blue darken-1"
            text
            @click.stop="addToCart(highlightProduct)"
            >Add to Cart</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
     <v-snackbar v-model="addSnackbar" timeout="2000">
          Added to cart!
          <v-btn variant="text" class="float-right" router to="/cart">
            Go to Cart
          </v-btn>
        </v-snackbar>
  </div>
</template>

<script>
import { ramData } from "../../data/pc/ramData.js";
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { computed } from '@vue/runtime-core';
export default {
  name: "Ram",
  setup() {
    const ram = ramData;
    const store = useStore();
    const addSnackbar = ref(false);
    const addToCart = (product) => {
      store.commit("addToCart", product);
      addSnackbar.value = true;
    };
    const highlightProduct = ref(null);
    const show = ref(false);
    const showProduct = (product) => {
      highlightProduct.value = product;
      show.value = true;
    };
    const isUser = ref(computed(() => store.getters.isUser).value);
    return {
      ram,
      addToCart,
      showProduct,
      show,
      isUser,
      highlightProduct,
      addSnackbar,
    };
  },
};
</script>

<style scoped>
.productCard:hover{
  transition: transform 0.3s;
  transform: scale(1.04);
}
</style>