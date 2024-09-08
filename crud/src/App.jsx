// src/App.jsx
import { useState, useEffect } from 'react';
import { fetchItems, addItem, updateItem, deleteItem } from './api';
import ItemForm from './component/ItemForm';
import ItemList from './component/ItemList';
import Login from './pages/Login';
import Signin from './pages/Signin';
import { BrowserRouter , Link, Routes, Route } from 'react-router-dom';
import Profiles from './pages/Profiles';

const App = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const getItems = async () => { 
      try {
        const fetchedItems = await fetchItems(); 
        console.log('Fetched items:', fetchedItems); 
        if (Array.isArray(fetchedItems)) {
          setItems(fetchedItems);
        } else {
          console.error('Expected an array of items');
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    getItems();
  }, []);

  const handleAddItem = async (item) => {
    try {
      const newItem = await addItem(item); 
      setItems([...items, newItem]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleUpdateItem = async (updatedItem) => {
    try {
      await updateItem(updatedItem.id, updatedItem); 
      setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id); 
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
  };


  return (
    <BrowserRouter>
      <div>
        <h1>Simple CRUD App with Axios</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/Signin">Signin</Link>
          <Link to="/profile">profile</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ItemForm
                  onAdd={handleAddItem}
                  onUpdate={handleUpdateItem}
                  editingItem={editingItem}
                />
                <ItemList
                  items={items}
                  onEdit={handleEditItem}
                  onDelete={handleDeleteItem}
                />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />}/>
          <Route path="/Profile" element={<Profiles/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
