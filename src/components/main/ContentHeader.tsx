import { Movie as MovieIcon, Category as CategoryIcon } from "@mui/icons-material";
import { Box, Tabs, Tab } from "@mui/material";

import { Button } from "@/components/shared/Button";
import { CONTENT_TYPES, type ViewMode, type ContentType } from "@/constants";
import { ViewModeToggle } from "./ViewModeToggle";

interface ContentHeaderProps {
  activeTab: ContentType;
  viewMode: ViewMode;
  onTabChange: (tab: ContentType) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onAddItem: () => void;
}

export const ContentHeader = ({
  activeTab,
  viewMode,
  onTabChange,
  onViewModeChange,
  onAddItem,
}: ContentHeaderProps) => {
  return (
    <Box className="flex justify-between items-center mb-6">
      <Tabs value={activeTab} onChange={(_, value) => onTabChange(value)} className="border-b">
        <Tab
          value={CONTENT_TYPES.MOVIES}
          label="Movies"
          icon={<MovieIcon />}
          iconPosition="start"
        />
        <Tab
          value={CONTENT_TYPES.CATEGORIES}
          label="Categories"
          icon={<CategoryIcon />}
          iconPosition="start"
        />
      </Tabs>

      <Box className="flex items-center gap-4">
        <ViewModeToggle viewMode={viewMode} onChange={onViewModeChange} />
        <Button
          variant="contained"
          color="primary"
          startIcon={activeTab === CONTENT_TYPES.MOVIES ? <MovieIcon /> : <CategoryIcon />}
          onClick={onAddItem}
        >
          Add {activeTab === CONTENT_TYPES.MOVIES ? "movie" : "category"}
        </Button>
      </Box>
    </Box>
  );
};
