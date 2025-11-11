<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once(__DIR__ . '/../config/Database.php');

function db_mysqli() {
    static $con = null;
    if ($con) return $con;
    $database = new Database();
    $con = $database->connectMySQLi();
    // Ensure required schema exists
    ensure_schema($con);
    return $con;
}

function ensure_schema(mysqli $con) {
    // Extend user_records with about_me and mentor_une
    $con->query("CREATE TABLE IF NOT EXISTS user_records (
        id INT AUTO_INCREMENT PRIMARY KEY,
        une VARCHAR(191) NOT NULL UNIQUE,
        email VARCHAR(255) DEFAULT NULL,
        accountType ENUM('mentor','life_coach','devotee') DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // Add columns if missing
    $res = $con->query("SHOW COLUMNS FROM user_records LIKE 'about_me'");
    if ($res && $res->num_rows === 0) {
        $con->query("ALTER TABLE user_records ADD COLUMN about_me TEXT NULL AFTER accountType");
    }
    $res = $con->query("SHOW COLUMNS FROM user_records LIKE 'mentor_une'");
    if ($res && $res->num_rows === 0) {
        $con->query("ALTER TABLE user_records ADD COLUMN mentor_une VARCHAR(191) NULL AFTER about_me");
        $con->query("CREATE INDEX IF NOT EXISTS idx_user_records_mentor ON user_records(mentor_une)");
    }

    // Mentor applications table
    $con->query("CREATE TABLE IF NOT EXISTS mentor_applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        devotee_une VARCHAR(191) NOT NULL,
        mentor_une VARCHAR(191) NOT NULL,
        status ENUM('pending','accepted','rejected') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        decided_at TIMESTAMP NULL DEFAULT NULL,
        UNIQUE KEY uniq_pair (devotee_une, mentor_une)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");
}

function json_input() {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw ?: '{}', true);
    if (!$data) $data = [];
    // Also allow GET params for convenience
    foreach ($_GET as $k => $v) {
        if (!isset($data[$k])) $data[$k] = $v;
    }
    return $data;
}

function ok($payload = []) { echo json_encode(['status' => 'ok'] + $payload); }
function err($message, $code = 400) { http_response_code($code); echo json_encode(['status' => 'error', 'message' => $message]); }
