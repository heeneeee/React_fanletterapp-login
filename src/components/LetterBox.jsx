import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const StBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  border-radius: 30px;
  position: absolute;
  top: 190px;
  left: 50%;
  transform: translate(-50%, 0%);
`;

const List = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
`;

const StletterBox = styled.div`
  text-align: center;
  margin-top: 30px;
  flex-direction: column;
`;
const StLetterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StLetter = styled.div`
  display: flex;
  align-items: center;
  background-color: lightgray;
  border-radius: 15px;
  width: 400px;
  padding: 30px;
  margin-top: 30px;
  height: 150px;
`;

const CreatedAt = styled.p`
  margin: 10px;
`;

const Avatar = styled.p``;

const NicknameAndContents = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.p`
  margin: 10px;
`;

const Contents = styled.p`
  margin: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 300px;
`;
const LetterBox = ({ letter, kakao, kakaoFriends, nameBtn }) => {
  const navigate = useNavigate();
  return (
    <div>
      <StBody>
        <StletterBox>
          {letter
            .filter((item) => {
              return item.writedTo === kakao;
            })
            .map((item) => {
              return (
                <div key={item.id}>
                  <div
                    onClick={() => {
                      navigate(`/detail/${item.id}`);
                    }}
                  >
                    <StLetterContainer>
                      <StLetter>
                        <Avatar>
                          <img
                            src={item.avatar}
                            alt="img"
                            style={{ width: "100px", borderRadius: "50%" }}
                          />
                        </Avatar>
                        <NicknameAndContents>
                          <CreatedAt>
                            {item.createdAt.replace("T", " ").substring(0, 19)}
                          </CreatedAt>
                          <Nickname>{item.nickname}</Nickname>
                          <Contents>{item.contents}</Contents>
                        </NicknameAndContents>
                      </StLetter>
                    </StLetterContainer>
                  </div>
                </div>
              );
            })}
        </StletterBox>

        <StBtn>
          <List>
            {/* data 배열에 writedTo랑 kakaoFriends 배열의 값이랑 비교 */}
            {kakaoFriends.map((data) => {
              return (
                // {data} --> children 으로 전달해줌
                // nameBtn 으로 전달해줌
                // 설명듣기 ...
                // <Button></Button> --> 이놈은 함수임!! 그래서 바로 옆
                // nameBtn 을 인자값으로 받는 거임 실행시킬 함수 자체를 넘겨준다
                <Button key={data} nameBtn={() => nameBtn(data)}>
                  {data}
                </Button>
              );
            })}
          </List>
        </StBtn>
      </StBody>
    </div>
  );
};

export default LetterBox;
