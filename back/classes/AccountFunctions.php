<?php
class AccountFunctions {
    private $con; // MySQLi connection

    public function __construct($mysqliConnection, $unused = null) {
        $this->con = $mysqliConnection;
    }

    // Ensure table exists (lightweight migration)
    private function ensureTable() {
        $sql = "CREATE TABLE IF NOT EXISTS user_records (
            id INT AUTO_INCREMENT PRIMARY KEY,
            une VARCHAR(191) NOT NULL UNIQUE,
            email VARCHAR(255) DEFAULT NULL,
            accountType ENUM('mentor','life_coach','devotee') DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
        $this->con->query($sql);
    }

    public function getUserRecord($une) {
        $this->ensureTable();
        $sql = "SELECT une, email, accountType, created_at, updated_at FROM user_records WHERE une = ? LIMIT 1";
        if ($stmt = $this->con->prepare($sql)) {
            $stmt->bind_param('s', $une);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $stmt->close();
            return $row ? $row : null;
        }
        return null;
    }

    public function initUserRecord($une, $email = null) {
        $this->ensureTable();
        // Insert if not exists
        $sql = "INSERT INTO user_records (une, email) VALUES (?, ?)";
        if ($stmt = $this->con->prepare($sql)) {
            $stmt->bind_param('ss', $une, $email);
            $ok = $stmt->execute();
            $stmt->close();
            return $ok;
        }
        return false;
    }

    public function updateAccountType($une, $type) {
        $this->ensureTable();
        $allowed = ['mentor','life_coach','devotee'];
        if (!in_array($type, $allowed, true)) {
            return false;
        }
        $sql = "UPDATE user_records SET accountType = ? WHERE une = ?";
        if ($stmt = $this->con->prepare($sql)) {
            $stmt->bind_param('ss', $type, $une);
            $ok = $stmt->execute();
            $stmt->close();
            return $ok;
        }
        return false;
    }
}
