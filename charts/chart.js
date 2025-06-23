const chartContainer = document.querySelector(".chart");
const canvas = document.getElementById("myChart");
const ctx = canvas.getContext("2d");

let chartInstance;
let chartInstance2;

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

// 🔹 Fetch sales data on page load
fetch("chart.php")
  .then((response) => response.json())
  .then((data) => {
    createChart(data, "bar");
    window.chartData = data;
  });

// 🔹 Render sales chart
function createChart(chartData, type) {
  if (chartInstance) {
    chartInstance.destroy();
  }

  const colors = generateColors(chartData.length);

  const datasetConfig = {
    label: "Total Sales (₱)",
    data: chartData.map((row) => parseFloat(row.total_sales)),
    backgroundColor: colors,
    borderColor: "#555",
    borderWidth: 1,
    fill: false,
    tension: 0.0
  };

  const config = {
    type: type,
    data: {
      labels: type === "pie"
        ? chartData.map(row => row.product_name)
        : chartData.map(row => row.product_name.split(" ")),
      datasets: [datasetConfig]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: { top: 20, bottom: 20, left: 20, right: 20 }
      },
      scales: type !== "pie" ? {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Total Sales"
          }
        },
        x: {
          title: {
            display: true,
            text: "Product"
          },
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0,
            align: "center",
            padding: 10
          }
        }
      } : {},
      plugins: {
        title: {
          display: true,
          text: "Total Sales by Product Name",
          font: { size: 18 }
        },
        legend: {
          display: type === "pie",
          position: "right",
          labels: {
            boxWidth: 20,
            padding: 15,
            font: { size: 14 }
          }
        }
      }
    }
  };

  chartInstance = new Chart(ctx, config);
}

// 🔁 Change chart type for sales chart
function changeChartType(newType) {
  createChart(window.chartData, newType);
}

// 🔁 Change chart type for category chart
function changeCategoryChartType(newType) {
  createCategoryChart(window.categoryChartData, newType);
}

// 🔹 Load category chart data
function loadCategoryChart(type = "bar") {
  fetch("quantity_by_category.php")
    .then((response) => response.json())
    .then((data) => {
      createCategoryChart(data, type);
      window.categoryChartData = data;
    });
}

// 🔹 Render category chart
function createCategoryChart(chartData, type) {
  const canvas2 = document.getElementById("myChart2").getContext("2d");

  if (chartInstance2) {
    chartInstance2.destroy();
  }

  const colors = generateColors(chartData.length);

  const datasetConfig = {
    label: "Quantity Sold",
    data: chartData.map(row => row.total_quantity),
    backgroundColor: colors,
    borderColor: "#555",
    borderWidth: 1,
    fill: false,
    tension: 0.3
  };

  const config = {
    type: type,
    data: {
      labels: type === "pie"
        ? chartData.map(row => row.category)
        : chartData.map(row => row.category.split(" ")),
      datasets: [datasetConfig]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: { top: 20, bottom: 20, left: 20, right: 20 }
      },
      scales: type !== "pie" ? {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Quantity"
          }
        },
        x: {
          title: {
            display: true,
            text: "Category"
          },
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0,
            align: "center",
            padding: 10
          }
        }
      } : {},
      plugins: {
        title: {
          display: true,
          text: "Quantity Sold by Product Category",
          font: { size: 18 }
        },
        legend: {
          display: type === "pie",
          position: "right",
          labels: {
            boxWidth: 20,
            padding: 15,
            font: { size: 14 }
          }
        }
      }
    }
  };

  chartInstance2 = new Chart(canvas2, config);
}

// 🔘 Toggle visibility: show category chart
function showCategoryChart() {
  document.getElementById("salesChart").style.display = "none";
  document.getElementById("categoryChart").style.display = "flex";
  loadCategoryChart(document.getElementById("categoryChartType").value);
}

// 🔘 Toggle visibility: show sales chart
function showSalesChart() {
  document.getElementById("categoryChart").style.display = "none";
  document.getElementById("salesChart").style.display = "flex";
  createChart(window.chartData, document.getElementById("chartTypeSelector").value);
}
