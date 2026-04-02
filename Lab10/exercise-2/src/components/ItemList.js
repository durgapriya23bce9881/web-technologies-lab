import React from "react";

function ItemList({ items, removeItem }) {
  return (
    <div className="list">
      {items.length === 0 ? (
        <p className="empty">No items available</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="list-item">
            <span>{item.text}</span>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ItemList;