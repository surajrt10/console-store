<template>
  <div class="d-flex flex-grow-1 flex-wrap">
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        class="productCard { 'on-hover': isHovering } ma-2 pa-4"
        width="200"
        v-for="processor in ProcessorData"
        :key="processor.id"
        v-bind="props"
        @click="viewDetails(processor)"
        :elevation="isHovering ? 16 : 2"
      >
        <v-img
          :src="processor.image"
          height="200px"
        ></v-img>
        <v-card-title>
          <div>
            <h6 class="headline mb-0">{{ processor.name }}</h6>
            <div>${{ processor.price }}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn
            v-if="isUser"
            color="primary"
            text
            @click.stop="addToCart(processor)"
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
                  <v-list-item-title> Socket </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.socket }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Core </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.coreCount }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Thread </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.threadCount }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Base Clock </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.baseClock }}
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
                  <v-list-item-title> Socket </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.socket }}
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
import { ProcessorData } from "../../data/pc/ProcessorData";
import { computed, onMounted } from "@vue/runtime-core";
export default {
  name: "Processor",
  setup() {
    const store = useStore();
    const addSnackbar = ref(false);
    const highlightProduct = ref({});
    const show = ref(false);
    const addToCart = (processor) => {
      store.dispatch("addToCart", processor);
      addSnackbar.value = true;
    };
    onMounted(() => {
      // console.log("processor", processors.value);
      console.log("processor", ProcessorData);
    });
    const viewDetails = (processor) => {
      highlightProduct.value = processor;
      show.value = true;
    };
    const isUser = ref(computed(() => store.getters.isUser).value);
    return {
      ProcessorData,
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
.productCard:hover {
  transition: transform 0.3s;
  transform: scale(1.04);
}
</style>