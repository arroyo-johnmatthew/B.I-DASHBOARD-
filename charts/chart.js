const ctx = document.getElementById("myChart");

fetch("chart.php")
  .then((response) => response.json())
  .then((data) => {
    createChart(data, "bar");
  });

function createChart(chartData, type) {
  const barColor = "#64b5f6"; // Set your desired color here

  new Chart(ctx, {
    type: type,
    data: {
      labels: chartData.map((row) => row.date),
      datasets: [
        {
          label: "Total Sales (₱)",
          data: chartData.map((row) => parseFloat(row.total_sales)),
          backgroundColor: barColor, // All bars same color
          borderColor: barColor, // All borders same color
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Total Sales in Peso",
          },
        },
        x: {
          title: {
            display: true,
            text: "Date",
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Total Sales by Date",
          font: {
            size: 18,
          },
        },
      },
    },
  });
}
