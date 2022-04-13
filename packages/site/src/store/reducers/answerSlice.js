import { createSlice } from "@reduxjs/toolkit";
import { newErrorToast } from "./toastSlice";
import serverApi from "services/serverApi";

const answerSlice = createSlice({
  name: "answer",
  initialState: {
    answers: null,
  },
  reducers: {
    setAnswers(state, { payload }) {
      state.answers = payload;
    },
  },
});

export const { setAnswers } = answerSlice.actions;

export const answersSelector = (state) => state.answer.answers;

export const fetchAnswers = (topicCid, page) => async (dispatch) => {
  serverApi
    .fetch(`/topics/${topicCid}/answers`, { page })
    .then(({ result, error }) => {
      if (result) {
        dispatch(setAnswers(result));
      }
      if (error) {
        dispatch(newErrorToast(error.message));
      }
    });
};

export default answerSlice.reducer;
