const mongoose = require('mongoose');

const PizzaSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    toppings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topping'}]
});

module.export = mongoose.model('Pizza', PizzaSchema);