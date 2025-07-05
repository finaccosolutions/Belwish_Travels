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

if (!isset($_GET['slug'])) {
    echo json_encode(['success' => false, 'message' => 'Country slug required']);
    exit;
}

$slug = $_GET['slug'];

try {
    $pdo = getDbConnection();
    
    // Get country details
    $stmt = $pdo->prepare("SELECT * FROM countries WHERE slug = ?");
    $stmt->execute([$slug]);
    $country = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$country) {
        echo json_encode(['success' => false, 'message' => 'Country not found']);
        exit;
    }
    
    // Get visa details for all types
    $stmt = $pdo->prepare("SELECT * FROM visa_details WHERE country_id = ?");
    $stmt->execute([$country['id']]);
    $visaDetails = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $country['visa_details'] = [
        'tourist' => null,
        'business' => null,
        'student' => null
    ];
    
    foreach ($visaDetails as $detail) {
        $country['visa_details'][$detail['visa_type']] = $detail;
    }
    
    echo json_encode(['success' => true, 'country' => $country]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>