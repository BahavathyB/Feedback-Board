import React from 'react';
import { useDispatch } from 'react-redux';
import { upvoteFeedback } from '../store/feedbackSlice';
import { useNavigate } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import Box from '@mui/material/Box';

import '../styles/FeedbackItem.css';

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function FeedbackItem({ feedback }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onUpvote = (e) => {
    e.stopPropagation();
    dispatch(upvoteFeedback(feedback.id));
  };

  return (
    <Paper
      className="feedback-item"
      sx={{ p: 2, mb: 2, cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
      onClick={() => navigate(`/feedback/${feedback.id}`)}
      elevation={2}
    >
      <Button
        size="large"
        startIcon={<ThumbUpAltOutlinedIcon />}
        onClick={onUpvote}
        sx={{ float: 'right' }}
      >
        {feedback.upvotes}
      </Button>

      <Typography variant="h6" component="h3" gutterBottom>
        {feedback.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom noWrap>
        {feedback.description}
      </Typography>

      <Box sx={{ mb: 1 }}>
        <Chip label={feedback.category} color="primary" size="small" sx={{ mr: 1, textTransform: 'capitalize' }} />
        <Chip label={feedback.status} color="secondary" size="small" sx={{ textTransform: 'capitalize' }} />
      </Box>

      
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
        Created: {formatDate(feedback.createdAt)}
      </Typography>

      
    </Paper>
  );
}