<?php
header("Content-Type: application/json");
$mysqli = new mysqli("localhost", "root", "", "ecommerce_db");

if ($mysqli->connect_error) {
  die(json_encode(["error" => "DB connection failed."]));
}

$sql = "
  SELECT date, SUM(price * quantity) AS total_sales
  FROM sales
  GROUP BY date
  ORDER BY date;
";

$result = $mysqli->query($sql);
$data = [];

while ($row = $result->fetch_assoc()) {
  $data[] = [
    'date' => $row['date'],
    'total_sales' => (float)$row['total_sales']
  ];
}

echo json_encode($data);
?>
