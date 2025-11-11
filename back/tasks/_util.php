<?php
// Shared utilities for tasks endpoints
$allowed_origins = [
    'http://localhost:5173',
    'https://learni.liap.ca',
    'https://mooai.liap.ca',
    'https://liap.ca',
    'https://www.liap.ca'
];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $origin);
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
}
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }
header('Content-Type: application/json');

// Very simple JSON file-based storage for prototype
$DATA_DIR = __DIR__ . DIRECTORY_SEPARATOR . 'data';
if (!is_dir($DATA_DIR)) { @mkdir($DATA_DIR, 0777, true); }

function path_tasks($une, $date){
    global $DATA_DIR;
    $safeUne = preg_replace('/[^a-zA-Z0-9_-]/','_', $une);
    $safeDate = preg_replace('/[^0-9-]/','_', $date);
    return $DATA_DIR . DIRECTORY_SEPARATOR . "tasks_{$safeUne}_{$safeDate}.json";
}
function path_inbox($une){
    global $DATA_DIR;
    $safeUne = preg_replace('/[^a-zA-Z0-9_-]/','_', $une);
    return $DATA_DIR . DIRECTORY_SEPARATOR . "inbox_{$safeUne}.json";
}
function read_json($path){
    if (!file_exists($path)) return [];
    $txt = file_get_contents($path);
    $data = json_decode($txt, true);
    if (!is_array($data)) return [];
    return $data;
}
function write_json($path, $data){
    file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT));
}
