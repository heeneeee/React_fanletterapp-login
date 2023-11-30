import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import { data } from "shared/data";
import { useState } from "react";

// //각 멤버들 댓글 상세페이지로 이동
const Router = () => {
  const [letter, setLetter] = useState(data);
  console.log(letter);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home letter={letter} setLetter={setLetter} />}
        />
        <Route
          path="/detail/:id"
          element={<Detail letter={letter} setLetter={setLetter} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
