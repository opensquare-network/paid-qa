import { createSlice } from "@reduxjs/toolkit";
import { newErrorToast } from "./toastSlice";
import serverApi from "services/serverApi";

const topicSlice = createSlice({
  name: "topic",
  initialState: {
    topics: { items: null, total: 0 },
    topic: null,
    fundSummary: null,
    filterAsset: "all",
    filterTitle: "",
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
    setFilterAsset(state, { payload }) {
      state.filterAsset = payload;
    },
    setFilterTitle(state, { payload }) {
      state.filterTitle = payload;
    },
  },
});

export const {
  setTopics,
  setTopic,
  setFundSummary,
  setFilterAsset,
  setFilterTitle,
} = topicSlice.actions;

export const topicsSelector = (state) => state.topic.topics;
export const topicSelector = (state) => state.topic.topic;
export const fundSummarySelector = (state) => state.topic.fundSummary;
export const filterAssetSelector = (state) => state.topic.filterAsset;
export const filterTitleSelector = (state) => state.topic.filterTitle;

export const fetchTopic = (topicCid) => async (dispatch) => {
  serverApi.fetch(`/topics/${topicCid}`).then(({ result, error }) => {
    if (result) {
      dispatch(setTopic(result));
    }
    if (error) {
      dispatch(newErrorToast(error.message));
    }
  });
};

export const fetchFundSummary = (topicCid) => async (dispatch) => {
  serverApi
    .fetch(`/topics/${topicCid}/funds/summary`)
    .then(({ result, error }) => {
      if (result) {
        dispatch(setFundSummary(result));
      }
      if (error) {
        dispatch(newErrorToast(error.message));
      }
    });
};

export default topicSlice.reducer;
