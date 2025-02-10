import { useEffect, useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function App() {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productDescription, setProductDescription] = useState("");
    
    useEffect(() => {
        fetch(`${BACKEND_URL}/products`)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch(`${BACKEND_URL}/products`, {
            method: "POST",
            body: JSON.stringify({
                name: productName,
                price: Number(productPrice),
                description: productDescription,
            }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200) {
            setProductName("");
            setProductPrice("");
            setProductDescription("");
            const savedProduct = await response.json();
            if (savedProduct) {
                setProducts([...products, savedProduct]);
            }
            console.log("PRODUCTO CREADO CORRECTAMENTE");
        }
    }

    return (
        <div>
            <h1>Products</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre del producto"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Precio"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Descripción"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    required
                />
                <button type="submit">Agregar Producto</button>
            </form>
            <div className="containerProducts">
                {products.map((product) => {
                    return (
                        <div className="product" key={product._id}>
                            <h2>{product.name}</h2>
                            <p>{product.price}</p>
                            <p>{product.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
