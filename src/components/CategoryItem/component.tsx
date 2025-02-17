import {
  MovieOutlined as MovieIcon,
  DeleteOutline as DeleteIcon,
  RestoreFromTrash as RestoreIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { Box, Button, Card, CardContent, Typography, IconButton, Chip } from "@mui/material";
import React, { useState } from "react";

import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/types/category";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { SubCategories } from "@/components/SubCategories";

interface CategoryItemProps {
  category: Category;
  viewMode: "grid" | "list";
  isActive?: boolean;
  isDeleted?: boolean;
  onExpand?: () => void;
}

export const CategoryItem = ({
  category,
  viewMode,
  isActive,
  isDeleted,
  onExpand,
}: CategoryItemProps) => {
  const { setEditingCategory, deleteCategory, restoreCategory } = useCategories();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const onDelete = () => {
    deleteCategory(category);
  };

  const onRestore = () => {
    restoreCategory(category);
  };

  const onEdit = () => {
    setEditingCategory(category);
  };

  const getMoviesCount = () => {
    return (
      category.subCategories?.reduce((acc, subCategory) => acc + subCategory.filmIds.length, 0) || 0
    );
  };

  const getSubcategoriesCount = () => {
    return category.subCategories?.length || 0;
  };

  const getDeleteWarnings = () => {
    const warnings: string[] = [];

    if (getSubcategoriesCount() > 0) {
      warnings.push(`All subcategories will be deleted (${getSubcategoriesCount()})`);
    }

    if (getMoviesCount() > 0) {
      warnings.push(`There are movies in this category (${getMoviesCount()})`);
    }

    return warnings;
  };

  const getRestoreWarnings = () => {
    const warnings: string[] = [];

    if (getSubcategoriesCount() > 0) {
      warnings.push(`All subcategories will be deleted (${getSubcategoriesCount()})`);
    }

    if (getMoviesCount() > 0) {
      warnings.push(`There are movies in this category (${getMoviesCount()})`);
    }

    return warnings;
  };

  return (
    <>
      <Card
        className={`
          ${isActive ? "col-span-full" : ""}
          ${viewMode === "list" ? "flex" : ""}
          transition-all duration-300 hover:shadow-md
          ${isActive ? "bg-gray-50" : ""}
        `}
      >
        <CardContent className="flex-1">
          <Box
            className={`
            flex 
            ${viewMode === "list" ? "items-center" : "flex-col"}
            gap-4
          `}
          >
            <Box className="flex-1">
              <Typography variant="h6" className="mb-2">
                {category.name}
              </Typography>

              <Typography variant="body2" color="text.secondary" className="mb-3">
                {"No description"}
              </Typography>

              <Box className="flex items-center gap-2">
                <Chip
                  icon={<MovieIcon />}
                  label={`${getMoviesCount()} movies`}
                  size="small"
                  variant="outlined"
                />
                {category.subCategories && category.subCategories.length > 0 && (
                  <Chip
                    label={`${getSubcategoriesCount()} subcategories`}
                    size="small"
                    variant="outlined"
                    color="secondary"
                  />
                )}
              </Box>
            </Box>

            <Box
              className={`
              flex gap-2
              ${viewMode === "list" ? "" : "justify-end"}
            `}
            >
              {isDeleted ? (
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  startIcon={<RestoreIcon />}
                  onClick={() => setIsRestoreDialogOpen(true)}
                >
                  Restore
                </Button>
              ) : (
                <>
                  <Button size="small" variant="outlined" startIcon={<EditIcon />} onClick={onEdit}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    Delete
                  </Button>
                  {category.subCategories && category.subCategories.length > 0 && (
                    <IconButton
                      size="small"
                      onClick={onExpand}
                      className={`transition-transform ${isActive ? "rotate-180" : ""}`}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  )}
                </>
              )}
            </Box>
          </Box>

          {isActive && category.subCategories && (
            <SubCategories categoryId={category.id?.toString() || ""} />
          )}
        </CardContent>
      </Card>

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        title="Confirm deletion"
        content={`Are you sure you want to delete the category "${category.name}"?`}
        confirmText="Delete"
        confirmColor="error"
        confirmIcon={<DeleteIcon />}
        onConfirm={() => {
          onDelete();
          setIsDeleteDialogOpen(false);
        }}
        onCancel={() => setIsDeleteDialogOpen(false)}
        warnings={getDeleteWarnings()}
      />

      <ConfirmationDialog
        open={isRestoreDialogOpen}
        title="Confirm restoration"
        content={`Are you sure you want to restore the category "${category.name}"?`}
        confirmText="Restore"
        confirmColor="primary"
        confirmIcon={<RestoreIcon />}
        onConfirm={() => {
          onRestore();
          setIsRestoreDialogOpen(false);
        }}
        onCancel={() => setIsRestoreDialogOpen(false)}
        warnings={getRestoreWarnings()}
      />
    </>
  );
};
