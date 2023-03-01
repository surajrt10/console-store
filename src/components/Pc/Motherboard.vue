<template>
  <div class="d-flex flex-grow-1 flex-wrap">
       <v-hover v-slot="{ isHovering, props }">
      <v-card
        class=" productCard { 'on-hover': isHovering } ma-2 pa-4"
        width="200"
        v-for="motherboard in motherboardData"
        :key="motherboard.id"
        v-bind="props"
        @click="viewDetails(motherboard)"
        :elevation="isHovering ? 16 : 2"
      >
        <v-img :src="motherboard.image" height="200px"></v-img>
        <v-card-title>
          <div>
            <h6 class="headline mb-0">{{ motherboard.name }}</h6>
            <div>${{ motherboard.price }}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn
            v-if="isUser"
            color="primary"
            text
            @click.stop="addToCart(motherboard)"
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
                  <v-list-item-title> Series </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.series }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Model </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.model }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Chipset </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.chipset }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Form Factor </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.formFactor }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Memory Slots </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.memorySlots }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Memory Type </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.memoryType }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Memory Speed </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.memorySpeed }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Maximum Ram Capacity </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.memoryMax }}
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
import { motherboardData } from '../../data/pc/motherboardData.js'
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed, onMounted } from "@vue/runtime-core";
export default {
  name: "Motherboard",
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
      console.log("motherboard", motherboardData);
    });
    const viewDetails = (motherboard) => {
      highlightProduct.value = motherboard;
      show.value = true;
    };
    const isUser = ref(computed(() => store.getters.isUser).value);
    return {
      motherboardData,
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
.productCard:hover{
  transition: transform 0.3s;
  transform: scale(1.04);
}

</style>