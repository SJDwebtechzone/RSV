const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all sold/leased properties
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM sold_leased ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get sold/leased stats
router.get('/stats', async (req, res) => {
  try {
    const [totalRows] = await db.query('SELECT COUNT(*) as total FROM sold_leased');
    const [soldRows] = await db.query("SELECT COUNT(*) as count FROM sold_leased WHERE transaction_type = 'Sold'");
    const [leasedRows] = await db.query("SELECT COUNT(*) as count FROM sold_leased WHERE transaction_type = 'Leased'");
    res.json({
      total: totalRows[0].total,
      sold: soldRows[0].count,
      leased: leasedRows[0].count
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new sold/leased property
router.post('/', async (req, res) => {
  const { project_name, location, area_sqft, transaction_type, represented, description } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO sold_leased (project_name, location, area_sqft, transaction_type, represented, description) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [project_name, location, area_sqft, transaction_type, represented, description]
    );
    res.status(201).json({ id: result.insertId, message: 'Sold/Leased record added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update sold/leased property
router.put('/:id', async (req, res) => {
  const { project_name, location, area_sqft, transaction_type, represented, description } = req.body;
  try {
    await db.query(
      `UPDATE sold_leased SET project_name=?, location=?, area_sqft=?, transaction_type=?, represented=?, description=? WHERE id=?`,
      [project_name, location, area_sqft, transaction_type, represented, description, req.params.id]
    );
    res.json({ message: 'Record updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete sold/leased property
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM sold_leased WHERE id = ?', [req.params.id]);
    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
