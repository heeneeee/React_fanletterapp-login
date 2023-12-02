import React from "react";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { login, logout } from "redux/modules/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const signUpAPI = (userId, userPw, userNickname);

  // 회원가입

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const signUpAPI = {
        id: userId,
        password: userPw,
        nickname: userNickname,
      };
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        signUpAPI
      );
      console.log("회원가입 성공", response);
      setUserId("");
      setUserPw("");
      setUserNickname("");
    } catch (error) {
      const e = error.response.data.message;
      alert(e);
    }
  };

  //로그인 (아이디, 비밀번호)
  const signIn = async (e) => {
    e.preventDefault();

    const signInAPI = {
      id: userId,
      password: userPw,
    };
    try {
      const res = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        signInAPI
      );
      console.log("로그인 성공", res);

      const { accessToken, userId: dataId, avatar, nickname } = res.data;
      // console.log("res", res.data);
      dispatch(login({ accessToken, dataId, avatar, nickname }));
      localStorage.setItem("accessToken", accessToken);
      // navigate("/");
    } catch (error) {
      const e = error.res.data.message;
      alert(e);
      // console.error("로그인실패", error);
    }
  };

  return (
    <div
      style={{ backgroundColor: "#f3eeea", height: "100vh", width: "100vw" }}
    >
      <LoginContainer>
        <form>
          <h1>{isLogin ? "로그인" : "회원가입"}</h1>
          <InPutLogin
            type="text"
            placeholder="아이디(4-10글자)"
            minLength={4}
            maxLength={10}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            autoFocus
          />
          <br />
          <InPutLogin
            type="text"
            placeholder="비밀번호(4-15글자)"
            minLength={4}
            maxLength={15}
            value={userPw}
            onChange={(e) => setUserPw(e.target.value)}
          />
          <br />
          {!isLogin && (
            <InPutLogin
              type="text"
              placeholder="닉네임(1-10글자)"
              minLength={1}
              maxLength={10}
              value={userNickname}
              onChange={(e) => setUserNickname(e.target.value)}
            />
          )}
          <LoginBtn>
            {isLogin ? (
              <button onClick={signIn}>로그인</button>
            ) : (
              <button onClick={signUp}>회원가입</button>
            )}
          </LoginBtn>
          <br />

          <span
            onClick={() => setIsLogin((change) => !change)}
            style={{ color: "grey", fontSize: "14px" }}
          >
            {isLogin ? "회원가입" : "로그인"}
          </span>
        </form>
      </LoginContainer>
    </div>
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

const LoginBtn = styled.div``;
