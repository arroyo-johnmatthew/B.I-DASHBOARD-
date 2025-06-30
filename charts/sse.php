<?php
set_time_limit(0); // Disable time limit.
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');

// Where previous data is stored
$lastSales = '';
$lastCategory = '';
$lastLocation = '';
$lastSummary = '';


// Loops getting the json data from the server.
while (true) {
    $json1 = file_get_contents('http://localhost/charts/chart.php');
    $json2 = file_get_contents('http://localhost/charts/quantity_by_category.php');
    $json3 = file_get_contents('http://localhost/charts/sales_by_location.php');
    $json4 = file_get_contents('http://localhost/charts/summary.php');

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

    //Send location data if changed
    if ($json3 !== $lastLocation) {
        $lastLocation = $json3;
        echo "event: location\n";
        echo "data: $json3\n\n";
        ob_flush();
        flush();
    }

    // Send summary data if changed
    if ($json4 !== $lastSummary) {
        $lastSummary = $json4;
        echo "event: summary\n";
        echo "data: $json4\n\n";
        ob_flush();
        flush();
    }

    sleep(2); // check every 2 seconds
}