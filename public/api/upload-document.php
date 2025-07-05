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

if (!isset($_FILES['document']) || !isset($_POST['enquiry_id'])) {
    echo json_encode(['success' => false, 'message' => 'File and enquiry ID required']);
    exit;
}

$enquiry_id = $_POST['enquiry_id'];
$file = $_FILES['document'];

// Validate file
$allowed_types = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'];
$file_extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

if (!in_array($file_extension, $allowed_types)) {
    echo json_encode(['success' => false, 'message' => 'Invalid file type']);
    exit;
}

if ($file['size'] > 5 * 1024 * 1024) { // 5MB limit
    echo json_encode(['success' => false, 'message' => 'File too large']);
    exit;
}

try {
    // Create upload directory if it doesn't exist
    $upload_dir = 'uploads/documents/';
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }
    
    // Generate unique filename
    $filename = uniqid() . '_' . $file['name'];
    $file_path = $upload_dir . $filename;
    
    if (move_uploaded_file($file['tmp_name'], $file_path)) {
        // Save to database
        $pdo = getDbConnection();
        $stmt = $pdo->prepare("
            INSERT INTO document_uploads (enquiry_id, file_name, file_path, file_type, file_size) 
            VALUES (?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $enquiry_id,
            $file['name'],
            $file_path,
            $file['type'],
            $file['size']
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Document uploaded successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to upload file']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>