fetch("summary.php")
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("totalSales").innerHTML = 
      `₱${Number(data.total_sales).toLocaleString()}<br><span>Total Sales</span>`;
    document.getElementById("totalOrders").innerHTML = 
      `${data.total_orders}<br><span>Total Orders</span>`;
    document.getElementById("topLocation").innerHTML =
      `${data.top_location}<br><span>Top Location</span>`;
    document.getElementById("topProduct").innerHTML = 
      `${data.top_product}<br><span>Top Product</span>`;
  });

const chartContainer = document.querySelector(".chart");
const canvas = document.getElementById("myChart");
const ctx = canvas.getContext("2d");

let chartInstance;
let chartInstance2;
let chartInstance3;

// Generate HSL-based unique colors
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

// Fetch sales data on page load
fetch("chart.php")
  .then((response) => response.json())
  .then((data) => {
    createChart(data, "bar");
    window.chartData = data;
  });

// Render sales chart
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

// Change chart type for sales chart
function changeChartType(newType) {
  createChart(window.chartData, newType);
}

// Change chart type for category chart
function changeCategoryChartType(newType) {
  createCategoryChart(window.categoryChartData, newType);
}

// Load category chart data
function loadCategoryChart(type = "bar") {
  fetch("quantity_by_category.php")
    .then((response) => response.json())
    .then((data) => {
      createCategoryChart(data, type);
      window.categoryChartData = data;
    });
}

// Render category chart
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

// Load location chart
function loadLocationChart(type = "bar") {
  fetch("sales_by_location.php")
    .then(response => response.json())
    .then(data => {
      createLocationChart(data, type);
      window.locationChartData = data;
    });
}

// Render location chart
function createLocationChart(chartData, type) {
  const ctx3 = document.getElementById("myChart3").getContext("2d");

  if (chartInstance3) chartInstance3.destroy();

  const colors = generateColors(chartData.length);

  const config = {
    type: type,
    data: {
      labels: type === "pie"
        ? chartData.map(row => row.location)
        : chartData.map(row => row.location.split(" ")),
      datasets: [{
        label: "Total Sales (₱)",
        data: chartData.map(row => row.total_sales),
        backgroundColor: colors,
        borderColor: "#555",
        borderWidth: 1,
        fill: false,
        tension: 0.3
      }]
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
            text: "Location"
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
          text: "Sales by City and State",
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

  chartInstance3 = new Chart(ctx3, config);
}

// Change chart type for location chart
function changeLocationChartType(newType) {
  createLocationChart(window.locationChartData, newType);
}

// Real-time listener
if (!!window.EventSource) {
  const source = new EventSource("sse.php");

  source.addEventListener("sales", function(event) {
    const data = JSON.parse(event.data);
    window.chartData = data;
    const type = document.getElementById("chartTypeSelector").value || "bar";
    createChart(data, type);
  });

  source.addEventListener("category", function(event) {
    const data = JSON.parse(event.data);
    window.categoryChartData = data;
    const type = document.getElementById("categoryChartType").value || "bar";
    createCategoryChart(data, type);
  });

  source.addEventListener("location", function(event) {
    const data = JSON.parse(event.data);
    window.locationChartData = data;
    const type = document.getElementById("locationChartType").value || "bar";
    createLocationChart(data, type);
  });
  
  source.addEventListener("summary", function(event) {
    const data = JSON.parse(event.data);

    document.getElementById("totalSales").innerHTML =
      `₱${Number(data.total_sales).toLocaleString()}<br><span>Total Sales</span>`;
    document.getElementById("totalOrders").innerHTML =
      `${data.total_orders}<br><span>Total Orders</span>`;
    document.getElementById("totalUsers").innerHTML =
      `${data.total_users}<br><span>Total Users</span>`;
    document.getElementById("topProduct").innerHTML =
      `${data.top_product}<br><span>Top Product</span>`;
  });
}

// Toggle visibility: show category chart
function showCategoryChart() {
  document.getElementById("salesChart").style.display = "none";
  document.getElementById("locationChart").style.display = "none";
  document.getElementById("categoryChart").style.display = "flex";
  loadCategoryChart(document.getElementById("categoryChartType").value);
}

// Toggle visibility: show sales chart
function showSalesChart() {
  document.getElementById("categoryChart").style.display = "none";
  document.getElementById("locationChart").style.display = "none";
  document.getElementById("salesChart").style.display = "flex";
  createChart(window.chartData, document.getElementById("chartTypeSelector").value);
}

// Toggle visibility: show location chart
function showLocationChart() {
  document.getElementById("salesChart").style.display = "none";
  document.getElementById("categoryChart").style.display = "none";
  document.getElementById("locationChart").style.display = "flex";
  loadLocationChart(document.getElementById("locationChartType").value);
}
