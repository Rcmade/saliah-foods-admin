"use client"
import React from "react";
import {
  useReducer,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
} from "react";

interface Product {
  name: string;
  image: string;
  price: number;
  unit: string;
  category: string[];
}

interface CartItem {
  id: any;
  quantity: number;
  total: number;
  product: Product;
}

interface CartState {
  cartItems: CartItem[];
}

interface CartAction {
  type: string;
  payload: CartItem | CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const ActionTypes = {
  ADD_TO_CART: "ADD_TO_CART",
  INCREASE_QUANTITY: "INCREASE_QUANTITY",
  DECREASE_QUANTITY: "DECREASE_QUANTITY",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  REMOVE_ALL_ITEMS: "REMOVE_ALL_ITEMS"
} as const;

const cartReducer = (state: CartState, action: CartAction): CartState => {
   switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      const itemsToAdd = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      const updatedCart = itemsToAdd.reduce(
        (cart, newItem) => {
          const existingItem = cart.find(
            (item) =>
              item.id === newItem.id &&
              item.product.unit === newItem.product.unit
          );
          if (existingItem) {
            existingItem.quantity += newItem.quantity;
          } else {
            const total = newItem.product.price * newItem.quantity;
            cart.push({ ...newItem, total });
          }
          return cart;
        },
        [...state.cartItems]
      );
      return { ...state, cartItems: updatedCart };

    case ActionTypes.INCREASE_QUANTITY:
      const itemsToIncrease = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      const increasedCart = state.cartItems.map((item) => {
        const foundItem = itemsToIncrease.find(
          (newItem) =>
            newItem.id === item.id && newItem.product.unit === item.product.unit
        );
        if (foundItem) {
          const newQuantity = item.quantity + 1;
          const total = foundItem.product.price * newQuantity;

          return { ...item, quantity: newQuantity, total };
        }
        return item;
      });
      return { ...state, cartItems: increasedCart };

    case ActionTypes.DECREASE_QUANTITY:
      const itemsToDecrease = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      const decreasedCart = state.cartItems.map((item) => {
        const foundItem = itemsToDecrease.find(
          (newItem) =>
            newItem.id === item.id && newItem.product.unit === item.product.unit
        );
        if (foundItem) {
          const newQuantity = Math.max(1, item.quantity - 1);
          const total = foundItem.product.price * newQuantity;

          return { ...item, quantity: newQuantity, total };
        }
        return item;
      });
      return { ...state, cartItems: decreasedCart };

    case ActionTypes.REMOVE_FROM_CART:
      const itemsToRemove = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      const updatedCartAfterRemoval = state.cartItems.filter(
        (item) =>
          !itemsToRemove.some(
            (newItem) =>
              newItem.id === item.id &&
              newItem.product.unit === item.product.unit
          )
      );
      return { ...state, cartItems: updatedCartAfterRemoval };

    case ActionTypes.REMOVE_ALL_ITEMS:
       return { ...state, cartItems: [] };

    default:
      return state;
  }
};

interface CartContextProps {
  cartState: CartState;
  cartDispatch: Dispatch<CartAction>;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const localStorageKey = "cartData";

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);


  const [cartState, cartDispatch] = useReducer(cartReducer, initialState);

  React.useEffect(() => {
    const storedCartData = localStorage.getItem(localStorageKey);

    if (storedCartData) {
      const parsedCartData = JSON.parse(storedCartData);

      cartDispatch({ type: ActionTypes.ADD_TO_CART, payload: parsedCartData });
    }
  }, []);
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(cartState.cartItems));
  }, [cartState.cartItems]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };


  
  return (
    <CartContext.Provider value={{ cartState, cartDispatch, isSidebarOpen, toggleSidebar }}>
      {children}
    </CartContext.Provider>
  );
};


const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart, ActionTypes };
