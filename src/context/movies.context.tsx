import { createContext, useState, useMemo } from "react";

import { db } from "@/db";
import { Movie, MovieContextType } from "@/types/movie";

export const MovieContext = createContext<MovieContextType | null>(null);

interface MoviesProviderProps {
  children: React.ReactNode;
}

export const MovieProvider: React.FC<MoviesProviderProps> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>(db.films);
  const [deletedMovies, setDeletedMovies] = useState<Movie[]>([]);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  const findLastId = (movies: Movie[]) => {
    return movies.reduce(
      (maxId, movie) => (movie.id !== null ? Math.max(maxId, movie.id) : maxId),
      0,
    );
  };

  const contextValue = useMemo(
    (): MovieContextType => ({
      movies,
      deletedMovies,
      editingMovie,
      setMovies: (movies: Movie[]) => {
        setMovies(movies);
      },
      setDeletedMovies: (deletedMovies: Movie[]) => {
        setDeletedMovies(deletedMovies);
      },
      setEditingMovie: (movie: Movie | null) => {
        setEditingMovie(movie);
      },
      getMovieById: (id: number) => {
        return movies.find(m => m.id === id);
      },
      deleteMovie: (movie: Movie) => {
        const updatedMovies = movies.filter(m => m.id !== movie.id);
        setMovies(updatedMovies);
        setDeletedMovies([...deletedMovies, movie]);
      },
      updateMovie: (movie: Movie) => {
        const updatedMovies = movies.map(m => (m.id === movie.id ? movie : m));
        setMovies(updatedMovies);
      },
      addMovie: (movie: Movie) => {
        setMovies([...movies, { ...movie, id: findLastId(movies) + 1 }]);
      },
      restoreMovie: (movie: Movie) => {
        const updatedMovies = deletedMovies.filter(m => m.id !== movie.id);
        setDeletedMovies(updatedMovies);
        setMovies([...movies, movie]);
      },
    }),
    [movies, deletedMovies, editingMovie],
  );

  return (
    <MovieContext.Provider value={contextValue as MovieContextType}>
      {children}
    </MovieContext.Provider>
  );
};
