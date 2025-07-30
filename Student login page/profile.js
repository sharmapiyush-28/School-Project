document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("timeDoughnutChart").getContext("2d");

  const timeSpent = [2, 3, 1.5, 4, 3.5, 2.2, 2.8];
  const total = timeSpent.reduce((sum, val) => sum + val, 0);

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{
        label: 'Weekly Time',
        data: timeSpent,
        backgroundColor: [
          "#4caf50", "#66bb6a", "#81c784",
          "#a5d6a7", "#c8e6c9", "#dcedc8", "#e8f5e9"
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          color: '#000',
          font: {
            weight: 'bold',
            size: 12
          },
          formatter: (value) => {
            return ((value / total) * 100).toFixed(1) + '%';
          }
        },
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const value = context.raw;
              const percent = ((value / total) * 100).toFixed(1);
              return `${context.label}: ${value} hrs (${percent}%)`;
            }
          }
        }
      }
    },
    plugins: [ChartDataLabels]
  });
});
