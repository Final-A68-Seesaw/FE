import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { __logout } from '../redux/modules/user';

import Mainchat from '../components/Mainchat'
import Header from '../components/Header';
import Footer from '../components/Footer';

import { GoSearch } from 'react-icons/go'
import { BsChevronRight } from 'react-icons/bs'

import Seeso from '../asset/MainSeeso.svg'
import ChatIcon from '../asset/ChatIcon.svg'
import G1 from '../asset/G1.svg'
import G2 from '../asset/G2.svg'
import Y1 from '../asset/Y1.svg'
import Y2 from '../asset/Y2.svg'
import GameCard from '../asset/GameCard.svg'

import { MainApi } from '../api/mainApi';
import isLogin from '../auth/isLogin';
import { history } from '../redux/configStore';

const Main = () => {

  const [showModal, setShowModal] = useState(false)

  const [getRand, setGetRand] = useState([])
  const [getRecent, setGetRecent] = useState([])
  const [getBest, setGetBest] = useState([])

  const [selectBest, setSelectBest] = useState()
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();

  const RecentScrollRef = useRef()

  const openModal = () => {
    setShowModal(true);
  }

  const clickLogout = () => {
    dispatch(__logout());
  };

  const onBestWord = (data) => {
    setSelectBest(data)
  }
  
  const mainSearch = (e) => {
    if (e.key === "Enter") {
      history.push(`/searchresult/${searchInput}`);
      setSearchInput("");
    }
  };

  console.log('env', process.env.REACT_APP_CLIENT_KEY)

  React.useEffect(() => {
    MainApi.mainGetRecent().then((res) => {
      console.log(res.data);
      setGetRecent(res.data)
    })
    MainApi.mainGetRand().then((res) => setGetRand(res.data))
    MainApi.mainGetBest().then((res) => {
      setGetBest(res.data)
      setSelectBest(res.data[0])
    })
  }, [])

  return (
    <MainWrap>
      <Header />
      <MainTop>
        <div style={{ display: 'flex', position: 'absolute', width: '286px', height: '176.97px', gap: '14.4px', left: '7%', top: '60%', }}>
          <G1 />
          <G2 />
        </div>
        <Y1 style={{ position: 'absolute', width: '140.42px', height: '175.92px', left: '85%', top: '36%', }} />
        <Y2 style={{ position: 'absolute', width: '140.98px', height: '192.8px', left: '70%', top: '90%', }} />
        <MainText>우리들의 플레이그라운드</MainText>

        <Seeso style={{ margin: '32px 0 91px 0' }} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MainSearch
            placeholder='궁금한 것을 검색해보세요'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={mainSearch}
          />
          <GoSearch style={{ width: '24px', height: '24px', color: '#9A9999', margin: '0 0 0 -40px' }} />
        </div>
      </MainTop>

      {/* <div></div> */}

      <BestWordWrap>
        <BestWordTitle>💥 최근 인기 신조어를 배워보세요</BestWordTitle>

        <div style={{ display: 'flex', margin: 'auto', maxWidth: '1423px', justifyContent: 'space-between' }}>
          <img src={selectBest && (selectBest.postImages || selectBest.postImage)} style={{ width: '529px', maxHeight: '341px', position: 'absolute', borderRadius: '12px' }} />
          <BestSelect onClick={() => history.push(`/dictionary/detail/${selectBest.postId}`)}>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}><GenBox>{selectBest && selectBest.generation}</GenBox></div>
            <div>
              <BestSelectTitle>{selectBest && selectBest.title}</BestSelectTitle>
              <BestSelectContent>{selectBest && selectBest.contents}</BestSelectContent>
            </div>
          </BestSelect>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12.88px', width: '903px', justifyContent: 'right' }}>
            {getRecent && getRecent.map((v, i) => {
              return <BestWords key={i} onClick={() => onBestWord(v)}>{v.title}</BestWords>
            })}
          </div>

        </div>
      </BestWordWrap>

      <TestWrap>

        <TestTitle>✍️ 닉네임 님의 능력을 테스트해보세요</TestTitle>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', gap: '10px' }}>

          {getRand && getRand.map((v, i) => {
            return <TestCard key={i} >
              {/* <img src={v.postImage} style={{ width: '682px', height: '435px', position: 'absolute', borderRadius: '11.1667px' }} /> */}
              <div style={{ width: '682px', height: '435px', position: 'absolute', borderRadius: '11.1667px' }} >
                <GameCard style={{ width: '682px', height: '435px' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', justifyContents: 'center', position: 'absolute', width: '682px', height: '435px', padding: '18px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '26px' }}>
                  <GenBox>{v.generation}</GenBox>
                  <TestAnswer>
                    <TestAnswerText>테스트 하러 가기</TestAnswerText>
                    {/* <div style={{ width: '20px', height: '20px', background: '#C4C4C4', }}></div> */}
                    <BsChevronRight style={{ color: '#FAFAFA' }} />
                  </TestAnswer>
                </div>
                <TestCellBox>
                  {Array(v.title.length).fill().map((v, i) => <TestCell key={i} />)}
                </TestCellBox>
                <TestDescBox>
                  <TestDesc>{v.contents}</TestDesc>
                </TestDescBox>
              </div>
            </TestCard>
          })}
        </div>
      </TestWrap>

      <RecentWrap>
        <RecentTitle>👍 최신 등록 신조어를 배워보세요</RecentTitle>
        <RecentCards>

          {getBest && getBest.map((v, i) => {
            return <RecentCard key={i} onClick={() => history.push(`/dictionary/detail/${v.postId}`)}>
              <GenBox>{v.generation}</GenBox>
              <img src={v.postImages} style={{ borderRadius: '10px', margin: '10px 0', height: '168px' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <RecentCardTitle>{v.title}</RecentCardTitle>
                <RecentCardDesc>{v.contents}</RecentCardDesc>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <RecentCardView>조회수 {v.views}</RecentCardView>
                  <RecentCardScrap>스크랩 {v.scrapCount}</RecentCardScrap>
                </div>
              </div>
            </RecentCard>
          })}

          <div ref={RecentScrollRef}></div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <RightBtn>
              <BsChevronRight onClick={() => {
                RecentScrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'end' })
              }} style={{ fontSize: '30px' }} />
            </RightBtn>
          </div>

        </RecentCards>
      </RecentWrap>

      <Footer />

      {isLogin() ?
        <ChatContainer>
          <ChatBtn onClick={openModal}><ChatIcon></ChatIcon><p>실시간 토크장</p></ChatBtn>
          {showModal ? <Mainchat open={setShowModal} /> : null}
        </ChatContainer> : null}
    </MainWrap>
  )
}

