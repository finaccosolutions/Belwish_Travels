-- Database Schema for BELSWISH Travel Website

-- Admin Users Table
CREATE TABLE admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- Settings Table
CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Countries Table
CREATE TABLE countries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    flag_emoji VARCHAR(10),
    description TEXT,
    capital VARCHAR(100),
    currency VARCHAR(50),
    language VARCHAR(100),
    best_time_to_visit VARCHAR(100),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Visa Details Table
CREATE TABLE visa_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    country_id INT NOT NULL,
    visa_type ENUM('tourist', 'business', 'student') NOT NULL,
    processing_time VARCHAR(50),
    validity_period VARCHAR(50),
    stay_duration VARCHAR(50),
    entry_type VARCHAR(50),
    service_fee DECIMAL(10,2),
    requirements TEXT,
    process_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE,
    UNIQUE KEY unique_country_visa (country_id, visa_type)
);

-- Tour Packages Table
CREATE TABLE tour_packages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    category ENUM('international', 'domestic', 'honeymoon', 'adventure', 'religious') NOT NULL,
    duration VARCHAR(50),
    price DECIMAL(10,2),
    discounted_price DECIMAL(10,2),
    description TEXT,
    detailed_description LONGTEXT,
    highlights TEXT,
    inclusions TEXT,
    exclusions TEXT,
    itinerary LONGTEXT,
    image_url TEXT,
    gallery_images TEXT, -- JSON array of image URLs
    country VARCHAR(100),
    cities TEXT, -- JSON array of cities
    best_time VARCHAR(100),
    difficulty_level ENUM('easy', 'moderate', 'challenging'),
    group_size VARCHAR(50),
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Umrah Packages Table
CREATE TABLE umrah_packages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    duration VARCHAR(50),
    price DECIMAL(10,2),
    category ENUM('economy', 'premium', 'luxury') NOT NULL,
    features TEXT, -- JSON array of features
    accommodation_details TEXT,
    flight_details TEXT,
    visa_processing TEXT,
    transportation TEXT,
    meals_included TEXT,
    ziyarat_details TEXT,
    special_services TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Enquiries Table
CREATE TABLE enquiries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('visa', 'package', 'umrah', 'flight', 'general') NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    country VARCHAR(100),
    package_id INT NULL,
    visa_type VARCHAR(50),
    message TEXT,
    status ENUM('new', 'in_progress', 'completed', 'cancelled') DEFAULT 'new',
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (package_id) REFERENCES tour_packages(id) ON DELETE SET NULL
);

-- Document Uploads Table
CREATE TABLE document_uploads (
    id INT PRIMARY KEY AUTO_INCREMENT,
    enquiry_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(50),
    file_size INT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (enquiry_id) REFERENCES enquiries(id) ON DELETE CASCADE
);

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (username, email, password) VALUES 
('admin', 'admin@belwishtravels.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Insert default settings
INSERT INTO settings (setting_key, setting_value) VALUES 
('site_title', 'BELSWISH'),
('site_description', 'Your trusted partner for unforgettable travel experiences'),
('contact_email', 'info@belwishtravels.com'),
('contact_phone', '+91 99615 30776'),
('address', '2nd floor, Makkah tower, court road manjeri, malappuram, kerala-676521'),
('logo_url', ''),
('hero_image_url', 'https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'),
('facebook_url', ''),
('instagram_url', ''),
('twitter_url', ''),
('youtube_url', '');

-- Insert sample countries
INSERT INTO countries (name, slug, flag_emoji, description, capital, currency, language, best_time_to_visit, image_url) VALUES 
('United Arab Emirates', 'uae', '🇦🇪', 'A federation of seven emirates known for luxury shopping, ultramodern architecture and a lively nightlife scene.', 'Abu Dhabi', 'AED', 'Arabic', 'October to March', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'),
('United Kingdom', 'uk', '🇬🇧', 'An island nation in northwestern Europe comprising England, Scotland, Wales and Northern Ireland.', 'London', 'GBP', 'English', 'May to September', 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'),
('United States', 'usa', '🇺🇸', 'A country of 50 states covering a vast swath of North America, with Alaska in the northwest and Hawaii extending the nation\'s presence into the Pacific Ocean.', 'Washington D.C.', 'USD', 'English', 'April to October', 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'),
('Singapore', 'singapore', '🇸🇬', 'A sunny island in Southeast Asia, off the southern tip of the Malay Peninsula.', 'Singapore', 'SGD', 'English, Mandarin, Malay, Tamil', 'February to April', 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80');

-- Insert sample visa details
INSERT INTO visa_details (country_id, visa_type, processing_time, validity_period, stay_duration, entry_type, service_fee, requirements, process_description) VALUES 
(1, 'tourist', '3-5 working days', '90 days', '30 days', 'Multiple', 4999.00, 'Valid passport, photographs, flight tickets, hotel bookings, bank statements', 'Submit documents online, pay fees, receive visa via email'),
(1, 'business', '5-7 working days', '90 days', '30 days', 'Multiple', 7999.00, 'Valid passport, photographs, invitation letter, company documents, bank statements', 'Submit documents with business invitation, processing takes 5-7 days'),
(2, 'tourist', '15-20 working days', '180 days', '90 days', 'Multiple', 12999.00, 'Valid passport, photographs, financial documents, travel itinerary, accommodation proof', 'Online application, biometric appointment, interview may be required');

-- Insert sample tour packages
INSERT INTO tour_packages (title, slug, category, duration, price, description, highlights, image_url, country, cities, is_featured) VALUES 
('Dubai Adventure Package', 'dubai-adventure', 'international', '5 Days / 4 Nights', 49999.00, 'Experience the best of Dubai with our comprehensive tour package', '["Burj Khalifa", "Desert Safari", "Dubai Mall", "Palm Jumeirah"]', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', 'UAE', '["Dubai", "Abu Dhabi"]', TRUE),
('Kerala Backwaters', 'kerala-backwaters', 'domestic', '5 Days / 4 Nights', 24999.00, 'Explore the serene backwaters and hill stations of Kerala', '["Alleppey", "Munnar", "Thekkady", "Kovalam"]', 'https://images.unsplash.com/photo-1587922546307-776227941871?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', 'India', '["Kochi", "Alleppey", "Munnar", "Thekkady"]', TRUE);

-- Insert sample Umrah packages
INSERT INTO umrah_packages (title, duration, price, category, features, accommodation_details, is_active) VALUES 
('Economy Umrah Package', '15 Days', 85999.00, 'economy', '["3-star accommodation", "Return flights", "Visa processing", "Local transportation", "Basic meals", "Group Ziyarat"]', '3-star hotels near Haram', TRUE),
('Premium Umrah Package', '15 Days', 125999.00, 'premium', '["4-star accommodation", "Return flights", "Express visa", "Private transport", "All meals", "Guided Ziyarat", "Premium services"]', '4-star hotels with Haram view', TRUE),
('Luxury Umrah Package', '15 Days', 175999.00, 'luxury', '["5-star accommodation", "Business class flights", "VIP visa", "Luxury transport", "Premium dining", "Private guide", "Exclusive services"]', '5-star hotels with premium amenities', TRUE);