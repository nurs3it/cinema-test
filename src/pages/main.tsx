import { Search as SearchIcon } from "@mui/icons-material";
import { Box, Container, Typography, Paper, InputBase, IconButton, Fade } from "@mui/material";
import { useState } from "react";

import { Categories } from "@/components/Categories";
import { EditCategory } from "@/components/EditCategory";
import { EditMovie } from "@/components/EditMovie";
import { JsonDialog } from "@/components/JsonDialog";
import { PageLayout } from "@/components/layout/PageLayout";
import { Movies } from "@/components/Movies";
import { CONTENT_TYPES, VIEW_MODES, type ViewMode, type ContentType } from "@/constants";
import { useCategories } from "@/hooks/useCategories";
import { useMovies } from "@/hooks/useMovie";
import { ContentHeader } from "@/components/main/ContentHeader";

export const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<ContentType>(CONTENT_TYPES.MOVIES);
  const [viewMode, setViewMode] = useState<ViewMode>(VIEW_MODES.GRID);

  const { setEditingCategory } = useCategories();
  const { setEditingMovie } = useMovies();

  const handleAddItem = () => {
    if (activeTab === CONTENT_TYPES.CATEGORIES) {
      setEditingCategory({ id: null, name: "", subCategories: [] });
    } else {
      setEditingMovie({ id: null, name: "" });
    }
  };

  const header = (
    <Box className="bg-gradient-to-r from-purple-700 to-blue-600 text-white py-12 mb-6">
      <Container maxWidth="lg">
        <Box className="flex flex-col items-center text-center mb-8">
          <Typography variant="h3" className="font-bold mb-4">
            Movie Library Management
          </Typography>
          <Typography variant="h6" className="max-w-2xl mb-8 opacity-90">
            Organize your movie collection by categories and enjoy easy access
          </Typography>

          <Paper className="flex items-center w-full max-w-2xl px-4 py-2" elevation={0}>
            <InputBase
              placeholder={`Search ${activeTab === CONTENT_TYPES.MOVIES ? "movies" : "categories"}...`}
              className="flex-grow ml-2"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
      </Container>
    </Box>
  );

  return (
    <PageLayout header={header}>
      <ContentHeader
        activeTab={activeTab}
        viewMode={viewMode}
        onTabChange={setActiveTab}
        onViewModeChange={setViewMode}
        onAddItem={handleAddItem}
      />

      <Fade in={true}>
        <Box>
          {activeTab === CONTENT_TYPES.CATEGORIES ? (
            <Categories viewMode={viewMode} searchQuery={searchQuery} />
          ) : (
            <Movies viewMode={viewMode} searchQuery={searchQuery} />
          )}
        </Box>
      </Fade>

      <EditCategory />
      <EditMovie />
      <JsonDialog />
    </PageLayout>
  );
};
