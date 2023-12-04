import React, { useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { updateProfile } from "redux/modules/authSlice";

/**
 * 1. 수정하기 버튼을 눌러서 입력할 수 있게 변경한다.
 * 2. 프로필과 nickname은 변경할 때마다 useState의 state를 변경한다.
 * 3. 수정완료 버튼을 누른다.
 *    => 튜터님의 서버로 데이터를 보내는 것
 *    => useState의 state(프로필과 nickname)를 DB로 보낸다.
 * 4. 성공한 놈 (프로필과 nickname)의 avatar, nickname을 redux의 state로 넣어준다. (dispatch)
 */
export default function Profile() {
  const [isProfile, setProfile] = useState(false);
  const dispatch = useDispatch();
  // 얘가 보여주는 데이터
  const { userId, nickname, avatar } = useSelector((state) => state.auth);

  const fileInput = useRef(null);

  const [userProfileNickname, setUserProfileNickname] = useState("희원");
  const { changedImg, setChangedImg } = useState(
    "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMyAg/MDAxNjA0MjI5NDA4NDMy.5zGHwAo_UtaQFX8Hd7zrDi1WiV5KrDsPHcRzu3e6b8Eg.IlkR3QN__c3o7Qe9z5_xYyCyr2vcx7L_W1arNFgwAJwg.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%8C%8C%EC%8A%A4%ED%85%94.jpg?type=w800"
  );

  const [userImage, setUserImage] = useState(
    "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMyAg/MDAxNjA0MjI5NDA4NDMy.5zGHwAo_UtaQFX8Hd7zrDi1WiV5KrDsPHcRzu3e6b8Eg.IlkR3QN__c3o7Qe9z5_xYyCyr2vcx7L_W1arNFgwAJwg.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%8C%8C%EC%8A%A4%ED%85%94.jpg?type=w800"
  );
  const accessToken = localStorage.getItem("accessToken");

  const { isLoading, letters, isError } = useSelector(
    (state) => state.fanLetters
  );

  useEffect(() => {
    // 토큰을 이용하여 사용자 정보 가져오기
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://moneyfulpublicpolicy.co.kr/user",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("response.data", response.data);
        const userData = response.data;
        setUserProfileNickname(userData.nickname);
        setChangedImg(userData.avatar); // 이미지 주소를 가져오거나, 필요한 정보로 수정
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [accessToken]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error...</p>;
  }

  const toggleisChangeBtn = () => {
    setProfile(!isProfile);
  };

  const onChangeNickname = (e) => {
    setUserProfileNickname(e.target.value);
  };

  const onEditClickBtn = async () => {
    const formData = new FormData();
    formData.append("avatar", changedImg);
    formData.append("nickname", userProfileNickname);

    const res = axios.patch(
      "https://moneyfulpublicpolicy.co.kr/profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const updateUserData = res.data;
    console.log("res", res);
    dispatch(
      updateProfile({
        nickname: updateUserData.nickname,
        avatar: updateUserData.avatar,
      })
    );
  };

  const onImageChangeHandler = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    setUserImage(imageUrl);

    const reader = new FileReader(); //화면에 프로필 사진 표시

    reader.onload = () => {
      if (reader.readyState === 2) {
        setUserImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div>
      <StProfileContainer>
        {!isProfile ? (
          <StProfileBox>
            <UserImage src={userImage}></UserImage>
            <div style={{ marginTop: "70px" }}>아이디 : {userId}</div>
            <div style={{ marginTop: "10px" }}>
              닉네임 :{userProfileNickname}
            </div>

            <br />
            <EditButton onClick={toggleisChangeBtn}>수정하기</EditButton>
          </StProfileBox>
        ) : (
          <StProfileBox>
            <UserImage src={userImage}></UserImage>
            <br />
            <UploadBtn
              style={{
                borderRadius: "15px",
                width: "80px",
                height: "30px",
                border: "1px",
              }}
              onClick={() => {
                fileInput.current.click();
              }}
            >
              upload
            </UploadBtn>
            <div style={{ marginTop: "40px" }}>아이디 : {userId}</div>
            <div style={{ marginTop: "10px" }}>
              닉네임 :
              <ChangeInputNickname
                type="text"
                placeholder="최대 10글자입니다"
                autoFocus
                onChange={onChangeNickname}
                value={userProfileNickname}
              />
            </div>

            <br />

            <EditButton onClick={onEditClickBtn}>수정완료</EditButton>
          </StProfileBox>
        )}

        <input
          type="file"
          style={{ display: "none" }}
          accept="image/jpg,image/png,image/jpeg"
          name="userProfileImage"
          onChange={onImageChangeHandler}
          ref={fileInput}
        />
      </StProfileContainer>
    </div>
  );
}

const StProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-bottom: 50px;
  margin-top: 100px;
`;

const StProfileBox = styled.div`
  justify-content: center;
  width: 400px;
  height: 500px;
  background-color: lightgray;
  margin: 0px;

  text-align: center;
  justify-content: center;

  border-radius: 50px;
`;

const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 80px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.2);
  }
`;

const UserImageEditBtn = styled.button`
  /* margin-top: 50px; */
`;

const UploadBtn = styled.button`
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.09);
  }
`;
const EditButton = styled.button`
  padding: 10px;
  width: 300px;
  border-radius: 15px;
  border: 15px;
  margin-top: 30px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.09);
  }
`;

const ChangeInputNickname = styled.input`
  width: 150px;
  height: 25px;
  border-radius: 15px;
  margin-left: 10px;
  border: 1px;
  padding-left: 10px;
`;
