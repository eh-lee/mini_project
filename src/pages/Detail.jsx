import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { StHeaderTitle, StPage, SubHeader } from "../GlobalStyles";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DetailCommentForm from "../redux/components/detailComponents/DetailCommentForm";
import DetailCommentList from "../redux/components/detailComponents/DetailCommentList";
import DetailContent from "../redux/components/detailComponents/DetailContent";
import { __getDetail } from "../redux/modules/detailSlice";
import { cookies } from "../shared/cookie";

function Detail() {
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
  const { isLoading, error, detail } = useSelector((state) => state.detail);
  const { id } = useParams();
  // console.log(id);
  // const location = useLocation();
  // const postId = location.pathname.split("detail/")[1];

  useEffect(() => {
    dispatch(__getDetail(id));
  }, [dispatch]);

  if (isLoading) {
    return <div> 로딩 중... </div>;
  }
  if (error) {
    return <div> {error.message}</div>;
  }
  // console.log(detail.commentList);
  return (
    <StPage>
      <SubHeader>
        <StHeaderTitle>Detail&nbsp;&nbsp;&nbsp;</StHeaderTitle>
      </SubHeader>
      <StBody>
        <DetailContent detail={detail} postId={id} />
        <DetailCommentForm detail={detail} postId={id} />
        <DetailCommentList detail={detail} postId={id} />
      </StBody>
    </StPage>
  );
}

export default Detail;

const StBody = styled.div`
  /* background-color: wheat; */
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: flex-start; */
  padding: 50px;
  min-height: 600px;
  width: 80%;
  gap: 20px;
`;
