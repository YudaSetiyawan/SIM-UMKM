<template>
  <b-container>
    <div class="sub-title">
      <div class="row container">
        <h5 class="mt-3">EXPORT DATA PERUSAHAAN</h5>
        <b-card @submit.prevent="addExpense" class="ms-2">
          <div class="form-group">
            <label for="exportFormat">Pilih Format Ekspor:</label>
            <select id="exportFormat" v-model="exportFormat" class="form-control">
              <option value="csv">CSV</option>
              <option value="excel">Excel</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

          <!-- Filter Rentang Tanggal -->
          <div class="form-group">
            <label for="dateRange">Rentang Tanggal:</label>
            <input type="date" id="startDate" v-model="startDate" class="form-control" placeholder="Tanggal Mulai" />
            <input type="date" id="endDate" v-model="endDate" class="form-control mt-2" placeholder="Tanggal Akhir" />
          </div>

          <!-- Filter Cabang -->
          <div class="form-group">
            <label for="branchFilter">Cabang:</label>
            <select id="branchFilter" v-model="selectedBranch" class="form-control">
              <option value="all">Semua Cabang</option>
              <option v-for="branch in branches" :key="branch.id" :value="branch.id">{{ branch.name }}</option>
            </select>
          </div>

          <!-- Opsi Orientasi PDF (hanya jika format PDF dipilih) -->
          <div v-if="exportFormat === 'pdf'" class="form-group mt-2">
            <label>Orientasi PDF:</label>
            <select v-model="pdfOrientation" class="form-control">
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </div>

          <!-- Tombol Ekspor -->
          <button @click="exportData" class="btn btn-primary mt-2">Ekspor Data</button>

          <!-- Pratinjau Data yang akan diekspor -->
          <div v-if="showPreview" class="table-responsive mt-4">
            <h4>Pratinjau Data:</h4>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Jabatan</th>
                  <th>Cabang</th>
                  <th>Tanggal Bergabung</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="employee in filteredEmployees" :key="employee.id">
                  <td>{{ employee.name }}</td>
                  <td>{{ employee.position }}</td>
                  <td>{{ employee.branch }}</td>
                  <td>{{ employee.joinDate }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Notifikasi jika ekspor berhasil -->
          <div v-if="exportSuccess" class="alert alert-success mt-2">Data berhasil diekspor ke format {{ exportFormat.toUpperCase() }}.</div>

          <!-- Notifikasi jika tidak ada data -->
          <div v-if="!filteredEmployees.length && showPreview" class="alert alert-warning mt-2">Tidak ada data yang sesuai dengan filter yang dipilih.</div>
        </b-card>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "ExportData",
  data() {
    return {
      exportFormat: "csv", // Default format ekspor
      startDate: "",
      endDate: "",
      selectedBranch: "all",
      branches: [
        // Contoh data cabang
        { id: "1", name: "Cabang Jakarta" },
        { id: "2", name: "Cabang Surabaya" },
      ],
      employees: [
        // Contoh data karyawan
        { id: 1, name: "John Doe", position: "Manager", branch: "Cabang Jakarta", joinDate: "2023-01-01" },
        { id: 2, name: "Jane Smith", position: "Supervisor", branch: "Cabang Surabaya", joinDate: "2023-03-15" },
      ],
      filteredEmployees: [], // Data karyawan yang telah difilter
      showPreview: false, // Kontrol untuk pratinjau data
      exportSuccess: false, // Indikator ekspor sukses
      pdfOrientation: "portrait", // Default PDF orientation
    };
  },
  methods: {
    // Filter data karyawan berdasarkan filter yang dipilih
    filterData() {
      this.filteredEmployees = this.employees.filter((employee) => {
        // Filter berdasarkan cabang
        const branchFilter = this.selectedBranch === "all" || employee.branch === this.getBranchName(this.selectedBranch);
        // Filter berdasarkan tanggal
        const dateFilter = (!this.startDate || new Date(employee.joinDate) >= new Date(this.startDate)) && (!this.endDate || new Date(employee.joinDate) <= new Date(this.endDate));
        return branchFilter && dateFilter;
      });

      this.showPreview = true; // Tampilkan pratinjau data setelah filter
    },

    // Metode untuk mendapatkan nama cabang berdasarkan ID
    getBranchName(branchId) {
      const branch = this.branches.find((branch) => branch.id === branchId);
      return branch ? branch.name : "";
    },

    // Proses ekspor data
    exportData() {
      // Filter data sebelum ekspor
      this.filterData();

      if (!this.filteredEmployees.length) {
        this.exportSuccess = false;
        return; // Tidak ada data yang akan diekspor
      }

      // Ekspor sesuai dengan format yang dipilih
      if (this.exportFormat === "csv") {
        this.exportToCSV();
      } else if (this.exportFormat === "excel") {
        this.exportToExcel();
      } else if (this.exportFormat === "pdf") {
        this.exportToPDF();
      }

      // Tampilkan notifikasi sukses
      this.exportSuccess = true;
    },

    // Ekspor data ke format CSV
    exportToCSV() {
      // Implementasi ekspor CSV
      const csvContent = this.generateCSVContent();
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "data_karyawan.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    // Ekspor data ke format Excel
    exportToExcel() {
      // Implementasi ekspor Excel (dapat menggunakan library eksternal seperti SheetJS)
      alert("Fungsi ekspor ke Excel belum diimplementasikan");
    },

    // Ekspor data ke format PDF
    exportToPDF() {
      // Implementasi ekspor PDF (dapat menggunakan library eksternal seperti jsPDF)
      alert("Fungsi ekspor ke PDF belum diimplementasikan");
    },

    // Membuat konten CSV berdasarkan data yang difilter
    generateCSVContent() {
      const header = ["Nama", "Jabatan", "Cabang", "Tanggal Bergabung"];
      const rows = this.filteredEmployees.map((employee) => [employee.name, employee.position, employee.branch, employee.joinDate]);

      let csvContent = header.join(",") + "\n";
      rows.forEach((row) => {
        csvContent += row.join(",") + "\n";
      });

      return csvContent;
    },
  },
};
</script>
