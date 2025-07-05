<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
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
        // Get all countries
        $stmt = $pdo->query("SELECT * FROM countries ORDER BY name ASC");
        $countries = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode(['success' => true, 'countries' => $countries]);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Add new country
        $input = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $pdo->prepare("
            INSERT INTO countries (name, slug, flag_emoji, description, capital, currency, language, best_time_to_visit, image_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $input['name'],
            $input['slug'],
            $input['flag_emoji'],
            $input['description'],
            $input['capital'],
            $input['currency'],
            $input['language'],
            $input['best_time_to_visit'],
            $input['image_url']
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Country added successfully']);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        // Update country
        $id = $_GET['id'];
        $input = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $pdo->prepare("
            UPDATE countries 
            SET name = ?, slug = ?, flag_emoji = ?, description = ?, capital = ?, currency = ?, language = ?, best_time_to_visit = ?, image_url = ?
            WHERE id = ?
        ");
        
        $stmt->execute([
            $input['name'],
            $input['slug'],
            $input['flag_emoji'],
            $input['description'],
            $input['capital'],
            $input['currency'],
            $input['language'],
            $input['best_time_to_visit'],
            $input['image_url'],
            $id
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Country updated successfully']);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        // Delete country
        $id = $_GET['id'];
        
        $stmt = $pdo->prepare("DELETE FROM countries WHERE id = ?");
        $stmt->execute([$id]);
        
        echo json_encode(['success' => true, 'message' => 'Country deleted successfully']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>