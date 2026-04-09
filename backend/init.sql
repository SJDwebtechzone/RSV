-- GreenField Real Estate Database Schema
CREATE DATABASE IF NOT EXISTS greenfield_db;
USE greenfield_db;

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status ENUM('Available', 'Fast Filling', 'Sold Out') DEFAULT 'Available',
    price_range VARCHAR(100),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Plots Table
CREATE TABLE IF NOT EXISTS plots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    size VARCHAR(50),
    price VARCHAR(50),
    status ENUM('Available', 'Booked', 'Sold') DEFAULT 'Available',
    tag VARCHAR(100),
    image_url TEXT,
    approval VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Leads Table
CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    interest_region VARCHAR(100),
    budget VARCHAR(100),
    source VARCHAR(50), -- 'Contact Page', 'Hero Form', 'Book Visit'
    status ENUM('New', 'Contacted', 'Qualified', 'Closed') DEFAULT 'New',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin Users
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data
INSERT INTO projects (name, status, price_range) VALUES 
('The Royal Estate', 'Available', '₹45L - ₹1.5Cr'),
('Emerald Valley', 'Fast Filling', '₹85L - ₹2.5Cr'),
('Heritage West', 'Available', '₹32L - ₹65L');
