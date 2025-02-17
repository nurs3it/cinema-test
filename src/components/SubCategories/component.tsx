import { Edit as EditIcon, Delete as DeleteIcon, Movie as MovieIcon } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Collapse,
  Chip,
  Tooltip,
} from "@mui/material";

import { useCategories } from "@/hooks/useCategories";
import { useMovies } from "@/hooks/useMovie";
import { Subcategory } from "@/types/subcategory";
import { getRandomYear } from "@/utils/random";

interface SubCategoriesProps {
  categoryId: string;
}

export const SubCategories = ({ categoryId }: SubCategoriesProps) => {
  const {
    getSubcategoriesByCategoryId,
    getFilmsBySubcategoryId,
    setEditingSubCategory,
    deleteSubCategory,
  } = useCategories();
  const { getMovieById } = useMovies();

  const subCategories = getSubcategoriesByCategoryId(Number(categoryId));

  const handleEditSubCategory = (subCategory: Subcategory) => {
    setEditingSubCategory(subCategory);
  };

  const handleDeleteSubCategory = (subCategory: Subcategory) => {
    deleteSubCategory(subCategory);
  };

  return (
    <Box className="mt-4 pt-4 border-t">
      <Typography variant="subtitle2" className="mb-3">
        Subcategories
      </Typography>
      <Box className="grid grid-cols-3 gap-3">
        {subCategories?.map(subCategory => {
          const movies = getFilmsBySubcategoryId(Number(subCategory.id)).map(id =>
            getMovieById(id),
          );

          return (
            <Card
              key={subCategory.id}
              variant="outlined"
              className="hover:shadow-md transition-all duration-200"
            >
              <CardContent>
                <Box className="flex justify-between items-start">
                  <Box className="flex-grow">
                    <Typography variant="body2" className="font-medium">
                      {subCategory.name}
                    </Typography>
                    {movies.length > 0 && (
                      <Tooltip title="Show movies">
                        <Chip
                          size="small"
                          icon={<MovieIcon fontSize="small" />}
                          label={`${movies.length} movies`}
                          className="mt-1 cursor-pointer hover:bg-gray-100"
                          variant="outlined"
                        />
                      </Tooltip>
                    )}
                  </Box>
                  <Box className="flex gap-1 ml-2">
                    <IconButton
                      size="small"
                      onClick={() => handleEditSubCategory(subCategory)}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteSubCategory(subCategory)}
                      className="text-gray-600 hover:text-red-600"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="caption" color="text.secondary" className="block mt-1">
                  No description
                </Typography>

                {movies.length > 0 && (
                  <Collapse in={true}>
                    <Box className="mt-3 pt-3 border-t">
                      <Typography variant="caption" color="text.secondary" className="block mb-2">
                        Movies in subcategory:
                      </Typography>
                      <Box className="space-y-2">
                        {movies.map(movie => (
                          <Box
                            key={String(movie)}
                            className="flex items-center p-2 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <Box className="flex-grow min-w-0">
                              <Typography variant="body2" className="font-medium truncate">
                                {String(movie?.name)}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {getRandomYear()}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Collapse>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};
