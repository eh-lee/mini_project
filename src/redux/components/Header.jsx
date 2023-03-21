import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { cookies } from "../../shared/cookie";
// import authSlice from "../modules/login";
import { isLoginActions } from "../modules/login";
import {
  StyledHeader,
  HeaderNav,
  HeaderLi,
  HeaderUl,
  HeaderLink,
} from "./styles";

const Header = () => {
  const navi = useNavigate();
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.auth.isLogin);
  console.log(isLogin);

  const logout = () => {
    console.log(isLogin);
    dispatch(isLoginActions.logout());
    alert("로그아웃 되었습니다.");
    window.location.reload();
    //cookies.remove("token")된 상태를 브라우저 콘솔에서 리렌더링
    navi("/login");
  };

  //re-rendering

  //========================================================
  // const [isLogin, setIsLogin] = useState(false);
  // const token = decodeURI(document.cookie).replace("token=", "");
  // console.log(document.cookie);
  // console.log(token);
  // console.log(isLogin);

  // const isLoginHandler = () => {
  //   if (token !== undefined) {
  //     setIsLogin(true);
  //     // console.log(isLogin);
  //     return;
  //   } else {
  //     setIsLogin(false);
  //     // console.log(isLogin);
  //     return;
  //   }
  // };
  //========================================================

  return (
    <StyledHeader>
      <div>
        <HeaderNav>
          <HeaderUl>
            <HeaderLi>
              <HeaderLink to="/">Home &nbsp;|</HeaderLink>
            </HeaderLi>
            <HeaderLi>
              <HeaderLink to="/about">About &nbsp;|</HeaderLink>
            </HeaderLi>
            <HeaderLi>
              <HeaderLink to="/board">Board &nbsp;|</HeaderLink>
            </HeaderLi>
            <HeaderLi>
              {isLogin ? (
                <p type="button" style={{ cursor: "pointer" }} onClick={logout}>
                  Logout
                </p>
              ) : (
                <p
                  type="button"
                  style={{ cursor: "pointer" }}
                  onClick={() => navi("/login")}
                >
                  LogIn
                </p>
              )}
            </HeaderLi>
          </HeaderUl>
        </HeaderNav>
      </div>
    </StyledHeader>
  );
};

export default Header;
