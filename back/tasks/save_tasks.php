<?php
require_once __DIR__ . '/_util.php';

$input = json_decode(file_get_contents('php://input'), true);
$une = isset($input['une']) ? $input['une'] : '';
$date = isset($input['date']) ? $input['date'] : '';
$tasks = isset($input['tasks']) && is_array($input['tasks']) ? $input['tasks'] : [];
if (!$une || !$date) { echo json_encode(['status' => 'error', 'error' => 'missing']); exit; }

$path = path_tasks($une, $date);
write_json($path, $tasks);

echo json_encode(['status' => 'ok']);
