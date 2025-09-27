import { api, Cookie } from "encore.dev/api";

export interface LogoutResponse {
  message: string;
  session: Cookie<"session">;
}

export const logout = api<void, LogoutResponse>(
  { expose: true, method: "POST", path: "/auth/logout" },
  async () => {
    return {
      message: "Logout realizado com sucesso",
      session: {
        value: "",
        expires: new Date(0), // Expira imediatamente
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      }
    };
  }
);