CREATE DATABASE IF NOT EXISTS vidly;

USE vidly;

CREATE TABLE IF NOT EXISTS videos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(64),
  description VARCHAR(128),
  videoUrl VARCHAR(128),
  thumbURL VARCHAR(128)
);