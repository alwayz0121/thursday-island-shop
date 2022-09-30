import { createContext } from "react";

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const category = "TOP" || "ONE PIECE" || "BOTTOM";

  return (
    <CategoryContext.Provider value={category}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
