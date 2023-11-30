import React from "react";
import styled from "styled-components";
import kakaoFriends from "./kakaoFriends.png";

// const Wrapper = styled.div``;

const StBody = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  /* position: relative; */
  align-items: center;
  background-image: url(${kakaoFriends});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 500px;
`;

const StTitle = styled.div`
  display: block;
  text-align: center;
  font-size: 50px;
  font-weight: 600;
  color: white;
  position: absolute;
  width: 100%;
  top: 150px;
  left: 50%;
  min-width: 300px;
  transform: translate(-50%, -50%);
`;

const Header = () => {
  return (
    <StBody>
      <StTitle>
        <div>KakaoFriends Fan Letter</div>
      </StTitle>
    </StBody>
  );
};

export default Header;
