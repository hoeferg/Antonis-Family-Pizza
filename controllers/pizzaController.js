const Pizza = require('../models/Pizza');
const Topping = require('../models/Topping');

//Get all pizzas 
exports.getPizzas = async (req, res) => {
    try {
        const pizzas = await Pizza.find().populate('toppings');
        res.json(pizzas);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

//Add pizza
exports.addPizza = async (req, res) => {
    const { name, toppings } = req.body;
    try {
        const existingPizza = await Pizza.findOne({ name });
        if (existingPizza) return res.status(400).json({ message: 'Pizza already exists'});

        const pizza = new Pizza({ name, toppings });
        await pizza.save();
        res.status(201).json(pizza);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Delete pizza
exports.deletePizza = async (req, res) => {
    try {
        const deletedPizza = await Pizza.findByIdAndDelete(req.params.id);
        if (!deletedPizza) {
            return res.status(404).json({ message: 'Pizza not found'});
        } res.json({ message: 'Pizza deleted'});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

//Update pizza
exports.updatePizza = async (req, res) => {
    const { name, toppings } = req.body;
    try {
        const updatedPizza = await Pizza.findByIdAndUpdate(
            req.params.id, 
            { name, toppings }, 
            { new: true }
        );
        if (!updatedPizza) {
            return res.status(404).json({ message: 'Pizza not found' });
        }
        
        res.json(updatedPizza);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};