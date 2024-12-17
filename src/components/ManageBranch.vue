<template>
  <b-container>
    <div class="sub-title">
      <div class="row container">
        <h5>DAFTAR CABANG</h5>

        <!-- Form Tambah Outlet -->
        <b-card class="ms-2 mb-3">
          <b-form @submit.prevent="submitOutlet">
            <b-form-group label="Nama Outlet" label-for="outletName" class="mb-3">
              <b-form-input v-model="newOutlet.outlet_name" id="outletName" required placeholder="Masukkan nama outlet"></b-form-input>
            </b-form-group>
            <b-form-group label="Lokasi Outlet" label-for="outletLocation" class="mb-3">
              <b-form-input v-model="newOutlet.outlet_location" id="outletLocation" required placeholder="Masukkan lokasi outlet"></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Tambah Cabang</b-button>
          </b-form>
        </b-card>

        <hr class="solid-line" />
        <div class="row download">
          <div class="col-md-6 mb-5">
            <h5>DOWNLOAD DATA CABANG</h5>
            <b-button @click="generateExpenseReport" variant="primary">Download</b-button>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newOutlet: {
        outlet_name: "",
        outlet_location: "",
      },
      outlets: {
        name: [],
        outlet: [],
      },
    };
  },
  methods: {
    async submitOutlet() {
      if (!this.newOutlet.outlet_name.trim() || !this.newOutlet.outlet_location.trim()) {
        alert("Nama dan lokasi outlet harus diisi.");
        return;
      }

      try {
        const response = await fetch("http://localhost/UMKM-API/addOutlet.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.newOutlet),
        });
        const result = await response.json();

        if (result.success) {
          alert(result.message);
          this.newOutlet.outlet_name = "";
          this.newOutlet.outlet_location = "";
          this.fetchOutlets();
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error adding outlet:", error);
        alert("Terjadi kesalahan saat menambahkan outlet.");
      }
    },

    async fetchOutlets() {
      try {
        const response = await axios.get("http://localhost/UMKM-API/getOutlet.php");
        console.log("Fetched outlets:", response.data); // Tambahkan log untuk memastikan data diterima
        if (response.data && response.data.length > 0) {
          this.outlets = response.data.filter((outlet) => outlet.name && outlet.location);
        } else {
          console.warn("Data outlet kosong atau tidak valid");
          alert("Data outlet tidak ditemukan.");
        }
      } catch (error) {
        console.error("Error fetching outlets:", error);
      }
    },

    convertToCSV(data) {
      const header = Object.keys(data[0]).join(",") + "\n";
      const rows = data
        .map((item) => {
          return Object.values(item).join(",");
        })
        .join("\n");

      return header + rows;
    },

    generateExpenseReport() {
      if (this.outlets.length === 0) {
        alert("Tidak ada data outlet untuk diunduh.");
        return;
      }

      const csvContent = this.convertToCSV(this.outlets);
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");

      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "Data-cabang.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
  mounted() {
    this.fetchOutlets();
  },
};
</script>
