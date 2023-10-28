import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";

export default function Navbar() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:"#1f2937"}}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: "center", color:"#ef4444" }}>
            Depixen
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

