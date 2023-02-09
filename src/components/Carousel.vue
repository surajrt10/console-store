<script>
import { ref } from "@vue/reactivity";
export default {
  name: "Carousel",
  setup() {
    const offerItems = ["/CyberMondayPoster.png", "/psplusoffer.jpg"];
    const games = ["/tlou.jpg", "/Gow.jpg", "/RDR2.jpg"];
    const model = ref(0);
    return {
      offerItems,
      model,
      games,
    };
  },
};
</script>


<template>
  <div class="carousel">
    <div class="carouselItem">
      <h3 class="text-white text-subtitle-1 text-center">Our offers</h3>
      <v-carousel
        class="elevation-1 offerCarousel"
        hide-delimiters
        show-arrows="hover"
      >
        <v-carousel-item
          v-for="(item, i) in offerItems"
          :key="i"
          :src="item"
        >
        </v-carousel-item>
      </v-carousel>
    </div>
    <div class="carouselItem">
      <h3 class="text-white text-subtitle-1 text-center">
         <v-icon>mdi-gamepad-variant</v-icon>
        New Arrivals</h3>
      <v-carousel
        class="elevation-1 gameCarousel"
        hide-delimiters
        show-arrows="hover"
      >
        <v-carousel-item
          v-for="(item, i) in games"
          :key="i"
          :src="item"
          cover
        ></v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>


<style scoped>
.carouselItem {
  width: 350px;
  margin: 0 20px;
}
.carousel {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.v-window{
  height: 400px !important;
}
</style>