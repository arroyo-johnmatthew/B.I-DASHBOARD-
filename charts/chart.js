const chartContainer = document.querySelector(".chart");
const canvas = document.getElementById("myChart");
const ctx = canvas.getContext("2d");

let chartInstance;

fetch("chart.php")
  .then((response) => response.json())
  .then((data) => {
    createChart(data, "bar");
    window.chartData = data;
  });

function createChart(chartData, type) {
  if (chartInstance) {
    chartInstance.destroy(); // Destroy previous chart
  }

  // Adjust height depending on chart type
  if (type === "pie") {
    chartContainer.style.height = "400px";
  } else {
    chartContainer.style.height = "500px";
  }

  const datasetConfig = {
    label: "Total Sales (₱)",
    data: chartData.map((row) => parseFloat(row.total_sales)),
    backgroundColor: [
      "#64b5f6", "#9575cd", "#4db6ac", "#ff8a65",
      "#e57373", "#fdd835", "#81c784"
    ],
    borderColor: "#555",
    borderWidth: 1,
  };

  const config = {
    type: type,
    data: {
      labels: chartData.map((row) => row.date),
      datasets: type === "pie" ? [Object.assign({}, datasetConfig)] : [datasetConfig],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 20,
          bottom: 20,
        },
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
          display: true,
          position: "bottom",
        },
      },
    },
  };

  chartInstance = new Chart(ctx, config);
}

// Called by dropdown onchange
function changeChartType(newType) {
  createChart(window.chartData, newType);
}