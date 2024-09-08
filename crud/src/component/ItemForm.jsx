import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 

const ItemForm = ({ onAdd, onUpdate, editingItem }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title);
      setDescription(editingItem.description || ''); 
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = { title, description }; 
    if (editingItem) {
      onUpdate({ ...editingItem, title, description });
    } else {
      onAdd(item);
    }
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Item title"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Item description"
        required
      />
      <button type="submit">
        {editingItem ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

ItemForm.propTypes = {
  onAdd: PropTypes.func.isRequired, 
  onUpdate: PropTypes.func.isRequired, 
  editingItem: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number
  }) 
};

export default ItemForm;
