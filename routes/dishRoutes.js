// Route för att hantera rätter
// Endast inloggade användare kan hantera rätter

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken"); // Inkludera JWT
require("dotenv").config();

// Middleware för att verifiera JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token saknas" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Ogiltig token" });
    req.user = user;
    next();
  });
}

// Dish model
const Dish = require("../models/Dish");

// Hämta alla rätter (offentligt)
router.get("/", async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Skapa ny rätt
router.post("/", authenticateToken, async (req, res) => { // Bara inloggade användare kan skapa rätter genom authenticateToken
    console.log("Create dish called...");
  
    try {
      let { name, description, price, category } = req.body;
  
      // Validera input, kolla vilka fält som saknas
      const missingFields = [];
      if (!name) missingFields.push("name"); // Om namn saknas
      if (!description) missingFields.push("description"); // Om beskrivning saknas
      if (!price) missingFields.push("price"); // Om pris sknas
      if (!category) missingFields.push("category"); // Om kategori saknas
  
      // Skriv ut det saknade värdet
      if (missingFields.length > 0) {
        return res
          .status(400)
          .json({ error: `Invalid input, send ${missingFields.join(", ")}` }); // Felmeddelande om alla fält inte är ifyllda
      }
  
      // Skapa och spara ny rätt
      const dish = new Dish({ name, description, price, category });
      await dish.save(); // Spara rätt
  
      res.status(201).json({ message: "Dish created", dish });

    } catch (error) {
      res.status(500).json({ error: "Server error: " + error });
    }
  });  

// Hämta rätter utifrån kategori
router.get("/category/:type", async (req, res) => {
    try {
      const category = req.params.type;
      const dishes = await Dish.find({ category });
      res.json(dishes);
    } catch (err) {
      res.status(500).json({ message: "Server error" + err.message });
    }
  });
  
// Hämta specifik rätt via ID
router.get("/:id", async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ message: "Rätten hittades inte" });
    res.json(dish);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
}); 

// Uppdatera specifik rätt vid ID
router.put("/:id", authenticateToken, async (req, res) => {
    console.log("Update dish called...");
  
    try {
      const { name, description, price } = req.body;
  
        // Validera att minst ett fält finns
        if (!name && !description && !price) {
        return res.status(400).json({ message: "Skicka minst ett fält som ska uppdateras" });
        }

        // Validera att description inte är tom
        if (description !== undefined && description.trim() === "") {
        return res.status(400).json({ message: "Description kan inte vara tom" });
        }
  
        // Hämta rätten
        const dish = await Dish.findById(req.params.id);
        if (!dish) return res.status(404).json({ message: "Rätten hittades inte" });
    
        // Uppdatera fälten om de finns
        if (name) dish.name = name;
        if (description) dish.description = description;
        if (price) dish.price = price;
    
        await dish.save(); // Spara uppdatering
    
        res.status(200).json({ message: "Rätten uppdaterad", dish });

    } catch (err) {
      res.status(500).json({ message: "Server error: " + err.message });
    }
  });
  
//  Ta bort rätt
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ message: "Rätten hittades inte" });

    await dish.deleteOne();
    res.json({ message: "Rätten togs bort" });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

module.exports = router;