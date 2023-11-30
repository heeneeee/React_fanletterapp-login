import React from "react";
import { useState } from "react";
import styled from "styled-components";
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <body
        style={{ backgroundColor: "#f3eeea", height: "100vh", width: "100vw" }}
      >
        <LoginContainer>
          <h1>{isLogin ? "로그인" : "회원가입"}</h1>
          <InPutLogin type="text" placeholder="아이디(4-10글자)" autoFocus />
          <br />
          <InPutLogin type="text" placeholder="비밀번호(4-15글자)" />
          <br />
          {!isLogin && (
            <InPutLogin type="text" placeholder="닉네임(1-10글자)" />
          )}
          <LoginBtn>{isLogin ? "로그인" : "회원가입"}</LoginBtn>
          <br />

          <span
            onClick={() => setIsLogin((change) => !change)}
            style={{ color: "grey", fontSize: "14px" }}
          >
            {isLogin ? "회원가입" : "로그인"}
          </span>
        </LoginContainer>
      </body>
    </>
  );
}

const LoginContainer = styled.div`
  text-align: center;
  width: 400px;
  height: 450px;
  background-color: #ebe3d5;
  border-radius: 10px;
`;

const InPutLogin = styled.input`
  margin-bottom: 24px;
  padding: 12px 5px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-image: initial;
  border-bottom: 1px solid gray;
  width: 360px;
`;

const LoginBtn = styled.button`
  width: 350px;
  padding: 12px 10px;
  margin-top: 20px;
  margin-bottom: 30px;
  font-size: 15px;
`;
