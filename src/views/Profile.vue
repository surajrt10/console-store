<template>
  <div class="profile">
    <v-list class="profileDetails">
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
        +1 (555) 123-4567
      </v-list-item>
      <v-list-item>
        <v-icon>mdi-email</v-icon>
        srjt@test.com
      </v-list-item>
    </v-list>
    <v-card>
      <v-list class="profileActions">
          <v-list-item @click="()=>{}"> Your Orders </v-list-item>
        <v-list-item @click="()=>{}">
           Change Password
        </v-list-item>

        <v-list-item @click="()=>{}">
         Change Email
        </v-list-item>
        <v-list-item @click="logoutHandler">
           Logout 
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Profile",
  setup() {
    const logoutHandler = () => {
      localStorage.removeItem("sessionData");
      window.location.href = "/";
    };
    return {
      logoutHandler,
    };
  },
};
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: row;
}
</style>