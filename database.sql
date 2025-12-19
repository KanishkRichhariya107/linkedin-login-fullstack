-- LinkedIn Login Full Stack Application - Database Schema
-- PostgreSQL Database Setup

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mobile_no VARCHAR(15),
    role VARCHAR(20) DEFAULT 'candidate',
    signup_type VARCHAR(20) DEFAULT 'linkedin',
    profile_picture TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Sample query to view all users
-- SELECT * FROM users;

-- Sample query to view users by signup type
-- SELECT * FROM users WHERE signup_type = 'linkedin';
