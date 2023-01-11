import express from "express";
import "express-async-errors";
import handleError from "./errors/handleError";
import addressRoutes from "./routes/addresses.routes";
import categoryRoutes from "./routes/categories.routes";
import productRoutes from "./routes/products.routes";
import sessionRoutes from "./routes/session.routes";
import userRoutes from "./routes/users.routes";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/sign", sessionRoutes);
app.use("/addresses", addressRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

app.use(handleError);

export default app;