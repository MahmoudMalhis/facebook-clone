import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

export default function Error() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
    >
      <Logo />
      <Typography variant="h2" color="error" fontSize="150px">
        404
      </Typography>
      <Typography variant="h6" marginBottom="20px">
        The page you’re looking for doesn’t exist.
      </Typography>
      <Link to="/home">
        <Button variant="contained">Back Home</Button>
      </Link>
    </Box>
  );
}
