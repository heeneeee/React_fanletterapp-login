import React from "react";
import styled from "styled-components";

const SimpleButton = styled.button`
  width: 100px;
  height: 30px;
  background: lightyellow;
  border-radius: 30px;
  border: 1.5px solid gray;
  margin: 20px;
  padding: 5px;
  box-shadow: 3px 3px gray;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.09);
  }
`;

const Button = ({ children, nameBtn }) => {
  return <SimpleButton onClick={nameBtn}>{children}</SimpleButton>;
};

export default Button;
