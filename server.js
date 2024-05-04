const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const pool = mysql.createPool({
    // connectionLimit: 10,
    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "cv"

    host: "iyd.h.filess.io",
    user: "cv_voicecave",
    password: "dff1507662ee31fb0c3736e83203c2588fea0039",
    port: 3305,
    database: "cv_voicecave",
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// This would allow requests only from 'http://localhost:3000'
// app.use(cors({
//     origin: 'http://localhost:3000'
// }));

app.get('/', (req, res) => {
    res.redirect('/workexperience');
});

// Route for getting all work experiences
app.get('/workexperience', (req, res) => {
    pool.query('SELECT * FROM workexperience', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Route for creating a new work experience
app.post('/workexperience', (req, res) => {
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;
    
    // Validate input
    if (!companyname || !jobtitle || !location || !startdate || !enddate) {
        return res.status(400).json({ message: 'All fields except description are required' });
    }

    pool.query('INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description) VALUES (?, ?, ?, ?, ?, ?)',
        [companyname, jobtitle, location, startdate, enddate, description],
        (error, results) => {
            if (error) throw error;
            res.status(201).json({ message: 'Work experience created successfully', id: results.insertId });
        });
});

// Route for updating a work experience
app.put('/workexperience/:id', (req, res) => {
    const workId = req.params.id;
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;
    
    // Validate input
    if (!companyname || !jobtitle || !location || !startdate || !enddate) {
        return res.status(400).json({ message: 'All fields except description are required' });
    }

    pool.query('UPDATE workexperience SET companyname=?, jobtitle=?, location=?, startdate=?, enddate=?, description=? WHERE id=?',
        [companyname, jobtitle, location, startdate, enddate, description, workId],
        (error, results) => {
            if (error) throw error;
            res.json({ message: 'Work experience updated successfully' });
        });
});

// Route for deleting a work experience
app.delete('/workexperience/:id', (req, res) => {
    const workId = req.params.id;
    pool.query('DELETE FROM workexperience WHERE id=?', [workId], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Work experience deleted successfully' });
    });
});

// Route for getting details of a specific work experience
app.get('/workexperience/:id', (req, res) => {
    const workId = req.params.id;
    pool.query('SELECT * FROM workexperience WHERE id = ?', [workId], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Work experience not found' });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
