<template>
  <div class="d-flex flex-grow flex-wrap">
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        class="productCard { 'on-hover': isHovering } ma-2 pa-4"
        width="200"
        v-for="psu in psuData"
        :key="psu.id"
        v-bind="props"
        @click="viewDetails(psu)"
        :elevation="isHovering ? 16 : 2"
      >
        <v-img :src="psu.image" height="200px"></v-img>
        <v-card-title>
          <div>
            <h6 class="headline mb-0">{{ psu.name }}</h6>
            <div>${{ psu.price }}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn v-if="isUser" color="primary" text @click.stop="addToCart(psu)"
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
              <v-img :src="`${highlightProduct.image}`" height="200px"></v-img>
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
                  <v-list-item-title> Wattage </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.wattage }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Efficiency </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.efficiency }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Form Factor </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.formFactor }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Modularity </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.modular }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Fan Size </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.fanSize }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Fan Location </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.fanLocation }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Fan RPM </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.fanRPM }}
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
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { psuData } from "../../data/pc/psuData";
import { computed } from "@vue/runtime-core";
export default {
  name: "PowerSupply",
  setup() {
    const store = useStore();
    const addSnackbar = ref(false);
    const highlightProduct = ref({});
    const show = ref(false);
    const addToCart = (storage) => {
      store.dispatch("addToCart", storage);
      addSnackbar.value = true;
    };
    const viewDetails = (storage) => {
      highlightProduct.value = storage;
      show.value = true;
    };
    const isUser = ref(computed(() => store.getters.isUser).value);
    return {
      psuData,
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
};
</script>

<style scoped>
.productCard:hover {
  transition: transform 0.3s;
  transform: scale(1.04);
}
</style>