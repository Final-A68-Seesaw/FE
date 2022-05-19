import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  __loadDictDetail,
  __addDictComment,
  __deleteDictDetail,
  __scrapDict,
} from "../redux/modules/dictionary";
import { history } from "../redux/configStore";

//element & component
import Header from "../components/Header";
import {
  bold12,
  bold15,
  bold17,
  bold30,
  med14,
  med15,
} from "../themes/textStyle";
import { CommentTextarea } from "../elements/Textarea";
import Character from "../components/Character";
import Footer from "../components/Footer";
import CommentCard from "../components/CommentCard.jsx";

//style
import styled from "styled-components";
import Line from "../asset/Dictionary_detail_line.svg";
import { BsSuitHeart } from "react-icons/bs";
import { BsSuitHeartFill } from "react-icons/bs";

const DictDetail = (props) => {
  const {reset, getValues, register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });

  const params = useParams();
  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.dictionary.detailData);
  const [pageNum, setPageNum] = useState(1);

  //디테일 데이터 로드
  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(__loadDictDetail(params.cardTitleId, pageNum));
  }, []);

  //스크랩 기능
  const [scrap, setScrap] = useState(false);
  const ChangeScrap = () => {
    setScrap(!scrap);
    dispatch(__scrapDict(!scrap, params.cardTitleId));
  };

  // //디테일 삭제 전송
  // const deleteDetail = (data) => {
  //   dispatch(__deleteDictDetail(data));
  // };

  //이미지 더보기 버튼 애니메이션
  const RecentScrollRef = useRef();

  //인풋 글자수 count
  const [inputCount, setInputCount] = useState("0");
  const onInputChange = (e) => {
    setInputCount(e.target.value.length);
  };

  const pageChange = (page) => {
    setPageNum(page);
    dispatch(__loadDictDetail(params.cardTitleId, page));
  };

  //댓글 데이터 전송
  const onSubmit = (data) => {
    console.log(data);
    dispatch(__addDictComment(params.cardTitleId, data, dataList.nickname));
  };
  //댓글 데이터 전송후 댓글 인풋 리셋
  const onReset = () => {
    reset({
      ...getValues(),
      comment: "",
    });
  };
