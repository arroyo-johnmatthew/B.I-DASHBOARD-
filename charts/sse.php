<?php
set_time_limit(0); // Disable time limit.
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');

// Where previous data is stored
$lastSales = '';
$lastCategory = '';


// Loops getting the json data from the server.
while (true) {
    $json1 = file_get_contents('http://localhost/charts/chart.php');
    $json2 = file_get_contents('http://localhost/charts/quantity_by_category.php');

    // Send sales data if changed
    if ($json1 !== $lastSales) {
        $lastSales = $json1;
        echo "event: sales\n";
        echo "data: $json1\n\n";
        ob_flush();
        flush();
    }

    // Send category data if changed
    if ($json2 !== $lastCategory) {
        $lastCategory = $json2;
        echo "event: category\n";
        echo "data: $json2\n\n";
        ob_flush();
        flush();
    }

    sleep(2); // check every 2 seconds
}