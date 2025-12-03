import { pool } from "../../config/db";

const createTodo = async (user_id: number, title: string) => {
  const result = await pool.query(
    `INSERT INTO todos (user_id , title) VALUES ($1 , $2) RETURNING *`,
    [user_id, title]
  );

  return result;
};

const getAllTodos = async () => {
  const result = await pool.query(`SELECT * FROM todos`);
  return result;
};

const getSingleTodo = async (id: number) => {
  const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [id]);
  return result;
};

const updateTodo = async (id: number, title: string, completed: boolean) => {
  const result = await pool.query(
    `UPDATE todos SET title = $1 , completed = $2 , updated_at = NOW() WHERE id = $3 RETURNING *`,
    [title, completed, id]
  );

  return result;
};

const deleteTodo = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM todos WHERE id = $1 RETURNING *`,
    [id]
  );
  return result;
};
export const todoService = {
  createTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
