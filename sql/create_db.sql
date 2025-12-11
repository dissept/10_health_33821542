
CREATE DATABASE IF NOT EXISTS glowcycle;
USE glowcycle;

DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS cycles;
DROP TABLE IF EXISTS workouts;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(150),
  password VARCHAR(255) NOT NULL
);

CREATE TABLE cycles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  last_period DATE NOT NULL,
  cycle_length INT NOT NULL,
  phase VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE workouts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  phase VARCHAR(50) NOT NULL,
  intensity VARCHAR(50) NOT NULL
);

-- express-mysql-session will create its own sessions table when needed
