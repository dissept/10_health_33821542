
USE glowcycle;

-- default login user: username gold, password smiths
INSERT INTO users (username, email, password)
VALUES ('gold', 'gold@example.com', 'smiths');

-- some example workouts to search
INSERT INTO workouts (name, phase, intensity) VALUES
('Slow moon flow yoga', 'Menstrual', 'Low'),
('Candlelight stretch & breathe', 'Menstrual', 'Low'),
('Fresh start strength', 'Follicular', 'Medium'),
('Dance cardio glow', 'Follicular', 'Medium'),
('Peak power HIIT', 'Ovulation', 'High'),
('Strong cycle spin', 'Ovulation', 'High'),
('Gentle grounding pilates', 'Luteal', 'Low'),
('Soft strength circuits', 'Luteal', 'Medium');