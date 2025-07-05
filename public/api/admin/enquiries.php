<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, OPTIONS');
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
        // Get all enquiries
        $stmt = $pdo->query("
            SELECT e.*, tp.title as package_title 
            FROM enquiries e 
            LEFT JOIN tour_packages tp ON e.package_id = tp.id 
            ORDER BY e.created_at DESC
        ");
        $enquiries = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode(['success' => true, 'enquiries' => $enquiries]);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        // Update enquiry status
        $id = $_GET['id'];
        $input = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $pdo->prepare("
            UPDATE enquiries 
            SET status = ?, admin_notes = ?, updated_at = NOW()
            WHERE id = ?
        ");
        
        $stmt->execute([
            $input['status'],
            $input['admin_notes'] ?? '',
            $id
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Enquiry updated successfully']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>