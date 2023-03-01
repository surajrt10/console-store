<template>
  <!-- <v-navigation-drawer app v-model="drawer" color="white" elevation="2">
     
      <v-list>
        <v-list-item>
           <router-link to="/">
            <v-list-item-title class="text-uppercase">
              <span class="font-weight-light">
                Console
              </span>
              <span class="font-weight-bold">
                House
              </span>
            </v-list-item-title>
            </router-link>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-for="eachTab in tabs" :key="eachTab.index" :to="`/${eachTab.toLowerCase()}`">
            <v-list-item-title>
              {{eachTab}}
            </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
  <v-app-bar app class="px-2" elevation="2">
    <!-- <v-app-bar-nav-icon v-if="isXs" @click="drawer = !drawer">
      <v-icon>mdi-menu</v-icon>
    </v-app-bar-nav-icon> -->
    <router-link to="/">
      <v-app-bar-title class="text-uppercase pa-2">
        <div class="AppTitle">
        <v-img class="d-inline-flex" src="@/assets/logo.png" width="50" height="50" ></v-img> 
        <span class=" font-weight-light ml-2"> Console </span>
        <span class=" font-weight-bold"> House </span>
        </div>
      </v-app-bar-title>
    </router-link>
    <v-spacer></v-spacer>
    <v-tabs align-tabs="center" v-model="tab" v-show="!isXs">
        <v-tab
          v-for="eachTab in tabs"
          :key="eachTab.index"
          :value="`${eachTab}`"
          :to="'/'+eachTab.toLowerCase()"
        >
          {{ eachTab }}
        </v-tab>
    </v-tabs>
    <v-btn v-if="props.sessionData" icon class="mx-1" router to="/profile">
      <v-avatar class="mx-2" size="32" color="grey">
        <v-icon>mdi-account-circle</v-icon>
      </v-avatar>
    </v-btn>
    <span v-if="props.sessionData" class="text-grey"
      >Hello, {{ props.sessionData.name }}</span
    >

    <v-btn v-else router to="/login"> Login/Signup </v-btn>

    <v-btn
      v-if="props.sessionData"
      class="mx-1 text-none"
      stacked
      router
      to="/cart"
    >
      <v-badge
        color="success"
        :model-value="cartItemsCount > 0 ? true : false"
        :content="cartItemsCount > 0 ? cartItemsCount : ''"
        floating
      >
        <v-icon size="28"> mdi-cart-outline </v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { ref } from "@vue/reactivity";
import { computed, onMounted, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  name: "Topnav",
  props: ["sessionData"],
  setup(props) {
    const store = useStore();
    const tab = ref(0);
    const isXs = ref(false);
    const drawer = ref(false);
    const tabs = ["Home", "Consoles", "Games", "Accessories","PC", "Partner"];
    onMounted(() => {
      tab.value = "Home";
    });
    return {
      tab,
      isXs,
      tabs,
      drawer,
      props,
      cartItemsCount: computed(() => store.getters.cartItemsCount),
      // isSessionUser,
    };
  },
};
</script>

<style>
a {
  text-decoration: none;
  color: black;
}
.AppTitle{
  display: flex;
  align-items: center;

}
</style>