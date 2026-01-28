import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const ItemCard = ({ item, onEdit, onDelete }) => {
    return (
        <div className="item-card">
            <div className="item-content" style={{ flex: 1 }}>
                <h3 className="item-title">{item.title}</h3>
                <p className="item-description">{item.description}</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginLeft: '1rem' }}>
                <button onClick={() => onEdit(item)} className="btn-icon" title="Edit">
                    <Edit2 size={18} />
                </button>
                <button onClick={() => onDelete(item.id)} className="btn-icon btn-delete" title="Delete">
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default ItemCard;
