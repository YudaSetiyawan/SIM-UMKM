<template>
  <b-container>
    <div class="sub-title">
      <div class="row container">
        <h5 class="mt-3">DAFTAR STAFF</h5>
        <b-card @submit.prevent="addExpense" class="ms-2">
          <table class="table">
            <thead>
              <tr>
                <th class="col-2">Nama</th>
                <th class="col-1">Divisi</th>
                <th class="col-1">Status</th>
                <th class="col-1">Jabatan</th>
                <th class="col-2 text-center">Shift</th>
                <th class="col-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in employees" :key="employee.id">
                <td>{{ employee.name }}</td>
                <td>{{ employee.position }}</td>
                <td>{{ employee.department }}</td>
                <td>{{ employee.status }}</td>
                <td class="text-center">{{ employee.shiftHours }}</td>
                <!-- Menampilkan jam shift karyawan -->
                <td>
                  <button @click="downloadSlipGaji(employee.id)" type="button" class="btn btn-success btn-sm me-1">Slip</button>
                  <button @click="viewEmployee(employee.id)" type="button" class="btn btn-info btn-sm me-1">Lihat</button>
                  <button @click="editEmployee(employee.id)" type="button" class="btn btn-primary btn-sm me-1">Edit</button>
                  <button @click="deleteEmployee(employee.id)" type="button" class="btn btn-danger btn-sm">Hapus</button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-card>
      </div>
      <hr class="solid-line" />
      <div class="row download">
        <div class="col-md-6">
          <h5>DOWNLOAD DAFTAR STAFF</h5>
          <b-button @click="generateExpenseReport" variant="primary">Download</b-button>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "ManageStaff",

  data() {
    return {
      employees: [
        { id: 1, name: "John Surat", position: "Kasir", department: "F&B", status: "Aktif", shiftHours: "1" },
        { id: 2, name: "Dono Smith", position: "Manager", department: "Operasional", status: "Aktif", shiftHours: "1" },
        { id: 3, name: "Suranti Jen", position: "Acconting", department: "Operasional", status: "Cuti", shiftHours: "1" },
        { id: 4, name: "Mine Sarah", position: "Admin", department: "Operasional", status: "Aktif", shiftHours: "1" },
        // Tambahkan data karyawan lainnya
      ],
    };
  },
  methods: {
    downloadSlipGaji(employeeId) {
      // Misalnya, Anda mengambil file slip gaji dari server berdasarkan employeeId
      const slipGajiUrl = `/slip-gaji/${employeeId}`; // Sesuaikan dengan API server Anda
      const link = document.createElement("a");
      link.href = slipGajiUrl;
      link.setAttribute("download", `slip-gaji-${employeeId}.pdf`); // Nama file slip gaji
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    viewEmployee(id) {
      // Arahkan ke halaman detail karyawan
      this.$router.push(`/employees/${id}`);
    },
    editEmployee(id) {
      // Arahkan ke halaman edit karyawan
      this.$router.push(`/employees/edit/${id}`);
    },
    deleteEmployee(id) {
      // Logika untuk menghapus karyawan
      if (confirm("Apakah kamu yakin ingin menghapus karyawan ini?")) {
        this.employees = this.employees.filter((employee) => employee.id !== id);
      }
    },
  },
};
</script>
<style></style>
