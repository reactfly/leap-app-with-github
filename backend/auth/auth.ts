import { Header, Cookie, APIError, Gateway } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";
import jwt from "jsonwebtoken";

interface AuthParams {
  authorization?: Header<"Authorization">;
  session?: Cookie<"session">;
}

export interface AuthData {
  userID: string;
  email: string;
  name: string;
}

const JWT_SECRET = "seu-secret-jwt-muito-secreto"; // Em produção, use secrets

export const auth = authHandler<AuthParams, AuthData>(
  async (data) => {
    const token = data.authorization?.replace("Bearer ", "") ?? data.session?.value;
    if (!token) {
      throw APIError.unauthenticated("Token não fornecido");
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      return {
        userID: decoded.userID,
        email: decoded.email,
        name: decoded.name,
      };
    } catch (err) {
      throw APIError.unauthenticated("Token inválido", err as Error);
    }
  }
);

export const gw = new Gateway({ authHandler: auth });