import { pool } from "../../config/db";
import bcrypt from 'bcryptjs';

const createUser = async (payload:Record<string, unknown>) => {

  const { name, email , password , role} = payload;

  const hashedPass = await bcrypt.hash(password as string, 10);
  console.log(hashedPass)

  const result = await pool.query(
    `
        INSERT INTO users (name, email , password , role) VALUES ($1, $2 , $3 , $4) RETURNING *`,
    [name, email , hashedPass , role]
  );

  return result;
};

const getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const getSingleUser = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};

const updateUser = async (id: string, name: string, email: string , role: string) => {
  const result = await pool.query(
    `UPDATE users SET name = $1 , email = $2 , role = $4 , updated_at = NOW() WHERE id = $3 RETURNING *`,
    [name, email, role, id]
  );
  return result;
};
const deleteUser = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`,
    [id]
  );
  return result;
};

export const userService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
