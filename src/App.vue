<template>
  <div id="app">
    <!-- Main Layout -->
    <b-container fluid class="main-container">
      <!-- Sidebar Fitur (2 column) -->
      <b-row no-gutters>
        <b-col cols="2" class="sidebar bg-primary">
          <div class="user-info">
            <!-- User Profile Info -->
            <b-col cols="auto" class="user-profile-info text-center mt-3">
              <div class="profile-box">
                <div class="profile-photo">
                  <img src="https://via.placeholder.com/60" alt="Profile Picture" class="rounded-circle mx-auto" />
                </div>
                <div class="profile-details mt-2">
                  <h6>{{ userProfile.name }}</h6>
                  <p>{{ userProfile.role }}</p>
                </div>
              </div>
            </b-col>

            <div class="icons-right mt-2">
              <i class="bi bi-bell icon"></i>
              <i class="bi bi-gear icon"></i>
            </div>
          </div>

          <hr class="solid-line solid-line-width" />

          <b-nav vertical>
            <!-- Dashboard Section -->
            <b-nav-item :class="{ active: activeComponent === 'AppDashboard' }" @click="setActive('AppDashboard')" class="custom-nav-item"> <i class="bi bi-house"></i> Dashboard </b-nav-item>

            <!-- Operasional Outlet Section with Collapse -->
            <b-nav-item @click="toggleOutlet" class="custom-nav-item"> <i class="bi bi-shop"></i> Operasional Outlet </b-nav-item>

            <!-- Submenu for Operasional Outlet -->
            <b-collapse v-model="outletOpen">
              <ul class="pl-3">
                <b-nav-item :class="{ active: activeComponent === 'ManagePenjualan' }" @click="setActive('ManagePenjualan', true)" class="custom-nav-item"> <i class="bi bi-bar-chart"></i> Penjualan </b-nav-item>
                <b-nav-item :class="{ active: activeComponent === 'ManagePengeluaran' }" @click="setActive('ManagePengeluaran', true)" class="custom-nav-item"> <i class="bi bi-file-earmark-minus"></i> Pengeluaran </b-nav-item>
                <b-nav-item :class="{ active: activeComponent === 'StokBahan' }" @click="setActive('StokBahan', true)" class="custom-nav-item"> <i class="bi bi-box"></i> Stok Bahan </b-nav-item>
                <b-nav-item :class="{ active: activeComponent === 'ManageKeuangan' }" @click="setActive('ManageKeuangan', true)" class="custom-nav-item"> <i class="bi bi-cash"></i> Keuangan </b-nav-item>
                <b-nav-item :class="{ active: activeComponent === 'ManagePembayaran' }" @click="setActive('ManagePembayaran', true)" class="custom-nav-item"> <i class="bi bi-credit-card"></i> Pembayaran </b-nav-item>
              </ul>
            </b-collapse>

            <b-nav-item :class="{ active: activeComponent === 'ManageStaff' }" @click="setActive('ManageStaff')" class="custom-nav-item"> <i class="bi bi-people"></i> Manajemen Staff </b-nav-item>

            <b-nav-item :class="{ active: activeComponent === 'ManageBranch' }" @click="setActive('ManageBranch')" class="custom-nav-item"> <i class="bi bi-buildings"></i> Manajemen Cabang </b-nav-item>
            <b-nav-item :class="{ active: activeComponent === 'ExportData' }" @click="setActive('ExportData')" class="custom-nav-item"> <i class="bi bi-cloud-upload"></i> Export Data </b-nav-item>
          </b-nav>
        </b-col>

        <!-- Main Content -->
        <b-col cols="10" class="mt-2">
          <!-- Header with Menu title -->
          <b-row class="d-flex header justify-content-between align-items-end header m-2">
            <b-col cols="auto" class="d-flex align-items-center">
              <div>
                <h3>
                  <i :class="activeMenuTitle.icon" class="me-2 text-primary"></i>
                  <!-- Menampilkan ikon -->
                  {{ activeMenuTitle.title }}
                </h3>
              </div>
            </b-col>
            <!-- Search Bar Form -->
            <b-col cols="auto">
              <div>
                <b-input-group> <b-form-input v-model="searchQuery" placeholder="Search..." class="search-input"></b-form-input></b-input-group>
              </div>
            </b-col>
          </b-row>

          <b-row>
            <b-col class="main-content">
              <component :is="activeComponent"></component>
            </b-col>
          </b-row>
        </b-col>

        <b-col class="header-right">
          <b-row class="text-center">
            <b-col cols="6">
              <span>{{ formattedDate }}</span>
            </b-col>
            <b-col cols="6">
              <b-nav-item @click="handleLogout" class="logout-item"> <i class="bi bi-box-arrow-right"></i> Logout </b-nav-item>
            </b-col>
          </b-row>
          <hr class="solid-line" />
          <b-row>
            <UserNotes />
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AppDashboard from "./components/AppDashboard.vue";
import ManagePenjualan from "./components/ManagePenjualan.vue";
import ManagePengeluaran from "./components/ManagePengeluaran.vue";
import StokBahan from "./components/StokBahan.vue";
import ManageKeuangan from "./components/ManageKeuangan.vue";
import ManagePembayaran from "./components/ManagePembayaran.vue";
import ManageStaff from "./components/ManageStaff.vue";
import ManageBranch from "./components/ManageBranch.vue";
import ExportData from "./components/ExportData.vue";
import UserNotes from "./components/UserNotes.vue";

