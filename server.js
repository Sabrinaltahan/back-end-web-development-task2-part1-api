const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 10,
    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "cv",

    host: "sql6.freesqldatabase.com",
    port: 3306,
    user: "sql6699922",
    password: "VcNcnsXkxd",
    database: "sql6699922"
});


// Create Express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// This would allow requests only from 'http://localhost:3000'
// app.use(cors({
//     origin: 'http://localhost:3000'
// }));

app.get('/', (req, res) => {
    res.redirect('/courses');
});



// Route for getting all courses
app.get('/courses', (req, res) => {
    pool.query('SELECT * FROM courses', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Route for creating a new course
app.post('/courses', (req, res) => {
    const { courseCode, courseName, syllabus, progression } = req.body;
    pool.query('INSERT INTO courses (course_code, course_name, syllabus, progression) VALUES (?, ?, ?, ?)',
        [courseCode, courseName, syllabus, progression],
        (error, results) => {
        if (error) throw error;
        res.json({ message: 'Course created successfully', id: results.insertId });
        });
});

// Route for updating a course
app.put('/courses/:id', (req, res) => {
    const courseId = req.params.id;
    const { courseCode, courseName, syllabus, progression } = req.body;
    pool.query('UPDATE courses SET course_code=?, course_name=?, syllabus=?, progression=? WHERE id=?',
        [courseCode, courseName, syllabus, progression, courseId],
        (error, results) => {
        if (error) throw error;
        res.json({ message: 'Course updated successfully' });
        });
});

// Route for deleting a course
app.delete('/courses/:id', (req, res) => {
    const courseId = req.params.id;
    pool.query('DELETE FROM courses WHERE id=?', [courseId], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Course deleted successfully' });
    });
});


// Route for getting details of a specific course
app.get('/courses/:id', (req, res) => {
    const courseId = req.params.id;
    pool.query('SELECT * FROM courses WHERE id = ?', [courseId], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
