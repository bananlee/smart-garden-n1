const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Frontend fayllarini server orqali ochish
app.use(express.static(path.join(__dirname, "../client")));

// Ekinlar ma'lumotlari
let crops = [];
let nextId = 1;

// Bosh sahifa
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

// Barcha ekinlarni olish
app.get("/api/crops", (req, res) => {
    res.json(crops);
});

// Yangi ekin qo'shish
app.post("/api/crops", (req, res) => {
    const { name, area } = req.body;

    if (!name || !Number.isFinite(area) || area <= 0) {
        return res.status(400).json({
            message: "Ma'lumotlar noto'g'ri!"
        });
    }

    const crop = {
        id: nextId++,
        name: name,
        area: area
    };

    crops.push(crop);

    res.status(201).json(crop);
});

// Serverni ishga tushirish
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
