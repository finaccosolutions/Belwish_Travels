<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require '../../secure/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['name']) || !isset($input['email']) || !isset($input['type'])) {
    echo json_encode(['success' => false, 'message' => 'Required fields missing']);
    exit;
}

try {
    $pdo = getDbConnection();
    
    $stmt = $pdo->prepare("
        INSERT INTO enquiries (type, name, email, phone, country, package_id, visa_type, message) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([
        $input['type'],
        $input['name'],
        $input['email'],
        $input['phone'] ?? '',
        $input['country'] ?? '',
        $input['package_id'] ?? null,
        $input['visa_type'] ?? '',
        $input['message'] ?? ''
    ]);
    
    echo json_encode(['success' => true, 'message' => 'Enquiry submitted successfully']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>