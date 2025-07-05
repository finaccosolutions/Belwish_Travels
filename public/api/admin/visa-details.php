<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../../../secure/config.php';
require_once '../../../secure/auth.php';

// Check authentication for non-GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    $headers = getallheaders();
    $token = $headers['Authorization'] ?? '';
    
    if (!$token || !verifyToken(str_replace('Bearer ', '', $token))) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
}

try {
    $pdo = getDbConnection();
    
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            $country_id = $_GET['country_id'] ?? '';
            
            if ($country_id) {
                // Get visa details for specific country
                $stmt = $pdo->prepare("
                    SELECT vd.*, c.name as country_name 
                    FROM visa_details vd 
                    INNER JOIN countries c ON vd.country_id = c.id 
                    WHERE vd.country_id = ?
                ");
                $stmt->execute([$country_id]);
                $visa_details = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                // Parse documents_required JSON for each record
                foreach ($visa_details as &$detail) {
                    if (!empty($detail['documents_required'])) {
                        $detail['documents_required'] = json_decode($detail['documents_required'], true) ?: [];
                    } else {
                        $detail['documents_required'] = [];
                    }
                }
                
                echo json_encode($visa_details);
            } else {
                // Get all visa details
                $stmt = $pdo->query("
                    SELECT vd.*, c.name as country_name 
                    FROM visa_details vd 
                    INNER JOIN countries c ON vd.country_id = c.id 
                    ORDER BY c.name, vd.visa_type
                ");
                $visa_details = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                // Parse documents_required JSON for each record
                foreach ($visa_details as &$detail) {
                    if (!empty($detail['documents_required'])) {
                        $detail['documents_required'] = json_decode($detail['documents_required'], true) ?: [];
                    } else {
                        $detail['documents_required'] = [];
                    }
                }
                
                echo json_encode($visa_details);
            }
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Convert documents_required array to JSON
            if (isset($data['documents_required']) && is_array($data['documents_required'])) {
                $data['documents_required'] = json_encode($data['documents_required']);
            }
            
            $stmt = $pdo->prepare("
                INSERT INTO visa_details (country_id, visa_type, documents_required, processing_time, visa_fee, process_description, additional_info) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                documents_required = VALUES(documents_required),
                processing_time = VALUES(processing_time),
                visa_fee = VALUES(visa_fee),
                process_description = VALUES(process_description),
                additional_info = VALUES(additional_info)
            ");
            
            $stmt->execute([
                $data['country_id'],
                $data['visa_type'],
                $data['documents_required'],
                $data['processing_time'],
                $data['visa_fee'],
                $data['process_description'],
                $data['additional_info'] ?? ''
            ]);
            
            echo json_encode(['success' => true, 'message' => 'Visa details saved successfully']);
            break;
            
        case 'PUT':
            $id = $_GET['id'] ?? '';
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (empty($id)) {
                throw new Exception('ID is required for update');
            }
            
            // Convert documents_required array to JSON
            if (isset($data['documents_required']) && is_array($data['documents_required'])) {
                $data['documents_required'] = json_encode($data['documents_required']);
            }
            
            $stmt = $pdo->prepare("
                UPDATE visa_details 
                SET documents_required = ?, processing_time = ?, visa_fee = ?, process_description = ?, additional_info = ?
                WHERE id = ?
            ");
            
            $stmt->execute([
                $data['documents_required'],
                $data['processing_time'],
                $data['visa_fee'],
                $data['process_description'],
                $data['additional_info'] ?? '',
                $id
            ]);
            
            echo json_encode(['success' => true, 'message' => 'Visa details updated successfully']);
            break;
            
        case 'DELETE':
            $id = $_GET['id'] ?? '';
            
            if (empty($id)) {
                throw new Exception('ID is required for deletion');
            }
            
            $stmt = $pdo->prepare("DELETE FROM visa_details WHERE id = ?");
            $stmt->execute([$id]);
            
            echo json_encode(['success' => true, 'message' => 'Visa details deleted successfully']);
            break;
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>