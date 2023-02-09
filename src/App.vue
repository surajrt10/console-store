<template>
<v-app>

  <div class="app grey lighten-4">
    <Topnav :sessionData ="sessionData" />

     <v-parallax
    src="/background.jpg"
  >
    <div class="mainLayout">
      <router-view></router-view>
    </div>
  </v-parallax>
  </div>
</v-app>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core';
import Topnav from './components/Topnav.vue'
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  components: { 
    Topnav
  },
  setup() {
    const sessionData = ref({
    });
    const router = useRouter();
    onMounted(()=>{
      sessionData.value = JSON.parse(localStorage.getItem('sessionData'));
      console.log('sessionData: ',sessionData.value)
    })
    return {
      sessionData
    }
  }
}
</script>

<style scoped>
.mainLayout {
  padding: 10px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 1000px;
}
</style>