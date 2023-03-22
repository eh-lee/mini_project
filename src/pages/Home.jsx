import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { cookies } from "../shared/cookie";

function Home() {
  // ========= LEH "Add Guard" ===========
  const navi = useNavigate();

  // useEffect(() => {
  //   const token = cookies.get("token");
  //   if (!token) {
  //     navi("/login");
  //   }
  // });
  // ========= LEH "Add Guard" ===========

  return (
    <div>
      {/* ===================== HOME PAGE ========================= */}
      {/* <div style={{ maxHeight: "600px" }}> */}
      {/* <HomeImg src="img/home1.jpg" /> */}
      {/* </div> */}
      {/* ===================== HOME PAGE ========================= */}
      <div>
        <button
          onClick={() => {
            navi(`/board`);
          }}
        >
          board
        </button>
      </div>
    </div>
  );
}

const HomeImg = styled.img`
  max-width: 100%;
  max-height: 70%;
`;

export default Home;
