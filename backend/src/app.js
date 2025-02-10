import express from "express";
import Products from "./models/product.model.js";
import cors from "cors";
import { APPLICATION_URL } from "./config.js";
// const corsOptions = {
//     origin: process.env.APPLICATION_URL,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
// };
const app = express();
console.log(APPLICATION_URL);
// Habilitamos CORS para todas las rutas
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", APPLICATION_URL);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
})
app.use(cors({ credentials: true, origin: APPLICATION_URL }));
app.use(express.json());

app.get("/", (req, res) => {
    try {
        res.json({ message: "API funcionando correctamente" });
    } catch (error) {
        console.log(error);
    }
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