const mongoose = require("mongoose"); // Inkludera mongoose

// Dish Schema
const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  created: {
    type: Date,
    default: Date.new
  },
});

// Skapar en Mongoose-modell "Dish" baserat på dishSchema
const Dish = mongoose.model("Dish", dishSchema); // Modellen används för att interagera med MongoDB (CRUD-operationer)
module.exports = Dish; // Exporterar modellen så att den kan importeras och användas i andra filer
