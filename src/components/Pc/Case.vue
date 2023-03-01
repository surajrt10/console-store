<template>
  <div class="d-flex flex-grow-1 flex-wrap">
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        class="productCard { 'on-hover': isHovering } ma-2 pa-4"
        width="200"
        v-for="caseItem in caseData"
        :key="caseItem.id"
        v-bind="props"
        @click="viewDetails(caseItem)"
        :elevation="isHovering ? 16 : 2"
      >
        <v-img :src="caseItem.image" height="200px"></v-img>
        <v-card-title>
          <div>
            <h6 class="headline mb-0">{{ caseItem.name }}</h6>
            <div>${{ caseItem.price }}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn
            v-if="isUser"
            color="primary"
            text
            @click.stop="addToCart(caseItem)"
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
                  <v-list-item-title> Model </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.model }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Form Factor </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.formFactor }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Drive Bays </v-list-item-title>
                  <v-list-item-subtitle>
                    External: {{highlightProduct.specs.driveBaysExternal}}
                    Internal: {{highlightProduct.specs.driveBaysInternal}}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Front ports </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.frontPorts }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Ram Slots </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.ramSlots }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Price </v-list-item-title>
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
     <v-snackbar v-model="addSnackbar" timeout="2000">
          Added to cart!
          <v-btn variant="text" class="float-right" router to="/cart">
            Go to Cart
          </v-btn>
        </v-snackbar>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { caseData } from "../../data/pc/caseData.js";
import { computed, onMounted } from '@vue/runtime-core';
export default {
  name: "Case",
  setup() {
    const store = useStore();
    const addSnackbar = ref(false);
    const highlightProduct = ref({});
    const show = ref(false);
    const addToCart = (caseItem) => {
      store.dispatch("addToCart", caseItem);
      addSnackbar.value = true;
    };
    onMounted(() => {
      // console.log("processor", processors.value);
      console.log("caseData", caseData);
    });
    const viewDetails = (processor) => {
      highlightProduct.value = processor;
      show.value = true;
    };
    const isUser = ref(computed(() => store.getters.isUser).value);
    return {
      caseData,
      cartItemsCount: computed(() => store.getters.cartItemsCount),
      cartItems: computed(() => store.getters.cartItems),
      addSnackbar,
      addToCart,
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