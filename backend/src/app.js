import express from "express";
import Products from "./models/product.model.js";
import cors from "cors";

const app = express();

// Habilitamos CORS para todas las rutas
app.use(
    cors({
        credentials: true,
        origin: [
            "https://mern-project-deploy-v5g6.vercel.app",
            "http://localhost:5173",
        ],
    })
);
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    try {
        res.json({ message: "API funcionando correctamente" });
    } catch (error) {
        console.log(error);
    }
});

// Ruta para obtener todos los productos
app.get("/products", async (req, res) => {
    const products = await Products.find();
    res.json(products);
});

// Ruta para crear un nuevo producto
app.post("/products", async (req, res) => {
    const { name, price, description } = req.body;

    if (!name || !price || !description) {
        return res
            .status(400)
            .json({ error: "Todos los campos son obligatorios" });
    }

    const newProduct = await Products.create({
        name,
        price,
        description,
    });

    res.json(newProduct);
});

// Ruta para eliminar un producto por su ID
app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Products.findByIdAndDelete(id);
    if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(product);
})

// Ruta para actualizar un producto por su ID
app.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description } = req.body;

        if (!name || !price || !description) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const updatedProduct = await Products.findByIdAndUpdate(
            id,
            { name, price, description },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
});

export default app;

// username: rocomochopsico
// password: gKV3AZkwX4y77WbJ

// mongodb+srv://rocomochopsico:rZuD5EI4PYPzBdoH@mern-database.ldtwz.mongodb.net/?retryWrites=true&w=majority&appName=mern-database
