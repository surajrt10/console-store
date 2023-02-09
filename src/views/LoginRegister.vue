<template>
   <v-dialog v-model="dialog">
    <v-container class="userLoginPopup">
      <v-tabs v-model="tab">
        <v-tab>Login</v-tab>
        <v-tab>Register</v-tab>
      </v-tabs>
     <Login v-if="tab=== 0"/>
     <Register v-else/>
      
    </v-container>
   </v-dialog>
  
</template>

<script>
import { ref } from '@vue/reactivity';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import { watch } from '@vue/runtime-core';
export default {
 name: "LoginRegister",
 components: {
   Login,
   Register,
 },
 setup() {
   const dialog = ref(true);
   const tab = ref(null);
   watch(tab, (newVal) => {
     console.log("newVal: ", newVal);
   });
   return {
     dialog,
     tab,
   };
 },
}
</script>

<style>
.userLoginPopup{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 450px;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
}
</style>