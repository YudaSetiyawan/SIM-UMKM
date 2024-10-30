<template>
  <b-container>
    <div class="sub-title">
      <div class="row container p-3">
        <h3 class="text-center m-0">Complete your Payment</h3>

        <div class="payment d-flex justify-content-center align-items-end">
          <b-card @submit.prevent="addExpense" class="ms-2">
            <form @submit.prevent="handlePayment">
              <b-row>
                <b-col cols="6">
                  <div class="form-group">
                    <label for="amount"><h6>Amount (IDR):</h6></label>
                    <input type="number" v-model="amount" required class="form-control" />
                  </div>
                </b-col>
                <b-col cols="6">
                  <div class="form-group">
                    <label for="email"><h6>Email:</h6></label>
                    <input type="email" v-model="email" required class="form-control" />
                  </div>
                </b-col>
              </b-row>

              <b-row class="d-flex justify-content-center">
                <b-col cols="12" md="6" class="text-center">
                  <button type="submit" class="btn btn-primary btn-sm mt-3">Proceed to Pay</button>
                </b-col>
              </b-row>
            </form>
            <div v-if="paymentUrl">
              <h3>Payment Link:</h3>
              <a :href="paymentUrl" target="_blank">{{ paymentUrl }}</a>
            </div>
          </b-card>
        </div>

        <div class="qr-payment">
          <h3 class="text-center m-0">Scan to Pay</h3>
          <b-card @submit.prevent="addExpense" class="ms-2 mt-3">
            <b-row>
              <form @submit.prevent="generateQRCode">
                <h6>
                  Amount (IDR):
                  <label for="amount"></label>
                  <input type="number" v-model="amount" required />
                </h6>
                <b-row class="d-flex justify-content-center">
                  <b-col cols="12" md="6" class="text-center">
                    <button type="submit" class="btn btn-primary btn-sm mt-2">Generate QR Code</button>
                  </b-col>
                </b-row>
              </form>
            </b-row>

            <div v-if="qrCodeUrl">
              <h3>QR Code for Payment:</h3>
              <img :src="qrCodeUrl" alt="QR Code for Payment" />
            </div>
          </b-card>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "ManagePembayaran",

  data() {
    return {
      amount: "",
      email: "",
      paymentUrl: "",
      qrCodeUrl: "",
    };
  },
  methods: {
    async handlePayment() {
      try {
        const response = await fetch("https://api.paymentgateway.com/charge", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: this.amount,
            email: this.email,
          }),
        });

        const data = await response.json();
        this.paymentUrl = data.paymentUrl; // Dapatkan URL Payment dari API response
      } catch (error) {
        console.error("Payment Error:", error);
      }
    },
    async generateQRCode() {
      try {
        const response = await fetch("https://api.paymentgateway.com/qr-code", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: this.amount,
          }),
        });

        const data = await response.json();
        this.qrCodeUrl = data.qrCodeUrl; // URL QR Code dari API
      } catch (error) {
        console.error("QR Code Generation Error:", error);
      }
    },
  },
};
</script>

<style scoped>
.payment {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

.qr-payment {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
}
img {
  margin-top: 1rem;
  max-width: 100%;
}
</style>
