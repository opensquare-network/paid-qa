import { createSlice } from "@reduxjs/toolkit";
import { addToast, ToastTypes } from "./toastSlice";
import serverApi from "services/serverApi";

const answerSlice = createSlice({
  name: "answer",
  initialState: {
    answers: {
      items: [],
      page: 1,
      pageSize: 10,
      total: 0,
    },
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
  serverApi.fetch(`/topics/${topicCid}/answers`, { page }).then(({ result, error }) => {
    if (result) {
      dispatch(setAnswers(result));
    }
    if (error) {
      dispatch(addToast({
        type: ToastTypes.Error,
        message: error.message
      }));
    }
  });
}

export default answerSlice.reducer;
