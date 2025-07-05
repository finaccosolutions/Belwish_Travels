<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require '/home/u443589701/domains/belwishtravels.com/secure/config.php';
require '/home/u443589701/domains/belwishtravels.com/secure/auth.php';

// Verify admin authentication
if (!verifyAdminToken()) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

try {
    $pdo = getDbConnection();
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Get all Umrah packages
        $stmt = $pdo->query("SELECT * FROM umrah_packages ORDER BY price ASC");
        $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Decode JSON fields
        foreach ($packages as &$package) {
            $package['features'] = json_decode($package['features'], true) ?: [];
        }
        
        echo json_encode(['success' => true, 'packages' => $packages]);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Update Umrah package
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'];
        
        $stmt = $pdo->prepare("
            UPDATE umrah_packages 
            SET title = ?, duration = ?, price = ?, category = ?, features = ?, 
                accommodation_details = ?, flight_details = ?, visa_processing = ?, 
                transportation = ?, meals_included = ?, ziyarat_details = ?, 
                special_services = ?, is_active = ?, updated_at = NOW()
            WHERE id = ?
        ");
        
        $stmt->execute([
            $input['title'],
            $input['duration'],
            $input['price'],
            $input['category'],
            json_encode($input['features'] ?? []),
            $input['accommodation_details'] ?? '',
            $input['flight_details'] ?? '',
            $input['visa_processing'] ?? '',
            $input['transportation'] ?? '',
            $input['meals_included'] ?? '',
            $input['ziyarat_details'] ?? '',
            $input['special_services'] ?? '',
            $input['is_active'] ?? true,
            $id
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Umrah package updated successfully']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>