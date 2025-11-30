import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/auth.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server activated on port ${PORT}`)
});