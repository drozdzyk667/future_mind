"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useTransition,
  type TransitionStartFunction,
} from "react";

type UIContextType = {
  isPending: boolean;
  startTransition: TransitionStartFunction;
};

const UIContext = createContext<UIContextType | null>(null);

type UIProviderProps = {
  children: ReactNode;
};

export const UIProvider = ({ children }: UIProviderProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <UIContext.Provider value={{ isPending, startTransition }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
