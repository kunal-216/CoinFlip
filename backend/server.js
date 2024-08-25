import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoutes.js";
import gameRouter from "./routes/gameRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user",userRouter);
app.use("/api/game",gameRouter);

app.use("/",(req,res)=>{
    res.send("Hello from the server")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})