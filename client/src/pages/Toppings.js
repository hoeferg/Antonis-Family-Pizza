"use client"

import { useState, useEffect } from "react"
import { Loader2, Plus, Trash2 } from "lucide-react"

const API_URL= "/api/toppings";

function Toppings() {
  const [toppings, setToppings] = useState([])
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchToppings()
  }, [])

  const fetchToppings = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setToppings(data)
    } catch (error) {
      console.error("Error fetching toppings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addTopping = async () => {
    if (!name.trim()) {
      alert("Please enter a topping name")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      })

      if (!response.ok) throw new Error("Failed to add topping")

      const newTopping = await response.json()
      setToppings((prevToppings) => [...prevToppings, newTopping])
      setName("")
    } catch (error) {
      console.error("Error adding topping:", error)
      alert("Failed to add topping. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const deleteTopping = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Are you sure you want to delete this topping?")) return

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete topping")
      setToppings((prevToppings) => prevToppings.filter((t) => t._id !== id))
    } catch (error) {
      console.error("Error deleting topping:", error)
      alert("Failed to delete topping. Please try again.")
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
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg my-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Toppings</h1>

      <div className="space-y-6">
        {/* Add Topping Form */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Topping</h2>
          <div className="flex space-x-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              placeholder="Enter topping name"
            />
            <button
              onClick={addTopping}
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="-ml-1 mr-2 h-4 w-4" />
                  Add
                </>
              )}
            </button>
          </div>
        </div>

        {/* Toppings List */}
        <div className="bg-white rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Toppings</h2>
          {toppings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No toppings available</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {toppings.map((t) => (
                <li key={t._id} className="flex items-center justify-between py-3">
                  <span className="text-gray-900">{t.name}</span>
                  <button
                    onClick={() => deleteTopping(t._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Toppings

