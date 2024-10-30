<template>
  <b-container>
    <div class="sub-title">
      <div class="row container">
        <h5 class="mt-3">DAFTAR STOK BAHAN</h5>
        <!-- Tabel Barang -->
        <b-table :items="items" :fields="fields" class="mb-4">
          <!-- Kolom untuk Riwayat Stok -->
          <template #cell(riwayat)="row">
            <b-button @click="toggleRiwayat(row.index)" variant="primary" size="sm">
              {{ row.item.showRiwayat ? "Tutup Riwayat" : "Lihat Riwayat" }}
            </b-button>
            <b-collapse :visible="row.item.showRiwayat">
              <ul class="list-group mt-2">
                <li class="list-group-item" v-for="riwayat in row.item.riwayat" :key="riwayat.Tanggal">
                  <strong>Tanggal:</strong> {{ riwayat.Tanggal }} - <strong>Jumlah:</strong> {{ riwayat.Jumlah }} - <strong>Keterangan:</strong> {{ riwayat.Keterangan }}
                </li>
              </ul>
            </b-collapse>
          </template>

          <!-- Kolom untuk Tambah/Kurang Stok -->
          <template #cell(Stok)="row">
            <div class="d-flex align-items-center">
              <b-button @click="updateStok(row.index, -1)" variant="danger" size="sm">-</b-button>
              <span class="mx-2">{{ row.item.Stok }}</span>
              <b-button @click="updateStok(row.index, 1)" variant="success" size="sm">+</b-button>
            </div>
          </template>
        </b-table>

        <!-- Tombol untuk Menampilkan Formulir Tambah Barang -->
        <b-button @click="showForm = !showForm" variant="info" class="bg-primary text-light mb-2 ms-2">
          {{ showForm ? hidden : "Tambah Barang Baru" }}
        </b-button>

        <!-- Formulir untuk Menambahkan Barang Baru -->
        <b-collapse v-model="showForm">
          <h5>Masukan Stock Barang</h5>
          <b-card class="p-2 mb-3">
            <b-form @submit.prevent="addNewItem">
              <b-form-group label="ID Barang" label-for="id-barang">
                <b-form-input id="id-barang" v-model="newItem.ID_Barang" required></b-form-input>
              </b-form-group>
              <b-form-group label="Nama Barang" label-for="nama-barang">
                <b-form-input id="nama-barang" v-model="newItem.Nama_Barang" required></b-form-input>
              </b-form-group>
              <b-form-group label="Kategori" label-for="kategori-barang">
                <b-form-input id="kategori-barang" v-model="newItem.Kategori" required></b-form-input>
              </b-form-group>
              <b-form-group label="Stok" label-for="stok-barang">
                <b-form-input id="stok-barang" type="number" v-model="newItem.Stok" required></b-form-input>
              </b-form-group>
              <b-form-group label="Satuan" label-for="satuan-barang">
                <b-form-input id="satuan-barang" v-model="newItem.Satuan" required></b-form-input>
              </b-form-group>
              <b-form-group label="Harga Satuan" label-for="harga-satuan">
                <b-form-input id="harga-satuan" type="number" v-model="newItem.Harga_Satuan" required></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary" class="mt-3">Tambah Barang</b-button>
            </b-form>
          </b-card>
        </b-collapse>
      </div>
      <hr class="solid-line" />
      <div class="row download">
        <div class="col-md-6 mb-4">
          <h5>DOWNLOAD DAFTAR STOK BAHAN</h5>
          <b-button @click="generateExpenseReport" variant="primary">Download</b-button>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "StokBahan",
  data() {
    return {
      showForm: false, // Menyimpan status visibilitas formulir
      items: [
        {
          ID_Barang: "BRG001",
          Nama_Barang: "Tepung Terigu",
          Kategori: "Bahan Baku",
          Stok: 100,
          Satuan: "kg",
          Harga_Satuan: 15000,
          riwayat: [
            { Tanggal: "2024-09-30", Jumlah: -10, Keterangan: "Digunakan untuk produksi" },
            { Tanggal: "2024-09-28", Jumlah: 50, Keterangan: "Pembelian dari pemasok" },
          ],
          showRiwayat: false,
        },
        {
          ID_Barang: "BRG002",
          Nama_Barang: "Gula Pasir",
          Kategori: "Bahan Baku",
          Stok: 200,
          Satuan: "kg",
          Harga_Satuan: 12000,
          riwayat: [
            { Tanggal: "2024-09-29", Jumlah: -30, Keterangan: "Digunakan untuk produksi" },
            { Tanggal: "2024-09-27", Jumlah: 100, Keterangan: "Pembelian dari pemasok" },
          ],
          showRiwayat: false,
        },
      ],
      fields: [
        { key: "ID_Barang", label: "ID Barang" },
        { key: "Nama_Barang", label: "Nama Barang" },
        { key: "Kategori", label: "Kategori" },
        { key: "Stok", label: "Stok" },
        { key: "Satuan", label: "Satuan" },
        { key: "Harga_Satuan", label: "Harga (Rp)" },
        { key: "riwayat", label: "Riwayat Stok" },
      ],
      newItem: {
        ID_Barang: "",
        Nama_Barang: "",
        Kategori: "",
        Stok: 0,
        Satuan: "",
        Harga_Satuan: 0,
        riwayat: [],
        showRiwayat: false,
      },
    };
  },
  methods: {
    toggleRiwayat(index) {
      this.items[index].showRiwayat = !this.items[index].showRiwayat;
    },
    updateStok(index, amount) {
      const item = this.items[index];

      // Pastikan stok tidak negatif
      if (amount < 0 && item.Stok <= 0) {
        alert("Stok tidak bisa dikurangi lagi, stok sudah habis!");
        return;
      }

      // Update stok langsung pada key Stok
      item.Stok += amount;

      // Tambahkan ke riwayat stok
      const riwayatItem = {
        Tanggal: new Date().toISOString().slice(0, 10),
        Jumlah: amount,
        Keterangan: amount > 0 ? "Penambahan Stok" : "Pengurangan Stok",
      };
      item.riwayat.push(riwayatItem);
    },
    // Metode untuk menambah barang baru
    addNewItem() {
      const newItemCopy = { ...this.newItem }; // Salin item baru
      newItemCopy.riwayat.push({
        Tanggal: new Date().toISOString().slice(0, 10),
        Jumlah: newItemCopy.Stok,
        Keterangan: "Stok Awal",
      });

      this.items.push(newItemCopy); // Tambahkan ke daftar item
      this.resetForm(); // Reset form setelah menambah barang
    },
    // Reset form setelah barang ditambahkan
    resetForm() {
      this.newItem = {
        ID_Barang: "",
        Nama_Barang: "",
        Kategori: "",
        Stok: 0,
        Satuan: "",
        Harga_Satuan: 0,
        riwayat: [],
        showRiwayat: false,
      };
      this.showForm = false; // Sembunyikan formulir setelah menambah barang
    },
  },
};
</script>
<style scoped></style>
