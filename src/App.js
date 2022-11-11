import React, { useState } from "react";
import "./App.css";
import { withServiceWorkerUpdater } from "@3m1/service-worker-updater";

function App({ newServiceWorkerDetected, onLoadNewServiceWorkerAccept }) {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleAddList = () => {
    setItems((currentItems) => [
      ...currentItems,
      { content: newItem, isOk: false },
    ]);
    setNewItem("");
  };

  const handleCheckItem = (id) => {
    setItems((currentItems) => {
      return currentItems.map((item, idx) => {
        if (idx === id) return { ...item, isOk: !item.isOk };
        return item;
      });
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, message }),
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        {
          newServiceWorkerDetected && (
            <div
              style={{
                border: "1px solid",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h3>Nueva actualización, ¿quieres actualizar?</h3>
              <button onClick={onLoadNewServiceWorkerAccept}>ACTUALIZAR</button>
            </div>
          )
          //Banner de actualización de versión
        }
        <h1>Proyecto PWA - Lista de compra</h1>
        <input
          type="text"
          id="newItem"
          value={newItem}
          onChange={(e) => {
            setNewItem(e.target.value);
          }}
        />
        <button onClick={handleAddList}>Añadir</button>
        <ul style={{ listStyle: "none" }}>
          {items.map((item, idx) => (
            <li key={idx}>
              <span
                style={{ textDecoration: item.isOk ? "line-through" : "none" }}
              >
                {item.content}
              </span>{" "}
              <button
                onClick={() => {
                  handleCheckItem(idx);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {item.isOk ? "❌" : "✔️"}
              </button>
            </li>
          ))}
        </ul>
      </header>
      <form onSubmit={handleForm}>
        <label htmlFor="title">Titulo</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="message">Mensaje</label>
        <input
          type="text"
          name="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">Notificar</button>
      </form>
    </div>
  );
}

export default withServiceWorkerUpdater(App);
