const { createSlice } = require("@reduxjs/toolkit");
import { data } from "../../shared/data";
const initialState = data;

const lettersSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {
    addLetter: (state, action) => {
      console.log("이거", action.payload);
      return [...state, action.payload];
    },
    removeLetter: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    editLetter: (state, action) => {
      console.log("ddd", action.payload);
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, contents: action.payload.newContent };
        } else {
          return item;
        }
      });
    },
  },
});

// const toggleisEdit = () => {
//     setIsEdit(!isEdit);

//     const newLetters = letters.map((item) => {
//       console.log(item);
//       if (item.id === params.id) {
//         return { ...item, contents: newContent };
//       }
//       return item;
//     });

//     setLetter(newLetters);
//   };

export const { addLetter, removeLetter, editLetter } = lettersSlice.actions;
export default lettersSlice.reducer;
