import express from "express";
import connectDB from "./config/database.js";
import config from "./config/config.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import tableRoute from "./routes/tableRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
const app = express();

const PORT = config.port;
connectDB();

// Middlewares
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json()); // parse incoming request in json format
app.use(cookieParser());

// Root Endpoint
app.get("/", (req, res) => {
  res.json({ message: "Hello from POS Server!" });
});

// Other Endpoints
app.use("/api/user", userRoute);
app.use("/api/order", orderRoute);
app.use("/api/table", tableRoute);
app.use("/api/payment", paymentRoute);

// Global Error Handler
app.use(globalErrorHandler);

// Server
app.listen(PORT, () => {
  console.log(`☑️  POS Server is listening on port ${PORT}`);
});