export default {
  components: {
    AppDashboard,
    ManagePenjualan,
    ManagePengeluaran,
    StokBahan,
    ManageKeuangan,
    ManagePembayaran,
    ManageStaff,
    ManageBranch,
    ExportData,
    UserNotes,
  },
  data() {
    return {
      activeComponent: "AppDashboard", // Komponen default
      outletOpen: false, // Kontrol untuk buka/tutup submenu outlet
      searchQuery: "", // Model untuk search bar
      formattedDate: this.formatDate(), // Tanggal dengan format Hari, Day Month Year
      userProfile: {
        name: "Mine Sarah", // Nama user (bisa dynamic)
        role: "Admin", // Role atau jabatan user
      },
    };
  },
  computed: {
    activeMenuTitle() {
      const menuData = {
        AppDashboard: { title: "Dashboard", icon: "bi bi-house" },
        ManagePenjualan: { title: "Penjualan", icon: "bi bi-bar-chart" },
        ManagePengeluaran: { title: "Pengeluaran", icon: "bi bi-file-earmark-minus" },
        StokBahan: { title: "Stok Bahan", icon: "bi bi-box" },
        ManageKeuangan: { title: "Keuangan", icon: "bi bi-cash" },
        ManageStaff: { title: "Manajemen Staff", icon: "bi bi-people" },
        ManagePembayaran: { title: "Pembayaran", icon: "bi bi-credit-card" },
        ManageBranch: { title: "Manajemen Cabang", icon: "bi bi-buildings" },
        ExportData: { title: "Export Data", icon: "bi bi-cloud-upload" },
      };
      return menuData[this.activeComponent] || { title: "", icon: "" };
    },
  },
  methods: {
    toggleOutlet() {
      this.outletOpen = !this.outletOpen;
    },
    setActive(component, isOutlet = false) {
      this.activeComponent = component;

      // Jika menu yang diklik bukan bagian dari Operasional Outlet, tutup submenu
      if (!isOutlet) {
        this.outletOpen = false;
      }
    },

    //     toggleOutlet method: Membuka atau menutup submenu "Operasional Outlet" secara manual saat "Operasional Outlet" diklik.
    // setActive method: Menerima argumen kedua isOutlet, yang akan mengontrol apakah submenu harus tetap terbuka atau ditutup. Jika isOutlet bernilai true, artinya item yang diklik merupakan submenu dari "Operasional Outlet" dan submenu akan tetap terbuka. Jika false (seperti ketika menu lain di sidebar diklik), submenu akan ditutup.
    // Default behavior: Jika kamu mengklik menu lain di sidebar (seperti "Dashboard", "Karyawan", "Cabang"), submenu "Operasional Outlet" akan otomatis tertutup.

    formatDate() {
      const date = new Date();
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    // Fungsi untuk menangani logout
    handleLogout() {
      // Hapus token atau sesi pengguna
      localStorage.removeItem("authToken"); // Contoh: menghapus token dari localStorage

      // Redirect ke halaman login atau landing page
      this.$router.push("/login"); // Ganti dengan rute login yang sesuai
    },
  },
};
</script>

<style></style>
