<template>
<div>
 
  <v-sheet class="white ma-4 rounded">
      <v-slide-group center-active v-model="model" selectedClass="bg-transparent">
        <v-slide-group-item 
         v-for="n in pcData"
         :key="n"
         v-slot="{toggle, selectedClass}"
         >
          <!-- <router-link :to="n.path"> -->
          <v-card 
          :to="n.path"
          :class="[selectedClass, 'ma-2']"
          @click="toggle"
          >
            <v-card-title class="text-center">{{ n.name }}</v-card-title>
            <v-card-text>
              <v-img class="processorImage" :src="n.image" width="130" height="150" draggable="false"></v-img>
            </v-card-text>
          </v-card>
          <!-- </router-link> -->
        </v-slide-group-item>
      </v-slide-group>
  </v-sheet>
      <v-container class="ma-2">
      <router-view></router-view>
      </v-container>
</div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  Name: "Pc",
  setup() {
    const pcData = [
      {
        name: "Processor",
        image: "/PC/processor.jpg",
        path: "/pc/processor",
      },
      {
        name: "Motherboard",
        image: "/PC/motherboard.jpg",
        path: "/pc/motherboard",
      },
      {
        name: "RAM",
        image: "/PC/ram.jpg",
        path: "/pc/ram",
      },
      {
        name: "Graphics Card",
        image: "/PC/gpu.jpg",
        path: "/pc/graphics",
      },
      {
        name: "Storage",
        image: "/PC/storage.jpg",
        path: "/pc/storage",
      },
      {
        name: "Power Supply",
        image: "/PC/psu.jpg",
        path: "/pc/psu",
      },
      {
        name: "Case",
        image: "/PC/cabinet.jpg",
        path: "/pc/case",
      },
      {
        name: "Cooling solutions",
        image: "/PC/cooling.jpg",
        path: "/pc/cooling",
      },
    ];
    const model = ref(0);
    return { pcData, model };
  },
};
</script>

<style scoped>

</style>