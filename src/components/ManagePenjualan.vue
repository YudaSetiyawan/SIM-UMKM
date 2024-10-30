<template>
  <b-container>
    <div class="sub-title">
      <div class="row container">
        <h5 class="mt-3">HASIL PENJUALAN HARIAN</h5>
        <!-- Pencatatan Transaksi Penjualan -->
        <b-card class="ms-2">
          <b-form @submit.prevent="addTransaction">
            <b-form-group label="Pilih Outlet" label-for="selectedOutlet" class="mb-0">
              <b-form-select v-model="selectedOutlet" :options="outlets" id="selectedOutlet"></b-form-select>
            </b-form-group>
            <hr class="solid-line" />

            <b-row>
              <b-col md="3">
                <b-form-group label="Nama Produk" label-for="product" class="mb-0">
                  <b-form-select v-model="product" :options="categories" id="product"></b-form-select>
                </b-form-group>
              </b-col>

              <b-col md="3">
                <b-form-group label="Jumlah" label-for="quantity" class="mb-0">
                  <b-form-input type="number" v-model="quantity" required id="quantity"></b-form-input>
                </b-form-group>
              </b-col>

              <b-col md="3">
                <b-form-group label="Harga" label-for="price" class="mb-0">
                  <b-form-input type="number" v-model="price" required id="price"></b-form-input>
                </b-form-group>
              </b-col>

              <b-col md="3" class="d-flex align-items-end">
                <div class="tambah">
                  <b-button type="submit" variant="primary">Tambah</b-button>
                </div>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </div>
      <hr class="solid-line" />
      <b-card class="ms-2">
        <div class="row ms-1 mt-3">
          <h5>Transaksi untuk {{ selectedOutlet }}</h5>
          <b-table :items="transactions" :fields="fields" class="ms-1"></b-table>
        </div>
      </b-card>
      <hr class="solid-line" />
      <div class="row download">
        <div class="col-md-6 mb-4 me-0">
          <h5>DOWNLOAD LAPORAN PENJUALAN</h5>
          <b-button @click="generateExpenseReport" variant="primary">Download</b-button>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "ManagePenjualan",

  data() {
    return {
      product: "",
      quantity: 0,
      price: 0,
      selectedOutlet: "",
      transactions: [],
      categories: ["Menu-1", "Menu-2", "Menu-3", "Menu-4"],
      outlets: [
        { value: "Outlet A", text: "Outlet A" },
        { value: "Outlet B", text: "Outlet B" },
        { value: "Outlet C", text: "Outlet C" },
        { value: "Outlet D", text: "Outlet D" },
      ],
      fields: [
        { key: "product", label: "Nama Produk" },
        { key: "quantity", label: "Jumlah" },
        { key: "price", label: "Harga" },
        { key: "total", label: "Total" },
      ],
    };
  },
  methods: {
    addTransaction() {
      const total = this.quantity * this.price;
      const newTransaction = {
        outlet: this.selectedOutlet,
        product: this.product,
        quantity: this.quantity,
        price: this.price,
        total,
      };
      console.log("Transaksi baru:", newTransaction); // Tambahkan log
      this.transactions.push(newTransaction);
      this.product = "";
      this.quantity = 0;
      this.price = 0;
    },

    generateExpenseReport() {
      // Logika untuk menghasilkan laporan
      console.log("Menghasilkan laporan untuk", this.selectedOutlet);
    },
  },
};
</script>

<style scoped>
/* Tambahkan styling jika diperlukan */
</style>
