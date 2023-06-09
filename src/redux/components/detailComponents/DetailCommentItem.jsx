import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { BtnBox } from "../../../GlobalStyles";
import { __deleteComment, __editComment } from "../../modules/commentSlice";
import { __getDetail } from "../../modules/detailSlice";
import { cookies } from "../../../shared/cookie";
import { FaTrashAlt, FaWrench } from "react-icons/fa";

import Button from "../Buttons";

function DetailCommentItem({ detail, comment, postId }) {
  const [editContent, setEditContent] = useState(comment?.content || "");
  const [edit, setEdit] = useState(false);
  // const { error, isCommentEdit } = useSelector((state) => state.detail);

  const dispatch = useDispatch();
  //삭제
  const onDeleteCommentHandler = async () => {
    const payload = {
      postId,
      commentId: comment.id,
    };
    await dispatch(__deleteComment(payload));
    await dispatch(__getDetail(postId));
  };
  //수정
  const onEditCommentHandler = async () => {
    const payload = {
      postId,
      commentId: comment.id,
      content: editContent,
    };
    await dispatch(__editComment(payload));
    setEdit(!edit);
  };
  return (
    <>
      <div>
        {detail.viewerRoleAdmin === true ||
        comment.nickname === cookies.get("nickname") ? (
          <div>
            {!edit ? (
              <StComment>
                <StUser>
                  <StUserInfo>
                    <UserImg src="https://platum.kr/wp-content/uploads/2019/12/64497335_490811004989301_7459130390851092480_n.png" />
                    <span style={{ fontSize: "22px", fontWeight: "500" }}>
                      {comment.nickname}
                    </span>
                  </StUserInfo>
                  <StIdTime>
                    {comment.id} / {comment.createdAt}
                  </StIdTime>
                </StUser>
                <StRowBox>
                  <StContent>{comment?.content}</StContent>
                  <BtnBox>
                    <Button
                      borderColor={"#5385e7"}
                      text={<FaWrench />}
                      onClick={() => {
                        setEdit(!edit);
                      }}
                      // onClick={onEditCommentHandler}
                    />
                    <Button
                      text={<FaTrashAlt />}
                      borderColor={"#e75388"}
                      onClick={(e) => {
                        onDeleteCommentHandler(comment.id);
                      }}
                    />
                  </BtnBox>
                </StRowBox>
              </StComment>
            ) : (
              <StComment>
                <StUser>
                  <StUserInfo>
                    <UserImg src="https://platum.kr/wp-content/uploads/2019/12/64497335_490811004989301_7459130390851092480_n.png" />
                    <span style={{ fontSize: "22px", fontWeight: "500" }}>
                      {comment.nickname}
                    </span>
                  </StUserInfo>
                  <StIdTime>
                    {comment.id} / {comment.createdAt}
                  </StIdTime>
                </StUser>
                <StRowBox>
                  <StContent>
                    <StInput
                      type="text"
                      value={editContent}
                      onChange={(e) => {
                        setEditContent(e.target.value);
                      }}
                    />
                  </StContent>
                  <BtnBox>
                    <Button
                      style={{}}
                      text={<FaWrench />}
                      borderColor={"#5385e7"}
                      onClick={onEditCommentHandler}
                    />
                  </BtnBox>
                </StRowBox>
              </StComment>
            )}
          </div>
        ) : (
          <StComment>
            <StUser>
              <StUserInfo>
                <UserImg src="https://platum.kr/wp-content/uploads/2019/12/64497335_490811004989301_7459130390851092480_n.png" />
                <span style={{ fontSize: "22px", fontWeight: "500" }}>
                  {comment.nickname}
                </span>
              </StUserInfo>
              <StIdTime>
                {comment.id} / {comment.createdAt}
              </StIdTime>
            </StUser>
            <StContent>{comment?.content}</StContent>
          </StComment>
        )}
      </div>
    </>
  );
}

export default DetailCommentItem;

const StComment = styled.div`
  /* background-color: lightcoral; */
  border-top: 1px solid gray;
  padding: 15px 10px;
  min-height: 70px;
`;

const StUser = styled.div`
  /* background-color: lightcoral; */
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const UserImg = styled.img`
  width: 25px;
  height: 25px;
  border: 1px solid gray;
  border-radius: 50%;
`;
const StUserInfo = styled.div`
  /* background-color: wheat; */
  display: flex;
  gap: 10px;
  align-items: flex-end;
`;

const StIdTime = styled.div`
  /* background-color: green; */
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: gray;
`;

const StRowBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const StContent = styled.div`
  font-size: 17px;
  min-height: 30px;
  margin-top: 20px;
  /* background-color: gray; */
  width: 85%;
  word-wrap: break-word;
  line-height: 20px;
`;

const StInput = styled.input`
  font-size: 15px;
  width: 100%;
  min-height: 30px;
  border-radius: 50px;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: RGB(225, 231, 255);
  border: none;
  &:focus {
    background-color: RGB(205, 211, 255);
    outline: none;
  }
`;
