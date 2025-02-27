const Topping = require('../models/Topping');

//Get all toppings
exports.getToppings = async (req, res) => {
    const toppings = await Topping.find();
    res.json(toppings);
};

//Add topping
exports.addTopping = async (req, res) => {
    const { name } = req.body;
    try {
        const existingTopping = await Topping.findOne({name});
        if (existingTopping) return res.status(400).json({ message: 'Topping already exists'});

        const topping = new Topping({ name });
        await topping.save();
        res.status(201).json(topping);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Delete topping
exports.deleteTopping = async (req, res) => {
    await Topping.findByIdAndDelete(req.params.id);
    res.json({ message: 'Topping deleted'});
}

