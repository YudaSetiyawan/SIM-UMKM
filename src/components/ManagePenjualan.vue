<template>
  <b-container>
    <div class="sub-title">
      <div class="row container">
        <h5 class="mt-3">HASIL PENJUALAN MINGGUAN</h5>
        <!-- Pencatatan Transaksi Penjualan -->
        <b-card class="ms-2">
          <b-form @submit.prevent="addSale">
            <!-- Pilih Outlet -->
            <b-form-group label="Pilih Outlet" label-for="outlet-select" class="mb-0">
              <b-form-select id="outlet-select" v-model="selectedOutlet">
                <option v-for="outlet in outlets" :value="outlet.id" :key="outlet.id">
                  {{ outlet.name }}
                </option>
              </b-form-select>
            </b-form-group>

            <hr class="solid-line" />

            <b-row>
              <!-- Nama Produk -->
              <b-col md="4">
                <b-form-group label="Nama Produk" label-for="product-select" class="mb-0">
                  <b-form-select id="product-select" v-model="selectedProduct">
                    <option v-for="product in products" :key="product.id" :value="product.id">
                      {{ product.name }}
                    </option>
                  </b-form-select>
                </b-form-group>
              </b-col>

              <!-- Harga -->
              <b-col md="4">
                <b-form-group label="Harga" label-for="price" class="mb-0">
                  <b-form-input type="text" v-model="formattedPrice" required id="price" readonly></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row class="mt-3">
              <!-- Jumlah -->
              <b-col md="4">
                <b-form-group label="Jumlah" label-for="quantity" class="mb-0">
                  <b-form-input type="number" v-model="quantity" required id="quantity" @focus="removeZeroIfNeeded"></b-form-input>
                </b-form-group>
              </b-col>

              <!-- Total Harga -->
              <b-col md="4">
                <b-form-group label="Total Harga" label-for="total-price" class="mb-0">
                  <b-form-input type="text" v-model="formattedTotalPrice" required id="total-price" readonly></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <!-- Tombol Submit -->
            <b-row>
              <b-col md="8" class="d-flex align-items-end mt-3">
                <div class="tambah">
                  <button type="submit" class="btn btn-primary">Tambah</button>
                </div>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </div>
      <hr class="solid-line" />
      <div class="row download">
        <div class="col-md-6 mb-4 me-0">
          <h5>DOWNLOAD LAPORAN PENJUALAN</h5>
          <b-button @click="reportSales" variant="primary">Download</b-button>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ManagePenjualan",

  data() {
    return {
      products: [], // Semua produk akan ditampilkan
      selectedProduct: "",
      selectedProductName: "",
      selectedProductPrice: 0,
      quantity: 0,
      selectedOutlet: "",
      selectedOutletName: "",
      outlets: [],
    };
  },

  computed: {
    formattedPrice: {
      get() {
        return this.selectedProductPrice ? this.formatCurrency(this.selectedProductPrice) : "";
      },
      set(value) {
        this.selectedProductPrice = this.parseCurrency(value);
      },
    },
    formattedTotalPrice: {
      get() {
        const total = this.selectedProductPrice * this.quantity;
        return this.formatCurrency(total);
      },
    },
  },

  watch: {
    selectedProduct(newProductId) {
      const selectedProduct = this.products.find((product) => product.id === newProductId);
      if (selectedProduct) {
        this.selectedProductPrice = selectedProduct.price;
        this.selectedProductName = selectedProduct.name; // Set product name
      } else {
        this.selectedProductPrice = 0;
        this.selectedProductName = "";
      }
    },

    selectedOutlet(newOutletId) {
      const selectedOutlet = this.outlets.find((outlet) => outlet.id === newOutletId);
      if (selectedOutlet) {
        this.selectedOutletName = selectedOutlet.name; // Set outlet name
      } else {
        this.selectedOutletName = "";
      }
    },
  },

  methods: {
    async fetchOutlets() {
      try {
        const response = await axios.get("http://localhost/UMKM-API/getOutlet.php");
        if (response.data && response.data.length > 0) {
          this.outlets = response.data.map((outlet, index) => {
            return { ...outlet, id: index + 1 }; // Menambahkan ID berdasarkan indeks
          });
        } else {
          alert("Data outlet tidak ditemukan.");
        }
      } catch (error) {
        console.error("Error fetching outlets:", error);
      }
    },

    async fetchProducts() {
      try {
        const response = await axios.get("http://localhost/UMKM-API/getProduct.php");
        if (response.data && response.data.length > 0) {
          this.products = response.data;
        } else {
          alert("Data produk tidak ditemukan.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

    formatCurrency(value) {
      return value.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
    },

    parseCurrency(value) {
      return parseInt(value.replace(/[^\d]/g, ""), 10);
    },

    removeZeroIfNeeded() {
      if (this.quantity === 0) {
        this.quantity = "";
      }
    },

    // Fungsi untuk mendownload laporan penjualan
    reportSales() {
      // URL untuk endpoint laporan
      const url = "http://localhost/UMKM-API/dataSales.php"; // Ganti dengan path API Anda

      // Membuat link sementara untuk download
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.click();
    },
    resetForm() {
      this.selectedOutlet = null;
      this.selectedProduct = null;
      this.quantity = 0;
      this.selectedProductPrice = 0;
    },

    async addSale() {
      const saleData = {
        outlet_id: this.selectedOutlet || null,
        outlet_name: this.selectedOutletName, // Kirim outlet name
        product_id: this.selectedProduct,
        product_name: this.selectedProductName, // Kirim product name
        price: this.selectedProductPrice,
        quantity: this.quantity,
        total_price: this.selectedProductPrice * this.quantity,
      };

      try {
        const response = await axios.post("http://localhost/UMKM-API/saveSales.php", saleData);
        if (response.data.status === "success") {
          alert(response.data.message);
          this.resetForm();
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error adding sale:", error);
        alert("Terjadi kesalahan.");
      }
    },
  },

  mounted() {
    this.fetchOutlets();
    this.fetchProducts();
  },
};
</script>
<style scoped>
.custom-select {
  width: 25%; /* Membuat select lebar penuh */
  padding: 3px; /* Memberikan padding untuk kenyamanan */
  border: 1px solid #ccc; /* Border yang lebih jelas */
  border-radius: 4px; /* Membuat sudut sedikit membulat */
}

.custom-select:disabled {
  background-color: #f9f9f9; /* Memberikan warna latar belakang saat disabled */
  color: #999; /* Merubah warna teks saat disabled */
}
</style>
