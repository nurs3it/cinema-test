import { ViewModule as GridIcon, ViewList as ListIcon } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

import { VIEW_MODES, type ViewMode } from "@/constants";

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export const ViewModeToggle = ({ viewMode, onChange }: ViewModeToggleProps) => {
  return (
    <Box className="flex bg-gray-100 rounded-lg p-1">
      <IconButton
        size="small"
        onClick={() => onChange(VIEW_MODES.GRID)}
        color={viewMode === VIEW_MODES.GRID ? "primary" : "default"}
      >
        <GridIcon />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => onChange(VIEW_MODES.LIST)}
        color={viewMode === VIEW_MODES.LIST ? "primary" : "default"}
      >
        <ListIcon />
      </IconButton>
    </Box>
  );
};
