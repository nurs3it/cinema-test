import { Box, Container } from "@mui/material";
import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}

export const PageLayout = ({ children, header }: PageLayoutProps) => {
  return (
    <Box className="min-h-screen bg-gray-50">
      {header}
      <Container maxWidth="lg">
        <Box className="bg-white rounded-lg shadow-sm p-6">{children}</Box>
      </Container>
    </Box>
  );
};
