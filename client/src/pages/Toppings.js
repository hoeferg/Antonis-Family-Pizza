import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/toppings";

function Toppings() {
  const [toppings, setToppings] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setToppings(data))
      .catch((error) => console.error("Error fetching toppings:", error));
  }, []);

  const addTopping = async () => {
    if (!name.trim()) return;
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (!response.ok) throw new Error("Failed to add topping");

      const newTopping = await response.json();
      setToppings((prevToppings) => [...prevToppings, newTopping]);
      setName("");
    } catch (error) {
        console.error("Error adding topping:", error);
    }
  };

  const deleteTopping = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete topping");
      //loops through topping array and removes the topping with the same id
      setToppings((prevToppings) => prevToppings.filter((t) => t._id !== id));
    } catch (error) {
        console.error("Error deleting topping:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">Manage Toppings</h1>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter topping name"
        />
        <button
          onClick={addTopping}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add
        </button>
      </div>
      <ul>
        {toppings.map((t) => (
          <li key={t._id} className="flex justify-between p-2 border-b">
            {t.name}
            <button
              onClick={() => deleteTopping(t._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Toppings;
