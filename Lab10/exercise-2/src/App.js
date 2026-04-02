import React, { useState } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);

  // Add item
  const addItem = (text) => {
    const newItem = {
      id: Date.now(), // unique key
      text: text,
    };
    setItems([...items, newItem]);
  };

  // Remove item
  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="container">
      <h1>Item List Manager</h1>

      <ItemForm addItem={addItem} />
      <ItemList items={items} removeItem={removeItem} />
    </div>
  );
}

export default App;