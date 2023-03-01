<template>
  <v-sheet class="profile ma-4 rounded">
    <div class="profileDetails">
      <v-list>
        <v-list-item>
          <v-img
            width="80px"
            height="80px"
            src="https://cdn.vuetifyjs.com/images/lists/1.jpg"
          ></v-img>
          <v-list-item-title class="title">Suraj Thombare</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-icon>mdi-phone</v-icon>
          +91 (555) 123-4567
        </v-list-item>
        <v-list-item>
          <v-icon>mdi-email</v-icon>
          srjt@test.com
        </v-list-item>
      </v-list>
      <v-list class="profileActions">
        <v-list-item @click="() => {}">
          <v-icon> mdi-cart </v-icon>
          Your Orders
        </v-list-item>
        <v-list-item @click="() => {}">
          <v-icon> mdi-lock </v-icon>
          Change Password
        </v-list-item>

        <v-list-item @click="() => {}">
          <v-icon> mdi-email </v-icon>
          Change Email
        </v-list-item>
        <v-list-item @click="logoutHandler">
          <v-icon> mdi-logout </v-icon>
          Logout
        </v-list-item>
      </v-list>
    </div>
  <div class="membershipPlans ma-4">
    <h3 class="text-white text-h6">Our membership Plans: </h3>
    <v-expansion-panels variant="accordian">
      <v-expansion-panel class="mt-0" v-for="plan in membershipPlans" :key="plan.id">
        <v-expansion-panel-title>
          <v-icon :icon="plan.icon"></v-icon> &nbsp; {{ plan.name }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <p class="text-subtitle-1">
            {{ plan.description }}
          </p>
          <h3 class="my-2">
            {{ plan.price > 0 ? "$" + plan.price : "Free" }}
          </h3>
          <v-btn color="success" variant="text">Subscribe</v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
  </v-sheet>
</template>

<script>
import { membershipPlans } from "../data/membershipPlans";
export default {
  name: "Profile",
  setup() {
    const logoutHandler = () => {
      localStorage.removeItem("sessionData");
      window.location.href = "/";
    };
    return {
      logoutHandler,
      membershipPlans,
    };
  },
};
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  width: fit-content;
}
.profileDetails {
  display: flex;
}
.membershipPlans {
  /* display: flex;
  flex-direction: column; */
  width: 450px;
}
</style>