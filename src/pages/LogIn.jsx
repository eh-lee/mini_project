import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLoginActions, __login } from "../redux/modules/login";
import styled from "styled-components";
import EHInput from "../redux/components/EHInput";
import Flex from "../redux/components/elem/Flex";
import Space from "../redux/components/elem/Space";
import StButton from "../redux/components/Buttons";
import sanitizeInput from "../redux/modules/sanitizeInput";
import { cookies } from "../shared/cookie";

const LogIn = () => {
  const dispatch = useDispatch();

  const navi = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const changeInputHandler = (e) => {
    const { value, name } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // =================== thunk ver ====================

  const submitButtonHandler = async (e) => {
    e.preventDefault();
    const sanitizedUser = {
      username: sanitizeInput(user.username),
      password: sanitizeInput(user.password),
    };
    const response = await dispatch(__login(sanitizedUser));
    if (response.type === "logIn/fulfilled") {
      dispatch(isLoginActions.login());
      alert("로그인 되었습니다.");
      navi("/");
    }
  };
  // =================== thunk ver ====================

  // ============== non-thunk ver ====================
  // const submitButtonHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const result = await apis.post("/api/login", user);
  //     cookies.set("token", result.headers.authorization, { path: "/" });
  //     navi("/");
  //   } catch (e) {
  //     const errorMsg = e.response.data.msg;
  //     alert(`${errorMsg}`);
  //   }
  // };
  // ============== non-thunk ver ====================

  //============= guard ================
  useEffect(() => {
    const token = cookies.get("token");
    if (token) {
      navi("/");
      alert("먼저 로그아웃을 해 주세요.");
    }
  });

  return (
    <Container onSubmit={submitButtonHandler}>
      <GreetingWrapper>
        <GreetingWrapperSub>
          <GreetingMain>To Gather,</GreetingMain>
          <GreetingSub>For being Together!</GreetingSub>
        </GreetingWrapperSub>
        <StyledImg src="img/login.jpg" />
      </GreetingWrapper>
      <Flex
        css={{
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <Space>
          <Space css={{ marginBottom: "5px" }}>아이디</Space>
          <EHInput
            type="text"
            value={user.username}
            name="username"
            onChange={changeInputHandler}
            placeholder="아이디를 입력해 주세요."
          />
        </Space>

        <Space>
          <Space css={{ marginTop: "10px", marginBottom: "5px" }}>
            비밀번호
          </Space>
          <EHInput
            type="password"
            value={user.password}
            name="password"
            onChange={changeInputHandler}
            placeholder="비밀번호를 입력해 주세요."
          />
        </Space>
      </Flex>
      <StButton text={"로그인"} />
      <LoginContainer>
        <StyledLink to="/signup">회원가입 하러 가기</StyledLink>
      </LoginContainer>
    </Container>
  );
};

const GreetingWrapper = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;
`;

const GreetingWrapperSub = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  /* sliding */
  animation-name: slide-in-down;
  animation-duration: 1.5s;
  animation-fill-mode: both;
  @keyframes slide-in-down {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0%);
      opacity: 1;
    }
  }
`;

const GreetingMain = styled.div`
  /* font-size: 50px; */
  font-size: 5rem;
  font-weight: bold;
  color: rgb(76, 76, 198);
  padding-bottom: 10px;
`;

const GreetingSub = styled.div`
  /* font-size: 50px; */
  font-size: 3.5rem;
`;

const LoginContainer = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  color: inherit;
`;

const Container = styled.form`
  gap: 20px;
  height: 95vh;
  min-width: 200px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const StyledImg = styled.img`
  border-radius: 50%;
  border: 1px solid rgb(0, 0, 0);
`;

export default LogIn;
