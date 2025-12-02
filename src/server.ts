import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import {Pool} from 'pg';
import morgan from 'morgan';

dotenv.config();

const app = express();
const PORT =  5000;

// use middleware
app.use(express.json());
app.use(morgan('dev'));

// Postgres Pool setup
const pool = new Pool({
    connectionString: `${process.env.DATABASE_URL}`,
})

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
        )`)
}

initDB().then(() => {
    console.log('Database initialized');
}).catch((err) => {
    console.error('Error initializing database:', err);
});

app.get('/', (req: Request, res:Response) => {
    res.send('Hello, World! Next Level Developer!');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});