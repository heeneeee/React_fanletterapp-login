import React, { useState } from "react";
import Header from "components/Header";
import Form from "components/Form";
import LetterBox from "components/LetterBox";

const Home = ({ letter, setLetter }) => {
  const kakaoFriends = ["RYAN", "APEACH", "TUBE", "CHOONSIK"];

  const [kakao, setKakao] = useState("RYAN");

  const nameBtn = (item) => {
    setKakao(item);
  };

  return (
    <div>
      <Header />
      <Form letter={letter} setLetter={setLetter} />
      <LetterBox
        letter={letter}
        kakaoFriends={kakaoFriends}
        kakao={kakao}
        setKakao={setKakao}
        nameBtn={nameBtn}
      />
    </div>
  );
};

export default Home;
