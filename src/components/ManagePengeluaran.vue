<template>
  <b-container>
    <div class="sub-title">
      <div class="row container">
        <h5 class="mt-3">RINCIAN PENGELUARAN</h5>
        <b-card @submit.prevent="addExpense" class="ms-2">
          <b-form-group label="Kategori Pengeluaran">
            <b-form-select v-model="category" :options="categories"></b-form-select>
          </b-form-group>
          <b-form-group label="Jumlah Pengeluaran">
            <b-form-input type="number" v-model="amount" required></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary" class="mt-3">Tambah</b-button><br />
        </b-card>
      </div>
      <hr class="solid-line" />
      <div class="row download">
        <div class="col-md-6">
          <h5>DOWNLOAD LAPORAN PENGELUARAN</h5>
          <b-button @click="generateExpenseReport" variant="primary">Download</b-button>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "ManagePengeluaran",

  data() {
    return {
      category: "",
      amount: 0,
      categories: ["Bahan Baku", "Sewa", "Gaji Karyawan", "Operasional"],
    };
  },
  methods: {
    addExpense() {
      // Logika untuk menambah pengeluaran
    },
    generateExpenseReport() {
      // Logika untuk membuat laporan pengeluaran
    },
  },
};
</script>
