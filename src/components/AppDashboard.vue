<template>
  <b-container fluid>
    <div class="sub-title">
      <h5 class="mt-3">RINGKASAN KEUANGAN</h5>

      <!-- B-Card dengan style 3D dan background primary -->
      <b-card class="custom-card text-white">
        <b-row class="dashboard">
          <!-- Kolom pertama -->
          <b-col xs="12" sm="6" md="3" class="hover-col text-center">
            <b-card-text>Total Pemasukan <br /><strong>Rp 10.000.000</strong></b-card-text>
          </b-col>

          <!-- Kolom kedua -->
          <b-col xs="12" sm="6" md="3" class="hover-col text-center">
            <b-card-text>Total Pengeluaran <br /><strong>Rp 10.000.000</strong></b-card-text>
          </b-col>

          <!-- Kolom ketiga -->
          <b-col xs="12" sm="6" md="3" class="hover-col text-center">
            <b-card-text>Keuntungan <br /><strong>Rp 10.000.000</strong></b-card-text>
          </b-col>

          <!-- Kolom keempat -->
          <b-col xs="12" sm="6" md="3" class="hover-col text-center">
            <b-card-text>Kerugian <br /><strong>Rp 0</strong></b-card-text>
          </b-col>
        </b-row>
      </b-card>

      <hr class="solid-line" />

      <!-- Bagian Grafik -->
      <div>
        <h5>GRAFIK PENJUALAN</h5>
        <div class="chart-container d-flex justify-content-center align-items-center">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import { Chart, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from "chart.js";

// Daftarkan skala, controller, dan elemen yang diperlukan
Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

export default {
  name: "AppDashboard",

  mounted() {
    const ctx = document.getElementById("myChart").getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Penjualan",
            data: [10, 20, 30, 40, 50, 60],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true, // Membuat chart responsif
        maintainAspectRatio: false, // Memungkinkan ukuran fleksibel
      },
    });
  },
};
</script>

<style scoped></style>
