<template>
<v-app>

    <Topnav :sessionData ="userData" />
    <v-main>

    <v-container fluid class="pa-0">
     <v-parallax
    src="/background.jpg"
  > 
      <router-view></router-view>
  </v-parallax>
    </v-container>
    </v-main>
</v-app>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core';
import Topnav from './components/Topnav.vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'App',
  components: { 
    Topnav
  },

  setup() {
    const store = useStore();

    const userData = ref({});
    const router = useRouter();
    onMounted(()=>{
      userData.value = JSON.parse(localStorage.getItem('sessionData'));
      if(userData.value){
        store.dispatch('setUser', userData.value);
      }
      document.title = "CONSOLE HOUSE";
    })
    return {
      userData
    }
  }
}
</script>

<style scoped>
</style>