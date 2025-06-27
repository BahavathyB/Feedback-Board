import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function NavBar() {
  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          color="inherit"
          sx={{ textDecoration: 'none', fontWeight: 'bold' }}
        >
          FeedbackBoard
        </Typography>

        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ mr: 2, textTransform: 'none' }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/submit"
            sx={{ textTransform: 'none' }}
          >
            Submit Feedback
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}