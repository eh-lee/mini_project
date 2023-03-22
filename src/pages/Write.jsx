import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StHeaderTitle, StPage, SubHeader } from "../GlobalStyles";
import Button from "../redux/components/Buttons";
import { __addWrite } from "../redux/modules/writeSlice";
import { cookies } from "../shared/cookie";

function Write() {
  const navigate = useNavigate();
  // ========= LEH "Add Guard" ===========
  // useEffect(() => {
  //   const token = cookies.get("token");
  //   if (!token) {
  //     navigate("/login");
  //   }
  // });
  // ========= LEH "Add Guard" ===========

  const dispatch = useDispatch();
  const [classNumber, setClassNumber] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { error, isSuccess } = useSelector((state) => state.write);

  //추가
  useEffect(() => {
    if (isSuccess) {
      setClassNumber("");
      setSpecialty("");
      setTitle("");
      setContent("");
      navigate(`/board`);
      alert("업로드 성공!");
    }
  }, [error, isSuccess]);

  const submitHandler = async () => {
    if (title.length < 3 || title.length > 25) {
      alert("제목은 3자 이상, 25자 이하여야 합니다!");
      return;
    }

    if (content.length < 10 || content.length > 2000) {
      alert("내용은 10자 이상, 2000자 이하여야 합니다!");
      return;
    }
    dispatch(__addWrite({ classNumber, specialty, title, content }));
  };

  return (
    <>
      <StPage>
        <SubHeader>
          <StHeaderTitle>Write&nbsp;&nbsp;&nbsp;</StHeaderTitle>
        </SubHeader>

        <StForm
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <ClassSpecialty>
            <StClass
              type="text"
              value={classNumber}
              placeholder="기수를 적어주세요"
              onChange={(e) => {
                setClassNumber(e.target.value);
              }}
            />
            <StSpecialty
              type="text"
              value={specialty}
              placeholder="주특기를 적어주세요"
              onChange={(e) => {
                setSpecialty(e.target.value);
              }}
            />
          </ClassSpecialty>
          <StTitle
            type="text"
            value={title}
            placeholder="제목을 적어주세요"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <StContent
            type="text"
            value={content}
            placeholder="내용을 적어주세요"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <Button text={"업로드하기"} onClick={submitHandler} />
        </StForm>
      </StPage>
    </>
  );
}

export default Write;

const StForm = styled.form`
  /* background-color: wheat; */
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  min-height: 600px;
  gap: 20px;
`;

const ClassSpecialty = styled.div`
  display: flex;
  gap: 30px;
`;

const StClass = styled.input`
  background-color: lightgray;
  border-radius: 20px;
  border: 1px solid black;
  width: 260px;
  height: 40px;
  padding: 0px 20px;
`;
const StSpecialty = styled.input`
  background-color: lightgray;
  border-radius: 20px;
  border: 1px solid black;
  width: 260px;
  height: 40px;
  padding: 0px 20px;
`;

const StTitle = styled.input`
  background-color: lightgray;
  border-radius: 20px;
  border: 1px solid black;
  width: 600px;
  height: 40px;
  padding: 0px 20px;
`;

const StContent = styled.textarea`
  background-color: lightgray;
  border-radius: 20px;
  border: 1px solid black;
  resize: none;
  width: 600px;
  height: 400px;
  padding: 20px;
`;
