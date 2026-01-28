import { useState, useEffect } from 'react';
import { Plus, Package } from 'lucide-react';
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
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2rem 0',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            padding: '12px',
            borderRadius: '16px',
            display: 'flex',
            boxShadow: '0 8px 16px -4px var(--primary-glow)'
          }}>
            <Package color="white" size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h1>Inventory Management CRUD App</h1>
            <p style={{ color: 'var(--text-scnd)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Precise control over your inventory</p>
          </div>
        </div>
        <button onClick={handleCreate} className="btn btn-primary">
          <Plus size={20} strokeWidth={2.5} />
          <span>New Item</span>
        </button>
      </header>

      <div className="glass-panel">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
            <div className="loading-spinner"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <Package size={48} style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
            <h3>No items yet</h3>
            <p>Your workspace is empty. Start by creating your first record.</p>
            <button
              onClick={handleCreate}
              className="btn btn-secondary"
              style={{ marginTop: '2rem' }}
            >
              <Plus size={18} />
              Create Item
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div className="badge">Total Items: {items.length}</div>
            </div>
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
