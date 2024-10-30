<template>
  <b-container>
    <div class="sub-title">
      <div class="row container">
        <h5 class="mt-3">DAFTAR CABANG</h5>
        <!-- Daftar Cabang -->
        <b-card @submit.prevent="addExpense" class="ms-2 mb-3">
          <table class="table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Kota</th>
                <th>Kontak</th>
                <th>Manager</th>
                <th>Status</th>
                <th class="col-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(branch, index) in branches" :key="branch.id">
                <td>{{ branch.name }}</td>
                <td>{{ branch.address }}</td>
                <td>{{ branch.city }}</td>
                <td>{{ branch.phone }}</td>
                <td>{{ branch.manager }}</td>
                <td>{{ branch.status }}</td>
                <td>
                  <button @click="editBranch(index)" class="btn btn-warning btn-sm p-1 me-2">Edit</button>
                  <button @click="deleteBranch(index)" class="btn btn-danger btn-sm">Hapus</button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-card>

        <!-- Tombol untuk Menampilkan Formulir Tambah Barang -->
        <b-button @click="showForm = !showForm" variant="info" class="bg-primary text-light mb-2 ms-2">
          {{ showForm ? hidden : "Tambah Cabang Baru" }}
        </b-button>
        <!-- Formulir Tambah daftar cabang -->
        <b-collapse v-model="showForm">
          <h5>Masukan data Cabang Baru</h5>
          <b-card @submit.prevent="addExpense" class="ms-2">
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label>Nama</label>
                <input v-model="newBranch.name" type="text" class="form-control" required />
              </div>
              <div class="form-group">
                <label>Alamat</label>
                <input v-model="newBranch.address" type="text" class="form-control" required />
              </div>

              <div class="form-group">
                <label>Kota</label>
                <input v-model="newBranch.city" type="text" class="form-control" required />
              </div>
              <div class="form-group">
                <label>Kontak</label>
                <input v-model="newBranch.phone" type="text" class="form-control" required />
              </div>
              <div class="form-group">
                <label>Manager</label>
                <input v-model="newBranch.manager" type="text" class="form-control" required />
              </div>
              <div class="form-group">
                <label>Status</label>
                <select v-model="newBranch.status" class="form-control">
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                </select>
              </div>
              <div class="mt-3">
                <button type="submit" class="btn btn-primary">{{ editBranchIndex !== null ? "Simpan" : "Tambah Cabang" }}</button>
              </div>
            </form>
          </b-card>
        </b-collapse>
      </div>
      <hr class="solid-line" />
      <div class="row download mb-5">
        <div class="col-md-6">
          <h5>DOWNLOAD DAFTAR CABANG</h5>
          <b-button @click="generateExpenseReport" variant="primary">Download</b-button>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "ManageBranch",
  data() {
    return {
      showForm: false, // Menyimpan status visibilitas formulir
      branches: [
        // Contoh data cabang
        {
          id: 1,
          name: "Cabang A",
          address: "Jl. Raya No. 1",
          city: "Jakarta",
          phone: "081234567890",
          manager: "John Doe",
          status: "Aktif",
        },
        {
          id: 2,
          name: "Cabang B",
          address: "Jl. Raya No. 2",
          city: "Bandung",
          phone: "081234567891",
          manager: "Jane Smith",
          status: "Aktif",
        },
      ],
      newBranch: {
        name: "",
        address: "",
        city: "",
        phone: "",
        manager: "",
        status: "Aktif",
      },
      editBranchIndex: null, // Untuk menyimpan index cabang yang sedang diedit
    };
  },
  methods: {
    submitForm() {
      if (this.editBranchIndex !== null) {
        // Update cabang yang ada
        this.branches[this.editBranchIndex] = { ...this.newBranch };
        this.editBranchIndex = null; // Reset index
      } else {
        // Tambah cabang baru
        const newBranch = {
          id: this.branches.length + 1, // Menggenerate ID secara sederhana
          ...this.newBranch,
        };
        this.branches.push(newBranch);
      }
      // Reset form
      this.resetForm();
    },
    editBranch(index) {
      this.editBranchIndex = index;
      this.newBranch = { ...this.branches[index] }; // Set form dengan data cabang yang akan diedit
    },
    deleteBranch(index) {
      if (confirm("Apakah Anda yakin ingin menghapus cabang ini?")) {
        this.branches.splice(index, 1);
      }
    },
    resetForm() {
      this.newBranch = {
        name: "",
        address: "",
        city: "",
        phone: "",
        manager: "",
        status: "Aktif",
      };
      this.showForm = false; // Sembunyikan formulir setelah menambah barang
    },
  },
};
</script>