export default Main

const ChatContainer = styled.div`
  
`

const MainWrap = styled.div`
  /* overflow-x: hidden; */
`

const MainTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  background: #FFC438;;
`

const MainText = styled.p`
  width: 249px;
  height: 35px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 35px;

  color: #222222;
`

const MainSearch = styled.input`
  box-sizing: border-box;

  width: 517.33px;
  height: 49.01px;
  padding: 11px 21px;

  background: #FFFFFF;
  border: 1.04301px solid #D59704;
  border-radius: 5px;

  ::placeholder {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;

    display: flex;
    align-items: center;

    color: #666666;
  }
`

const BestWordWrap = styled.div`
  height: 510px;
  padding: 72px 0;

  background: #8E41FF;
`

const BestWordTitle = styled.p`
  max-width: 1423px;
  height: 32px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  /* identical to box height */

  display: flex;
  align-items: center;
  margin: 0 auto 47px auto;

  color: #FFFFFF;
`

const BestSelect = styled.div`
  min-width: 485px;
  height: 282px;
  z-index: 1;

  background: linear-gradient(180deg, rgba(129, 91, 0, 0.19) 0%, rgba(66, 46, 0, 0.91) 81.25%);
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 20px 40px 24px;

  cursor: pointer;
`

const GenBox = styled.div`
  box-sizing: border-box;
  z-index: 1;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;

  width: 73px;
  height: 29px;

  border: 1.4px solid #FFFFFF;
  border-radius: 74.5027px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  display: flex;
  align-items: center;

  color: #FFFFFF;

  flex: none;
  order: 0;
  flex-grow: 0;
`

const BestSelectTitle = styled.p`
  height: 20px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 20px;

  color: #FFFFFF;
