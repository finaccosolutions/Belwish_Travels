<?php
function getDbConnection() {
    $host = 'localhost';
    $dbname = 'u443589701_belswish';
    $username = 'u443589701_belswish';
    $password = 'Belswish@123';
    
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        throw new Exception("Database connection failed: " . $e->getMessage());
    }
}
?>