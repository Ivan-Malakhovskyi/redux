import { createSlice } from "@reduxjs/toolkit";

const filtersInitState = {
  status: "all",
};

// export const filtersReducer = createReducer(filtersInitState, (builder) => {
//   builder.addCase(setStatusFilter, (state, action) => {
//     state.status = action.payload;
//   });
// });

export const filterSlice = createSlice({
  name: "filter",
  initialState: filtersInitState,
  reducers: {
    setStatusFilter(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setStatusFilter } = filterSlice.actions;
export const filtersReducer = filterSlice.reducer;
