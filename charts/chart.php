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
  $sql = "SELECT date, SUM(price * quantity) AS total_sales FROM sales GROUP BY date ORDER BY date";
  $query = $mysqli->query($sql);
  $data  = [];

  while($row = $query->fetch_assoc()) {
    $data[] = [
      'date' => $row['date'],
      'total_sales' => (float)$row['total_sales']
    ];
  }
  echo json_encode($data);
?>