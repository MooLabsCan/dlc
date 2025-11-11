<?php
require_once(__DIR__ . '/../mentorship/common.php');
$con = db_mysqli();
$in = json_input();
$une = isset($in['une']) ? trim($in['une']) : null;
$about = isset($in['about_me']) ? trim($in['about_me']) : null;
if (!$une) { err('Missing une'); exit; }
// Ensure user exists
$stmt = $con->prepare("INSERT INTO user_records (une) VALUES (?) ON DUPLICATE KEY UPDATE une = une");
$stmt->bind_param('s', $une);
$stmt->execute();
$stmt->close();
// Update about_me
$stmt = $con->prepare("UPDATE user_records SET about_me = ? WHERE une = ?");
$stmt->bind_param('ss', $about, $une);
$ok = $stmt->execute();
$stmt->close();
if ($ok) {
  // Return updated record
  $stmt = $con->prepare("SELECT une, email, accountType, about_me, mentor_une FROM user_records WHERE une=? LIMIT 1");
  $stmt->bind_param('s', $une);
  $stmt->execute();
  $res = $stmt->get_result();
  $row = $res->fetch_assoc();
  $stmt->close();
  ok(['record' => $row]);
} else {
  err('Failed to save');
}
