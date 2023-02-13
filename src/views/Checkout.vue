<template>
  <v-container class="checkoutPage">
    <v-card class="checkoutCard">
      <div class="text-h6 font-weight-bold">Checkout</div>
      <v-card-title class="text-subtitle-1 text-center opacity-1">
        <p class="text-left">Cart Summary</p>
        <p class="text-subtitle-1 text-left font-weight-bold">
          Items Added in Cart : {{ cartItemsCount }}
        </p>
        <p class="text-subtitle-1 text-left font-weight-bold">
          Cart Total : ${{ cartTotal }}
        </p>
      </v-card-title>
      <v-card-text> </v-card-text>
    </v-card>
    <v-card v-if="!step1Completed" class="addressDetailsCard">
      <v-card-title>
        <div class="serialNo ma-2">1</div>
        <p class="text-h6 font-weight-bold d-inline">Shipping Address</p>
        <v-text-field
          class="mt-2"
          label="Full Name"
          variant="outlined"
          placeholder="Enter your full name"
          v-model="checkoutData.fullName"
        />
        <v-textarea
          label="Address"
          variant="outlined"
          placeholder="Enter your address"
          rows="2"
          no-resize
          v-model="checkoutData.address"
        />
        <v-text-field
          label="City"
          variant="outlined"
          placeholder="Enter your address"
          v-model="checkoutData.city"
        />
        <v-text-field
          label="State"
          variant="outlined"
          placeholder="Enter your address"
          v-model="checkoutData.state"
        />
        <v-text-field
          label="PIN Code"
          variant="outlined"
          placeholder="Enter your address"
          v-model="checkoutData.pincode"
        />
      </v-card-title>
        <v-btn
          color="blue-lighten-1 ma-2"
          class="float-right"
          max-width="100px"
          @click="confirmAddress"
        >
          Next
        </v-btn>
    </v-card>
    <v-card class="filledAddress" v-else>
      <v-card-title>
        <div class="serialNo ma-2">1</div>
        <p class="text-h6 font-weight-bold d-inline">Shipping Address</p>
        <p class="text-subtitle-1 font-weight-medium text-left">
          Full Name: {{ checkoutData.fullName }}
        </p>
        <p class="text-subtitle-1 font-weight-medium text-left">
          Address: {{ checkoutData.address }} ,
        </p>
        <p class="text-subtitle-1 font-weight-medium text-left">
          {{ checkoutData.city }},
        </p>
        <p class="text-subtitle-1 font-weight-medium text-left">
          {{ checkoutData.state }},
        </p>
        <p class="text-subtitle-1 font-weight-medium text-left">
          {{ checkoutData.pincode }} .
        </p>
        <v-chip class="float-left" :ripple="false" @click="editAddress">
          Edit
        </v-chip>
      </v-card-title>
    </v-card>
    <v-card v-if="step1Completed" class="paymentDetailsCard">
      <v-card-title>
        <div class="serialNo ma-2">2</div>
        <p class="text-h6 font-weight-bold d-inline">Payment Method</p>
      </v-card-title>
      <v-radio-group v-model="checkoutData.paymentMethod">
        <v-radio label="Credit Card" value="creditCard" />
        <v-radio label="Debit Card" value="debitCard" />
        <v-radio label="Net Banking" value="netBanking" />
        <v-radio label="Cash on Delivery" value="cashOnDelivery" />
      </v-radio-group>
      <v-card v-if="checkoutData.paymentMethod === 'creditCard'">
        <v-card-title>
          <p class="text-left">Credit Card</p>
          <v-text-field
            label="Card Number"
            variant="outlined"
            placeholder="Enter your card number"
          />
          <v-text-field
            label="CVV"
            variant="outlined"
            placeholder="Enter your CVV"
          />
          <v-text-field
            label="Expiry Date"
            variant="outlined"
            placeholder="Enter your expiry date"
          />
        </v-card-title>
      </v-card>
      <v-card v-if="checkoutData.paymentMethod === 'debitCard'">
        <v-card-title>
          <p class="text-left">Debit Card</p>
          <v-text-field
            label="Card Number"
            variant="outlined"
            placeholder="Enter your card number"
          />
          <v-text-field
            label="CVV"
            variant="outlined"
            placeholder="Enter your CVV"
          />
          <v-text-field
            label="Expiry Date"
            variant="outlined"
            placeholder="Enter your expiry date"
          />
        </v-card-title>
      </v-card>
      <v-card v-if="checkoutData.paymentMethod === 'netBanking'">
        <v-card-title>
          <p class="text-left">Net Banking</p>
          <v-select
            :items="['HDFC', 'ICICI', 'SBI', 'Kotak', 'Axis']"
            label="Select Bank"
            outlined
          />
          <v-text-field
            label="Account Number"
            variant="outlined"
            placeholder="Enter your account number"
          />
        </v-card-title>
      </v-card>
      <v-btn
        color="blue-lighten-1 ma-2"
        class="float-right"
        max-width="100px"
        @click="confirmOrder"
      >
        Checkout
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  name: "Checkout",
  setup() {
    const store = useStore();
    const step1Completed = ref(false);
    const checkoutData = ref({
      address: "",
      city: "",
      state: "",
      pincode: "",
      fullName: "",
      paymentMethod: "creditCard",
    });
    const confirmAddress = () => {
      if (
        checkoutData.value.address &&
        checkoutData.value.fullName &&
        checkoutData.value.city &&
        checkoutData.value.state &&
        checkoutData.value.pincode
      )
        step1Completed.value = true;
    };
    const editAddress = () => {
      step1Completed.value = false;
    };
    const confirmOrder = () => {
      console.log("confirmOrder", checkoutData.value);
       // let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');

       // mywindow.document.write('<html><head><title>' + document.title  + '</title>');
       // mywindow.document.write('</head><body >');
       // mywindow.document.write('<h1>' + document.title  + '</h1>');
       // mywindow.document.write(document.querySelector('.checkoutPage').innerHTML);
       // mywindow.document.write('</body></html>');
       // mywindow.print();

    };
    return {
      cartItemsCount: computed(() => store.getters.cartItemsCount),
      cartTotal: computed(() => store.getters.cartTotal),
      checkoutData,
      confirmOrder,
      confirmAddress,
      editAddress,
      step1Completed,
    };
  },
};
</script>

<style scoped>
.checkoutPage {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
}
.checkoutCard {
  width: 300px;
  margin: 10px;
}
.addressDetailsCard {
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 10px;
}
.paymentDetailsCard {
  width: 500px;
  margin: 10px;
  display: flex;
  flex-direction: column;
}
.serialNo {
  background-color: #ffffff;
  color: #374a57;
  height: 32px;
  width: 32px;
  border: 2px solid #374a57;
  border-radius: 50%;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 24px;
  align-items: center;
  justify-content: center;
  display: inline-flex;
  top: 5px;
}
</style>