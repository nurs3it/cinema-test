import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  return (
    <div className="flex h-screen">
      <Box component="main" className="flex-grow">
        <Outlet />
      </Box>
    </div>
  );
};
