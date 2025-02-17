import {
  Code as CodeIcon,
  ContentCopy as CopyIcon,
  Check as CheckIcon,
  Terminal as ConsoleIcon,
} from "@mui/icons-material";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  keyframes,
  styled,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import React from "react";

import { db } from "@/db";
import { useCategories } from "@/hooks/useCategories";

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.7);
  }
  
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(25, 118, 210, 0);
  }
  
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;

const AnimatedFab = styled(Fab)`
  animation: ${pulse} 2s infinite;
  &:hover {
    animation: none;
  }
`;

export const JsonDialog: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [originalData] = React.useState(db);
  const [copied, setCopied] = React.useState(false);

  const { categories } = useCategories();

  const handleDialog = () => {
    setOpen(!open);
  };

  const getCategoriesChanges = () => {
    if (!originalData) return {};

    const newCategories = categories
      .filter(cat => !cat.id)
      .map(cat => ({
        name: cat.name,
        subCategories:
          cat.subCategories?.map(sub => ({
            name: sub.name,
            filmIds: sub.filmIds || [],
          })) || [],
      }));

    const updatedCategories = categories
      .filter(cat => {
        const originalCat = originalData.categories.find(oc => oc.id === cat.id);
        return (
          originalCat &&
          (originalCat.name !== cat.name ||
            JSON.stringify(originalCat.subCategories) !== JSON.stringify(cat.subCategories))
        );
      })
      .map(cat => {
        const originalCat = originalData.categories.find(oc => oc.id === cat.id);
        return {
          id: cat.id,
          name: cat.name,
          updatedSubCategories: cat.subCategories?.filter(sub => {
            const originalSub = originalCat?.subCategories?.find(os => os.id === sub.id);
            return (
              originalSub &&
              (originalSub.name !== sub.name ||
                JSON.stringify(originalSub.filmIds) !== JSON.stringify(sub.filmIds))
            );
          }),
          deletedSubCategories:
            originalCat?.subCategories
              ?.filter(os => !cat.subCategories?.find(s => s.id === os.id))
              .map(s => s.id) || [],
        };
      });

    const deletedCategories = originalData.categories
      .filter(oc => !categories.find(c => c.id === oc.id))
      .map(cat => ({ id: cat.id }));

    return {
      newCategories,
      updatedCategories,
      deletedCategories,
    };
  };

  const pageData = {
    categoriesChanges: getCategoriesChanges(),
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(pageData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConsoleLog = () => {
    console.log("Page Data:", pageData);
  };

  return (
    <>
      <AnimatedFab
        color="primary"
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        onClick={handleDialog}
      >
        <CodeIcon />
      </AnimatedFab>

      <Dialog open={open} onClose={handleDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            Page Data (JSON)
            <Box>
              <Tooltip title="Log to console">
                <IconButton onClick={handleConsoleLog} sx={{ mr: 1 }}>
                  <ConsoleIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
                <IconButton onClick={handleCopy} color={copied ? "success" : "default"}>
                  {copied ? <CheckIcon /> : <CopyIcon />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              backgroundColor: "#f5f5f5",
              padding: "16px",
              borderRadius: "4px",
              margin: 0,
            }}
          >
            {JSON.stringify(pageData, null, 2)}
          </pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
