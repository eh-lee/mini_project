import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import styled from "styled-components";

export const GlobalStyles = createGlobalStyle`
    ${reset};
    :root{

    }
`;

export const StPage = styled.div`
  /* background-color: gray; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 20px;
`;

export const SubHeader = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-left: 140px;
  width: 75%;
  /* margin-top: 20px; */
`;

export const StHeaderTitle = styled.h2`
  font-size: 100px;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-thickness: 5px;
`;

export const BtnBox = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
