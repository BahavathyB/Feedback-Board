import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useDispatch } from "react-redux";
import { upvoteFeedback } from "../store/feedbackSlice";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

import "../styles/FeedbackDetailPage.css";

export default function FeedbackDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadFeedback() {
    try {
      setLoading(true);
      const response = await api.get(`/feedback/${id}`);
      setFeedback(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load feedback");
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFeedback();
  }, [id]);

  const onUpvote = async () => {
    if (!feedback) return;
    try {
      await dispatch(upvoteFeedback(feedback.id)).unwrap();

      await loadFeedback();
    } catch {
      setError("Failed to upvote");
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography variant="body1" color="error" align="center" mt={3}>
        {error}
      </Typography>
    );

  if (!feedback) return null;

  return (
    <Container
      maxWidth="md"
      sx={{ mt: 2, py: 6, boxShadow: 3, borderRadius: 2}}
    >
      <Typography
        sx={{
          bgcolor: "grey.400",
          px: 1,
          py: 0.25,
          borderRadius: 2,
          textAlign: "center"
        }}
        variant="h3"
        gutterBottom
      >
        {feedback.title}
      </Typography>


      <Typography
        variant="body1"
        className="feedback-description"
        gutterBottom
        sx={{ fontSize: "1.25rem", textAlign: "center" }}
      >
        {feedback.description}
      </Typography>

      <Box
        className="feedback-chips"
        sx={{
          mt: 2,
          "& .MuiChip-root": { fontSize: "1rem", px: 1.5, py: 0.5 },
          textAlign: "center"
        }}
      >
        <Chip color="primary" label={`Category: ${feedback.category}`} />
        <Chip color="secondary" label={`Status: ${feedback.status}`} />
      </Box>

      <Typography
        variant="body2"
        className="feedback-createdAt"
        gutterBottom
        sx={{mt:2, fontSize: "1rem", textAlign: "center" }}
      >
        Created at: {new Date(feedback.createdAt).toLocaleString()}
      </Typography>

      <Box className="upvote-button" sx={{ mt: 3, textAlign: "center" }}>
        <Button
          variant="contained"
          startIcon={<ThumbUpAltOutlinedIcon />}
          onClick={onUpvote}
          sx={{ fontSize: "1rem", py: 1, px: 3 }}
        >
          {feedback.upvotes} Upvotes
        </Button>
      </Box>
    </Container>
  );
}
