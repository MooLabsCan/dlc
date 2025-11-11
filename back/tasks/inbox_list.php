<?php
require_once __DIR__ . '/_util.php';

$une = isset($_GET['une']) ? $_GET['une'] : '';
if (!$une) { echo json_encode(['items' => []]); exit; }

$inboxPath = path_inbox($une);
$items = read_json($inboxPath);
if (!is_array($items)) { $items = []; }

echo json_encode(['items' => $items]);
