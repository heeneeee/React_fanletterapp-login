// import letters from "../modules/letters";
import auth from "../modules/authSlice";
import fanLetters from "../modules/fanLetters";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    // letters,
    auth,
    fanLetters,
  },
});

export default store;
