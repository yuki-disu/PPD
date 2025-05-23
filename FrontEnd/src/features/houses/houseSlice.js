import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchFilteredHouses = createAsyncThunk(
  "houses/fetchFilteredHouses",
  async (filters = {}, { rejectWithValue }) => {
    console.log("filters", filters);
    try {
      const params = new URLSearchParams();

      if (filters.minRooms) params.append("numOfRooms[gte]", filters.minRooms);
      if (filters.maxRooms) params.append("numOfRooms[lte]", filters.maxRooms);
      if (filters.minBaths)
        params.append("numOfBathRoom[gte]", filters.minBaths);

      if (filters.maxBaths)
        params.append("numOfBathRoom[lte]", filters.maxBaths);

      if (filters.minPrice) params.append("price[gte]", filters.minPrice);
      if (filters.maxPrice) params.append("price[lte]", filters.maxPrice);
      if (filters.minSurface) params.append("area[gte]", filters.minSurface);
      if (filters.maxSurface) params.append("area[lte]", filters.maxSurface);
      if (filters.wilaya) params.append("wilaya", filters.wilaya);

      const query = params.toString();

      const response = await axios.get(
        `http://127.0.0.1:3000/api/v1/houses?${query}`
      );
      console.log(response.data.data.estates);
      console.log(query);
      return response.data.data.estates;
    } catch (error) {
      console.log("error", error.response);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const houseSlice = createSlice({
  name: "houses",
  initialState: {
    houses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredHouses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredHouses.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.houses = action.payload;
        console.log("houses in slice", state.houses);
      })
      .addCase(fetchFilteredHouses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default houseSlice.reducer;
