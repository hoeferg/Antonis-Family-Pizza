import { Link } from "react-router-dom"
import { Pizza, UtensilsCrossed } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-red-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-8">
            Welcome to <span className="text-red-600">Antonis Family Pizza</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Serving authentic Italian pizzas made with love and tradition since 1975. Every pizza is crafted with the
            finest ingredients and family-secret recipes.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <div className="flex justify-center mb-4">
                <Pizza className="w-12 h-12 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Menu</h2>
              <p className="text-gray-600 mb-6">
                Explore our selection of handcrafted pizzas, made with traditional recipes and the freshest ingredients.
              </p>
              <Link
                to="/pizzas"
                className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                View Pizzas
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <div className="flex justify-center mb-4">
                <UtensilsCrossed className="w-12 h-12 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Toppings</h2>
              <p className="text-gray-600 mb-6">
                Customize your pizza with our wide variety of fresh, premium toppings to create your perfect
                combination.
              </p>
              <Link
                to="/toppings"
                className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                View Toppings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

