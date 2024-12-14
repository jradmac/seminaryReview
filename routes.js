const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Set up the PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'seminary',
    password: 'Smores7531',
    port: 5434, // Your PostgreSQL port
});

// Test the database connection
pool.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch((err) => console.error('Error connecting to PostgreSQL database:', err));

// Routes
router.get('/', (req, res) => {
    res.render('feedback'); // Renders the EJS form page (feedback.ejs)
});

router.get('/thankYou', (req, res) => {
    res.render('thankyou'); // Ensure 'thankyou.ejs' exists in the views folder
});


router.post('/submit-feedback', async (req, res) => {
    const {
        relationshipWithChrist,
        enjoyedSeminary,
        understandingScriptures,
        testimonyImproved,
        threeWords,
        mainTakeaway,
        memorableMoment,
        meaningfulLesson,
        meaningfulPrinciple,
        semesterHighlight,
        fiveYearsReflection,
    } = req.body;

    try {
        // Insert the feedback data into the database
        const query = `
            INSERT INTO feedback (
                relationship_with_christ,
                enjoyed_seminary,
                understanding_scriptures,
                testimony_improved,
                three_words,
                main_takeaway,
                memorable_moment,
                meaningful_lesson,
                meaningful_principle,
                semester_highlight,
                five_years_reflection
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `;
        const values = [
            relationshipWithChrist,
            enjoyedSeminary,
            understandingScriptures,
            testimonyImproved,
            threeWords,
            mainTakeaway,
            memorableMoment,
            meaningfulLesson,
            meaningfulPrinciple,
            semesterHighlight,
            fiveYearsReflection,
        ];

        await pool.query(query, values);

        res.redirect('/thankYou');
    } catch (err) {
        console.error('Error inserting feedback:', err);
        res.status(500).send('An error occurred while submitting feedback.');
    }
});

module.exports = router;
