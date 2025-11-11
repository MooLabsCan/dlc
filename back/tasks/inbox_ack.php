<?php
require_once __DIR__ . '/_util.php';

$input = json_decode(file_get_contents('php://input'), true);
$une = isset($input['une']) ? $input['une'] : '';
$id = isset($input['id']) ? intval($input['id']) : 0;
$accept = isset($input['accept']) ? (bool)$input['accept'] : false;
if (!$une || !$id) { echo json_encode(['status' => 'error', 'error' => 'missing']); exit; }

$inboxPath = path_inbox($une);
$items = read_json($inboxPath);
$remaining = [];
$found = null;
foreach ($items as $it) {
  if (isset($it['id']) && intval($it['id']) === $id) { $found = $it; continue; }
  $remaining[] = $it;
}
write_json($inboxPath, $remaining);

if ($accept && $found) {
  // Add to today's tasks for this user
  $date = date('Y-m-d');
  $tasksPath = path_tasks($une, $date);
  $tasks = read_json($tasksPath);
  if (!is_array($tasks)) { $tasks = []; }
  $maxId = 0;
  foreach ($tasks as $t) { $maxId = max($maxId, isset($t['id']) ? intval($t['id']) : 0); }
  $tasks[] = [
    'id' => $maxId + 1,
    'title' => $found['title'],
    'description' => isset($found['description']) ? $found['description'] : '',
    'frequency' => 'daily',
    'category' => 'assigned',
    'difficulty' => 1,
    'completed' => false
  ];
  write_json($tasksPath, $tasks);
}

echo json_encode(['status' => 'ok']);
