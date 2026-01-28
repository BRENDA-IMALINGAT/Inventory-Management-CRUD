import { useState, useEffect } from 'react';
import { Plus, Layout } from 'lucide-react';
import ItemCard from './components/ItemCard';
import ItemForm from './components/ItemForm';
import { getItems, createItem, updateItem, deleteItem } from './services/api';

function App() {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await getItems();
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreate = () => {
    setCurrentItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleSave = async (data) => {
    try {
      if (currentItem) {
        await updateItem(currentItem.id, data);
      } else {
        await createItem(data);
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (error) {
      console.error("Error saving item", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(id);
        fetchItems();
      } catch (error) {
        console.error("Error deleting item", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="glass-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', padding: '10px', borderRadius: '12px', display: 'flex' }}>
              <Layout color="white" size={24} />
            </div>
            <h1>Premium CRUD</h1>
          </div>
          <button onClick={handleCreate} className="btn btn-primary">
            <Plus size={20} />
            <span>Add Item</span>
          </button>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <div className="loading-spinner"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <h3>No items found</h3>
            <p>Create your first item to get started</p>
          </div>
        ) : (
          <div className="grid-list">
            {items.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <ItemForm
          item={currentItem}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default App;
