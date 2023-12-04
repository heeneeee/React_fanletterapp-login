import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { useParams } from "react-router-dom";

const initialState = {
  letters: [],
  isLoading: false,
  isError: false,
  error: null, // 에러가 발생하면 null에 메세지 등을 채워준다
};
// console.log(fanLetters);
// ADD!!!!  - ㅇㅇ
export const __addFanLetters = createAsyncThunk(
  "addfanLetters",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:5000/letters", payload);
      console.log("__addLetters -> res", res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      console.log("__addLetters -> error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// console.log(fanLetters);
// GET!!!!  - ㅇㅇ
export const __getLetters = createAsyncThunk(
  "getLetters",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:5000/letters");
      console.log("res", res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// DELETE!!!!
export const __deleteFanLetters = createAsyncThunk(
  "deleteFanLetters",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/letters/${payload}`
      );
      console.log("삭제", res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// EDIT!!!!
export const __editLetters = createAsyncThunk(
  "editLetters",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/letters/${payload.id}`,
        payload
      );
      console.log("res", res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// slice
export const fanLettersSlice = createSlice({
  name: "fanLetters",
  initialState,
  extraReducers: {
    [__addFanLetters.pending]: (state, action) => {
      state.isLoading = true;
      console.log("ffff", state);
      state.isError = false;
    },
    [__addFanLetters.fulfilled]: (state, action) => {
      console.log("Current state:", state);
      state.isLoading = false;
      state.isError = false;
      state.letters.push(action.payload);

      console.log("Payload from action:", action.payload);
    },

    [__addFanLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    //-----------------------------------------------------
    [__getLetters.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getLetters.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letters = action.payload;
      // console.log("state", action.payload);
      // console.log("풀필드 : ", action);
    },
    [__getLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    //-----------------------------------------------------

    [__deleteFanLetters.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__deleteFanLetters.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      // console.log("stdfsdfsfate", state.letters);
      // state.letters = state.letters.filter(
      //   (item) => item.id !== action.payload
      // );
    },
    [__deleteFanLetters.rejected]: (state, action) => {
      // console.log("state", state.data);
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    //-----------------------------------------------------
    [__editLetters.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__editLetters.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letters = state.letters.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, isEdit: !item.isEdit };
        }
        return item;
      });
    },
    [__editLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export const {} = fanLettersSlice.actions; // extraReducers
export default fanLettersSlice.reducer;
