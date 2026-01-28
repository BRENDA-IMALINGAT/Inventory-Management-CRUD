import React from 'react';
import { Edit2, Trash2, Calendar, FileText } from 'lucide-react';

const ItemCard = ({ item, onEdit, onDelete }) => {
    return (
        <div className="item-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 className="item-title">{item.title}</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => onEdit(item)} className="icon-btn" title="Edit Item">
                        <Edit2 size={16} />
                    </button>
                    <button onClick={() => onDelete(item.id)} className="icon-btn delete" title="Delete Item">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <p className="item-description">{item.description}</p>

            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.5, fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} />
                    {new Date(item.createdAt).toLocaleDateString()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FileText size={12} />
                    ID: {item.id.substring(0, 8)}...
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
