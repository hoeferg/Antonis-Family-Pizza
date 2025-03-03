"use client"

import { useState, useEffect } from "react"
import { Loader2, Plus, Trash2 } from "lucide-react"

const PIZZA_API = "/api/pizzas";
const TOPPING_API = "/api/toppings";

function Pizzas() {
  const [pizzas, setPizzas] = useState([])
  const [toppings, setToppings] = useState([])
  const [name, setName] = useState("")
  const [selectedToppings, setSelectedToppings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchPizzas()
    fetchToppings()
  }, [])

  const fetchPizzas = async () => {
    try {
      const response = await fetch(PIZZA_API)
      const data = await response.json()
      setPizzas(data)
    } catch (error) {
      console.error("Error fetching pizzas:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchToppings = async () => {
    try {
      const response = await fetch(TOPPING_API)
      const data = await response.json()
      setToppings(data)
    } catch (error) {
      console.error("Error fetching toppings:", error)
    }
  }

  const addPizza = async () => {
    if (!name || selectedToppings.length === 0) {
      alert("Please enter a pizza name and select at least one topping")
      return
    }

    setIsSubmitting(true)
    const requestData = { name, toppings: selectedToppings }

    try {
      const response = await fetch(PIZZA_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      })

      const responseData = await response.json()

      if (!response.ok) throw new Error(responseData.message || "Failed to add pizza")

      setPizzas((prevPizzas) => [...prevPizzas, responseData])
      setName("")
      setSelectedToppings([])
      await fetchPizzas()
    } catch (error) {
      console.error("Error adding pizza:", error.message)
      alert("Failed to add pizza. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const deletePizza = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Are you sure you want to delete this pizza?")) return

    try {
      const response = await fetch(`${PIZZA_API}/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete pizza")

      setPizzas((prevPizzas) => prevPizzas.filter((p) => p._id !== id))
    } catch (error) {
      console.error(error)
      alert("Failed to delete pizza. Please try again.")
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg my-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Pizzas</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Add Pizza Form */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Pizza</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="pizza-name" className="block text-sm font-medium text-gray-700 mb-1">
                Pizza Name
              </label>
              <input
                id="pizza-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                placeholder="Enter pizza name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Toppings</label>
              <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md bg-white p-2">
                {toppings.map((t) => (
                  <label key={t._id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                    <input
                      type="checkbox"
                      checked={selectedToppings.includes(t._id)}
                      onChange={(e) => {
                        const isChecked = e.target.checked
                        setSelectedToppings(
                          isChecked ? [...selectedToppings, t._id] : selectedToppings.filter((id) => id !== t._id),
                        )
                      }}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-gray-700">{t.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={addPizza}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="-ml-1 mr-2 h-4 w-4" />
                  Add Pizza
                </>
              )}
            </button>
          </div>
        </div>

        {/* Pizza List */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pizza Menu</h2>
          {pizzas.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No pizzas available</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {pizzas.map((p) => (
                <li key={p._id} className="py-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{p.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {(p.toppings || []).map((t) => (typeof t === "object" ? t.name : "Unknown")).join(", ")}
                      </p>
                    </div>
                    <button
                      onClick={() => deletePizza(p._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Pizzas

