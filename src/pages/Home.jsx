import React, { useState } from "react";
import Header from "components/Header";
import Form from "components/Form";
import LetterBox from "components/LetterBox";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { __getLetters } from "redux/modules/fanLetters";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getLetters());
  }, []);

  const kakaoFriends = ["RYAN", "APEACH", "TUBE", "CHOONSIK"];

  const [kakao, setKakao] = useState("RYAN");

  const nameBtn = (item) => {
    setKakao(item);
  };

  return (
    <div>
      <Header />
      <Form />
      <LetterBox
        kakaoFriends={kakaoFriends}
        kakao={kakao}
        setKakao={setKakao}
        nameBtn={nameBtn}
      />
    </div>
  );
};

export default Home;
