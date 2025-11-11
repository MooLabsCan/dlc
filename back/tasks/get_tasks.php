<?php
require_once __DIR__ . '/_util.php';

$une = isset($_GET['une']) ? $_GET['une'] : '';
$date = isset($_GET['date']) ? $_GET['date'] : '';
if (!$une || !$date) { echo json_encode(['items' => []]); exit; }

$path = path_tasks($une, $date);
$items = read_json($path);
if (!is_array($items)) { $items = []; }

echo json_encode(['items' => $items]);
