import { Box, Container, Tabs, Tab } from "@mui/material";
import { useState } from "react";

import { useCategories } from "@/hooks/useCategories";
import { CategoryItem } from "@/components/CategoryItem";
import { EmptyState } from "@/components/EmptyState";

interface CategoriesProps {
  viewMode: "grid" | "list";
  searchQuery: string;
}

export const Categories = ({ viewMode, searchQuery }: CategoriesProps) => {
  const { categories, deletedCategories } = useCategories();
  const [activeTab, setActiveTab] = useState<"active" | "deleted">("active");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredDeletedCategories = deletedCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2, mb: 2 }}>
          <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)}>
            <Tab label={`Active (${filteredCategories.length})`} value="active" />
            <Tab label={`Deleted (${filteredDeletedCategories.length})`} value="deleted" />
          </Tabs>
        </Box>

        <Box
          className={`
            grid gap-4
            ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}
          `}
        >
          {activeTab === "active" ? (
            filteredCategories.length > 0 ? (
              filteredCategories.map(category => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  viewMode={viewMode}
                  isActive={activeCategoryId === String(category.id)}
                  onExpand={() =>
                    setActiveCategoryId(
                      activeCategoryId === String(category.id) ? null : String(category.id),
                    )
                  }
                />
              ))
            ) : (
              <EmptyState
                icon="category"
                title="No active categories"
                description="Create a new category by clicking the button above"
                className="col-span-full"
              />
            )
          ) : filteredDeletedCategories.length > 0 ? (
            filteredDeletedCategories.map(category => (
              <CategoryItem key={category.id} category={category} viewMode={viewMode} isDeleted />
            ))
          ) : (
            <EmptyState
              icon="delete"
              title="Trash is empty"
              description="Here will be displayed deleted categories"
              className="col-span-full"
            />
          )}
        </Box>
      </Container>
    </>
  );
};
