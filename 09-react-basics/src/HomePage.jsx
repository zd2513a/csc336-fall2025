import { useState } from "react";
import ListItem from "./ListItem";

function HomePage() {
  const [items, setItems] = useState([
    { text: "Pizza", important: true },
    { text: "Sushi", important: false },
    { text: "Burger", important: true },
  ]);

  const [inputValue, setInputValue] = useState("");

  function handleAdd() {
    if (inputValue.trim() === "") return;

    setItems([
      ...items,
      { text: inputValue, important: false },
    ]);

    setInputValue("");
  }

  return (
    <div className="app">
      <h1 className="app-title">My Favorite Foods</h1>

      <div className="input-row">
        <input
          className="item-input"
          placeholder="Type a new item..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button className="add-button" onClick={handleAdd}>
          Add
        </button>
      </div>

      <div className="list">
        {items.map((item, index) => (
          <ListItem
            key={index}
            text={item.text}
            important={item.important}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;