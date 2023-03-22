import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StHeaderTitle, StPage, SubHeader } from "../GlobalStyles";
import BoardPagination from "../redux/components/boardComponents/BoardPagination";
import BoardTable from "../redux/components/boardComponents/BoardTable";
import Button from "../redux/components/Buttons";
import { __getBoard } from "../redux/modules/boradSlice";
import { cookies } from "../shared/cookie";

function Board() {
  // ========= LEH "Add Guard" ===========
  const navi = useNavigate();

  useEffect(() => {
    const token = cookies.get("token");
    if (!token) {
      navi("/login");
    }
  });
  // ========= LEH "Add Guard" ===========

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, board } = useSelector((state) => state.board);

  const [page, setPage] = useState(1); //페이지
  const limit = 10; // posts가 보일 최대한의 갯수
  const offset = (page - 1) * limit; // 시작점과 끝점을 구하는 offset

  const postsData = (posts) => {
    if (posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  useEffect(() => {
    dispatch(__getBoard());
    // console.log("board,", board);
  }, []);

  if (isLoading) {
    return <div></div>;
  }
  if (error) {
    return <div> {error.message}</div>;
  }
  return (
    <>
      <StPage>
        <RelativeBox>
          <SubHeader>
            <StHeaderTitle>Board&nbsp;&nbsp;&nbsp;</StHeaderTitle>
            <Button
              text={"작성하기"}
              // borderColor={}
              onClick={() => {
                navigate(`/write`);
              }}
            />
          </SubHeader>

          <div>
            <BoardTable board={postsData(board)} />

            <BoardPagination
              limit={limit}
              page={page}
              totalPosts={board.length}
              setPage={setPage}
            />
          </div>
        </RelativeBox>
      </StPage>
    </>
  );
}

export default Board;

const RelativeBox = styled.div`
  position: relative;
  /* background-color: steelblue; */
  width: 90%;
  margin: auto;
  /* margin-top: 10px;s */
  border-radius: 20px;
  padding: 0px 30px 30px 30px;
  max-width: 1000px;
  min-height: 800px;
  /* min-width: 500px; */
`;
