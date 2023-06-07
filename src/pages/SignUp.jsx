import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __signUp } from "../redux/modules/login";
import EHInput from "../redux/components/EHInput";
import StButton from "../redux/components/Buttons";
import Flex from "../redux/components/elem/Flex";
import Space from "../redux/components/elem/Space";
import sanitizeInput from "../redux/modules/sanitizeInput";
const SignUp = () => {
  const dispatch = useDispatch();
  const navi = useNavigate();
  // const [usernameMsg, setUsernameMsg] = useState("");

  const [user, setUser] = useState({
    username: "",
    password: "",
    nickname: "",
    email: "",
    admin: false,
    admintoken: "",
  });

  const changeInputHandler = (e) => {
    const { value, name } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //=====================================================
  //================= 유효성 검사 1 (프론트) =================

  // ================ 아이디 유효성 검사 ====================
  const [usernameMsg, setUsernameMsg] = useState("");
  const validUsername = (e) => {
    const username = e.target.value;
    const isValidUsername = /^(?=.*[0-9])(?=.*[a-z]).{5,12}$/.test(username);
    if (isValidUsername) {
      setUsernameMsg("올바른 형식입니다.");
    } else {
      setUsernameMsg(
        "아이디는 5~12글자, 알파벳 소문자와 숫자를 최소 한 자 이상 포함해야 합니다."
      );
    }
  };

  // ================ 비밀번호 유효성 검사 ===================
  const [passwordMsg, setPasswordMsg] = useState("");
  const validPassword = (e) => {
    const password = e.target.value;
    const isValidPassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{5,15}$/.test(
        password
      );
    if (isValidPassword) {
      setPasswordMsg("올바른 형식입니다.");
    } else {
      setPasswordMsg(
        "비밀번호는 5~15글자, 알파벳, 숫자, 특수문자를 최소 하나씩 입력해야 합니다."
      );
    }
  };

  // ================= 비밀번호 일치 검사 ====================
  // user.password가 checkPw에 맞춰서 따라가면 왜 if문이 반응을 안 하지?..
  // -> useCallback ( , [user.password])도 안 됨
  const [confirmPwMsg, setConfirmPwMsg] = useState("");
  const onChangeConfirmPw = (e) => {
    e.preventDefault();
    const checkPw = e.target.value;

    if (user.password.length >= 1 && user.password !== checkPw) {
      setConfirmPwMsg("비밀번호와 비밀번호 확인의 값이 일치하지 않습니다.");
    }
    if (user.password.length >= 1 && user.password === checkPw) {
      setConfirmPwMsg("비밀번호가 일치합니다.");
    }
  };

  //================== 닉네임 유효성 검사 ===================
  const [nicknameMsg, setNicknameMsg] = useState("");
  const validNickname = (e) => {
    const nickname = e.target.value;
    const isValidNickname = /^[가-힣a-zA-Z0-9]{2,15}$/.test(nickname);
    if (isValidNickname) {
      setNicknameMsg("올바른 형식입니다.");
    } else {
      setNicknameMsg("닉네임은 2~15글자, 한글, 알파벳, 숫자만 입력 가능합니다");
    }
  };
  //================== 이메일 유효성 검사 ===================
  const [emailMsg, setEmailMsg] = useState("");
  const validEmail = (e) => {
    const email = e.target.value;
    const isValidEmail =
      /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
    if (isValidEmail) {
      setEmailMsg("올바른 형식입니다.");
    } else {
      setEmailMsg("이메일 형식에 맞지 않습니다.");
    }
  };

  //=====================================================
  //================= 유효성 검사 2 (백) ====================

  const submitButtonHandler = async (e) => {
    e.preventDefault();

    // =============== 인풋 공백 검사 ======================
    if (
      user.username === "" ||
      user.password === "" ||
      user.passwordCheck === "" ||
      user.nickname === "" ||
      user.email === ""
    ) {
      alert("빈 칸을 작성해 주세요.");
      return;
    }

    const sanitizedUser = {
      username: sanitizeInput(user.username),
      password: sanitizeInput(user.password),
      passwordCheck: sanitizeInput(user.passwordCheck),
      nickname: sanitizeInput(user.nickname),
      email: sanitizeInput(user.email),
    };

    const result = await dispatch(__signUp(sanitizedUser));
    if (result.type === "signUp/fulfilled") {
      navi("/login");
    }
  };

  return (
    <Container onSubmit={submitButtonHandler}>
      <GreetingWrapper>
        <GreetingWrapperSub>
          <GreetingMain>투게더</GreetingMain>
          <GreetingSub>에서 함께해!</GreetingSub>
        </GreetingWrapperSub>
        <StyledImg src="img/signup.jpg" />
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
            onChange={(e) => {
              validUsername(e);
              changeInputHandler(e);
            }}
            placeholder="아이디를 입력해 주세요."
          />
          <Validation match={usernameMsg === "올바른 형식입니다."}>
            {usernameMsg}
          </Validation>
        </Space>
        <Space>
          <Space css={{ marginTop: "10px", marginBottom: "5px" }}>
            비밀번호
          </Space>
          <EHInput
            type="password"
            value={user.password}
            name="password"
            onChange={(e) => {
              validPassword(e);
              changeInputHandler(e);
            }}
            placeholder="비밀번호를 입력해 주세요."
          />
          <Validation match={passwordMsg === "올바른 형식입니다."}>
            {passwordMsg}
          </Validation>
        </Space>
        <Space>
          <Space css={{ marginTop: "10px", marginBottom: "5px" }}>
            비밀번호 확인
          </Space>
          <EHInput
            type="password"
            value={user.passwordCheck}
            name="passwordCheck"
            onChange={onChangeConfirmPw}
            placeholder="비밀번호를 다시 입력해 주세요."
          />
          <Validation match={confirmPwMsg === "비밀번호가 일치합니다."}>
            {confirmPwMsg}
          </Validation>
        </Space>
        <Space>
          <Space css={{ marginTop: "10px", marginBottom: "5px" }}>닉네임</Space>
          <EHInput
            type="text"
            value={user.nickname}
            name="nickname"
            onChange={(e) => {
              changeInputHandler(e);
              validNickname(e);
            }}
            placeholder="닉네임을 입력해 주세요."
          />
          <Validation match={nicknameMsg === "올바른 형식입니다."}>
            {nicknameMsg}
          </Validation>
        </Space>
        <Space>
          <Space css={{ marginTop: "10px", marginBottom: "5px" }}>이메일</Space>
          <EHInput
            type="text"
            value={user.email}
            name="email"
            onChange={(e) => {
              changeInputHandler(e);
              validEmail(e);
            }}
            placeholder="이메일을 입력해 주세요."
          />
          <Validation match={emailMsg === "올바른 형식입니다."}>
            {emailMsg}
          </Validation>
        </Space>
      </Flex>
      <StButton text={"회원가입 완료"} />
      <LoginContainer>
        <LoginP>이미 계정이 있나요?</LoginP>
        <StyledLink to="/login">로그인</StyledLink>
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
`;

const GreetingWrapperSub = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: 15px;
`;

const GreetingMain = styled.div`
  font-size: 50px;
  font-weight: bold;
  color: rgb(76, 76, 198);
`;

const GreetingSub = styled.div`
  font-size: 50px;
`;

const LoginP = styled.p`
  padding-right: 5px;
`;
const LoginContainer = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
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

const StyledLink = styled(Link)`
  color: inherit;
`;

const StyledImg = styled.img`
  border-radius: 50%;
  border: 1px solid rgb(0, 0, 0);
  /* scale */
  animation-name: scale;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: linear;
  @keyframes scale {
    from {
      transform: scale(0.8);
    }
    to {
      transform: scale(1);
    }
  }
`;

const Validation = styled.p`
  font-size: 12px;
  color: ${({ match }) => (match ? "black" : "red")};
`;

export default SignUp;
