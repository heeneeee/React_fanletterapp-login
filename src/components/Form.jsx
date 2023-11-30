import React, { useState } from "react";
import styled from "styled-components";
import uuid from "react-uuid";

const Form = ({ letter, setLetter }) => {
  const [nickname, setNickname] = useState("");
  const [contents, setContents] = useState("");
  const [member, setMember] = useState("RYAN");

  // 닉네임 input창 onChange핸들러
  const onChangeNameHandeler = (event) => {
    setNickname(event.target.value);
  };

  // 내용 input창 onChange핸들러
  const onChangeContentsHandeler = (event) => {
    setContents(event.target.value);
  };

  // option창 onChange 핸들러
  const onChangeSelectedHandler = (event) => {
    setMember(event.target.value);
  };

  //팬레터 등록
  const onSubmitLetter = (event) => {
    event.preventDefault();
    if (nickname === "" && contents === "") {
      alert("내용을 입력해주세요!");
      return;
    }

    const newReply = {
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 19),
      id: uuid(),
      nickname: nickname,
      avatar:
        "https://i.namu.wiki/i/qkyqIPNtVxlT_imBEI2g9EzINfuo44pszLQrhac-KMmMls2m3TQBjQrfT251bKldEsV2_um8vDLUYAWNCUbj1A.webp",
      contents: contents,
      writedTo: member,
    };

    setLetter([...letter, newReply]);
    setNickname("");
    setContents("");
  };

  return (
    // 팬레터 박스
    <FormBox>
      <StLetterBox>
        <div>
          <form onSubmit={onSubmitLetter}>
            캐릭터 선택 :
            <StSelect onChange={onChangeSelectedHandler}>
              <option value="RYAN">RYAN</option>
              <option value="APEACH">APEACH</option>
              <option value="TUBE">TUBE</option>
              <option value="CHOONSIK">CHOONSIK</option>
            </StSelect>
            <br />
            {/* 최대글자수제한 기능 넣기 */}
            닉네임 :
            <InputNickname
              name="nickName"
              type="text"
              placeholder="닉네임을 입력해주세요 (20자 이내)"
              value={nickname}
              onChange={onChangeNameHandeler}
              maxLength={20}
            ></InputNickname>
            <br />내 용 :
            <br />
            <InputContents
              name="contents"
              type="text"
              placeholder="전하고 싶은 내용을 입력해주세요 (100자 이내)"
              value={contents}
              onChange={onChangeContentsHandeler}
              maxLength={100}
            ></InputContents>
            <br />
            <StLetterSubmitBtn type="submit">팬레터 등록</StLetterSubmitBtn>
          </form>
        </div>
      </StLetterBox>
    </FormBox>
  );
};

export default Form;

const FormBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  align-items: center;
`;

const StLetterBox = styled.div`
  background-color: lightgray;
  width: 700px;
  height: 250px;
  border-radius: 15px;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputNickname = styled.input`
  width: 300px;
  margin-left: 10px;
  border-radius: 5px;
  border: 0px;
  height: 20px;
`;

const InputContents = styled.input`
  width: 400px;
  height: 80px;
  border-radius: 5px;
  border: 0px;
  height: 80px;
`;
const StLetterSubmitBtn = styled.button`
  margin-top: 20px;
  margin-left: 320px;
  border-radius: 15px;
  padding: 5px;
  width: 100px;
  background-color: lightsalmon;
`;

const StSelect = styled.select`
  margin-left: 10px;
  border-radius: 5px;
  border: 0px;
  height: 20px;
`;
