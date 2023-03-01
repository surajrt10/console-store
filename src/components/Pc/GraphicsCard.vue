<template>
  <div class="d-flex flex-grow-1 flex-wrap">
    <v-hover v-slot="{ isHovering, props }">
      <v-card
       class="productCard { 'on-hover': isHovering } ma-2 pa-4"
        width="200"
        v-for="graphicsCard in graphicsData"
        :key="graphicsCard.id"
        v-bind="props"
        @click="viewDetails(graphicsCard)"
        :elevation="isHovering ? 16 : 2"
        >
        <v-img :src="graphicsCard.image" height="200px"></v-img>
        <v-card-title>
            <div>
              <h6 class="headline mb-0"> {{ graphicsCard.name }} </h6>
              <div>${{ graphicsCard.price }}</div>
            </div>
        </v-card-title>
        <v-card-actions>
            <v-btn
              v-if="isUser"
              color="primary"
              text
              @click.stop="addToCart(graphicsCard)"
            >
            Add to Cart
            </v-btn>
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
                  <v-list-item-title> Memory Type </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.memoryType }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Core Clock </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.coreClock }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Boost Clock </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.boostClock }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> TDP </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.tdp }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Bus </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.bus }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Dimensions </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.length }} X
                    {{ highlightProduct.specs.width }} X
                    {{ highlightProduct.specs.height }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Display Connectors </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.displayConnectorType }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> VRAM </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.vram }}
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
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { graphicsData } from "../../data/pc/graphicsData.js";
export default {
  name: "GraphicsCard",
  setup() {
    const store = useStore();
    const addSnackbar = ref(false);
    const highlightProduct = ref({});
    const show = ref(false);
    const addToCart = (graphics) => {
      store.dispatch("addToCart", graphics);
      addSnackbar.value = true;
    };
    onMounted(() => {
      // console.log("graphics", graphics.value);
      console.log("graphics", graphicsData);
    });
    const viewDetails = (graphics) => {
      highlightProduct.value = graphics;
      show.value = true;
    };
    const isUser = ref(computed(() => store.getters.isUser).value);
    return {
      graphicsData,
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
};
</script>

<style scoped>
.productCard:hover{
  transition: transform 0.3s;
  transform: scale(1.04);
}
</style>