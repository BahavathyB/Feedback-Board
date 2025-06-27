import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';



export const fetchFeedbacks = createAsyncThunk('feedback/fetchFeedbacks', async () => {
  const response = await api.get('/feedback');
  return response.data;
});

export const upvoteFeedback = createAsyncThunk('feedback/upvoteFeedback', async (id, { getState }) => {
  const feedback = getState().feedback.items.find(f => f.id === id);
  if (!feedback) throw new Error('Feedback not found');

  const updated = { ...feedback, upvotes: feedback.upvotes + 1 };

  const response = await api.put(`/feedback/${id}`, updated);
  return response.data;
});

export const submitFeedback = createAsyncThunk('feedback/submitFeedback', async (feedbackData) => {
  const response = await api.post('/feedback', feedbackData);
  return response.data;
});

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    filterStatus: 'All',
    filterCategory: 'All',
    sortBy: 'Most Upvotes',
  },
  reducers: {
    setFilterStatus(state, action) {
      console.log(state.filterStatus);
      console.log(action.payload);
      state.filterStatus = action.payload;
    },
    setFilterCategory(state, action) {
      console.log(action.payload);
      state.filterCategory = action.payload;
    },
    setSortBy(state, action) {
      console.log(action.payload);
      state.sortBy = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(upvoteFeedback.fulfilled, (state, action) => {
        const idx = state.items.findIndex(f => f.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { setFilterStatus, setFilterCategory, setSortBy } = feedbackSlice.actions;

export default feedbackSlice.reducer;