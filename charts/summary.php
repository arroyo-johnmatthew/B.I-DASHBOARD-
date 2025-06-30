<?php
header("Content-Type: application/json");

$mysqli = new mysqli("localhost", "root", "", "ecommerce_db");

if ($mysqli->connect_error) {
  die(json_encode(["error" => "Connection failed."]));
}

$data = [];

// Total Sales
$result = $mysqli->query("SELECT SUM(price * quantity) AS total_sales FROM sales");
$data['total_sales'] = (float)($result->fetch_assoc()['total_sales'] ?? 0);

// Total Orders
$result = $mysqli->query("SELECT COUNT(*) AS total_orders FROM orders");
$data['total_orders'] = (int)($result->fetch_assoc()['total_orders'] ?? 0);

// Total Users
$result = $mysqli->query("
  SELECT CONCAT(l.city, ', ', l.state) AS location, 
  SUM(s.price * s.quantity) AS total_sales
  FROM sales s
  JOIN locations l ON s.shipping_address_id = l.id
  GROUP BY l.city, l.state
  ORDER BY total_sales DESC
  LIMIT 1
");
$row = $result->fetch_assoc();
$data['top_location'] = $row ? $row['location'] : '-';

// Top Product
$result = $mysqli->query("
  SELECT p.name, SUM(s.price * s.quantity) AS total_revenue
  FROM sales s
  JOIN products p ON s.product_id = p.id
  GROUP BY p.id
  ORDER BY total_revenue DESC
  LIMIT 1
");
$top = $result->fetch_assoc();
$data['top_product'] = $top ? $top['name'] : '-';

echo json_encode($data);
?>
