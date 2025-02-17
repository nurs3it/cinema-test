export interface Subcategory {
  id: number | null;
  name: string;
  filmIds: number[];
}

export interface SubcategoryContextType {
  subcategories: Subcategory[];
  deletedSubcategories: Subcategory[];
  editingSubcategory: Subcategory | null;
}
