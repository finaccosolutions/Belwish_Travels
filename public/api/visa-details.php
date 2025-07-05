<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../../secure/config.php';

try {
    $pdo = getDbConnection();
    
    $country_id = $_GET['country_id'] ?? '';
    $visa_type = $_GET['type'] ?? '';
    
    if (empty($country_id) || empty($visa_type)) {
        throw new Exception('Country ID and visa type are required');
    }
    
    // Get visa details for the specific country and visa type
    $stmt = $pdo->prepare("
        SELECT vd.*, c.name as country_name, c.flag_emoji as country_flag
        FROM visa_details vd 
        INNER JOIN countries c ON vd.country_id = c.id 
        WHERE vd.country_id = ? AND vd.visa_type = ?
    ");
    $stmt->execute([$country_id, $visa_type]);
    $visa_details = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$visa_details) {
        throw new Exception('Visa details not found');
    }
    
    // Parse requirements JSON and assign to documents_required for frontend compatibility
    if (!empty($visa_details['requirements'])) {
        $visa_details['documents_required'] = json_decode($visa_details['requirements'], true) ?: [];
    } else {
        $visa_details['documents_required'] = [];
    }
    
    echo json_encode($visa_details);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>