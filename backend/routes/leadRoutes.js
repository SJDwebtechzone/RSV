const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all leads
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM leads ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new lead (Contact/Inquiry)
router.post('/', async (req, res) => {
  const { name, phone, email, interest_region, budget, source } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO leads (name, phone, email, interest_region, budget, source) VALUES (?, ?, ?, ?, ?, ?)',
      [name, phone, email, interest_region, budget, source]
    );
    res.status(201).json({ id: result.insertId, message: 'Lead recorded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
