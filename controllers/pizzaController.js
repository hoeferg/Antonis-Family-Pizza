const Pizza = require('../models/Pizza');
const Topping = require('../models/Topping');

//Get all pizzas 
exports.getPizzas = async (req, res) => {
    try {
        const pizzas = await Pizza.find().populate('topping');
        res.json(pizzas);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

//Add pizzas
exports.addPizza = async (req, res) => {
    const { name, toppings } = req.body;
    try {
        const existingPizza = await Pizza.findOne({ name });
        if (existingPizza) return res.status(400).json({ message: 'Pizza already exists'});

        const pizza = new Pizza({ name, toppings });
        await pizza.save();
        resizeTo.status(201).json(pizza);
    } catch (error) {
        res.status(500).json({ message: error.meesage });
    }
};

//Delete pizza
exports.deletePizza = async (req, res) => {
    try {
        const deletedPizza = await Pizza.findByIdAndDelete(req.params.id);
        if (!deletedPizza) {
            return res.status(404).json({ message: 'Pizza not found'})
        } res.json({ message: 'Pizza deleted'});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
    await Pizza.findByIdAndDelete(req.params.id);
    res.json({ message})
}