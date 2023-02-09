<template>
      <h4 class="text-subtitle-1 mt-2 font-weight-medium">
        Only for registered users!
      </h4>
      <h4 class="text-subtitle-2 font-weight-medium">
        Once you're logged in, you can add products to your cart and proceed with buying!
      </h4>
      <v-text-field
        label="Username"
        outlined
        v-model="loginData.username"
      ></v-text-field>
      <v-text-field
        label="Password"
        outlined
        type="password"
        v-model="loginData.password"
      ></v-text-field>

      <v-row justify="center">
        <v-col cols="4">
          <!-- <h6>{{errormsg}}</h6> -->
          <v-btn color="success" text @click="saveLoginData">Login</v-btn>
        </v-col>
      </v-row>
</template>

<script>
import { ref } from "@vue/reactivity";
import { users } from "../data/users";
export default {
  name: "Login",
  setup() {
    const dialog = ref(true);
    const loginData = ref({
      username: "",
      password: "",
    });
    const saveLoginData = () => {
     users.map((user) => {
        if (user.username === loginData.value.username && user.password === loginData.value.password) {
          localStorage.setItem("sessionData", JSON.stringify(user));
          dialog.value = false;
          window.location.href = "/";
        }
     })
    };
    return {
      dialog,
      loginData,
      saveLoginData,
    };
  },
};
</script>

<style scoped>
.loginPopup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 450px;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
}
</style>