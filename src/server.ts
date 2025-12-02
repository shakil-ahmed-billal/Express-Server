import dotenv from "dotenv";
import express, { Request, Response } from "express";
import morgan from "morgan";
import { Pool } from "pg";

dotenv.config();

const app = express();
const PORT = 5000;

// use middleware
app.use(express.json());
app.use(morgan("dev"));

// Postgres Pool setup
const pool = new Pool({
  connectionString: `${process.env.DATABASE_URL}`,
});

const initDB = async () => {
  // users table
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        age INT,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )`);

  // todo table
  await pool.query(`
        CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        due_date DATE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )`);
};

// Initialize database
initDB()
  .then(() => {
    console.log("Database initialized");
  })
  .catch((err) => {
    console.error("Error initializing database:", err);
  });

// Routes configuration

// Create User
app.post("/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      `
        INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`,
      [name, email]
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result.rows[0],
    });

  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "User  created unsuccessfully",
    });
  }
});
// Get All Users
app.get("/users" , async (req:Request , res:Response)=>{
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json({
      success:true,
      message:"Users fetched successfully",
      data:result.rows
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Error fetching users"
    })
  }
})
// Get single user
app.get("/users/:id" , async(req:Request , res:Response)=>{
  const {id} = req.params;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1` , [id]);
    res.status(200).json({
      success:true,
      message:"User fetched successfully",
      data:result.rows
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Error fetching user"
    })
  }
})
// update user
app.put("/users/:id" , async(req:Request , res:Response)=>{
  const {id} = req.params;
  const {name , email} = req.body;

  try{

    const result = await pool.query(`UPDATE users SET name = $1 , email = $2 , updated_at = NOW() WHERE id = $3 RETURNING *` , [name , email , id]);

    res.status(200).json({
      success:true,
      message:"User updated successfully",
      data:result.rows[0]
    })

  }catch(error){
    res.status(500).json({
      success:false,
      message:"Error updating user"
    })
  }
})
// Delete user
app.delete("/users/:id" , async(req:Request , res:Response)=>{
  const {id} = req.params;
  try {
    const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *` , [id]);
    res.status(200).json({
      success:true,
      message:"User deleted successfully",
      data:result.rows[0]
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Error deleting user"
    })
  }
})

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! Next Level Developer!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
