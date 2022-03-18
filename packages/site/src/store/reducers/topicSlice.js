import { createSlice } from "@reduxjs/toolkit";
import { addToast, ToastTypes } from "./toastSlice";
import serverApi from "services/serverApi";

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

export const fetchTopic = (topicCid) => async (dispatch) => {
  serverApi.fetch(`/topics/${topicCid}`).then(({ result, error }) => {
    if (result) {
      dispatch(setTopic(result));
    }
    if (error) {
      dispatch(addToast({
        type: ToastTypes.Error,
        message: error.message
      }));
    }
  });
}

export default topicSlice.reducer;
