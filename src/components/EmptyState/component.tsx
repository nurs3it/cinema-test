import { CategoryOutlined, DeleteOutline } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
interface EmptyStateProps {
  icon: "category" | "delete";
  title: string;
  description: string;
  className?: string;
}

export const EmptyState = ({ icon, title, description, className = "" }: EmptyStateProps) => (
  <Box
    className={`col-span-2 flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg ${className}`}
  >
    {icon === "category" ? (
      <CategoryOutlined sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
    ) : (
      <DeleteOutline sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
    )}
    <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
  </Box>
);
