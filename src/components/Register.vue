<template>
  <div class="register">
    <h4 class="text-subtitle-1 mt-2 font-weight-medium py-2">
      Join us for exciting offers and Unbelievable Prices!
    </h4>
    <v-text-field
      label="Name"
      outlined
      :rules="[
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ]"
      v-model="loginData.name"
    ></v-text-field>
    <v-text-field
      label="email"
      outlined
      :rules="[
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]"
      v-model="loginData.email"
    ></v-text-field>
    <v-text-field
      label="Username"
      outlined
      :rules="[
        (v) => !!v || 'Username is required',
        (v) =>
          (v && v.length >= 8) || 'Username must have atleast 8 characters',
      ]"
      v-model="loginData.username"
    ></v-text-field>
    <v-text-field
      label="Password"
      outlined
      :rules="[
        (v) => !!v || 'Password is required',
        (v) =>
          (v && v.length >= 8) || 'Password must have atleast 8 characters',
        (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v) ||
          'Password must have atleast 1 uppercase, 1 lowercase and 1 number',
      ]"
      type="password"
      v-model="loginData.password"
    ></v-text-field>

    <v-row justify="center">
      <v-col cols="4">
        <v-btn color="success" text @click="saveLoginData">Register</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { users } from "../data/users";
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
      users.push(loginData.value);
      localStorage.setItem("sessionData", JSON.stringify(loginData.value));
      dialog.value = false;
      window.location.href = "/";
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
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
}
</style>