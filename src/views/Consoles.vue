<template>
  <div class="consoles">
    <div>
      <h2 class="subheading text-center text-white">
        Buy Consoles at a Price You Have Never Seen Before!
      </h2>
    </div>
    <div class="products">
      <!-- <div class="product" v-for="console in consoleData" :key="console.index">
      <img class="productImage" color="white" :src="console.image" alt="console image">
      <h3>{{console.name}}</h3>
      <p>{{console.price}}</p>
    </div> -->
      <v-card
        class="product"
        width="300"
        v-for="console in consoleData"
        :key="console.index"
      >
        <v-card-title>
          <img class="productImage" :src="console.image" alt="console image" />
          <h3 class="subheading text-center">{{ console.name }}</h3>
        </v-card-title>

        <v-card-subtitle>
          <p class="text-h6">
            {{ console.price }}
          </p>
        </v-card-subtitle>

            <v-card-text>
             Specs: <br/>
             <ul>
                <li>CPU : {{console.specs.cpu}}</li>
                <li>Memory : {{console.specs.memory}}</li>
                <li>Storage size*: {{console.specs.storage}}</li>
                <li>Weight: {{console.specs.weight}}</li>
             </ul>
            </v-card-text>
        <v-card-actions>
          <v-btn variant="elevated" color="success" text>Buy Now</v-btn>
        </v-card-actions>

      </v-card>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "Consoles",
  setup() {
    const show = ref(false);
    const consoleData = ref([
      {
        name: "Playstation 4",
        price: "$300",
        image: "/ps4.jpg",
        specs:{
          cpu: "x86-64 AMD “Jaguar”, 8 cores",
          memory: "GDDR5 8GB",
          storage: "500GB, 1TB",
          weight: "2.1 Kg"
        }
      },
      {
        name: "Playstation 5",
        price: "$500",
        image: "/ps5.jpg",
        specs:{
          cpu: "8-core AMD Zen 2 CPU @ 3.5GHz",
          memory: "GDDR6 16GB",
          storage: "500GB, 1TB",
          weight: "4.4 Kg"
        }
      },
      {
        name: "Xbox Series X",
        price: "$500",
        image: "/xbox.png",
        specs:{
          cpu: "8-core AMD Zen 2 CPU @ 3.8 GHz",
          memory: "GDDR6 16GB",
          storage: "500GB, 1TB",
          weight: "4.4 Kg"
        }
      },
      {
        name: "Nintendo Switch",
        price: "$289",
        image: "/nintendo.jpg",
        specs:{
          cpu: "ARM Cortex-A57 @ 1.02GHz",
          memory: "LPDDR4 4GB",
          storage: "32GB, 64GB",
          weight: "0.88 Kg"
        }
      },
    ]);
    return {
      consoleData,
      show,
    };
  },
};
</script>

<style scoped>
.consoles {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.products {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.product {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  background: white;
  width: 300px;
}
.v-card-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.productImage {
  height: 110px;
  filter: grayscale(0%);
}
</style>