import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeedbacks } from '../store/feedbackSlice';
import FeedbackItem from '../components/FeedbackItem';
import FilterBar from '../components/FilterBar';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

import { useNavigate } from 'react-router-dom';

import "../styles/HomePage.css"

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, status, error, filterStatus, filterCategory, sortBy } = useSelector(
    (state) => {
      console.log(state.feedback);
      return state.feedback
    }
  );

  useEffect(() => {
    if (status === 'idle') dispatch(fetchFeedbacks());
  }, [status, dispatch]);

  let filteredItems = items;
  if (filterStatus !== 'All') {
    filteredItems = filteredItems.filter((item) => item.status === filterStatus);
  }
  if (filterCategory !== 'All') {
    filteredItems = filteredItems.filter((item) => item.category === filterCategory);
  }

  filteredItems = filteredItems.slice();
  filteredItems.sort((a, b) => {
    if (sortBy === 'Most Upvotes') return b.upvotes - a.upvotes;
    if (sortBy === 'Least Upvotes') return a.upvotes - b.upvotes;
    return 0;
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" className="homepage-title">
          Product Feedback
        </Typography>

        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/submit')}>
          Submit Feedback
        </Button>
      </Box>

      <FilterBar />

      {status === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }} className="loading-container">
          <CircularProgress />
        </Box>
      )}

      {status === 'failed' && (
        <Typography variant="body1" color="error" align="center" mt={3} className="error-message">
          {error}
        </Typography>
      )}

      {status === 'succeeded' && filteredItems.length === 0 && (
        <Typography variant="body1" align="center" mt={3} className="no-feedback-message">
          No feedback found.
        </Typography>
      )}

      {status === 'succeeded' && filteredItems.map((feedback) => (
        <FeedbackItem key={feedback.id} feedback={feedback} />
      ))}
    </Container>
  );
}