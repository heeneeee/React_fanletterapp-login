import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "redux/modules/authSlice";
import { useParams } from "react-router-dom";
export default function Layout() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("rrr", params);

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
          <StList
            onClick={() => {
              navigate("/profile");
              console.log(params.id);
            }}
          >
            내 프로필
          </StList>
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

const StNav = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #b7e7f7;
  padding: 8px 50px;
  width: 100vw;
  border: none;
  font-size: 15px;
  font-weight: 500;
  color: #1b1919;
`;

const StSection = styled.section`
  display: flex;
  justify-content: space-between;
`;

const StList = styled.li`
  list-style: none;
  display: flex;
  margin-left: 20px;
  margin-right: 20px;
`;
