<template>
  <div class="register">
        <h4 class="text-subtitle-1 mt-2 font-weight-medium py-2">
          Join us for exciting offers and Unbelievable Prices!
        </h4>
        <v-text-field
          label="Name"
          outlined
          v-model="loginData.name"
        ></v-text-field>
        <v-text-field
          label="email"
          outlined
          v-model="loginData.email"
        ></v-text-field>
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
            <v-btn color="success" text @click="saveLoginData">Login</v-btn>
          </v-col>
        </v-row>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
  name: "Register",
  setup() {
    const dialog = ref(true);
    const loginData = ref({
      name: "",
      email: "",
      username: "",
      password: "",
    });
    const router = useRouter();
    const saveLoginData = () => {
      localStorage.setItem("sessionData", JSON.stringify(loginData.value));
      dialog.value = false;
      router.go(0);
    };
    return {
      loginData,
      dialog,
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
  background-color: #FFFFFF;
  padding: 15px;
  border-radius: 10px;
}
</style>