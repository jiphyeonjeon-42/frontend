import { createContext, useContext } from "react";

type BookContextType = {
  callSignFirstChar: string | undefined;
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext must be used within a BookProvider");
  }
  return context;
};

type BookProviderProps = {
  callSignFirstChar: string;
  children: React.ReactNode;
};

export const BookProvider = ({
  callSignFirstChar,
  children,
}: BookProviderProps) => {
  return (
    <BookContext.Provider value={{ callSignFirstChar }}>
      {children}
    </BookContext.Provider>
  );
};
