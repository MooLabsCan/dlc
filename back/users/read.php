<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once('../classes/AccountFunctions.php');
require_once('../config/Database.php');

// Initialize database connection
$database = new Database();
$con = $database->connectMySQLi(); // Using MySQLi since AccountFunctions uses MySQLi methods

// Get posted data (support GET fallback for dev/testing)
$input = file_get_contents("php://input");
$data = json_decode($input ?: '{}');
if (!$data && isset($_GET['une'])) {
    $data = (object) [
        'une' => $_GET['une'],
        'email' => isset($_GET['email']) ? $_GET['email'] : null
    ];
}

if(isset($data->une) && trim($data->une) !== '') {
    $une = trim($data->une);
    $email = isset($data->email) ? trim($data->email) : null;
    $account = new AccountFunctions($con, null);
    $playRecord = $account->getUserRecord($une);
    
    if($playRecord !== null) {
        echo json_encode($playRecord, JSON_UNESCAPED_UNICODE);
    } else {
        $account->initUserRecord($une, $email);
        $playRecord = $account->getUserRecord($une);
        if($playRecord !== null) {
            echo json_encode($playRecord, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(array("message" => "No record found and failed to create one"));
        }
    }
} else {
    echo json_encode(array("message" => "Missing username parameter"));
}
?>