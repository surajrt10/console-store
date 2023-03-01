<template>
  <div class="d-flex flex-grow-1 flex-wrap">
     <v-hover v-slot="{ isHovering, props }">
      <v-card
        class="productCard { 'on-hover': isHovering } ma-2 pa-4"
        width="200"
        v-for="coolingItem in coolingData"
        :key="coolingItem.id"
        v-bind="props"
        @click="viewDetails(coolingItem)"
        :elevation="isHovering ? 16 : 2"
      >
        <v-img :src="coolingItem.image" height="200px"></v-img>
        <v-card-title>
          <div>
            <h6 class="headline mb-0">{{ coolingItem.name }}</h6>
            <div>${{ coolingItem.price }}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn
            v-if="isUser"
            color="primary"
            text
            @click.stop="addToCart(coolingItem)"
            >Add to Cart</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-hover>
    <v-dialog v-model="show" max-width="600px">
      <v-card>
        <v-card-title>
          {{ highlightProduct.name }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col class="align-self-center" cols="6">
              <v-img :src="highlightProduct.image"></v-img>
            </v-col>
            <v-col cols="6">
              <v-list>
                <v-list-item>
                  <v-list-item-title>
                    Manufacturer
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.manufacturer }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    Model
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.model }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    Radiator size
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.radiatorSize }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    Radiator Location
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.radiatorLocation }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    Radiator Material
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.radiatorMaterial }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    Radiator Fans
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.radiatorFanCount }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    Radiator Fan Size
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.radiatorFanSize }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    Price
                  </v-list-item-title>
                  <v-list-item-subtitle>
                   ${{ highlightProduct.price }}
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
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import {coolingData} from '../../data/pc/coolingData.js'
import { computed, onMounted } from '@vue/runtime-core';
export default {
  name: "Cooling",
  setup() {
    const store = useStore();
    const addSnackbar = ref(false);
    const highlightProduct = ref({});
    const show = ref(false);
    const addToCart = (motherboard) => {
      store.dispatch("addToCart", motherboard);
      addSnackbar.value = true;
    };
    onMounted(() => {
      // console.log("motherboard", motherboards.value);
      console.log("coolingData", coolingData);
    });
    const viewDetails = (motherboard) => {
      highlightProduct.value = motherboard;
      show.value = true;
    };
    const isUser = ref(computed(() => store.getters.isUser).value);
    return {
      coolingData,
      cartItemsCount: computed(() => store.getters.cartItemsCount),
      cartItems: computed(() => store.getters.cartItems),
      addSnackbar,
      addToCart,
      isUser,
      highlightProduct,
      viewDetails,
      show,
    };
  },
}
</script>

<style scoped>
.productCard:hover{
  transition: transform 0.3s;
  transform: scale(1.04);
}

</style>