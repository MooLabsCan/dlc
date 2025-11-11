<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once('../classes/AccountFunctions.php');
require_once('../config/Database.php');

$database = new Database();
$con = $database->connectMySQLi();

$input = json_decode(file_get_contents('php://input'));
$une = isset($input->une) ? trim($input->une) : null;
$type = isset($input->accountType) ? trim($input->accountType) : null;

if (!$une || !$type) {
    echo json_encode([ 'status' => 'error', 'message' => 'Missing une or accountType' ]);
    exit;
}

$account = new AccountFunctions($con, null);
$ok = $account->updateAccountType($une, $type);

if ($ok) {
    $rec = $account->getUserRecord($une);
    echo json_encode([ 'status' => 'ok', 'record' => $rec ]);
} else {
    echo json_encode([ 'status' => 'error', 'message' => 'Failed to update account type' ]);
}
