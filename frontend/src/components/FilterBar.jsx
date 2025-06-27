import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterStatus, setFilterCategory, setSortBy } from '../store/feedbackSlice';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const statusOptions = ['All', 'Open', 'Planned', 'In Progress', 'Done'];
const categoryOptions = ['All', 'Feature', 'Bug', 'UI'];
const sortOptions = ['Most Upvotes', 'Least Upvotes'];

export default function FilterBar() {
  const dispatch = useDispatch();
  const { filterStatus, filterCategory, sortBy } = useSelector((state) => state.feedback);

  const handleStatusChange = (e) => {
    dispatch(setFilterStatus(e.target.value));
  };

  const handleCategoryChange = (e) => {
    dispatch(setFilterCategory(e.target.value));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
      <FormControl sx={{ minWidth: 140 }} size="small">
        <InputLabel>Status</InputLabel>
        <Select value={filterStatus} label="Status" onChange={handleStatusChange}>
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 140 }} size="small">
        <InputLabel>Category</InputLabel>
        <Select value={filterCategory} label="Category" onChange={handleCategoryChange}>
          {categoryOptions.map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 160 }} size="small">
        <InputLabel>Sort By</InputLabel>
        <Select value={sortBy} label="Sort By" onChange={handleSortChange}>
          {sortOptions.map((sort) => (
            <MenuItem key={sort} value={sort}>{sort}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}