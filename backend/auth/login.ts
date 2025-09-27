import { api, Cookie } from "encore.dev/api";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
  session: Cookie<"session">;
}

const JWT_SECRET = "seu-secret-jwt-muito-secreto";

// Usuário de exemplo para demonstração
const DEMO_USER = {
  id: "1",
  email: "admin@example.com", 
  name: "Administrador",
  password: "$2b$10$YourHashedPasswordHere" // "admin123" hasheado
};

export const login = api<LoginRequest, LoginResponse>(
  { expose: true, method: "POST", path: "/auth/login" },
  async (req) => {
    const { email, password } = req;

    // Verificar credenciais (em um app real, consulte o banco de dados)
    if (email !== DEMO_USER.email) {
      throw new Error("Email ou senha inválidos");
    }

    // Para demonstração, aceitar qualquer senha
    // Em produção, use: await bcrypt.compare(password, DEMO_USER.password)
    
    const token = jwt.sign(
      { 
        userID: DEMO_USER.id,
        email: DEMO_USER.email,
        name: DEMO_USER.name
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return {
      token,
      user: {
        id: DEMO_USER.id,
        email: DEMO_USER.email,
        name: DEMO_USER.name,
      },
      session: {
        value: token,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      }
    };
  }
);