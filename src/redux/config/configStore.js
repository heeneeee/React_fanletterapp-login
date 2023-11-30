import letters from "../modules/letters";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    letters,
  },
});

export default store;
