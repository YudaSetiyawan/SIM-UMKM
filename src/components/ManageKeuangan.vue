<template>
  <b-container>
    <div class="sub-title">
      <div class="row container p-2">
        <h5 class="mt-3">LAPORAN KEUANGAN</h5>

        <!-- Render berdasarkan laporan yang aktif -->
        <b-card class="ms-2 mt-2">
          <div>
            <h5>Laporan Laba Rugi</h5>
            <table>
              <thead>
                <tr>
                  <th>Kategori</th>
                  <th>Jumlah</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in labaRugi" :key="item.kategori">
                  <td>{{ item.kategori }}</td>
                  <td>{{ formatCurrency(item.jumlah) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-card>

        <b-card class="ms-2 mt-2">
          <div>
            <h5>Laporan Arus Kas</h5>
            <table>
              <thead>
                <tr>
                  <th>Kategori</th>
                  <th>Jumlah</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in arusKas" :key="item.kategori">
                  <td>{{ item.kategori }}</td>
                  <td>{{ formatCurrency(item.jumlah) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-card>

        <b-card class="ms-2 mt-2">
          <div>
            <h5>Laporan Neraca</h5>
            <table>
              <thead>
                <tr>
                  <th>Kategori</th>
                  <th>Jumlah</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in neraca" :key="item.kategori">
                  <td>{{ item.kategori }}</td>
                  <td>{{ formatCurrency(item.jumlah) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-card>
      </div>
      <hr class="solid-line" />
      <div class="row download">
        <div class="col-md-6 mb-5">
          <h5>DOWNLOAD LAPORAN KEUANGAN</h5>
          <b-button @click="generateExpenseReport" variant="primary">Download</b-button>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "ManageKeuangan",

  data() {
    return {
      activeReport: "laba-rugi", // Tampilan default
      labaRugi: [
        { kategori: "Pendapatan", jumlah: 500000 },
        { kategori: "Beban", jumlah: 300000 },
        { kategori: "Laba Bersih", jumlah: 200000 },
      ],
      arusKas: [
        { kategori: "Kegiatan Operasional", jumlah: 150000 },
        { kategori: "Kegiatan Investasi", jumlah: -50000 },
        { kategori: "Kegiatan Pembiayaan", jumlah: 100000 },
      ],
      neraca: [
        { kategori: "Aset", jumlah: 1000000 },
        { kategori: "Kewajiban", jumlah: 400000 },
        { kategori: "Ekuitas", jumlah: 600000 },
      ],
    };
  },
  methods: {
    formatCurrency(jumlah) {
      return `Rp ${jumlah.toLocaleString()}`;
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

table,
th,
td {
  border: 1px solid black;
}

th,
td {
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
