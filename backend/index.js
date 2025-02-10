import "./src/db.js";
import app from "./src/app.js";
import { PORT } from "./src/config.js";

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});