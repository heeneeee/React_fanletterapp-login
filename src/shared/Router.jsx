import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Layout from "components/Layout";
import { useSelector } from "react-redux";
import Profile from "pages/Profile";

const Router = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);

  return (
    <BrowserRouter>
      <Routes>
        {isLogin ? (
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate replace to="/" />}></Route>
          </Route>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate replace to="/login" />}></Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
