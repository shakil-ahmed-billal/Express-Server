import { Request, Response } from "express";
import { pool } from "../../config/db";
import { todoService } from "./todo.service";

// create todo
const createTodo = async (req: Request, res: Response) => {
  const { user_id, title } = req.body;

  try {
    const result = await todoService.createTodo(user_id, title);
    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating todo",
    });
  }
};

// get all todos
const getAllTodos = async (req: Request, res: Response) => {
  try {
    const result = await todoService.getAllTodos();
    res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching todos",
    });
  }
};

// get single todo
const getSingleTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await todoService.getSingleTodo(id as unknown as number);
    res.status(200).json({
      success: true,
      message: "Todo fetched successfully",
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching todo",
    });
  }
};

// update todo
const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {

    const result = await todoService.updateTodo(id as unknown as number, title, completed);

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating todo",
    });
  }
};

// delete todo
const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await todoService.deleteTodo(id as unknown as number);
    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting todo",
    });
  }
};

export const todoController = {
  createTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo, 
};
