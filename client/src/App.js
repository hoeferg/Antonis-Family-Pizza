import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import "./index.css"
import Pizzas from "./pages/Pizzas"
import Toppings from "./pages/Toppings"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center h-16 space-x-8">
              <Link
                to="/pizzas"
                className="inline-flex items-center px-1 pt-1 text-lg font-medium text-gray-900 hover:text-primary border-b-2 border-transparent hover:border-primary"
              >
                Pizzas
              </Link>
              <Link
                to="/toppings"
                className="inline-flex items-center px-1 pt-1 text-lg font-medium text-gray-900 hover:text-primary border-b-2 border-transparent hover:border-primary"
              >
                Toppings
              </Link>
            </div>
          </nav>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/pizzas" element={<Pizzas />} />
            <Route path="/toppings" element={<Toppings />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

