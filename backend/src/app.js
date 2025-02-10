import express from "express";
import Products from "./models/product.model.js";
import cors from "cors";
const corsOptions = {
    origin: process.env.APPLICATION_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
    res.redirect(process.env.APPLICATION_URL);
});

app.get("/products", async (req, res) => {
    const products = await Products.find();
    res.json(products);
});

app.post("/products", async (req, res) => {
    const { name, price, description } = req.body;

    if (!name || !price || !description) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const newProduct = await Products.create({
        name,
        price,
        description
    });

    res.json(newProduct);
});


export default app;



// username: rocomochopsico
// password: gKV3AZkwX4y77WbJ

// mongodb+srv://rocomochopsico:rZuD5EI4PYPzBdoH@mern-database.ldtwz.mongodb.net/?retryWrites=true&w=majority&appName=mern-database