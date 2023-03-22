import React from "react";
import styled from "styled-components";

export default function Button({
  borderColor,
  backgroundColor,
  text,
  onClick,
}) {
  return (
    <StButton
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {text}
    </StButton>
  );
}

const StButton = styled.button`
  border: 2px dotted ${(props) => props.borderColor};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 50px;
  padding: 10px;
  height: 40px;
  color: ${(props) => props.borderColor};
  font-size: 17px;
  &:hover {
    border: 2px solid ${(props) => props.borderColor};
    cursor: pointer;
  }
`;
