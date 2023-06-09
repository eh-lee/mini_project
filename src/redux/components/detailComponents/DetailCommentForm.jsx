import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __addComment } from "../../modules/commentSlice";
import { __getDetail } from "../../modules/detailSlice";
// import { useNavigate } from "react-router-dom";

import Button from "../Buttons";

function DetailCommentForm({ postId }) {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  // @Size(min = 1, max = 100,
  //message = "댓글은 최소 1자에서 최대 100자 이내여야 합니다.")

  const submitHandler = async () => {
    if (content.length < 1 || content.length > 100) {
      alert("댓글은 최소 1자 이상, 최대 100자 이내여야 합니다!");
      return;
    }
    const payload = {
      postId,
      content,
    };
    dispatch(__addComment(payload));
    // console.log(content);
    setContent("");
    // alert("댓글 작성 완료!");
  };
  return (
    <>
      <StForm
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <StInput
          type="text"
          value={content}
          placeholder="내용을 적어주세요"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <StButton type="submit" onClick={submitHandler}>
          댓글작성
        </StButton>
      </StForm>
    </>
  );
}

export default DetailCommentForm;

const StForm = styled.form`
  /* background-color: gray; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;
  width: 102%;
  /* gap: 10px; */
  /* border-top: 1px solid black;
  border-bottom: 1px solid black; */
`;

const StInput = styled.input`
  border: 1px dashed RGB(75, 81, 131);
  /* border: none; */
  border-right: none;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  padding: 5px 10px;
  width: 82%;
  height: 28px;
  background-color: RGB(225, 231, 255);
  &:focus {
    background-color: RGB(205, 211, 255);
    outline: none;
  }
`;

const StButton = styled.button`
  border: 1px dashed RGB(75, 81, 131);
  /* border: none; */
  border-left: none;
  background-color: RGB(225, 231, 255);
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 10px;
  height: 40px;
  color: RGB(75, 81, 131);
  font-size: 17px;
  &:hover {
    background-color: RGB(205, 211, 255);
    outline: none;
  }
`;
