<template>
  <div class="games">
    <div v-if="CartValue > 0" class=" mb-2">
    <p class="text-subtitle-1 text-white">
      Cart value : {{ CartValue }}
    </p>
    <v-row>

      <v-col
        v-for="(game, i) in CartItems"
        :key="i"
        cols="2"
      >

      <v-sheet height="200px" width="200px" class="pa-2 rounded">
              <v-chip
               color="red"
               size="small"
               @click="removeFromCart(game)"
              >
                <v-icon>mdi-close</v-icon>
                <v-tooltip
                activator="parent"
                location="top"
                >
                  Remove from cart
                </v-tooltip>
              </v-chip>
            <div class="cartItems">

            <v-img
              :src="game.image"
              width="110px"
              height="120px"

            ></v-img>
              <p class="text-subtitle-2 text-center">
                {{ game.name }}
              </p>
              <p class="text-subtitle-2 text-center">
              {{ game.price }}
              </p>
            </div>
              <!-- <v-btn
                color="success"
                size="small"
                variant='text'
                @click="removeFromCart(game)"
              >
                Remove
              </v-btn> -->
      </v-sheet>
      </v-col>
    </v-row>
    </div>
    <v-row>
      <v-col
        v-for="game in gameData"
        :key="game.id"
        cols="6"
        md="3"
      >
        <v-sheet
         class="products pa-2 rounded"
         width="250px"
        >
          <v-card
            class=""
            max-width=""
          >
            <v-img
              :src="game.image"
              height="200px"
            ></v-img>
            <v-card-title class="text-subtitle-1">  
              {{ game.name }}
            </v-card-title>
            <v-card-subtitle class="text-subtitle-2">
              {{ game.price }}
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
                  @click="AddtoCart(game)"
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
                    <v-img
                      :src="highlightGame.image"
                      height="200px"
                    ></v-img>
                  </v-col>
                  <v-col cols="6">
                    <v-list>
                      <v-list-item>
                          <v-list-item-title>
                            Genre
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ highlightGame.specs.genre }}
                          </v-list-item-subtitle>
                        
                      </v-list-item>
                      <v-list-item>
                
                          <v-list-item-title>
                            Developer
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ highlightGame.specs.developer }}
                          </v-list-item-subtitle>
                        
                      </v-list-item>
                      <v-list-item>
 
                          <v-list-item-title>
                            Publisher
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ highlightGame.specs.publisher }}
                          </v-list-item-subtitle>

                      </v-list-item>
                      <v-list-item>
                          <v-list-item-title>
                            Release Date
                          </v-list-item-title>
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
                  color="blue darken-1"
                  text
                  @click="show = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

                    
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from '@vue/runtime-core';
import {gameData as GD} from "../data/gameData";
export default {
  name: "Games",
  setup() {
    const show = ref(false);
    const CartValue = ref(0);
    const gameData = ref(GD);
    const CartItems = ref([]);
    const highlightGame = ref({});
    const AddtoCart = (game) => {
      CartValue.value++;
      CartItems.value.push(game);
      show.value = false;
    };
    const viewDetails = (game) =>{
      console.log('gameData', game)
      highlightGame.value = game;
      show.value = true;
    }
    const removeFromCart = (game) => {
      CartValue.value--;
      CartItems.value = CartItems.value.filter((item) => item.id !== game.id);
    }
      watch(CartItems, (val) => {
        console.log(val);
      });  
   return {
      gameData,
      show,
      highlightGame,
      CartValue,
      CartItems,
      AddtoCart,
      viewDetails,
      removeFromCart
    };
  },
};
</script>

<style scoped>
.cartItems{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.products{
  display: flex;
  justify-content: center;
}
.v-chip{
  float: right;
}
</style>