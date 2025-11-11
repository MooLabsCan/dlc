<?php
require_once(__DIR__ . '/common.php');
$con = db_mysqli();
$in = json_input();
$mentor = isset($in['mentor_une']) ? trim($in['mentor_une']) : null;
if (!$mentor) { err('Missing mentor_une'); exit; }

$stmt = $con->prepare("SELECT ma.id, ma.devotee_une, ur.about_me, ma.status, ma.created_at
  FROM mentor_applications ma
  LEFT JOIN user_records ur ON ur.une = ma.devotee_une
  WHERE ma.mentor_une = ? AND ma.status = 'pending'
  ORDER BY ma.created_at ASC");
$stmt->bind_param('s', $mentor);
$stmt->execute();
$res = $stmt->get_result();
$items = [];
while ($row = $res->fetch_assoc()) { $items[] = $row; }
$stmt->close();
ok(['items' => $items]);
