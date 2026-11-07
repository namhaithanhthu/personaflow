<template>
  <div class="space-y-6">
    <!-- Header Summary Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white border border-[#E6E0D3] rounded-2xl p-4 shadow-2xs">
        <span class="text-[11px] font-semibold text-[#78736A] uppercase tracking-wider block">
          Tỷ Lệ Hoàn Thành TB
        </span>
        <div class="text-2xl font-bold font-mono text-[#5F7A61] mt-1">
          83.5%
        </div>
        <p class="text-[11px] text-[#78736A] mt-0.5">
          ↑ +4.2% so với tuần trước
        </p>
      </div>

      <div class="bg-white border border-[#E6E0D3] rounded-2xl p-4 shadow-2xs">
        <span class="text-[11px] font-semibold text-[#78736A] uppercase tracking-wider block">
          Tổng Giờ Làm Việc Sâu
        </span>
        <div class="text-2xl font-bold font-mono text-[#C86D51] mt-1">
          8.5 Giờ
        </div>
        <p class="text-[11px] text-[#78736A] mt-0.5">
          510 phút trong 7 ngày qua
        </p>
      </div>

      <div class="bg-white border border-[#E6E0D3] rounded-2xl p-4 shadow-2xs">
        <span class="text-[11px] font-semibold text-[#78736A] uppercase tracking-wider block">
          Chuỗi Ngày Tối Đa
        </span>
        <div class="text-2xl font-bold font-mono text-[#2C2A29] mt-1">
          14 Ngày
        </div>
        <p class="text-[11px] text-[#78736A] mt-0.5">
          Kỷ luật được giữ vững
        </p>
      </div>

      <div class="bg-white border border-[#E6E0D3] rounded-2xl p-4 shadow-2xs">
        <span class="text-[11px] font-semibold text-[#78736A] uppercase tracking-wider block">
          Điểm Phục Hồi (MVE)
        </span>
        <div class="text-2xl font-bold font-mono text-[#7D6A58] mt-1">
          92 / 100
        </div>
        <p class="text-[11px] text-[#78736A] mt-0.5">
          Không đứt chuỗi khi tụt mood
        </p>
      </div>
    </div>

    <!-- CHARTS GRID -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 7-DAY COMPLETION RATE BAR CHART -->
      <div class="bg-white border border-[#E6E0D3] rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between border-b border-[#E6E0D3] pb-3 mb-4">
            <div>
              <h4 class="font-bold text-sm text-[#2C2A29]">Tỷ Lệ Hoàn Thành Nhiệm Vụ 7 Ngày</h4>
              <p class="text-xs text-[#78736A]">Đo lường mức độ tuân thủ giao thức hàng ngày (%)</p>
            </div>
            <span class="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#EEF3EF] text-[#5F7A61]">
              Bar Chart
            </span>
          </div>

          <div class="h-64 relative">
            <canvas ref="barChartCanvas"></canvas>
          </div>
        </div>

        <div class="text-[11px] text-[#78736A] pt-3 border-t border-[#E6E0D3] mt-4">
          💡 Ngày thứ 4 có tỷ lệ thấp hơn nhưng đã bật chế độ MVE nên không bị gián đoạn chuỗi.
        </div>
      </div>

      <!-- FOCUS MINUTES TREND LINE CHART -->
      <div class="bg-white border border-[#E6E0D3] rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between border-b border-[#E6E0D3] pb-3 mb-4">
            <div>
              <h4 class="font-bold text-sm text-[#2C2A29]">Xu Hướng Thời Gian Tập Trung Sâu</h4>
              <p class="text-xs text-[#78736A]">Số phút làm việc không xao nhãng ghi nhận thực tế</p>
            </div>
            <span class="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#FAF0EB] text-[#C86D51]">
              Line Trend
            </span>
          </div>

          <div class="h-64 relative">
            <canvas ref="lineChartCanvas"></canvas>
          </div>
        </div>

        <div class="text-[11px] text-[#78736A] pt-3 border-t border-[#E6E0D3] mt-4">
          🔥 Đỉnh cao tập trung vào ngày thứ 6 với hơn 110 phút làm việc sâu liên tục.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Chart from 'chart.js/auto';
import dayjs from 'dayjs';

const barChartCanvas = ref(null);
const lineChartCanvas = ref(null);

let barChartInstance = null;
let lineChartInstance = null;

onMounted(() => {
  // Generate past 7 days labels
  const labels = [];
  for (let i = 6; i >= 0; i--) {
    labels.push(dayjs().subtract(i, 'day').format('DD/MM'));
  }

  // 1. Completion Rate Bar Chart
  if (barChartCanvas.value) {
    barChartInstance = new Chart(barChartCanvas.value, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Tỷ lệ hoàn thành (%)',
            data: [85, 75, 90, 60, 80, 95, 88],
            backgroundColor: '#5F7A61',
            borderRadius: 8,
            hoverBackgroundColor: '#4E6650',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.raw}% hoàn thành`,
            },
          },
        },
        scales: {
          y: {
            min: 0,
            max: 100,
            ticks: {
              callback: (val) => `${val}%`,
              font: { family: "'Plus Jakarta Sans', sans-serif", size: 10 },
              color: '#78736A',
            },
            grid: { color: '#E6E0D3' },
          },
          x: {
            ticks: {
              font: { family: "'Plus Jakarta Sans', sans-serif", size: 10 },
              color: '#78736A',
            },
            grid: { display: false },
          },
        },
      },
    });
  }

  // 2. Focus Minutes Line Chart
  if (lineChartCanvas.value) {
    lineChartInstance = new Chart(lineChartCanvas.value, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Phút tập trung sâu',
            data: [65, 50, 90, 45, 75, 110, 85],
            borderColor: '#C86D51',
            backgroundColor: 'rgba(200, 109, 81, 0.12)',
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#C86D51',
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.raw} phút Deep Work`,
            },
          },
        },
        scales: {
          y: {
            min: 0,
            suggestedMax: 120,
            ticks: {
              callback: (val) => `${val}m`,
              font: { family: "'Plus Jakarta Sans', sans-serif", size: 10 },
              color: '#78736A',
            },
            grid: { color: '#E6E0D3' },
          },
          x: {
            ticks: {
              font: { family: "'Plus Jakarta Sans', sans-serif", size: 10 },
              color: '#78736A',
            },
            grid: { display: false },
          },
        },
      },
    });
  }
});

onUnmounted(() => {
  if (barChartInstance) barChartInstance.destroy();
  if (lineChartInstance) lineChartInstance.destroy();
});
</script>
