import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BtnBox } from "../../../GlobalStyles";
import {
  __deleteDetail,
  __editDetail,
  __getDetail,
} from "../../modules/detailSlice";
import Button from "../Buttons";

function DetailContent({ detail, postId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(detail?.title || "");
  const [editContent, setEditContent] = useState(detail?.content || "");
  const [editClassNumber, setEditClassNumber] = useState(
    detail?.classNumber || ""
  );
  const [editSpecialty, setEditSpecialty] = useState(detail?.specialty || "");
  // const { error, isDelete } = useSelector((state) => state.detail);

  //삭제
  const onDeleteDetailHandler = async () => {
    dispatch(__deleteDetail(postId));
    alert("삭제완료!");
    navigate(`/board`);
  };

  //수정
  const onEditDetailHandler = async () => {
    const payload = {
      postId,
      title: editTitle,
      content: editContent,
      classNumber: editClassNumber,
      specialty: editSpecialty,
    };
    // console.log(postId);
    dispatch(__editDetail(payload));
    // dispatch(__getDetail(payload.postId));
    alert("게시글 수정 완료!");
    setEdit(!edit);
  };

  if (!detail) {
    return <div>로딩 중...</div>;
  }
  // console.log(detail.viewerRoleAdmin);
  return (
    <>
      <StDetailContent>
        {detail.viewerRoleAdmin === true ? (
          <StBox>
            {!edit ? (
              <div>
                <StUser>
                  <StUserInfo>
                    <UserImg src="https://platum.kr/wp-content/uploads/2019/12/64497335_490811004989301_7459130390851092480_n.png" />
                    <StNick>{detail.nickname}</StNick>
                    <span style={{ fontSize: "20px" }}>
                      {detail.classNumber} - {detail.specialty}
                    </span>
                  </StUserInfo>
                  <StIdTime>
                    {detail.id} / {detail.createdAt}
                  </StIdTime>
                </StUser>
                <StTitle>{detail.title}</StTitle>
                <StContent>{detail.content}</StContent>
                <BtnBox>
                  <Button
                    borderColor={"#5385e7"}
                    text={"수정하기"}
                    onClick={() => {
                      setEdit(!edit);
                    }}
                  />
                  <Button
                    text={"삭제하기"}
                    borderColor={"#e75388"}
                    onClick={(e) => {
                      onDeleteDetailHandler(detail.id);
                    }}
                  />
                </BtnBox>
              </div>
            ) : (
              <div>
                <StUser>
                  <StUserInfo>
                    <UserImg src="https://platum.kr/wp-content/uploads/2019/12/64497335_490811004989301_7459130390851092480_n.png" />
                    <StNick style={{ fontSize: "25px", fontWeight: "600" }}>
                      {detail.nickname}
                    </StNick>
                    <div>
                      <UserInput
                        type="text"
                        value={editClassNumber}
                        onChange={(e) => {
                          setEditClassNumber(e.target.value);
                        }}
                      />
                      <span> - </span>
                      <UserInput
                        type="text"
                        value={editSpecialty}
                        onChange={(e) => {
                          setEditSpecialty(e.target.value);
                        }}
                      />
                    </div>
                  </StUserInfo>

                  <StIdTime>
                    {/* <div>ID:{detail.id}</div> */}
                    {/* <div>작성시간:{detail.createdAt}</div> */}
                    <span>
                      {detail.id} / {detail.createdAt}
                    </span>
                  </StIdTime>
                </StUser>
                <StTitle>
                  <StTitleInput
                    type="text"
                    value={editTitle}
                    onChange={(e) => {
                      setEditTitle(e.target.value);
                    }}
                  />
                </StTitle>
                <StContent>
                  <StContentInput
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
                    text={"수정완료"}
                    borderColor={"#5385e7"}
                    onClick={onEditDetailHandler}
                  />
                  <Button
                    borderColor={"#e75388"}
                    text={"수정취소"}
                    onClick={() => {
                      setEdit(!edit);
                    }}
                  />
                </BtnBox>
              </div>
            )}
          </StBox>
        ) : (
          <StBox>
            <StUser>
              <StUserInfo>
                <UserImg src="https://platum.kr/wp-content/uploads/2019/12/64497335_490811004989301_7459130390851092480_n.png" />
                <StNick>{detail.nickname}</StNick>
                <span style={{ fontSize: "20px" }}>
                  {detail.classNumber} - {detail.specialty}
                </span>
              </StUserInfo>
              <StIdTime>
                {detail.id} / {detail.createdAt}
              </StIdTime>
            </StUser>
            <StTitle>{detail.title}</StTitle>
            <StContent>{detail.content}</StContent>
          </StBox>
        )}
      </StDetailContent>
    </>
  );
}

export default DetailContent;

const StDetailContent = styled.div`
  /* background-color: olive; */
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 200px;
  width: 90%;
  border: 1px solid black;
  border-radius: 20px;
`;

const StBox = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  padding: 20px;
  min-height: 200px;
  gap: 20px;
`;

const StUser = styled.div`
  /* background-color: lightcoral; */
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const UserImg = styled.img`
  width: 30px;
  height: 30px;
  border: 1px solid gray;
  border-radius: 50%;
`;
const StUserInfo = styled.div`
  /* background-color: wheat; */
  display: flex;
  gap: 10px;
  align-items: flex-end;
`;
const StNick = styled.span`
  font-size: 25px;
  font-weight: 600;
`;
const StIdTime = styled.div`
  /* background-color: green; */
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: gray;
`;
const StTitle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  border-top: 1px solid gray;
  height: 40px;
  font-size: 20px;
  font-weight: 600;
`;
const StContent = styled.div`
  font-size: 17px;
  min-height: 200px;

  border-top: 1px solid lightgray;
  padding-top: 20px;
  /* background-color: gray; */
`;

const UserInput = styled.input`
  font-size: 15px;
  width: 100px;
  border: 1px dotted black;
  border-radius: 50px;
  padding: 5px 10px;
  border-radius: 10px;
  border: 1px dotted black;
`;

const StTitleInput = styled.input`
  font-size: 18px;
  font-weight: 500;
  width: 99%;
  padding: 5px 10px;
  border-radius: 10px;
  border: 1px dotted black;
`;
const StContentInput = styled.textarea`
  resize: none;
  padding: 20px;
  font-size: 15px;
  min-height: 150px;
  width: 93%;
  border-radius: 13px;
  border: 1px dotted black;
`;
