<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json");

  $host = "localhost"; 
  $user = "root"; 
  $password = ""; 
  $database = "ecommerce_db";

  $mysqli = new mysqli($host, $user, $password, $database);

  if($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }

  // Fetch total sales per day
  $sql = "
  SELECT 
  sales.date, 
  products.name AS product_name,
  SUM(sales.price * sales.quantity) AS total_sales
  FROM sales
  JOIN products ON sales.product_id = products.id
  GROUP BY sales.date, products.name
  ORDER BY sales.date, products.name;";
  $query = $mysqli->query($sql);
  $data  = [];

  while($row = $query->fetch_assoc()) {
    $data[] = [
      'date' => $row['date'],
      'product_name' => $row['product_name'],
      'total_sales' => (float)$row['total_sales']
    ];
  }
  echo json_encode($data);
?>