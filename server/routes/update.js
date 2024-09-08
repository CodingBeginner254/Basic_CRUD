const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.put('/:id',async (req,res) => {
  const query = 'UPDATE topic SET title= ?, description = ? WHERE id = ?';

  const {id} = req.params;
  const {title,description} = req.body;
  const values = [title,description,id];
  
  try {
    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item updated successfully' });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

module.exports = router;