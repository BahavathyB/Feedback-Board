import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitFeedback } from '../store/feedbackSlice';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import '../styles/SubmitFeedbackPage.css';

const categoryOptions = ['Feature', 'Bug', 'UI'];
const statusDefault = 'Open';

export default function SubmitFeedbackPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categoryOptions[0]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError('Title and Description are required');
      return;
    }
    setError(null);

    try {
      await dispatch(submitFeedback({
        id: crypto.randomUUID(),
        title,
        description,
        category,
        status: statusDefault,
        upvotes: 0,
        createdAt: new Date().toISOString(),
      })).unwrap();
      navigate('/');
    } catch (err) {
      setError('Failed to submit feedback');
    }
  };

  return (
    <Container maxWidth="sm" sx={{mt:2, py: 5, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Submit Feedback
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate className="submit-feedback-form">
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
          inputProps={{ maxLength: 100 }}
          className="form-textfield"
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          required
          multiline
          minRows={4}
          className="form-textfield"
        />

        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          margin="normal"
          fullWidth
          className="form-textfield"
        >
          {categoryOptions.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </TextField>

        {error && (
          <Typography color="error" variant="body2" className="form-error">
            {error}
          </Typography>
        )}

        <Button variant="contained" type="submit" sx={{ mt: 3 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
}