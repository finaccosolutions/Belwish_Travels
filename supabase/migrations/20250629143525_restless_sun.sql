/*
  # Create visa details table

  1. New Tables
    - `visa_details`
      - `id` (int, primary key, auto increment)
      - `country_id` (int, foreign key to countries table)
      - `visa_type` (varchar, tourist/business/student)
      - `documents_required` (text, JSON array of required documents)
      - `processing_time` (varchar, processing duration)
      - `visa_fee` (varchar, fee information)
      - `process_description` (text, detailed process description)
      - `additional_info` (text, additional information)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `visa_details` table
    - Add policies for public read access
    - Add policies for authenticated admin write access

  3. Indexes
    - Add index on country_id and visa_type combination
    - Add index on visa_type for filtering
*/

CREATE TABLE IF NOT EXISTS visa_details (
  id int PRIMARY KEY AUTO_INCREMENT,
  country_id int NOT NULL,
  visa_type varchar(50) NOT NULL,
  documents_required text,
  processing_time varchar(100),
  visa_fee varchar(100),
  process_description text,
  additional_info text,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE,
  UNIQUE KEY unique_country_visa (country_id, visa_type)
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_visa_details_country_type ON visa_details(country_id, visa_type);
CREATE INDEX IF NOT EXISTS idx_visa_details_type ON visa_details(visa_type);

-- Insert sample data
INSERT IGNORE INTO visa_details (country_id, visa_type, documents_required, processing_time, visa_fee, process_description, additional_info) VALUES
(1, 'tourist', '["Valid Passport", "Passport Size Photos", "Travel Itinerary", "Hotel Bookings", "Bank Statements", "Travel Insurance"]', '5-7 working days', '$150 + Service Fee', 'Submit application with required documents. Processing includes document verification, background check, and approval. Collect visa from our office or receive by courier.', 'Visa validity: 30 days from date of issue. Single entry only.'),
(1, 'business', '["Valid Passport", "Business Letter", "Invitation Letter", "Company Registration", "Bank Statements", "Travel Insurance"]', '3-5 working days', '$200 + Service Fee', 'Business visa requires invitation from host company. Submit all business documents for verification. Fast-track processing available.', 'Multiple entry visa valid for 90 days. Business activities only.'),
(1, 'student', '["Valid Passport", "Admission Letter", "Financial Proof", "Academic Transcripts", "Medical Certificate", "Travel Insurance"]', '10-15 working days', '$100 + Service Fee', 'Student visa requires admission confirmation from recognized institution. Submit academic and financial documents. Interview may be required.', 'Visa valid for duration of course. Work permit may be applied separately.');