<template>
  <div class="d-flex flex-grow-1 flex-wrap">
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        class="productCard { 'on-hover': isHovering } ma-2 pa-4"
        width="200"
        v-for="storage in storageData"
        :key="storage.id"
        v-bind="props"
        @click="viewDetails(storage)"
        :elevation="isHovering ? 16 : 2"
      >
        <v-img :src="storage.image" height="200px"></v-img>
        <v-card-title>
          <div>
            <h6 class="headline mb-0">{{ storage.name }}</h6>
            <div>${{ storage.price }}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn
            v-if="isUser"
            color="primary"
            text
            @click.stop="addToCart(storage)"
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
        <v-card-text class="pa-0">
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
                  <v-list-item-title> Capacity </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.capacity }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Form Factor </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.formFactor }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Interface </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.interface }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Cache </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.cache }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> RPM </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.rpm }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Read Speed </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.readSpeed }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Write Speed </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ highlightProduct.specs.writeSpeed }}
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
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { storageData } from "../../data/pc/storageData";
import { computed, onMounted } from "@vue/runtime-core";
export default {
  name: "StorageComponent",
  setup() {
    const store = useStore();
    const addSnackbar = ref(false);
    const highlightProduct = ref({});
    const show = ref(false);
    const addToCart = (storage) => {
      store.dispatch("addToCart", storage);
      addSnackbar.value = true;
    };
    onMounted(() => {
      // console.log("storage", storage.value);
      console.log("storage", storageData);
    });
    const viewDetails = (storage) => {
      highlightProduct.value = storage;
      show.value = true;
    };
    const isUser = ref(computed(() => store.getters.isUser).value);
    return {
      storageData,
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