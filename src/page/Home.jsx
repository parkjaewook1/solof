import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../component/NavBar.jsx";

export function Home() {
  return (
    <Box>
      <NavBar />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}
