const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.delete('/:id',async (req,res) => {
  const query = 'DELETE FROM topic WHERE id = ?';
  const {id} = req.params;

  try{
    const [result] = await db.query(query,[id]);
    if(result.affectedRows === 0){
      return res.status(404).json({message:'Item not fount'});
    }
    res.status(200).json({message:'Item delete successfully!',deleteId: id});
  }catch(error){
    console.error('Error deleting data:',error);
    res.status(500).json({message: 'Server Error',error});
  }
});

module.exports = router;