console.log(dataList && dataList)
  return (
    <>
      <Header />
      <Container>
        <GenerationBox>{dataList && dataList.generation} </GenerationBox>
        <BetweenBox>
          <TitleBox>{dataList && dataList.title}</TitleBox>
          <EditDeleteBox>
            <div
              style={{ margin: "0 0.25rem", cursor: "pointer" }}
              onClick={() => {
                history.push(`/dictionary/detail/${params.cardTitleId}/edit`);
              }}
            >
              수정
            </div>{" "}
            {/*  |
              <div
                style={{ margin: "0 0.25rem", cursor: "pointer" }}
                onClick={() => {deleteDetail(params.cardTitleId)}}
                >
                  삭제
                  </div> */}
            | 신고
          </EditDeleteBox>
        </BetweenBox>
        <UserInfoBox>
          <div>
            <Character char={dataList && dataList.profileImages} />
            <CharacterAlign>
              <UserName>{dataList && dataList.lastNickname}</UserName>
              <UpdateBox>{dataList && dataList.postUpdateTime} </UpdateBox>
              <WordInfo>
                | 조회수 {dataList && dataList.views} | 스크랩{" "}
                {dataList && dataList.scrapCount}
              </WordInfo>
            </CharacterAlign>
          </div>
          <ScrapBtn onClick={ChangeScrap}>
            {dataList && dataList.scrapStatus === false ? (
              <BsSuitHeart style={{ cursor: "pointer", width: "1rem" }} />
            ) : (
              <BsSuitHeartFill style={{ cursor: "pointer", width: "1rem" }} />
            )}
            <ScrapText>스크랩</ScrapText>
          </ScrapBtn>
        </UserInfoBox>

        <ContentsBox>{dataList && dataList.contents} </ContentsBox>

        <>
          {dataList && dataList.postImages.length !== 0 ? (
            <>
              <ImageArea>
                <Images>
                  {dataList.postImages.map((v, i) => {
                    return (
                      <div key={i}>
                        <Image src={v} />
                      </div>
                    );
                  })}
                  <div ref={RecentScrollRef}></div>
                  {/* <BsChevronRight
                    onClick={() => {
                      RecentScrollRef.current.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "end",
                      });
                    }}
                    style={{
                      fontSize: "30px",
                      cursor: "pointer",
                      position: "absolute",
                      top: "700px",
                      right: "30%",
                    }}
                  /> */}
                </Images>
              </ImageArea>
              <HrLine />
            </>
          ) : null}
        </>

        {dataList && dataList.videoUrl === "" || "null" ? null : (
          <>
            <LabelTag>
              참고 영상 URL |
              <VideoUrlTag href={dataList && dataList.videoUrl}>
                {dataList && dataList.videoUrl}
              </VideoUrlTag>
            </LabelTag>

            <hr style={{ border: "1px solid var(--graydf)" }} />
          </>
        )}

        {dataList && dataList.tagNames.length !== 0 ? (
          <>
            <LabelTag>태그</LabelTag>
            <TagArea>
              <Tags>
                {dataList.tagNames.map((v, i) => {
                  return (
                    <div key={i}>
                      <Tag> # {v}</Tag>
                    </div>
                  );
                })}
              </Tags>
            </TagArea>
            <hr style={{ border: "1px solid var(--graydf)" }} />
          </>
        ) : null}

        <CommentBox>
          <CommentBoldText>
            신조어의 예문에 대한 댓글을 달아주세요!
          </CommentBoldText>
          <CommentText>
            비방글 혹은 내용과 상관없는 댓글을 작성할 시 삭제될 수 있음을 미리
            알려드립니다.
          </CommentText>
        </CommentBox>

        <WordUseExample>
          <p>신조어 사용 예문 {dataList && dataList.commentCount}</p>
        </WordUseExample>
        <Line />
        <CommentInputBox>
          <CommentCharBox>
            <Character char={dataList && dataList.profileImages} />
          </CommentCharBox>
          <CommentUserName>{dataList && dataList.nickname}</CommentUserName>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CommentTextarea
              ref={register}
              name="comment"
              type="text"
              onChange={onInputChange}
              maxLength="500"
              placeholder="주제와 무관한 댓글, 홍보, 욕설, 일방적인 비난이나 악플 등은 삭제될 수 있습니다."
            />
            <InputCountBox>{inputCount}/500</InputCountBox>
            <div style={{ display: "flex", justifyContent: "top" }}>
              <CommentHr width="90%" />
              <CommentSubmitBtn type="submit" onClick={onReset}>등록</CommentSubmitBtn>
            </div>
          </form>
        </CommentInputBox>

        {dataList &&
          dataList.postComments.map((v, i) => {
            return (
              <div key={i}>
                <CommentCard
                  postId={params.cardTitleId}
                  pageNum={pageNum}
                  data={v}
                  pfImg={dataList.profileImages}
                  nickname={dataList.nickname}
                />
              </div>
            );
          })}

        <FooterHrLine />

        <div
          style={{
            width: "309px",
            height: "32px",
            margin: "45px auto",
            display: "flex",
            gap: "17.75px",
          }}
        >
          {dataList &&
            Array(Math.ceil(dataList.commentCount / 4))
              .fill()
              .map((v, i) => {
                if (pageNum === i + 1)
                  return (
                    <SelectNumberBox key={i} onClick={() => pageChange(i + 1)}>
                      {i + 1}
                    </SelectNumberBox>
                  );
                else
                  return (
                    <NumberBox key={i} onClick={() => pageChange(i + 1)}>
                      {i + 1}
                    </NumberBox>
                  );
              })}
        </div>
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  margin: auto;
  max-width: 46rem;
  padding-top: 4rem;
`;

const GenerationBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 2rem;
  background-color: var(--black);
  border-radius: 40px;
  color: white;
  ${bold12}
  margin-top: 5rem;
  margin-bottom: 0.5rem;
`;
const CharacterAlign = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
`;
const BetweenBox = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
`;
const TitleBox = styled.div`
  ${bold30}
  margin-top: 0.5rem;
`;
const EditDeleteBox = styled.div`
  color: var(--gray99);
  ${med14}
  display: flex;
`;
const UserInfoBox = styled.div`
  display: flex;
  margin: 1rem 0;
  justify-content: space-between;
  align-items: center;
`;
const ScrapBtn = styled.div`
  width: 5.5rem;
  height: 2rem;
  border: 1.5px solid var(--purple);
  justify-content: center;
  display: flex;
  align-items: center;
  color: var(--purple);
  border-radius: 3px;
`;
const ScrapText = styled.div`
  margin-left: 0.3rem;
  ${bold15}
`;
const UserName = styled.div`
  ${bold15}
  margin-left: 2.5rem;
`;
const UpdateBox = styled.div`
  margin-left: 0.5rem;
`;
const WordInfo = styled.div`
  color: var(--gray99);
  margin: 0 0.5rem 0 0.5rem;
  ${med14}
`;

const ContentsBox = styled.div`
  margin: 1rem 0 0 0;
  width: 95%;
  height: 14rem;
  border: 1.5px solid var(--graydf);
  border-radius: 3px;
  padding: 1rem;
`;

const HrLine = styled.hr`
  border: 1px solid var(--graydf);
`;

const ImageArea = styled.div`
  margin: 2rem 0 1rem 0;

  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Images = styled.div`
  display: flex;
  flex-direction: row;
`;
const Image = styled.img`
  width: 12rem;
  height: 12rem;
  border-radius: 7px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 0.5rem 0 0;
`;
const LabelTag = styled.div`
  ${med14}
  color: var(--gray66);
  margin: 1rem 0 1rem 0;
`;

const VideoUrlTag = styled.a`
  ${med14}
  margin-left : 8px;
  text-decoration-line: none;
`;

const TagArea = styled.div`
  margin: 0 0 1rem 0;
  justify-content: flex-start;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
`;

const Tag = styled.div`
  ${med15}
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px 0 0;
  padding: 7px;
  background-color: var(--white);
  border-radius: 22px;
  border: 1.5px solid var(--gray99);
  color: var(--gray99);
`;

const CommentBox = styled.div`
  width: 44rem;
  background-color: #f5f7ff;
  border-radius: 3px;
  padding: 1rem;
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 3rem;
`;
const CommentBoldText = styled.div`
  ${bold17}
  color: var(--black);
  margin-bottom: 1rem;
`;
const CommentText = styled.div`
  ${med14}
  color: var(--red);
`;
const WordUseExample = styled.div`
  ${bold17}
  color:var(--purple);
  margin: 0 0 0 8px;
`;

const CommentInputBox = styled.div`
  width: 100%;
  color: var(--gray99);
  border: 0.75px solid var(--gray99);
  border-radius: 3px;
  margin: 2rem 0 2rem 0;
`;
const CommentCharBox = styled.div`
  margin: 0.7rem 0 0 1rem;
`;
const CommentUserName = styled.div`
  ${bold15}
  color: black;
  margin: 1.2rem 0 0 3.5rem;
`;
const CommentSubmitBtn = styled.button`
  background-color: var(--red);
  color: var(--white);
  width: 5rem;
  height: 3rem;
  display: right;
  border: transparent;
  border-radius: 3px;
  ${med15}
`;
const CommentHr = styled.div`
  border: 1px solid var(--graydf);
  width: 43rem;
`;

const InputCountBox = styled.div`
  display: flex;
  justify-content: flex-end;
  color: var(--gray99);
  ${med14}
  margin: 0 1rem 1rem 0;
`;
const FooterHrLine = styled.hr`
  border: 1px solid var(--graydf);
  margin: 2rem 0 0 0;
`;

const NumberBox = styled.div`
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 34px;
  height: 32px;

  background: #ffffff;

  /* border: 0.75px solid #C1C1C1; */
  border-radius: 1.5px;

  cursor: pointer;
`;

const SelectNumberBox = styled.div`
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 34px;
  height: 32px;

  background: #ffffff;

  border: 0.75px solid #c1c1c1;
  border-radius: 1.5px;

  cursor: pointer;
`;

export default DictDetail;