`

const BestSelectContent = styled.p`
  width: 440px;
  height: 52px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  margin: 20px 0 40px 0;
  
  color: #CCCCCC;
`

const BestWords = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;

  width: 157.34px;
  height: 58.06px;

  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  line-height: 28px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  color: #FFFFFF;

  flex: none;
  order: 0;
  flex-grow: 0;

  cursor: pointer;
`

const TestWrap = styled.div`
  max-width: 1423px;
  display: flex;
  flex-direction: column;
  
  margin: 80px auto;
  /* padding: 80px 100px; */
`

const TestTitle = styled.p`
  /* ✍️ 닉네임 님의 능력을 테스트해보세요 */
  width: 360px;
  height: 32px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  /* identical to box height */

  display: flex;
  align-items: center;

  color: #222222;
`

const TestCard = styled.div`
  min-width: 682px;
  height: 435px;

  /* background: linear-gradient(180deg, rgba(18, 0, 44, 0.39) 0%, #39008C 100%); */
  border-radius: 11.1667px;

  cursor: pointer;
`

const TestAnswer = styled.div`
  display: flex;
  align-items: center;

  width: 145px;
  height: 25px;
`

const TestAnswerText = styled.div`
  width: 118px;
  height: 25px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 25px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: right;
  margin: 0 4px;

  color: #FFFFFF;
`

const TestCellBox = styled.div`
  display: flex; 
  /* width: 270px;  */
  height: 61px; 
  margin: 60px auto;
  gap: 10px;
`

const TestCell = styled.div`
  box-sizing: border-box;

  width: 80px;
  height: 80px;

  background: rgba(255, 255, 255, 0.7);
  border: 1.3px solid #FFFFFF;
  border-radius: 5px;
`

const TestDescBox = styled.div`
  max-width: 386px;
  
  margin: 20px auto;
`

const TestDesc = styled.p`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  display: flex;
  align-items: center;
  text-align: center;

  /* word-wrap: break-word; */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  color: #CCCCCC;
`

const RecentWrap = styled.div`
  max-width: 1423px;
  margin: 126px auto 115px auto;

  display: flex;
  flex-direction: column;
`

const RecentTitle = styled.p`
  /* 👍 최신 등록 신조어를 배워보세요 */
  width: 310px;
  height: 32px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  /* identical to box height */

  display: flex;
  align-items: center;
  margin-bottom: 24px;

  color: #222222;
`

const RecentCards = styled.div`
  display: flex;
  gap: 18px;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`

const RecentCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-width: 223px;
  height: 320px;
  padding: 12px 17px 41px 18px;

  background: linear-gradient(180deg, rgba(18, 0, 44, 0.39) 41.15%, #1B0042 80.21%);
  border-radius: 10px;

  cursor: pointer;
`

const RecentCardTitle = styled.p`
  /* width: 188px; */
  height: 20px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 20px;
  
  color: #FFFFFF;
`

const RecentCardDesc = styled.p`
  /* width: 188px; */
  height: 40px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  margin: 12px 0 16px 0;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  
  color: #AAAAAA;
`

const RecentCardView = styled.p`
  width: 82px;
  height: 14px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  
  color: #555555;
`

const RecentCardScrap = styled.p`
  width: 82px;
  height: 14px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;

  color: #555555;
`

const RightBtn = styled.div`
  position: absolute;
  width: 70px;
  height: 70px;
  right: 3%;
  display: flex;
  align-items: center;
  justify-content: center;

  background: #FFFFFF;
  border-radius: 100px;
  
  box-shadow: 0px 4px 8px -4px rgba(22, 34, 51, 0.08);
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25)) drop-shadow(0px 16px 24px rgba(22, 34, 51, 0.08));
`


const ChatBtn = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  gap: 6px;

  position: fixed;
  width: 161px;
  height: 58px;
  right: 30px;
  bottom: 30px;

  background: rgba(255, 255, 255, 0.9);
  
  border: 1.4px solid #EEEEEE;
  backdrop-filter: blur(60px);

  border-radius: 259.276px;

  :hover {
    cursor: pointer;
  }

  div {
    background: #222222;
  }

  p {
    width: 87px;
    height: 14px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 14px;
    /* identical to box height, or 93% */

    display: flex;
    align-items: center;

    color: #222222;


    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
  }
`