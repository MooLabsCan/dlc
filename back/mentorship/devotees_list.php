<?php
require_once(__DIR__ . '/common.php');
$con = db_mysqli();
$in = json_input();
$mentor = isset($in['mentor_une']) ? trim($in['mentor_une']) : null;
if (!$mentor) { err('Missing mentor_une'); exit; }

$stmt = $con->prepare("SELECT une, email, about_me, mentor_une FROM user_records WHERE mentor_une = ? ORDER BY une ASC");
$stmt->bind_param('s', $mentor);
$stmt->execute();
$res = $stmt->get_result();
$items = [];
while ($row = $res->fetch_assoc()) { $items[] = $row; }
$stmt->close();
ok(['items' => $items]);
