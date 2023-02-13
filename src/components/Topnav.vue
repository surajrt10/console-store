<template>
  <!-- <v-navigation-drawer v-model="drawer" color="white" elevation="2">
     
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
  <v-toolbar app fixed v-if="!isXs" class="px-2" color="white" elevation="2">
     <v-btn icon @click="drawer = !drawer">
      <v-icon >mdi-menu</v-icon>
    </v-btn>
    <router-link to="/">
      <v-toolbar-title class="text-uppercase pa-2">
        <span class="font-weight-light"> Console </span>
        <span class="font-weight-bold"> House </span>
      </v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <v-tabs
      align-tabs="end"
      v-for="eachTab in tabs"
      :key="eachTab.index"
      v-model="tab"
    >
      <router-link class="router-link" :to="`/${eachTab.toLowerCase()}`">
        <v-tab :value="`${eachTab}`">
          {{ eachTab }}
        </v-tab>
      </router-link>
    </v-tabs>
    <v-btn v-if="props.sessionData" icon class="mx-1" router to="/profile">
      <v-avatar class="mx-2" size="32" color="grey">
        <v-icon>mdi-account-circle</v-icon>
      </v-avatar>
    </v-btn>
        <span v-if="props.sessionData" class="text-grey">Hello, {{props.sessionData.name}}</span>

    <v-btn v-else router to="/login"> Login/Signup </v-btn>

    <v-btn class="mr-1 text-none" stacked router to="/cart">
     <v-badge
          color="success"
          :content="cartItemsCount"
          floating
        >
      <v-icon> mdi-cart-outline </v-icon>
      </v-badge>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
import { useStore } from 'vuex';
export default {
  name: "Topnav",
  props: ["sessionData"],
  setup(props) {
    const store = useStore();
    const tab = ref(0);
    const isXs = ref(false);
    // const isSessionUser = ref(false);
    const drawer = ref(false);
    const tabs = [
      "Home",
      "Consoles",
      "Games",
      "Accessories",
      "Partner",
    ];
    // watch(
    //   props,
    //   (newVal) => {
    //     console.log("newVal: ", newVal.sessionData);
    //     if (newVal.sessionData) {
    //       isSessionUser.value = true;
    //     } else {
    //       isSessionUser.value = false;
    //     }
    //   },
    //   { immediate: true, deep: true }
    // );
    return {
      tab,
      isXs,
      tabs,
      drawer,
      props,
      cartItemsCount: computed(() => store.getters.cartItemsCount)
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
</style>