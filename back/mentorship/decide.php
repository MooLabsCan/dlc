<?php
require_once(__DIR__ . '/common.php');
$con = db_mysqli();
$in = json_input();
$appId = isset($in['id']) ? intval($in['id']) : 0;
$decision = isset($in['decision']) ? trim($in['decision']) : null; // 'accept' or 'reject'
$mentor = isset($in['mentor_une']) ? trim($in['mentor_une']) : null;
if (!$appId || !$decision || !$mentor) { err('Missing id, decision, or mentor_une'); exit; }
if (!in_array($decision, ['accept','reject'], true)) { err('Invalid decision'); exit; }

// Load application and verify mentor owns it
$stmt = $con->prepare("SELECT id, devotee_une, mentor_une, status FROM mentor_applications WHERE id = ? LIMIT 1");
$stmt->bind_param('i', $appId);
$stmt->execute();
$res = $stmt->get_result();
$app = $res->fetch_assoc();
$stmt->close();
if (!$app || $app['mentor_une'] !== $mentor || $app['status'] !== 'pending') { err('Application not found or not pending'); exit; }

if ($decision === 'accept') {
  // Set devotee mentor_une and mark accepted
  $dev = $app['devotee_une'];
  $stmt = $con->prepare("UPDATE mentor_applications SET status='accepted', decided_at=NOW() WHERE id=?");
  $stmt->bind_param('i', $appId);
  $ok1 = $stmt->execute();
  $stmt->close();
  $stmt = $con->prepare("UPDATE user_records SET mentor_une=? WHERE une=?");
  $stmt->bind_param('ss', $mentor, $dev);
  $ok2 = $stmt->execute();
  $stmt->close();
  if ($ok1 && $ok2) { ok(); } else { err('Failed to accept'); }
} else {
  // Reject
  $stmt = $con->prepare("UPDATE mentor_applications SET status='rejected', decided_at=NOW() WHERE id=?");
  $stmt->bind_param('i', $appId);
  $ok = $stmt->execute();
  $stmt->close();
  if ($ok) { ok(); } else { err('Failed to reject'); }
}
