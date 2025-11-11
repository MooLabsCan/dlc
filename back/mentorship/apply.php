<?php
require_once(__DIR__ . '/common.php');
$con = db_mysqli();
$in = json_input();
$devotee = isset($in['devotee_une']) ? trim($in['devotee_une']) : null;
$mentor = isset($in['mentor_une']) ? trim($in['mentor_une']) : null;
if (!$devotee || !$mentor) { err('Missing devotee_une or mentor_une'); exit; }

// Ensure both users exist
$stmt = $con->prepare("INSERT INTO user_records (une) VALUES (?) ON DUPLICATE KEY UPDATE une = une");
$stmt->bind_param('s', $devotee);
$stmt->execute();
$stmt->close();
$stmt = $con->prepare("INSERT INTO user_records (une) VALUES (?) ON DUPLICATE KEY UPDATE une = une");
$stmt->bind_param('s', $mentor);
$stmt->execute();
$stmt->close();

// Create application if not exists; if exists and rejected, set pending again
$stmt = $con->prepare("INSERT INTO mentor_applications (devotee_une, mentor_une, status) VALUES(?,?, 'pending') ON DUPLICATE KEY UPDATE status = 'pending', decided_at = NULL");
$stmt->bind_param('ss', $devotee, $mentor);
$ok = $stmt->execute();
$stmt->close();
if ($ok) { ok(); } else { err('Failed to apply'); }
