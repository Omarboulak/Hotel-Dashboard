import React, { createContext, useReducer, useContext, ReactNode, Dispatch } from "react";

interface AuthState {
  isLoggedIn: boolean;
  user: string | null;
}

type AuthAction = { type: "login"; payload: string } | { type: "logout" };

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "login":
      return { ...state, isLoggedIn: true, user: action.payload };
    case "logout":
      return { ...state, isLoggedIn: false, user: null };
    default:
      return state;
  }
}

interface AuthContextProps {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
