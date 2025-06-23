<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = "localhost"; 
$user = "root"; 
$password = ""; 
$database = "ecommerce_db";

$mysqli = new mysqli($host, $user, $password, $database);

if ($mysqli->connect_error) {
  die("Connection failed: " . $mysqli->connect_error);
}

$sql = "
SELECT 
  products.category,
  SUM(sales.quantity) AS total_quantity
FROM products
LEFT JOIN sales ON products.id = sales.product_id
GROUP BY products.category
ORDER BY total_quantity DESC;
";

$query = $mysqli->query($sql);
$data = [];

while ($row = $query->fetch_assoc()) {
  $data[] = [
    'category' => $row['category'],
    'total_quantity' => (int)$row['total_quantity']
  ];
}

echo json_encode($data);
?>
