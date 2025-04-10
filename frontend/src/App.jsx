import { useEffect, useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
console.log(BACKEND_URL);

export default function App() {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productDescription, setProductDescription] = useState("");

    useEffect(() => {
        fetch(`${BACKEND_URL}/products`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProducts(data);
            })
            .catch((error) => console.log(error));
    }, []);

    // Agregar estos nuevos estados
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const url = isEditing 
                ? `${BACKEND_URL}/products/${editingId}`
                : `${BACKEND_URL}/products`;

            console.log("Enviando petición a:", url);
            console.log("Método:", isEditing ? "PUT" : "POST");
            console.log("ID del producto:", editingId);

            const response = await fetch(url, {
                method: isEditing ? "PUT" : "POST",
                body: JSON.stringify({
                    name: productName,
                    price: Number(productPrice),
                    description: productDescription,
                }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data);

            if (response.status === 200) {
                if (isEditing) {
                    setProducts(products.map(product => 
                        product._id === editingId ? data : product
                    ));
                    setIsEditing(false);
                    setEditingId(null);
                    console.log("PRODUCTO ACTUALIZADO CORRECTAMENTE");
                } else {
                    setProducts([...products, data]);
                    console.log("PRODUCTO CREADO CORRECTAMENTE");
                }
                
                setProductName("");
                setProductPrice("");
                setProductDescription("");
            } else {
                console.error("Error en la respuesta:", data);
            }
        } catch (error) {
            console.error("Error al procesar la petición:", error);
        }
    }

    // Nueva función para manejar la edición
    function handleEdit(product) {
        setIsEditing(true);
        setEditingId(product._id);
        setProductName(product.name);
        setProductPrice(product.price);
        setProductDescription(product.description);
    }

    async function handleDelete(productId) {
        try {
            const response = await fetch(
                `${BACKEND_URL}/products/${productId}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.status === 200) {
                setProducts(
                    products.filter((product) => product._id !== productId)
                );
                console.log("PRODUCTO ELIMINADO CORRECTAMENTE");
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
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
                <button type="submit">
                    {isEditing ? "Actualizar Producto" : "Agregar Producto"}
                </button>
                {isEditing && (
                    <button 
                        type="button" 
                        onClick={() => {
                            setIsEditing(false);
                            setEditingId(null);
                            setProductName("");
                            setProductPrice("");
                            setProductDescription("");
                        }}
                    >
                        Cancelar
                    </button>
                )}
            </form>
            <div className="containerProducts">
                {products.map((product) => {
                    return (
                        <div className="product" key={product._id}>
                            <h2>{product.name}</h2>
                            <p>{product.price}</p>
                            <p>{product.description}</p>
                            <div className="containerButtons">
                                <button onClick={() => handleDelete(product._id)}>
                                    Eliminar
                                </button>
                                <button onClick={() => handleEdit(product)}>Editar</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
