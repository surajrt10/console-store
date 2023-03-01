<template>
  <div class="games pa-3">
    <v-sheet class="gamePaper my-2 py-4 px-2 rounded">
      <!-- <v-row>
      <v-col  v-for="game in gameData" :key="game.id" cols="2"> -->
      <!-- <v-sheet class="products pa-2 rounded" width="250px"> -->
      <div class="d-flex flex-grow-1 flex-wrap">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-for="game in gameData"
            :key="game.id"
            :elevation="isHovering ? 16 : 2"
            @click="viewDetails(game)"
            variant="flat"
            v-bind="props"
            class="productCard { 'on-hover': isHovering } pa-2 ma-2"
            width="230px"
          >
            <v-img :src="game.image" height="200px"></v-img>
            <v-card-title class="text-subtitle-1 text-center">
              {{ game.name }}

              <p class="text-center text-grey">${{ game.price }}</p>
            </v-card-title>
            <v-card-subtitle class="text-subtitle-2"> </v-card-subtitle>
            <v-card-actions class="d-flex justify-center">
              <v-btn
                v-if="isUser"
                color="success"
                text
                @click.stop="addToCart(game)"
              >
                Add to cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
        <v-dialog v-model="show" max-width="600px">
          <v-card>
            <v-card-title class="headline">
              {{ highlightGame.name }}
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-img :src="highlightGame.image" height="200px"></v-img>
                  
                </v-col>
                <v-col cols="6">
                  <v-list>
                    <v-list-item>
                      <v-list-item-title> Genre </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ highlightGame.specs.genre }}
                      </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title> Developer </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ highlightGame.specs.developer }}
                      </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title> Publisher </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ highlightGame.specs.publisher }}
                      </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title> Release Date </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ highlightGame.specs.release }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                v-if="isUser"
                color="success"
                text
                @click.stop="addToCart(highlightGame)"
              >
                Add to cart
              </v-btn>
              <v-btn color="blue darken-1" text @click="show = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- </v-sheet> -->
        <!-- </v-col>
    </v-row> -->
        <v-snackbar v-model="addSnackbar" timeout="2000">
          Added to cart!
          <v-btn variant="text" class="float-right" router to="/cart">
            Go to Cart
          </v-btn>
        </v-snackbar>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { gameData } from "../data/gameData";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  name: "Games",
  setup() {
    const show = ref(false);
    const highlightGame = ref({});
    const addSnackbar = ref(false);
    const store = useStore();
    const viewDetails = (game) => {
      console.log("gameData", game);
      highlightGame.value = game;
      show.value = true;
    };
    const addToCart = (game) => {
      store.dispatch("addToCart", game);
      addSnackbar.value = true;
    };
    const isUser = ref(computed(() => store.getters.isUser).value);
    return {
      gameData,
      show,
      highlightGame,
      addSnackbar,
      viewDetails,
      addToCart,
      isUser,
    };
  },
};
</script>

<style scoped>
.cartItems {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.products {
  display: flex;
  justify-content: center;
}
.v-chip {
  float: right;
}
.gamePaper {
  background-color: rgba(255, 255, 255, 0);
}
.productCard:hover {
  background-color: #ffffff !important;
  transition: transform 0.3s;
  transform: scale(1.04);
}
.v-card:hover > .v-card__overlay {
  opacity: 0;
}
</style>