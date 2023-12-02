// import React, { useEffect } from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "redux/modules/authSlice";

export default function Layout() {
  const isLogin = useSelector((state) => {
    state.auth.isLogin;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // isLogin이 false일 때 navigate 실행
  // useEffect(() => {
  //   if (isLogin) {
  //     navigate("/login");
  //   }
  // }, [isLogin, navigate]);
  return (
    <>
      <StNav>
        <StList
          onClick={() => {
            navigate("/");
          }}
        >
          🏠Home
        </StList>
        <StSection>
          <StList>내 프로필</StList>
          <StList
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
          >
            로그아웃
          </StList>
        </StSection>
      </StNav>
      <Outlet />
    </>
  );
}

const StNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #b7e7f7;
  padding: 8px 50px;
`;

const StSection = styled.section`
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

const StList = styled.li`
  list-style: none;
  display: flex;
`;
