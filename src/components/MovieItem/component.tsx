import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as TimeIcon,
  Restore as RestoreIcon,
} from "@mui/icons-material";
import { Card, CardContent, Typography, Box, Button, Tooltip, Rating } from "@mui/material";
import { useState } from "react";

import { useMovies } from "@/hooks/useMovie";
import { Movie } from "@/types/movie";
import { formatDuration, getRandomDuration, getRandomRating, getRandomYear } from "@/utils/random";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";

interface MovieItemProps {
  movie: Movie;
  viewMode: "grid" | "list";
  isDeleted?: boolean;
  onEdit?: (movie: Movie) => void;
  onDelete?: (movie: Movie) => void;
  onRestore?: (movie: Movie) => void;
}

export const MovieItem = ({ movie, viewMode, isDeleted }: MovieItemProps) => {
  const { setEditingMovie, restoreMovie, deleteMovie } = useMovies();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);

  const handleEdit = () => {
    setEditingMovie(movie);
  };

  return (
    <>
      <Card
        className={`
          ${viewMode === "list" ? "flex" : ""}
          transition-all duration-300 hover:shadow-lg
        `}
      >
        <Box className={`flex flex-col ${viewMode === "list" ? "flex-1" : ""}`}>
          <CardContent>
            <Box className="flex justify-between items-start mb-2">
              <Typography variant="h6" className="font-semibold">
                {movie.name}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {getRandomYear()}
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" className="mb-3 line-clamp-2">
              No description
            </Typography>

            <Box className="flex items-center gap-2 mb-3">
              <Tooltip title="Duration">
                <Box className="flex items-center text-gray-600">
                  <TimeIcon fontSize="small" />
                  <Typography variant="body2" className="ml-1">
                    {formatDuration(getRandomDuration())}
                  </Typography>
                </Box>
              </Tooltip>

              <Rating value={getRandomRating()} readOnly size="small" precision={0.5} />
            </Box>

            <Box className="flex justify-end gap-2">
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
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                  >
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
                </>
              )}
            </Box>
          </CardContent>
        </Box>
      </Card>

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        title="Подтверждение удаления"
        content={`Вы уверены, что хотите удалить фильм "${movie.name}" (${getRandomYear()})?`}
        confirmText="Удалить"
        confirmColor="error"
        confirmIcon={<DeleteIcon />}
        onConfirm={() => {
          deleteMovie(movie);
          setIsDeleteDialogOpen(false);
        }}
        onCancel={() => setIsDeleteDialogOpen(false)}
        warnings={[]}
      />

      <ConfirmationDialog
        open={isRestoreDialogOpen}
        title="Подтверждение восстановления"
        content={`Вы хотите восстановить фильм "${movie.name}" (${getRandomYear()})?`}
        confirmText="Восстановить"
        confirmColor="primary"
        confirmIcon={<RestoreIcon />}
        onConfirm={() => {
          restoreMovie(movie);
          setIsRestoreDialogOpen(false);
        }}
        onCancel={() => setIsRestoreDialogOpen(false)}
      />
    </>
  );
};
