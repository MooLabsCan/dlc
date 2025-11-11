<?php
require_once __DIR__ . '/_util.php';

$input = json_decode(file_get_contents('php://input'), true);
$to = isset($input['to_une']) ? $input['to_une'] : '';
$from = isset($input['from_une']) ? $input['from_une'] : '';
$title = isset($input['title']) ? trim($input['title']) : '';
$description = isset($input['description']) ? trim($input['description']) : '';
if (!$to || !$from || !$title) { echo json_encode(['status' => 'error', 'error' => 'missing']); exit; }

$inboxPath = path_inbox($to);
$items = read_json($inboxPath);
if (!is_array($items)) { $items = []; }

// Create new inbox item
$maxId = 0;
foreach ($items as $it) { $maxId = max($maxId, isset($it['id']) ? intval($it['id']) : 0); }
$item = [
  'id' => $maxId + 1,
  'from_une' => $from,
  'title' => $title,
  'description' => $description,
  'created_at' => date('c'),
  'status' => 'pending'
];
array_unshift($items, $item);
write_json($inboxPath, $items);

echo json_encode(['status' => 'ok', 'item' => $item]);
