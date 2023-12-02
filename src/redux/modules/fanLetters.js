import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { useParams } from "react-router-dom";

const initialState = {
  fanLetters: [],
  isLoading: false,
  isError: false,
  error: null, // 에러가 발생하면 null에 메세지 등을 채워준다
};

// ADD!!!!
export const __addFanLetters = createAsyncThunk(
  "addfanLetters",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:5000/fanLetters", payload);
      console.log("__addLetters -> res", res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      console.log("__addLetters -> error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// GET!!!!
export const __getLetters = createAsyncThunk(
  "getLetters",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:5000/fanLetters");
      console.log("res", res.data);
      return thunkAPI.fulfillWithValue();
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
      const res = await axios.delete(`http://localhost:5000/${id}`);
      console.log("res", res.data);
      return thunkAPI.fulfillWithValue();
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// // EDIT!!!!
// export const __editLetters = createAsyncThunk(
//   "editLetters",
//   async (payload, thunkAPI) => {
//     try {
//       const res = await axios.post("http://localhost:5000/fanLetters");
//       console.log("res", res.data);
//       return thunkAPI.fulfillWithValue();
//     } catch (error) {
//       console.log("error", error);
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

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
      state.fanLetters.push(action.payload);

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
      state.fanLetters = action.payload;
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
      state.fanLetters = state.fanLetters((item) => item.id !== action.payload);
      // console.log("풀필드 : ", action);
    },
    [__deleteFanLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    // //-----------------------------------------------------
    // [__editLetters.pending]: (state, action) => {
    //   state.isLoading = true;
    //   state.isError = false;
    // },
    // [__editLetters.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.isError = false;
    //   state.fanLetters = action.payload;
    //   // console.log("풀필드 : ", action);
    // },
    // [__editLetters.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.error = action.payload;
    // },
  },
});

export const {} = fanLettersSlice.actions; // extraReducers
export default fanLettersSlice.reducer;
