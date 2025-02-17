import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Movie as MovieIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Chip,
  Autocomplete,
  Divider,
} from "@mui/material";
import React, { useState, useEffect } from "react";

import { useCategories } from "@/hooks/useCategories";
import { useMovies } from "@/hooks/useMovie";
import { Category } from "@/types/category";
import { Movie } from "@/types/movie";
import { getRandomYear } from "@/utils/random";

export const EditCategory = () => {
  const {
    editingCategory,
    editingSubCategory,
    setEditingCategory,
    setEditingSubCategory,
    updateCategory,
    addCategory,
    updateSubCategory,
  } = useCategories();

  const { movies } = useMovies();

  const [category, setCategory] = useState<Category>({
    id: null,
    name: "",
    subCategories: [],
  });
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
  const [newSubcategory, setNewSubcategory] = useState("");

  const mode = editingSubCategory ? "subcategory" : "category";
  const isEditingMode = !!editingCategory || !!editingSubCategory;

  useEffect(() => {
    if (editingCategory) {
      setCategory(editingCategory);
    }
    if (editingSubCategory && editingSubCategory.filmIds) {
      const selectedMovies = movies.filter(movie =>
        editingSubCategory.filmIds.includes(Number(movie.id)),
      );
      setSelectedMovies(selectedMovies);
    }
  }, [editingCategory, editingSubCategory, movies]);

  const handleClose = () => {
    setEditingCategory(null);
    setEditingSubCategory(null);
    setCategory({ id: null, name: "", subCategories: [] });
    setSelectedMovies([]);
    setNewSubcategory("");
  };

  const handleAddSubcategory = () => {
    if (!newSubcategory.trim()) return;

    setCategory({
      ...category,
      subCategories: [
        ...(category.subCategories || []),
        {
          id: Date.now(),
          name: newSubcategory.trim(),
          filmIds: [],
        },
      ],
    });
    setNewSubcategory("");
  };

  const handleSave = () => {
    if (mode === "category") {
      if (category.id) {
        updateCategory(category);
      } else {
        addCategory(category);
      }
    } else if (editingSubCategory) {
      updateSubCategory({
        ...editingSubCategory,
        filmIds: selectedMovies.map(movie => Number(movie.id)),
      });
    }
    handleClose();
  };

  if (!editingCategory && !editingSubCategory) return null;

  return (
    <Dialog open onClose={handleClose} maxWidth="md" fullWidth className="overflow-hidden">
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        {mode === "category" ? (
          <>
            <CategoryIcon color="primary" />
            {isEditingMode ? "Edit category" : "Create category"}
          </>
        ) : (
          <>
            <MovieIcon color="primary" />
            {isEditingMode ? "Edit subcategory" : "Create subcategory"}
          </>
        )}
      </DialogTitle>

      <DialogContent dividers>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Main information
            </Typography>

            {mode === "subcategory" && (
              <TextField label="Category" value={editingCategory?.name} disabled fullWidth />
            )}

            <TextField
              label={mode === "category" ? "Category name" : "Subcategory name"}
              value={mode === "category" ? category.name : editingSubCategory?.name}
              onChange={e => {
                if (mode === "category") {
                  setCategory({ ...category, name: e.target.value });
                } else if (editingSubCategory) {
                  setEditingSubCategory({
                    ...editingSubCategory,
                    name: e.target.value,
                  });
                }
              }}
              fullWidth
              required
            />
          </Box>

          <Divider />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              {mode === "category" ? "Subcategories" : "Movies in subcategory"}
            </Typography>

            {mode === "category" ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {category.subCategories?.map(sub => (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        bgcolor: "gray.50",
                        borderRadius: 1,
                      }}
                      key={sub.id}
                    >
                      <TextField
                        size="small"
                        value={sub.name}
                        onChange={e => {
                          setCategory({
                            ...category,
                            subCategories: category.subCategories?.map(s =>
                              s.id === sub.id ? { ...s, name: e.target.value } : s,
                            ),
                          });
                        }}
                        fullWidth
                      />
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          setCategory({
                            ...category,
                            subCategories: category.subCategories?.filter(s => s.id !== sub.id),
                          });
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <TextField
                    size="small"
                    placeholder="New subcategory"
                    value={newSubcategory}
                    onChange={e => setNewSubcategory(e.target.value)}
                    onKeyPress={e => e.key === "Enter" && handleAddSubcategory()}
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddSubcategory}
                  >
                    Add
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Autocomplete
                  multiple
                  options={movies}
                  getOptionLabel={movie => `${movie.name} (${getRandomYear()})`}
                  value={selectedMovies}
                  onChange={(_, newValue) => setSelectedMovies(newValue)}
                  renderInput={params => (
                    <TextField {...params} variant="outlined" placeholder="Choose movies" />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((movie, index) => (
                      <Chip
                        {...getTagProps({ index })}
                        key={movie.id}
                        label={`${movie.name} (${getRandomYear()})`}
                        icon={<MovieIcon />}
                      />
                    ))
                  }
                />
              </>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={mode === "category" ? !category.name : !editingSubCategory?.name}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
