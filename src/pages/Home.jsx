import React, { useState } from "react";
import Header from "components/Header";
import Form from "components/Form";
import LetterBox from "components/LetterBox";
import Layout from "components/Layout";

const Home = () => {
  const kakaoFriends = ["RYAN", "APEACH", "TUBE", "CHOONSIK"];

  const [kakao, setKakao] = useState("RYAN");

  const nameBtn = (item) => {
    setKakao(item);
  };

  return (
    <div>
      <Layout />
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
