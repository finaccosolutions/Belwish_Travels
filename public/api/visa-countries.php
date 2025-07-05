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
    
    $visa_type = $_GET['type'] ?? '';
    
    if (empty($visa_type)) {
        throw new Exception('Visa type is required');
    }
    
    // Get countries that have visa details for the specified visa type
    $stmt = $pdo->prepare("
        SELECT DISTINCT c.id, c.name, c.flag_emoji as flag, c.slug 
        FROM countries c 
        INNER JOIN visa_details vd ON c.id = vd.country_id 
        WHERE vd.visa_type = ?
        ORDER BY c.name
    ");
    $stmt->execute([$visa_type]);
    $countries = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($countries);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>