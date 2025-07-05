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

try {
    $pdo = getDbConnection();
    
    $where = "WHERE is_active = 1";
    $params = [];
    
    if (isset($_GET['category']) && $_GET['category'] !== 'all') {
        $where .= " AND category = ?";
        $params[] = $_GET['category'];
    }
    
    $stmt = $pdo->prepare("SELECT * FROM tour_packages $where ORDER BY is_featured DESC, created_at DESC");
    $stmt->execute($params);
    $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Decode JSON fields
    foreach ($packages as &$package) {
        $package['highlights'] = json_decode($package['highlights'], true) ?: [];
        $package['cities'] = json_decode($package['cities'], true) ?: [];
        $package['gallery_images'] = json_decode($package['gallery_images'], true) ?: [];
    }
    
    echo json_encode(['success' => true, 'packages' => $packages]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>