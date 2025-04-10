import React, { createContext, useReducer, useContext } from "react";

const AuthContext = createContext();

const initialState = {
  isLoggedIn: false,
  user: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isLoggedIn: true, user: action.payload };
    case "logout":
      return { ...state, isLoggedIn: false, user: null };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
