import { Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";

import { useMovies } from "@/hooks/useMovie";
import { EmptyState } from "@/components/EmptyState";
import { MovieItem } from "@/components/MovieItem";

interface MoviesProps {
  viewMode: "grid" | "list";
  searchQuery: string;
}

export const Movies = ({ viewMode, searchQuery }: MoviesProps) => {
  const [activeTab, setActiveTab] = useState<"active" | "deleted">("active");
  const { movies, deletedMovies, restoreMovie } = useMovies();

  const filteredMovies = movies.filter(movie =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredDeletedMovies = deletedMovies.filter(movie =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <Box className="mb-6">
        <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)}>
          <Tab value="active" label={`Active (${filteredMovies.length})`} />
          <Tab value="deleted" label={`Deleted (${filteredDeletedMovies.length})`} />
        </Tabs>
      </Box>

      <Box
        className={`
          grid gap-6
          ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}
        `}
      >
        {activeTab === "active" ? (
          filteredMovies.length > 0 ? (
            filteredMovies.map(movie => (
              <MovieItem key={movie.id} movie={movie} viewMode={viewMode} />
            ))
          ) : (
            <EmptyState
              icon="delete"
              title={searchQuery ? "Movies not found" : "No active movies"}
              description={
                searchQuery
                  ? "Try changing the search parameters"
                  : "Add your first movie, click the button above"
              }
              className="col-span-full"
            />
          )
        ) : filteredDeletedMovies.length > 0 ? (
          filteredDeletedMovies.map(movie => (
            <MovieItem
              key={movie.id}
              movie={movie}
              viewMode={viewMode}
              isDeleted
              onRestore={restoreMovie}
            />
          ))
        ) : (
          <EmptyState
            icon="delete"
            title="Cart is empty"
            description={
              searchQuery
                ? "Nothing found in the cart according to your request"
                : "Here will be displayed deleted movies"
            }
            className="col-span-full"
          />
        )}
      </Box>
    </>
  );
};
