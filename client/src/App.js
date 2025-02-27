import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Pizzas from "./pages/Pizzas";
// import Toppings from "./pages/Toppings";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <nav className="flex space-x-4 mb-4">
        <Link to="/pizzas" className="text-blue-500">Pizzas</Link>
        <Link to="/toppings" className="text-blue-500">Toppings</Link>
        </nav>
        <Routes>
          {/* <Route path="/pizzas" element={<Pizzas />} />
          <Route path="/toppings" element={<Toppings />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
