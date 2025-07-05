<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require '../../secure/config.php';

if (!isset($_GET['id'])) {
    echo json_encode(['success' => false, 'message' => 'Package ID required']);
    exit;
}

$id = $_GET['id'];

try {
    $pdo = getDbConnection();
    
    $stmt = $pdo->prepare("SELECT * FROM tour_packages WHERE id = ? AND is_active = 1");
    $stmt->execute([$id]);
    $package = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$package) {
        echo json_encode(['success' => false, 'message' => 'Package not found']);
        exit;
    }
    
    // Decode JSON fields
    $package['highlights'] = json_decode($package['highlights'], true) ?: [];
    $package['cities'] = json_decode($package['cities'], true) ?: [];
    $package['gallery_images'] = json_decode($package['gallery_images'], true) ?: [];
    
    echo json_encode(['success' => true, 'package' => $package]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>