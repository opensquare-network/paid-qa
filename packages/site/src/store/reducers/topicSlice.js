import { createSlice } from "@reduxjs/toolkit";

const topicSlice = createSlice({
  name: "topic",
  initialState: {
    topics: null,
    topic: null,
  },
  reducers: {
    setTopics(state, { payload }) {
      state.topics = payload;
    },
    setTopic(state, { payload }) {
      state.topic = payload;
    },
  },
});

export const { setTopics, setTopic } = topicSlice.actions;

export const topicsSelector = (state) => state.topic.topics;
export const topicSelector = (state) => state.topic.topic;

export default topicSlice.reducer;
