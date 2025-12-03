import express, { Request, Response } from "express";
import morgan from "morgan";
import { initDB } from "./config/db";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();
const PORT = 5000;

// use middleware
app.use(express.json());
app.use(morgan("dev"));

// Initialize database
initDB()
  .then(() => console.log("Database initialized"))
  .catch((err) => console.error("Error initializing database:", err));


// Routes configuration
app.use("/users" , userRoutes);
app.use("/todos" , todoRoutes);
app.use("/auth" , authRoutes);


// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! Next Level Developer!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
