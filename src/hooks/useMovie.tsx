import { useContext } from "react";

import { MovieContext } from "@/context/movies.context";
import { MovieContextType } from "@/types/movie";

export const useMovies = () => {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("MovieContext must be used within a MovieProvider");
  }

  return context as MovieContextType;
};
