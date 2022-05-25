import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  actionCreators as TroubleActions,
  __addTrouComment,
  __deleteTrouDetail,
  clearDetail,
} from "../redux/modules/touble";
import { history } from "../redux/configStore";

//element & component
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  bold14,
  bold15,
  bold17,
  bold30,
  med14,
  med15,
} from "../themes/textStyle";
import Character from "../components/Character";
import { CommentTextarea } from "../elements/Textarea";
import CommentCard from "../components/CommentCard.jsx";

//style
import styled from "styled-components";

const TroubleDetail = (props) => {
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const params = useParams();
  const dispatch = useDispatch();
  const DataList = useSelector((state) => state.trouble.detail);
  const myInfo = useSelector((state) => state.mypage.list);

  useEffect(() => {
    dispatch(TroubleActions.getTrouDetailDB(params.id, pageNum));

    return () => {
      dispatch(clearDetail());
    };
  }, []);

  //인풋 글자수 count
  const [inputCount, setInputCount] = useState("0");
  const onInputChange = (e) => {
    setInputCount(e.target.value.length);
  };

  // //디테일 삭제 전송
  const deleteDetail = (data) => {
    dispatch(__deleteTrouDetail(data));
  };

  //댓글 데이터 전송
  const onSubmit = (data) => {
    console.log(data);
    dispatch(__addTrouComment(params.id, data, DataList.nickname));
    alert("댓글이 등록됐습니다!")
  };

  //pagenation
  const [pageNum, setPageNum] = useState(1);
  const pageChange = (page) => {
    setPageNum(page);
    dispatch(TroubleActions.getTrouDetailDB(params.id, page));
  };


  return (
    <>
      <Header />
      <Container>
        <CenterBox>
          <GenerationBox>
            {DataList && DataList.question}가 물어봅니다 {">"}{" "}
            {DataList && DataList.answer}가 대답해주세요
          </GenerationBox>
        </CenterBox>
        <TitleBox>{DataList && DataList.title} </TitleBox>

        <UserInfoBox>
          <WriterInfo>
            <Writer> 작성자: </Writer>
            <OutCharAlign>
              <Character char={DataList && DataList.profileImages} />
              <CharacterAlign>
                <UserName>{DataList && DataList.writer}</UserName>
                <WordInfo>
                  | {DataList && DataList.troubleTime} | 조회수{" "}
                  {DataList && DataList.views}
                </WordInfo>
              </CharacterAlign>
            </OutCharAlign>
          </WriterInfo>
          <EditDeleteBox>
            <div
              style={{ margin: "0 0.25rem", cursor: "pointer" }}
              onClick={() => {
                history.push(`/trouble/detail/${params.id}/edit`);
              }}
            >
              수정
            </div>{" "}
            |
            <div
              style={{ margin: "0 0.25rem", cursor: "pointer" }}
              onClick={() => {
                deleteDetail(params.id);
              }}
            >
              삭제
            </div>
            | 신고
          </EditDeleteBox>
        </UserInfoBox>

        <ContentsBox>{DataList && DataList.contents} </ContentsBox>

        <>
          {DataList && DataList.troubleImages.length !== 0 ? (
            <>
              <ImageArea>
                <Images>
                  {DataList.troubleImages.map((v, i) => {
                    return (
                      <div key={i}>
                        <Image src={v} />
                      </div>
                    );
                  })}
                  {/* <div ref={RecentScrollRef}></div> 
                   <BsChevronRight
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
                  />  */}
                </Images>
              </ImageArea>
              <HrLine />
            </>
          ) : null}

          {DataList && DataList.tagNames.length !== 0 ? (
            <>
              <LabelTag>태그</LabelTag>
              <TagArea>
                <Tags>
                  {DataList.tagNames.map((v, i) => {
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
        </>
        <CommentBox>
          <CommentBoldText>고민에 대한 해결책을 적어주세요!</CommentBoldText>
          <CommentText>
            비방글 혹은 내용과 상관없는 댓글을 작성할 시 삭제될 수 있음을 미리
            알려드립니다.
          </CommentText>
        </CommentBox>
        <HrLine />
        <CommentInputBox>
          <CommentCharBox>
        <Character char={myInfo?.profileImages} />
        </CommentCharBox>
          <CommentUserName>{DataList && DataList.nickname}</CommentUserName>
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
              <CommentSubmitBtn type="submit">등록</CommentSubmitBtn>
            </div>
          </form>
        </CommentInputBox>

        {DataList &&
          DataList.troubleComments.map((v, i) => {
            return (
              <div key={i}>
                <CommentCard
                  postId={params.id}
                  pageNum={pageNum}
                  data={v}
                  pfImg={v.profileImages}
                  nickname={DataList.nickname}
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
          {DataList &&
            Array(Math.ceil(DataList.commentCount / 4))
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

export default TroubleDetail;

const Container = styled.div`
  margin: auto;
  width: 46rem;
  padding-top: 4rem;
`;
const CenterBox = styled.div`
  justify-content: center;
  display: flex;
  text-align: center;
`;
const GenerationBox = styled.div`
  width: 18rem;
  align-items: center;
  padding: 7px;
  background-color: var(--white);
  border-radius: 22px;
  border: 2px solid var(--purple);
  color: var(--purple);
  ${bold14}
  margin-top: 5rem;
  margin-bottom: 1.5rem;
`;
const TitleBox = styled.div`
  ${bold30}
  color: var(--black);
  text-align: center;
`;

const EditDeleteBox = styled.div`
  color: var(--gray99);
  ${med14}
  display: flex;
`;
const UserInfoBox = styled.div`
  display: flex;
  margin: 3rem 0;
  justify-content: space-between;
  align-items: center;
`;
const OutCharAlign = styled.div`
  margin-left: 0.5rem;
`;
const CharacterAlign = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
`;
const WriterInfo = styled.div`
  display: flex;
`;
const Writer = styled.div`
  ${med15}
  margin-top: 0.5rem;
`;
const UserName = styled.div`
  ${bold15}
  margin-left: 2.5rem;
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
const HrLine = styled.hr`
  border: 1px solid var(--graydf);
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
const LabelTag = styled.div`
  ${med14}
  color: var(--gray66);
  margin: 1rem 0 1rem 0;
`;
const CommentInputBox = styled.div`
  width: 100%;
  color: var(--gray99);
  border: 0.75px solid var(--gray99);
  border-radius: 3px;
  margin: 2rem 0 2rem 0;
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
const CommentCharBox = styled.div`
  margin: 0.7rem 0 0 1rem;

`;
const CommentUserName = styled.div`
  ${bold15}
  color: black;
  margin: 1.2rem 0 0.7rem 3.5rem;
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
