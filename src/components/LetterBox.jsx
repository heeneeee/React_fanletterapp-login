import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { __getLetters } from "redux/modules/fanLetters";
const LetterBox = ({ kakao, kakaoFriends, nameBtn }) => {
  const navigate = useNavigate();
  const { isLoading, letters, isError } = useSelector(
    (state) => state.fanLetters
  );

  if (isLoading) {
    // 로딩 중일 경우 로딩 상태 표시 또는 다른 처리
    return <p>Loading...</p>;
  }

  if (isError) {
    // 로딩 중일 경우 로딩 상태 표시 또는 다른 처리
    return <p>에러...</p>;
  }

  console.log("letters", letters);

  return (
    <div>
      <StBody>
        <StletterBox>
          {letters
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
            {kakaoFriends.map((data) => {
              return (
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
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.09);
  }
`;

const StLetter = styled.div`
  display: flex;
  align-items: center;
  background-color: eef5ff;
  border-radius: 15px;
  width: 400px;
  padding: 30px;
  margin-top: 30px;
  height: 150px;
  border: 1px solid lightgray;
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
