import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";


interface CustomRequest extends Request {
  user: JwtPayload;
}

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // authorization logic here
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No token provided",
        });
      }

      const decoded = jwt.verify(
        token,
        config.jwt_secret as string
      ) as JwtPayload;

      console.log({ decoded });
      (req as CustomRequest).user = decoded;

      if(roles.length && !roles.includes(decoded.role as string)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You don't have enough permission to access this resource",
        });
      }

      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Unauthorized",
        data: error.message,
      });
    }
  };
};

export default auth;
