import React from "react";
import styled from "styled-components";
import DetailCommentItem from "./DetailCommentItem";

function DetailCommentList({ detail, postId }) {
  // console.log(detail.comentList);

  return (
    <>
      <StComment>
        <StTitle>Comment List</StTitle>
        <div>
          {detail?.commentList?.length > 0 ? (
            detail.commentList.map((comment) => (
              <div key={comment.id}>
                <DetailCommentItem comment={comment} postId={postId} />
              </div>
            ))
          ) : (
            <div>댓글이 없습니다.</div>
          )}
        </div>
      </StComment>
    </>
  );
}

export default DetailCommentList;
const StComment = styled.div`
  /* background-color: green; */
  width: 95%;
  /* padding: 10px; */
  /* gap: 10px; */
`;

const StTitle = styled.h3`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 3px;
  border-bottom: 1px solid black;
`;
