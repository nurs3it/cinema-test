import { useContext } from "react";

import { CategoryContext } from "@/context/category.context";
import { CategoryContextType } from "@/types/category";

export const useCategories = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("CategoryContext must be used within a CategoryProvider");
  }

  return context as CategoryContextType;
};
