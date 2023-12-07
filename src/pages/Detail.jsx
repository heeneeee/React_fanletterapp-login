import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __deleteFanLetters, __editLetters } from "redux/modules/fanLetters";

const Detail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, letters, isError } = useSelector(
    (state) => state.fanLetters
  );
  const { userId, nickname, avatar } = useSelector((state) => state.auth);

  const [contents, setContents] = useState("");
  const [newContents, setNewContents] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const params = useParams();

  const toggleisEdit = () => {
    if (!isEdit) {
      setNewContents("");
    }
    setIsEdit(!isEdit);
    dispatch(__editLetters({ id: params.id, newContents }));
    if (isEdit == true) {
      if (confirm("이대로 수정을 진행하시겠습니까?")) {
        // navigate("/");
      } else {
        return;
      }
    }
  };

  const deleteTo = () => {
    dispatch(__deleteFanLetters(params.id));
    console.log("params.id", params.id);
    if (confirm("삭제하시겠습니까?")) {
      navigate("/");
    } else {
      return;
    }
  };

  return (
    <LetterBody>
      <StDetailContainer>
        {letters.map((item) => {
          if (item.id === params.id) {
            return (
              <div key={item.id}>
                <div>
                  <HomeBtn
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    HOME
                  </HomeBtn>
                </div>
                <WritedTo>To. {item.writedTo}</WritedTo>
                <CreatedAt>
                  {item.createdAt.replace("T", " ").substring(0, 19)}
                </CreatedAt>

                <DetailContents>
                  {isEdit ? (
                    <>
                      <Textarea
                        autoFocus
                        defaultValue={item.contents}
                        onChange={(e) => setNewContents(e.target.value)}
                      />
                    </>
                  ) : (
                    [item.contents]
                  )}
                </DetailContents>
                <Buttons>
                  {isEdit ? (
                    <>
                      <EditBtn onClick={toggleisEdit}>수정완료</EditBtn>
                      <CancelBtn>취소하기</CancelBtn>
                    </>
                  ) : (
                    <>
                      <EditBtn onClick={toggleisEdit}>수정하기</EditBtn>
                      <DeleteBtn onClick={deleteTo}>삭제하기</DeleteBtn>
                    </>
                  )}
                </Buttons>

                <Avatar>
                  <img
                    src={item.avatar}
                    alt="img"
                    style={{
                      width: "150px",
                      borderRadius: "50%",
                      margin: "0px",
                    }}
                  />
                </Avatar>
                <Nickname>From. {item.nickname}</Nickname>
              </div>
            );
          }
        })}
      </StDetailContainer>
    </LetterBody>
  );
};

const LetterBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  margin-top: 50px;
`;
const StDetailContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: lightyellow;
  width: 1000px;
  height: 600px;
  border-radius: 50px;
  margin-left: 50px;
  margin-bottom: 50px;
`;

const DetailContents = styled.p`
  border: 0.5px solid grey;
  border-radius: 20px;
  display: flex;
  justify-content: Center;
  width: 800px;
  height: 120px;
`;

const CreatedAt = styled.span`
  margin-top: 50px;
  margin-inline-start: 500px;
`;
const WritedTo = styled.span`
  margin-top: 50px;
  font-weight: initial;
  font-size: 25px;
`;
const Nickname = styled.div`
  margin-top: 5px;
`;
const HomeBtn = styled.button`
  height: 30px;
  width: 80px;
  border-radius: 10px;
  border: 1px solid yellow;
  margin-bottom: 50px;
  margin-top: 50px;
`;

const Buttons = styled.section`
  margin-top: 10px;
  display: flex;
  margin-inline-start: 580px;
`;

const DeleteBtn = styled.button`
  margin: 10px;
  border-radius: 15px;
  border: none;
  width: 90px;
  height: 30px;
  color: #3a3636;
  background-color: lightblue;
  box-shadow: 0px 0px 1px 1px rgba(157, 173, 182, 0.644);
`;

const EditBtn = styled.button`
  margin: 10px;
  border-radius: 15px;
  border: none;
  width: 90px;
  height: 30px;
  color: #3a3636;
  background-color: lightblue;
  box-shadow: 0px 0px 1px 1px rgba(157, 173, 182, 0.644);
`;

const Avatar = styled.div``;

const Textarea = styled.textarea`
  border: 0px;
  border-radius: 20px;
  display: flex;
  justify-content: Center;
  background-color: lightyellow;
  width: 800px;
  height: 80px;
  margin: 0px;
  padding: 20px;
`;

const CancelBtn = styled.button`
  margin: 10px;
  border-radius: 15px;
  border: none;
  width: 90px;
  height: 30px;
  color: #3a3636;
  background-color: lightblue;
  box-shadow: 0px 0px 1px 1px rgba(157, 173, 182, 0.644);
`;

export default Detail;
