<template>
  <b-container>
    <div class="sub-title">
      <div class="row container">
        <h5 class="mt-3">DATA PENGELUARAN</h5>

        <!-- Pencatatan Transaksi Pengeluaran -->
        <b-card class="ms-2">
          <b-form @submit.prevent="submitExpense">
            <b-row>
              <!-- Pilih Kategori Pengeluaran -->
              <b-form-group label="Pengeluaran" class="mb-3">
                <b-form-select v-model="selectedCategory" @change="fetchExpenses">
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.nama_kategori }}
                  </option>
                </b-form-select>
              </b-form-group>

              <!-- Pilih Rincian Pengeluaran -->
              <b-form-group label="Rincian Pengeluaran" class="mb-3">
                <b-form-select v-model="selectedExpense" :disabled="expenses.length === 0">
                  <option v-for="expense in expenses" :key="expense.id" :value="expense.id">
                    {{ expense.nama }}
                  </option>
                </b-form-select>
              </b-form-group>

              <b-col md="4">
                <b-form-group label="Jumlah Harga" class="mb-0">
                  <b-form-input type="text" v-model="jumlah" :disabled="expenses.length === 0" required placeholder="Masukan Jumlah pengeluaran"> </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

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

      <div v-if="isLoading" class="text-center">
        <b-spinner label="Loading..."></b-spinner>
      </div>

      <h5 class="m-2">TOTAL PENGELUARAN</h5>
      <b-card class="m-2 p-3 b-card-custom">
        <!-- Header -->
        <b-row class="header-row">
          <b-col cols="1"><strong>No</strong></b-col>
          <b-col cols="3"><strong>Kategori</strong></b-col>
          <b-col cols="3"><strong>Nama</strong></b-col>
          <b-col cols="3"><strong>Periode</strong></b-col>
          <b-col cols="2"><strong>Jumlah</strong></b-col>
        </b-row>
        <hr />

        <!-- Data Rows -->
        <div v-for="expense in expensesList" :key="expense.id">
          <b-row>
            <b-col cols="1">{{ expense.id }}</b-col>
            <b-col cols="3">{{ expense.nama_kategori }}</b-col>
            <b-col cols="3">{{ expense.nama }}</b-col>
            <b-col cols="3">{{ new Date(expense.created_at).toLocaleDateString() }}</b-col>
            <b-col cols="2">Rp {{ parseInt(expense.jumlah).toLocaleString("id-ID") }}</b-col>
          </b-row>
        </div>
        <hr />

        <!-- Total -->
        <b-row class="total-row">
          <b-col cols="10"><strong>Total Pengeluaran</strong></b-col>
          <b-col cols="2">
            <strong>Rp {{ parseInt(totalExpenses).toLocaleString("id-ID") }}</strong>
          </b-col>
        </b-row>
      </b-card>

      <hr class="solid-line" />
      <div class="row download">
        <div class="col-md-6 mb-4 me-0">
          <h5>DOWNLOAD LAPORAN PENGELUARAN</h5>
          <b-button @click="reportExpenses" variant="primary">Download</b-button>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ManagePengeluaran",
  data() {
    return {
      selectedCategory: null, // ID kategori yang dipilih
      selectedExpense: null, // ID rincian pengeluaran yang dipilih
      categories: [], // Daftar kategori dari API
      expenses: [], // Daftar rincian pengeluaran yang terkait dengan kategori
      jumlah: "", // Jumlah harga pengeluaran
      expensesList: [], // Menyimpan daftar pengeluaran
      totalExpenses: 0, // Total pengeluaran
      isLoading: false, // Indikator loading
    };
  },

  methods: {
    // Fungsi untuk mendownload laporan pengeluaran dalam format CSV
    reportExpenses() {
      if (this.expensesList.length === 0) {
        alert("Tidak ada data pengeluaran untuk diunduh.");
        return;
      }

      // Siapkan data untuk CSV
      const header = ["No", "Kategori", "Nama", "Periode", "Jumlah"];
      const rows = this.expensesList.map((expense, index) => {
        return [
          index + 1, // Nomor
          expense.nama_kategori, // Kategori
          expense.nama, // Nama
          new Date(expense.created_at).toLocaleDateString("en-US"), // Periode (format MM/DD/YYYY)
          expense.jumlah, // Jumlah
        ];
      });

      // Gabungkan header dan rows menjadi CSV
      const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");

      // Buat file Blob untuk CSV
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      // Buat link untuk mengunduh file
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "laporan_pengeluaran.csv";

      // Trigger unduh file
      link.click();
      URL.revokeObjectURL(link.href);
    },

    fetchCategories() {
      // Ambil data kategori dari API
      axios
        .get("http://localhost/UMKM-API/getCategories.php")
        .then((response) => {
          this.categories = response.data; // Gunakan data API langsung
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    },

    fetchExpenses() {
      // Ambil rincian pengeluaran berdasarkan kategori yang dipilih
      if (!this.selectedCategory) return;

      axios
        .get(`http://localhost/UMKM-API/getExpensesByCategory.php?category_id=${this.selectedCategory}`)
        .then((response) => {
          this.expenses = response.data; // Gunakan data API langsung
        })
        .catch((error) => {
          console.error("Error fetching expenses:", error);
        });
    },

    submitExpense() {
      if (!this.selectedCategory || !this.selectedExpense || !this.jumlah) {
        alert("Harap isi semua data sebelum menambahkan!");
        return;
      }

      // Siapkan data untuk dikirim ke database
      const expenseData = {
        nama_kategori: this.categories.find((category) => category.id === this.selectedCategory).nama_kategori,
        nama: this.expenses.find((expense) => expense.id === this.selectedExpense).nama,
        jumlah: this.jumlah,
        created_at: new Date().toISOString(), // Timestamp saat ini
      };

      // Kirim data ke server
      axios
        .post("http://localhost/UMKM-API/addExpense.php", expenseData)
        .then(() => {
          alert("Pengeluaran berhasil ditambahkan!");
          this.resetForm(); // Reset form setelah submit berhasil

          // Panggil kembali data dari server agar halaman diperbarui
          this.fetchTotalExpenses();
        })
        .catch((error) => {
          console.error("Error adding expense:", error);
        });
    },

    fetchTotalExpenses() {
      axios
        .get("http://localhost/UMKM-API/getTotalExpenses.php")
        .then((response) => {
          this.expensesList = response.data.expenses; // List pengeluaran
          this.totalExpenses = response.data.total; // Total pengeluaran
        })
        .catch((error) => {
          console.error("Error fetching total expenses:", error);
        });
    },

    resetForm() {
      this.selectedCategory = null;
      this.selectedExpense = null;
      this.jumlah = "";
      this.expenses = [];
    },
  },

  mounted() {
    this.fetchCategories();
    this.fetchTotalExpenses();
    this.isLoading = false;
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

/* Card Styling */
.b-card-custom {
  overflow: scroll; /* Pastikan konten terlihat */
  background: linear-gradient(145deg, #f7faff, #e4e9f2); /* Gradien lembut */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Bayangan lembut */
  border-radius: 10px;
  border: none;
}
</style>
