import express from "express";
import path, {dirname} from "path";
import {fileURLToPath} from "url";
import authRoutes from "./routes/authRoutes.js"
import todoRoutes from "./routes/todoRoutes.js"
import authMiddleware from "./middleware/authMiddleware.js";


const app = express();
const PORT = process.env.PORT || 3000;
//Middleware that will parse incoming JSON data into JS objects
app.use(express.json());

// Need to serve static files (HTML, CSS, JS) from the "public" directory
const filePath = fileURLToPath(import.meta.url);
const __dirname = dirname(filePath);

console.log(filePath);
console.log(__dirname);

app.use(express.static(path.join(__dirname, "../public")));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});


app.use('/auth',authRoutes);

app.use('/todos',authMiddleware ,todoRoutes);


app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})