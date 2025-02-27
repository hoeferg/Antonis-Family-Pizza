require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("MongoDB Connection Error:", error));

// Routes
app.use("/api/toppings", require("./routes/toppingRouts"));
app.use("/api/pizzas", require("./routes/pizzaRoutes"));

app.get("/", (req, res) => {
  res.send("Pizza API is running");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port ${PORT}"));
