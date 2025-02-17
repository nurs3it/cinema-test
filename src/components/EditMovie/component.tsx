import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";

import { useMovies } from "@/hooks/useMovie";
import { Movie } from "@/types/movie";

export const EditMovie = () => {
  const { editingMovie, setEditingMovie, addMovie, updateMovie } = useMovies();

  const [movieName, setMovieName] = useState("");

  useEffect(() => {
    if (editingMovie) {
      setMovieName(editingMovie.name);
    }
  }, [editingMovie]);

  const handleClose = () => {
    setEditingMovie(null);
    setMovieName("");
  };

  const handleSave = () => {
    if (!movieName.trim()) return;

    const movieData: Movie = {
      id: editingMovie?.id || null,
      name: movieName.trim(),
    };

    if (editingMovie?.id) {
      updateMovie(movieData);
    } else {
      addMovie(movieData);
    }
    handleClose();
  };

  return (
    <Dialog open={!!editingMovie} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editingMovie?.id ? "Edit Movie" : "Add New Movie"}</DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 4 }}>
          <TextField
            label="Movie Name"
            fullWidth
            value={movieName}
            onChange={e => setMovieName(e.target.value)}
            autoFocus
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" disabled={!movieName.trim()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
