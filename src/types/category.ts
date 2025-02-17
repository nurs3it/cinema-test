import { Subcategory } from "@/types/subcategory";

export interface Category {
  id: number | null;
  name: string;
  subCategories?: Subcategory[];
}

export interface CategoryContextType {
  categories: Category[];
  subCategories: Subcategory[];
  deletedCategories: Category[];
  editingCategory: Category | null;
  editingSubCategory: Subcategory | null;
  setCategories: (categories: Category[]) => void;
  setDeletedCategories: (categories: Category[]) => void;
  setEditingCategory: (category: Category | null) => void;
  deleteCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  addCategory: (category: Category) => void;
  restoreCategory: (category: Category) => void;
  getSubcategoriesByFilmId: (filmId: number) => Subcategory[];
  getSubcategoriesByCategoryId: (categoryId: number) => Subcategory[];
  getFilmsBySubcategoryId: (subcategoryId: number) => number[];
  setEditingSubCategory: (subcategory: Subcategory | null) => void;
  updateSubCategory: (subcategory: Subcategory) => void;
  deleteSubCategory: (subcategory: Subcategory) => void;
}
