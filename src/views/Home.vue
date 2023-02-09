<template>
  <div class="home d-flex flex-column justify-center">
    <div>
      <p class="introduction text-h5 text-white">
        Welcome to the
        <span class="font-weight-light text-uppercase">Console</span
        ><span class="font-weight-bold text-uppercase">House</span>
      </p>
      <p class="introduction text-subtitle-1 text-white">
        We are here to provide you one of the best prices on the market for
        Gaming Consoles, Latest Titles &amp; Gaming Accessories. You get to
        choose from our 10000 products that includes not only Consoles but also
        Games, Headphones &amp; Controllers
      </p>
      <br />
    </div>
    <Carousel />
  </div>
</template>

<script>
import Carousel from "../components/Carousel.vue";
export default {
  name: "Home",
  components: {
    Carousel,
  },
  setup() {},
};
</script>

<style>
.home {
  padding: 10px;
}
.introduction {
  font-size: 18px;
}
</style>