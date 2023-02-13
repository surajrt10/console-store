<template>
  <div class="games">
    <v-row>
      <v-col v-for="game in gameData" :key="game.id" cols="6" md="3">
        <v-sheet class="products pa-2 rounded" width="250px">
          <v-card class="" max-width="">
            <v-img :src="game.image" height="200px"></v-img>
            <v-card-title class="text-subtitle-1">
              {{ game.name }}
            </v-card-title>
            <v-card-subtitle class="text-subtitle-2">
              ${{ game.price }}
            </v-card-subtitle>
            <v-card-actions>
              <v-btn
                color="success"
                size="x-small"
                text
                @click="viewDetails(game)"
              >
                View Details
              </v-btn>
              <v-btn
                color="success"
                size="x-small"
                text
                @click="addToCart(game)"
              >
                Add to cart
              </v-btn>
            </v-card-actions>
          </v-card>
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
                <v-btn color="blue darken-1" text @click="show = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-sheet>
      </v-col>
    </v-row>
    <v-snackbar v-model="addSnackbar" timeout="2000">
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
import { gameData } from "../data/gameData";
import { useStore } from "vuex";
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
    return {
      gameData,
      show,
      highlightGame,
      addSnackbar,
      viewDetails,
      addToCart,
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
</style>