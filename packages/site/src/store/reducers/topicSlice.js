import { createSlice } from "@reduxjs/toolkit";
import { addToast, ToastTypes } from "./toastSlice";
import serverApi from "services/serverApi";

const topicSlice = createSlice({
  name: "topic",
  initialState: {
    topics: null,
    topic: null,
    fundSummary: null,
  },
  reducers: {
    setTopics(state, { payload }) {
      state.topics = payload;
    },
    setTopic(state, { payload }) {
      state.topic = payload;
    },
    setFundSummary(state, { payload }) {
      state.fundSummary = payload;
    },
  },
});

export const { setTopics, setTopic, setFundSummary } = topicSlice.actions;

export const topicsSelector = (state) => state.topic.topics;
export const topicSelector = (state) => state.topic.topic;
export const fundSummarySelector = (state) => state.topic.fundSummary;

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

export const fetchFundSummary = (topicCid) => async (dispatch) => {
  serverApi.fetch(`/topics/${topicCid}/fundsummary`).then(({ result, error }) => {
    if (result) {
      dispatch(setFundSummary(result));
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
