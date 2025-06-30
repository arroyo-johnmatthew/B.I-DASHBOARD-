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
  locations.city,
  locations.state,
  SUM(sales.price * sales.quantity) AS total_sales
FROM sales
JOIN locations ON sales.shipping_address_id = locations.id
GROUP BY locations.city, locations.state
ORDER BY total_sales DESC
";

$result = $mysqli->query($sql);
$data = [];

while ($row = $result->fetch_assoc()) {
  $data[] = [
    'location' => $row['city'] . ', ' . $row['state'],
    'total_sales' => (float)$row['total_sales']
  ];
}

echo json_encode($data);
?>
