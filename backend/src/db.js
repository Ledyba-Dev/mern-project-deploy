import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";
await mongoose.connect(MONGODB_URI)
    .then(() => console.log("DB is connected"));