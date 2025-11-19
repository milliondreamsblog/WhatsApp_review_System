/*
  # WhatsApp Product Review System

  1. New Tables
    - `reviews`
      - `id` (uuid, primary key) - Unique identifier for each review
      - `contact_number` (text) - WhatsApp contact number of the reviewer
      - `user_name` (text) - Name of the person leaving the review
      - `product_name` (text) - Name of the product being reviewed
      - `product_review` (text) - The actual review content
      - `created_at` (timestamptz) - Timestamp when review was submitted
      
  2. Security
    - Enable RLS on `reviews` table
    - Add policy for public read access (to display reviews on frontend)
    - Add policy for service role to insert reviews (backend will use service role)
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_number text NOT NULL,
  user_name text NOT NULL,
  product_name text NOT NULL,
  product_review text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read all reviews"
  ON reviews
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can insert reviews"
  ON reviews
  FOR INSERT
  TO service_role
  WITH CHECK (true);