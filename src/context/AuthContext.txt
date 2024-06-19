import { Context, FunctionComponent } from "react";

interface AuthContextType {
  user: any;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const AuthProvider: FunctionComponent;
export function useAuth(): AuthContextType;
