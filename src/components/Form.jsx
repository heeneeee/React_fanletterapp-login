import React, { useEffect, useState } from "react";
import styled from "styled-components";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
// import { addLetter } from "redux/modules/letters";
import { useSelector } from "react-redux";
import { __addFanLetters } from "redux/modules/fanLetters";

const Form = ({}) => {
  const [userNickname, setNickname] = useState("");
  const [contents, setContents] = useState("");
  const [member, setMember] = useState("RYAN");
  const { userId, nickname, avatar } = useSelector((state) => state.auth);
  console.log("유저아이디", userId);

  const { isLoading, error, fanLetters } = useSelector((state) => {
    return state.fanLetters;
  });

  const dispatch = useDispatch();

  // 닉네임 input창 onChange핸들러
  // const onChangeNameHandeler = (event) => {
  //   setNickname(event.target.value);
  // };

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
    if (userNickname === "" && contents === "") {
      alert("내용을 입력해주세요!");
      return;
    }

    const newReply = {
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 19),
      id: uuid(),
      nickname,
      avatar,
      // "https://i.namu.wiki/i/qkyqIPNtVxlT_imBEI2g9EzINfuo44pszLQrhac-KMmMls2m3TQBjQrfT251bKldEsV2_um8vDLUYAWNCUbj1A.webp",
      contents,
      writedTo: member,
      nickname,
      userId,
    };

    dispatch(__addFanLetters(newReply));
    // dispatch(__addLetter(newReply));

    // setLetter([...letter, newReply]);
    setNickname("");
    setContents("");
  };

  // useEffect(() => {
  //   dispatch(__addFanLetters(newReply));
  // }, []);

  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }

  // if (error) {
  //   return <div>{error.message}</div>;
  // }

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
            <UserNickname>닉네임 : {nickname}</UserNickname>
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
  /* align-items: center; */
  align-content: center;
  padding-top: 50px;
  /* align-self:center; */
  align-items: center;
`;

const StLetterBox = styled.div`
  background-color: #eef5ff;
  width: 450px;
  height: 250px;
  border-radius: 15px;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
`;

const UserNickname = styled.div`
  /* margin-top: 20px; */
  margin-bottom: 0px;
`;

const InputContents = styled.input`
  width: 400px;
  border-radius: 5px;
  border: 0px;
  height: 70px;
`;
const StLetterSubmitBtn = styled.button`
  margin-top: 20px;
  margin-left: 320px;
  border-radius: 15px;
  padding: 5px;
  width: 90px;
  background-color: lightsalmon;
`;

const StSelect = styled.select`
  margin-left: 10px;
  border-radius: 5px;
  border: 0px;
  height: 20px;
`;
