import { useState, useEffect } from "react";

import apiRequest from "./apiRequest";

import Header from "./Header";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import Content from "./Content";
import Footer from "./Footer";

function App() {
  const API_URL = "http://localhost:3500/items";

  // const [items, setItems] = useState(JSON.parse(localStorage.getItem("shoppingList")) || []);

  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shoppingList")) || []
  );
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   localStorage.setItem("shoppingList",JSON.stringify(items));
  // }, [items]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not get expected data !!!");

        const listItems = await response.json();

        setItems(listItems);
        setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      (async () => fetchItems())();
    }, 500);
  }, []); //!!! ATTENTION !!! if we use an empty array, this useEffect will be called only once (after load)

  const addItem = async (itemName) => {
    const newId = items.length ? items[items.length - 1].id + 1 : 1;
    const theNewItem = { id: newId, checked: false, item: itemName };
    const listeItems = [...items, theNewItem];
    setItems(listeItems);
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(theNewItem),
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const handleCheck =async  (id) => {
    const listeItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listeItems);

    const myItem = listeItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const result = await apiRequest(`${API_URL}/${id}`, updateOptions);
    if (result) setFetchError(result);
  };

  const handleDelete =async (id) => {
    const listeItems = items.filter((item) => item.id !== id);
    setItems(listeItems);
    
    const deleteOptions = {
      method: "DELETE"};
    const result = await apiRequest(`${API_URL}/${id}`, deleteOptions);
    if (result) setFetchError(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem(""); //reset the default state to be able to add other items
  };

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading && <p style={{ color: "green" }}>Loading items....</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer
        totalItems={
          items.filter((item) =>
            item.item.toLowerCase().includes(search.toLowerCase())
          ).length
        }
      />
    </div>
  );
}

export default App;
