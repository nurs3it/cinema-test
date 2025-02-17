import { Subcategory } from "@/types/subcategory";

export interface Movie {
  id: number | null;
  name: string;
}

export interface MovieContextType {
  movies: Movie[];
  deletedMovies: Movie[];
  editingMovie: Movie | null;
  setMovies: (movies: Movie[]) => void;
  setDeletedMovies: (movies: Movie[]) => void;
  setEditingMovie: (movie: Movie | null) => void;
  deleteMovie: (movie: Movie) => void;
  updateMovie: (movie: Movie) => void;
  addMovie: (movie: Movie) => void;
  restoreMovie: (movie: Movie) => void;
  getMovieById: (id: number) => Movie | undefined;
}

export type MovieWithSubcategories = Movie & { subCategories?: Subcategory[] };
