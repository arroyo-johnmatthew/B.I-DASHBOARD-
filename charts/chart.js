let chartInstance = null;

function fetchAndUpdateChart() {
  fetch("chart.php")
    .then(response => response.json())
    .then(data => {
      updateChart(data);
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function updateChart(chartData) {
  const ctx = document.getElementById("myChart").getContext("2d");
  const barColor = "#64b5f6";

  // Destroy previous chart instance to avoid duplicates
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: chartData.map(row => row.product_name),
      datasets: [{
        label: "Total Sales (₱)",
        data: chartData.map(row => parseFloat(row.total_sales)),
        backgroundColor: barColor,
        borderColor: barColor,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Total Sales in Peso"
          }
        },
        x: {
          title: {
            display: true,
            text: "Product"
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: "Total Sales by Date",
          font: { size: 18 }
        }
      }
    }
  });
}

fetchAndUpdateChart(); // Fetch on page load
