import { createSlice } from "@reduxjs/toolkit";
import { addToast, ToastTypes } from "./toastSlice";
import serverApi from "services/serverApi";

const topicSlice = createSlice({
  name: "topic",
  initialState: {
    topics: { items: null, total: 0 },
    topic: null,
    fundSummary: null,
    filterAsset: null,
    filterStatus: null,
    filterTitle: null,
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
    setFilterStatus(state, { payload }) {
      state.filterStatus = payload;
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
  setFilterStatus,
  setFilterTitle,
} = topicSlice.actions;

export const topicsSelector = (state) => state.topic.topics;
export const topicSelector = (state) => state.topic.topic;
export const fundSummarySelector = (state) => state.topic.fundSummary;
export const filterAssetSelector = (state) => state.topic.filterAsset;
export const filterStatusSelector = (state) => state.topic.filterStatus;
export const filterTitleSelector = (state) => state.topic.filterTitle;

export const fetchTopic = (topicCid) => async (dispatch) => {
  serverApi.fetch(`/topics/${topicCid}`).then(({ result, error }) => {
    if (result) {
      dispatch(setTopic(result));
    }
    if (error) {
      dispatch(
        addToast({
          type: ToastTypes.Error,
          message: error.message,
        })
      );
    }
  });
};

export const fetchFundSummary = (topicCid) => async (dispatch) => {
  serverApi
    .fetch(`/topics/${topicCid}/fundsummary`)
    .then(({ result, error }) => {
      if (result) {
        dispatch(setFundSummary(result));
      }
      if (error) {
        dispatch(
          addToast({
            type: ToastTypes.Error,
            message: error.message,
          })
        );
      }
    });
};

export default topicSlice.reducer;
