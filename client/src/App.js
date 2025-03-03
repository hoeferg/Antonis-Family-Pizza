import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom"
import "./index.css"
import Home from "./pages/Home"
import Pizzas from "./pages/Pizzas"
import Toppings from "./pages/Toppings"
import { Pizza } from "lucide-react"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-2">
                <Pizza className="h-8 w-8 text-red-600" />
                <span className="text-xl font-bold text-gray-900">Antonis Family Pizza</span>
              </Link>
              <div className="flex space-x-8">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                      isActive
                        ? "border-red-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/pizzas"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                      isActive
                        ? "border-red-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`
                  }
                >
                  Pizzas
                </NavLink>
                <NavLink
                  to="/toppings"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                      isActive
                        ? "border-red-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`
                  }
                >
                  Toppings
                </NavLink>
              </div>
            </div>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pizzas" element={<Pizzas />} />
            <Route path="/toppings" element={<Toppings />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

