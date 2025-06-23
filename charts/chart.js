const chartContainer = document.querySelector(".chart");
const canvas = document.getElementById("myChart");
const ctx = canvas.getContext("2d");

let chartInstance;

// 🔹 Generate HSL-based unique colors
function generateColors(count) {
  const colors = [];
  const saturation = 65;
  const lightness = 60;

  for (let i = 0; i < count; i++) {
    const hue = (i * (360 / count)) % 360;
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }

  return colors;
}

// 🔹 Fetch chart data on page load
fetch("chart.php")
  .then((response) => response.json())
  .then((data) => {
    createChart(data, "bar");
    window.chartData = data;
  });

function createChart(chartData, type) {
  if (chartInstance) {
    chartInstance.destroy(); // 🔹 Remove previous chart instance
  }

  // Let CSS control height
  chartContainer.style.height = "";

  // 🔹 Generate dynamic colors based on number of data points
  const colors = generateColors(chartData.length);

  const datasetConfig = {
    label: "Total Sales (₱)",
    data: chartData.map((row) => parseFloat(row.total_sales)),
    backgroundColor: colors,        // Apply full color set
    borderColor: "#555",
    borderWidth: 1,
    fill: false,
    tension: 0.0 // smooth line if line chart
  };

  const config = {
    type: type,
    data: {
      labels: type === "pie"
        ? chartData.map(row => row.product_name)               // 🔹 pie: regular labels
        : chartData.map(row => row.product_name.split(" ")),   // 🔹 bar/line: multi-line labels
      datasets: [datasetConfig]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 20,
          bottom: 20,
          left: 20,
          right: 20
        }
      },
      scales: type !== "pie" ? {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Total Sales",
          },
        },
        x: {
          title: {
            display: true,
            text: "Product",
          },
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0,
            align: "center",
            padding: 10
          }
        },
      } : {},
      plugins: {
        title: {
          display: true,
          text: "Total Sales by Product Name",
          font: {
            size: 18,
          },
        },
        legend: {
          display: type === "pie",
          position: "right",
          labels: {
            boxWidth: 20,
            padding: 15,
            font: {
              size: 14,
            }
          }
        }
      }
    }
  };

  chartInstance = new Chart(ctx, config);
}

// 🔹 Called by dropdown to change chart type
function changeChartType(newType) {
  createChart(window.chartData, newType);
}
