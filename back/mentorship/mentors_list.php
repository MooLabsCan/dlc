<?php
require_once(__DIR__ . '/common.php');
$con = db_mysqli();
$in = json_input();

// List mentors (accountType mentor or life_coach) with about_me
$sql = "SELECT une, email, accountType, about_me,
        (SELECT COUNT(*) FROM user_records ur2 WHERE ur2.mentor_une = user_records.une) AS devotee_count
        FROM user_records WHERE accountType IN ('mentor','life_coach') ORDER BY une ASC";
$res = $con->query($sql);
$items = [];
if ($res) {
  while ($row = $res->fetch_assoc()) { $items[] = $row; }
}
ok(['items' => $items]);
