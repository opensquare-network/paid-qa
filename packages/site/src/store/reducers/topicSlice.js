import { createSlice } from "@reduxjs/toolkit";

const topicSlice = createSlice({
  name: "topic",
  initialState: {
    topics: {
      items: [],
      page: 1,
      pageSize: 10,
      total: 0,
    },
  },
  reducers: {
    setTopics(state, { payload }) {
      state.topics = payload;
    }
  },
});

export const { setTopics } = topicSlice.actions;

export const topicsSelector = (state) => state.topic?.topics;

export default topicSlice.reducer;
