import { createContext, useState, useMemo } from "react";

import { db } from "@/db";
import { Category, CategoryContextType } from "@/types/category";
import { Subcategory } from "@/types/subcategory";

export const CategoryContext = createContext<CategoryContextType | null>(null);

interface CategoryProviderProps {
  children: React.ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(db.categories);
  const [deletedCategories, setDeletedCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSubCategory, setEditingSubCategory] = useState<Subcategory | null>(null);

  const findLastId = (categories: Category[]) => {
    return categories.reduce(
      (maxId, category) => (category.id !== null ? Math.max(maxId, category.id) : maxId),
      0,
    );
  };

  const contextValue = useMemo(
    (): CategoryContextType => ({
      categories,
      subCategories: categories.flatMap(category => category.subCategories || []),
      deletedCategories,
      editingCategory,
      editingSubCategory,
      setCategories: (categories: Category[]) => {
        setCategories(categories);
      },
      setDeletedCategories: (deletedCategories: Category[]) => {
        setDeletedCategories(deletedCategories);
      },
      setEditingCategory: (category: Category | null) => {
        setEditingCategory(category);
      },
      deleteCategory: (category: Category) => {
        const updatedCategories = categories.filter(c => c.id !== category.id);
        setCategories(updatedCategories);
        setDeletedCategories([...deletedCategories, category]);
      },
      updateCategory: (category: Category) => {
        const updatedCategories = categories.map(c => (c.id === category.id ? category : c));
        setCategories(updatedCategories);
      },
      addCategory: (category: Category) => {
        setCategories([...categories, { ...category, id: findLastId(categories) + 1 }]);
      },
      restoreCategory: (category: Category) => {
        const updatedCategories = deletedCategories.filter(c => c.id !== category.id);
        setDeletedCategories(updatedCategories);
        setCategories([...categories, category]);
      },
      getSubcategoriesByFilmId: (filmId: number) => {
        return categories.flatMap(
          category =>
            category.subCategories?.filter(subCategory => subCategory.filmIds.includes(filmId)) ||
            [],
        );
      },
      getSubcategoriesByCategoryId: (categoryId: number) => {
        return categories.find(category => category.id === categoryId)?.subCategories || [];
      },
      getFilmsBySubcategoryId: (subcategoryId: number) => {
        return categories
          .flatMap(
            category =>
              category.subCategories?.filter(subCategory => subCategory.id === subcategoryId) || [],
          )
          .map(subCategory => subCategory.filmIds)
          .flat();
      },
      setEditingSubCategory: (subcategory: Subcategory | null) => {
        setEditingSubCategory(subcategory);
      },
      updateSubCategory: (subcategory: Subcategory) => {
        const findSubcategory = categories.find(category =>
          category.subCategories?.some(sub => sub.id === subcategory.id),
        );
        const updatedCategories = categories.map(category =>
          category.id === findSubcategory?.id
            ? {
                ...category,
                subCategories: category.subCategories?.map(sub =>
                  sub.id === subcategory.id ? subcategory : sub,
                ),
              }
            : category,
        );
        setCategories(updatedCategories);
      },
      deleteSubCategory: (subcategory: Subcategory) => {
        const findSubcategory = categories.find(category =>
          category.subCategories?.some(sub => sub.id === subcategory.id),
        );
        const updatedCategories = categories.map(category =>
          category.id === findSubcategory?.id
            ? {
                ...category,
                subCategories: category.subCategories?.filter(sub => sub.id !== subcategory.id),
              }
            : category,
        );
        setCategories(updatedCategories);
      },
    }),
    [categories, deletedCategories, editingCategory, editingSubCategory],
  );

  return (
    <CategoryContext.Provider value={contextValue as CategoryContextType}>
      {children}
    </CategoryContext.Provider>
  );
};
