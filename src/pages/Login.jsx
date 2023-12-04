import React from "react";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { login, logout } from "redux/modules/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [dataId, setDataId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const signUpAPI = (userId, userPw, userNickname);

  // 회원가입

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const signUpAPI = {
        id: dataId,
        password: userPw,
        nickname: userNickname,
      };
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        signUpAPI
      );
      console.log("회원가입 성공", response);
      navigate("/");
      setDataId("");
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
      id: dataId,
      password: userPw,
    };
    try {
      const res = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        signInAPI
      );
      console.log("로그인 성공", res);

      const { accessToken, userId, avatar, nickname } = res.data;
      // console.log("res", res.data);
      dispatch(login({ accessToken, userId, avatar, nickname }));
      localStorage.setItem("accessToken", accessToken);
      // navigate("/");
    } catch (error) {
      const e = error.res.data.message;
      alert(e);
      console.error("로그인실패", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: " #eef5ff",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        marginTop: "180px",
      }}
    >
      <LoginContainer>
        <form>
          <h1>{isLogin ? "로그인" : "회원가입"}</h1>
          <InPutLogin
            type="text"
            placeholder="아이디(4-10글자)"
            minLength={4}
            maxLength={10}
            value={dataId}
            onChange={(e) => setDataId(e.target.value)}
            autoFocus
          />
          <br />
          <InPutLogin
            type="password"
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
              <button
                onClick={signIn}
                style={{
                  width: "300px",
                  height: "50px",
                  marginTop: "80px",
                  borderRadius: "15px",
                  border: "1px",
                  backgroundColor: "#dddadafc",
                }}
              >
                로그인
              </button>
            ) : (
              <button
                onClick={signUp}
                style={{
                  width: "300px",
                  height: "50px",
                  marginTop: "20px",
                  borderRadius: "15px",
                  border: "1px",
                  backgroundColor: "#dddadafc",
                }}
              >
                회원가입
              </button>
            )}
          </LoginBtn>
          <br />

          <div
            onClick={() => setIsLogin((change) => !change)}
            style={{ color: "grey", fontSize: "14px", marginTop: "0px" }}
          >
            {isLogin ? "회원가입" : "로그인"}
          </div>
        </form>
      </LoginContainer>
    </div>
  );
}

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 450px;
  height: 500px;
  background-color: #e6f7d8;
  border-radius: 20px;
`;

const InPutLogin = styled.input`
  margin-bottom: 24px;
  padding: 12px 5px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-image: initial;
  border-bottom: 1px solid gray;
  width: 350px;
  height: 25px;
  border-radius: 20px;
`;

const LoginBtn = styled.div`
  /* width: 200px; */
`;
