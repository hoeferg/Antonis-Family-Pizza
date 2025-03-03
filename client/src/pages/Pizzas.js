import { useState, useEffect } from "react";

const PIZZA_API = "http://localhost:5000/api/pizzas";
const TOPPING_API = "http://localhost:5000/api/toppings";

function Pizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [name, setName] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);

  useEffect(() => {
   fetchPizzas();
   fetchToppings();
  }, []);

  const fetchPizzas = async () => {
    try {
      const response = await fetch(PIZZA_API);
      const data = await response.json();
      setPizzas(data);
    } catch (error) {
      console.error("Error fetching pizzas:", error);
    }
  };
  
  const fetchToppings = async () => {
    try {
        const response = await fetch(TOPPING_API);
        const data = await response.json();
        setToppings(data);
    } catch (error) {
        console.error("Error fetching toppings:", error);
    }
  }

//Add Pizza
  const addPizza = async () => {
    if (!name || selectedToppings.length === 0) {
        console.error("Name or toppings are missing")
        return;
    } 

    const requestData = {name, toppings:selectedToppings};
    console.log("Sending request:", requestData);

    try {
      const response = await fetch(PIZZA_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, toppings: selectedToppings }),
      });

      const responseData = await response.json();
      console.log("Server Response:", responseData);

      if (!response.ok) throw new Error(responseData.message || "Failed to add pizza");

      setPizzas((prevPizzas) => [...prevPizzas, responseData]);
      setName("");
      setSelectedToppings([]);

      window.location.reload();


    } catch (error) {
      console.error("Error adding pizza:", error.message);
    }
  };

  //Delete Pizza
  const deletePizza = async (id) => {
    try {
      const response = await fetch(`${PIZZA_API}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete pizza");

      setPizzas((prevPizzas) => prevPizzas.filter((p) => p._id !== id));
      await fetchPizzas()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">Manage Pizzas</h1>
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter pizza name"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Select Toppings:</label>
        {toppings.map((t) => (
          <label key={t._id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={t._id}
              onChange={(e) => {
                const isChecked = e.target.checked;
                setSelectedToppings(isChecked
                  ? [...selectedToppings, t._id]
                  : selectedToppings.filter((id) => id !== t._id));
              }}
            />
            <span>{t.name}</span>
          </label>
        ))}
      </div>
      <button onClick={addPizza} className="bg-green-500 text-white p-2 w-full rounded">
        Add Pizza
      </button>
      <ul className="mt-4">
        {pizzas.map((p) => (
           <li key={p._id} className="flex justify-between p-2 border-b">
           {p.name} (
           {(p.toppings || []).map((t) => (typeof t === "object" ? t.name : "Unknown")).join(", ")}
           )
           <button onClick={() => deletePizza(p._id)} className="text-red-500">Delete</button>
         </li>
        ))}
      </ul>
    </div>
  );
}

export default Pizzas;


