<template>
  <v-container class="partner pa-4 ma-4 rounded elevation-10">
    <v-row>
      <v-col cols="5" >
        <h1 class="text-h6 font-weight-bold">
          Become a partner and open a store under out Franchise Management
          Scheme
        </h1>
        <p class="text-body-1">
          We are looking for partners to open stores under our franchise
          management scheme. We will provide you with the necessary training and
          support to run your store. Marketing and advertising will be done by
          us.
        </p>
        <p class="text-body-1">You will be responsible for the day to day running of the store.</p>

        <h1 class="text-h6 font-weight-bold mt-2">What we offer</h1>
        <v-list density="compact">
          <v-list-item class="text-body-1 ma-0">Training</v-list-item>
          <v-list-item class="text-body-1">Marketing and advertising</v-list-item>
          <v-list-item class="text-body-1">Support</v-list-item>
          <v-list-item class="text-body-1">Store design</v-list-item>
          <v-list-item class="text-body-1">Store management</v-list-item>
        </v-list>
      </v-col>
      <v-col class="contactForm rounded ma-2 pa-4" cols="6">
        <h1 class="text-h6 font-weight-bold">Contact us</h1>
        <v-form>
          <v-text-field label="Name"  v-model="contactData.name" required></v-text-field>
          <v-text-field label="Phone" v-model="contactData.phone" required></v-text-field>
          <v-text-field label="Email" v-model="contactData.email" required></v-text-field>
          <v-btn color="success" class="text-body-1" @click="submitContact">Submit</v-btn>
        <p v-if="errormsg !== ''">{{errormsg}}</p>
        </v-form>
      </v-col>
    </v-row>
      <v-dialog v-model="show" max-width="290">
        <v-card>
          <v-card-title class="headline">Thank you for contacting us</v-card-title>
          <v-card-text>
            We will get back to you shortly
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="show = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    
  </v-container>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  name: "Partner",
  setup() {
    const contactData = ref({
      name: "",
      email: "",
      phone: "",
    })
    const errormsg = ref("")
    const show = ref(false)
    const submitContact = () => {
      if(contactData.value.name === "" || contactData.value.email === "" || contactData.value.phone === ""){
        errormsg.value = "Please fill in all fields"
        return
      }
      else{
        show.value = true;
      }
    }
    return {
      ref,
      contactData,
      submitContact,
      show,
      errormsg
    };
  },
};
</script>

<style scoped>
.partner {
  padding: 0 20px;
  background: white;
  display: flex;
  flex-direction: column;
}
.contactForm{
  border: 1px solid #ccc;
  height: fit-content;
}
</style>