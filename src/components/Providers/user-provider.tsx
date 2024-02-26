"use client";
import { User } from "@/lib/interface";
import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Define the user interface


// Define action types for user reducer
type Action = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

// Define reducer function
function userReducer(state: User | null, action: Action): User | null {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    case "LOGOUT":
      localStorage.removeItem("user");
      return null;
    default:
      return state;
  }
}

// Create user context
const UserContext = createContext<
  { user: User | null; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

// Custom hook to use user context
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

// UserProvider component
const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, dispatch] = useReducer(userReducer, null);

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch({ type: "LOGIN", payload: JSON.parse(storedUser) });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };
