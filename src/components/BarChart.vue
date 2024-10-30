<template>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import { Chart } from "chart.js";

export default {
  name: "BarChart",
  mounted() {
    // Inisialisasi Chart.js
    const ctx = document.getElementById("myChart").getContext("2d");

    new Chart(ctx, {
      type: "bar", // Tipe chart (bisa juga 'line', 'pie', dll.)
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Penjualan",
            data: [10, 20, 30, 40, 50, 60], // Data penjualan
            backgroundColor: "rgba(54, 162, 235, 0.5)", // Warna batang
            borderColor: "rgba(54, 162, 235, 1)", // Warna border
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true, // Agar sumbu Y dimulai dari 0
          },
        },
      },
    });
  },
};
</script>

<style scoped>
/* Tambahkan styling jika diperlukan */
</style>
