# GlowCycle

A Node.js web application built using Express.js, EJS and MySQL2.
The application allows users to register, log in, track menstrual cycles, search for workouts,
and receive personalised exercise recommendations based on menstrual phase. Authorisation is handled using
express-session with MySQL session storage and password hashing via bcrypt.

-----------------------------------------------------------
Technologies Used
-----------------------------------------------------------

- Node.js          – server environment
- Express.js       – routing and HTTP handling
- EJS              – dynamic views
- MySQL2           – database connection
- bcrypt           – password hashing
- express-session  – login sessions stored in MySQL
- CSS              – styling (dark pink and black theme)

-----------------------------------------------------------
Main Routes
-----------------------------------------------------------

PUBLIC ROUTES:
  /                     Home page
  /about                About the application
  /users/register       Registration form
  /users/login          Login page
  /search               Workout search form

PROTECTED ROUTES (requires login):
  /dashboard            Personalised user dashboard
  /period-sync          Form to add menstrual cycle information

Logging out:
  /logout               Ends the session and redirects to login

-----------------------------------------------------------
How to Install and Run Locally
-----------------------------------------------------------

1. Clone the repository:

   git clone <your-repo-url>
   cd glowcycle_req

2. Install dependencies:

   npm install

3. Create and initialise the database:

   sudo mysql < sql/create_db.sql
   sudo mysql glowcycle < sql/insert_test_data.sql

4. Create or update the MySQL user:

   ALTER USER 'berties_books_app'@'localhost' IDENTIFIED BY 'glowpass';
   GRANT ALL PRIVILEGES ON glowcycle.* TO 'berties_books_app'@'localhost';
   FLUSH PRIVILEGES;

5. Start the application:

   npm start

6. Open in your browser:

   http://localhost:8000

Default login credentials:
   username: gold
   password: smiths

-----------------------------------------------------------
Project Structure
-----------------------------------------------------------

glowcycle_req/
│── controllers/
│── models/
│── routes/
│── views/
│── public/
│── sql/
│   ├── create_db.sql
│   └── insert_test_data.sql
│── index.js
│── package.json
│── README.md

-----------------------------------------------------------
API and Application Features
-----------------------------------------------------------

Part A – Cycle Sync Logic
-----------------------------------------------------------

The system calculates the user's menstrual cycle phase based on:
- last period date
- cycle length
- phase determination formula

Recommendations are generated from the workouts table.

Part B – Search Functionality
-----------------------------------------------------------

Users may search workouts using:
   /search
   /search-results?q=keyword

The app performs a parameterised SQL LIKE query and returns matches.

Part C – Providing an API
-----------------------------------------------------------

Public JSON endpoint:
   GET /api/workouts
Returns:
[
  { "id": 1, "name": "Gentle Stretching", "phase": "Menstrual" },
  { "id": 2, "name": "HIIT Session", "phase": "Ovulation" }
]

Optional parameters:
   /api/workouts?phase=Ovulation
   /api/workouts?search=strength

Part D – Possible Extensions
-----------------------------------------------------------

- Pagination for /api/workouts
- Additional filtering
- API authentication
- Improved UI design
- Mobile app integration

-----------------------------------------------------------
Author
-----------------------------------------------------------

Student ID: 33821542
Module: Dynamic Web Applications
Goldsmiths, University of London.
