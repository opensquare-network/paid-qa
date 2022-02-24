import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
  name: "test",
  initialState: {
    test: "test",
  },
});

export const testSelector = (state) => state.test.test;

export default testSlice.reducer;
