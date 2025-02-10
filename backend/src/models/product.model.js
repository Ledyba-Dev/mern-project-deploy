import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String
    }
});

const productModel = model("Product", productSchema);
export default productModel;