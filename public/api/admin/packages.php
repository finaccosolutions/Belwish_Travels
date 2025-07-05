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

require '../../../secure/config.php';
require '../../../secure/auth.php';

// Verify admin authentication
if (!verifyAdminToken()) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

try {
    $pdo = getDbConnection();
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Get all packages
        $stmt = $pdo->query("SELECT * FROM tour_packages ORDER BY created_at DESC");
        $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Decode JSON fields
        foreach ($packages as &$package) {
            $package['highlights'] = json_decode($package['highlights'], true) ?: [];
            $package['cities'] = json_decode($package['cities'], true) ?: [];
            $package['gallery_images'] = json_decode($package['gallery_images'], true) ?: [];
        }
        
        echo json_encode(['success' => true, 'packages' => $packages]);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Add new package
        $input = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $pdo->prepare("
            INSERT INTO tour_packages (title, slug, category, duration, price, discounted_price, description, 
                                     detailed_description, highlights, inclusions, exclusions, itinerary, 
                                     image_url, gallery_images, country, cities, best_time, difficulty_level, 
                                     group_size, is_featured, is_active) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $input['title'],
            $input['slug'],
            $input['category'],
            $input['duration'],
            $input['price'],
            $input['discounted_price'] ?? null,
            $input['description'],
            $input['detailed_description'] ?? '',
            json_encode($input['highlights'] ?? []),
            $input['inclusions'] ?? '',
            $input['exclusions'] ?? '',
            $input['itinerary'] ?? '',
            $input['image_url'],
            json_encode($input['gallery_images'] ?? []),
            $input['country'],
            json_encode($input['cities'] ?? []),
            $input['best_time'] ?? '',
            $input['difficulty_level'] ?? 'easy',
            $input['group_size'] ?? '',
            $input['is_featured'] ?? false,
            $input['is_active'] ?? true
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Package added successfully']);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        // Update package
        $id = $_GET['id'];
        $input = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $pdo->prepare("
            UPDATE tour_packages 
            SET title = ?, slug = ?, category = ?, duration = ?, price = ?, discounted_price = ?, 
                description = ?, detailed_description = ?, highlights = ?, inclusions = ?, 
                exclusions = ?, itinerary = ?, image_url = ?, gallery_images = ?, country = ?, 
                cities = ?, best_time = ?, difficulty_level = ?, group_size = ?, is_featured = ?, 
                is_active = ?, updated_at = NOW()
            WHERE id = ?
        ");
        
        $stmt->execute([
            $input['title'],
            $input['slug'],
            $input['category'],
            $input['duration'],
            $input['price'],
            $input['discounted_price'] ?? null,
            $input['description'],
            $input['detailed_description'] ?? '',
            json_encode($input['highlights'] ?? []),
            $input['inclusions'] ?? '',
            $input['exclusions'] ?? '',
            $input['itinerary'] ?? '',
            $input['image_url'],
            json_encode($input['gallery_images'] ?? []),
            $input['country'],
            json_encode($input['cities'] ?? []),
            $input['best_time'] ?? '',
            $input['difficulty_level'] ?? 'easy',
            $input['group_size'] ?? '',
            $input['is_featured'] ?? false,
            $input['is_active'] ?? true,
            $id
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Package updated successfully']);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        // Delete package
        $id = $_GET['id'];
        
        $stmt = $pdo->prepare("DELETE FROM tour_packages WHERE id = ?");
        $stmt->execute([$id]);
        
        echo json_encode(['success' => true, 'message' => 'Package deleted successfully']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>