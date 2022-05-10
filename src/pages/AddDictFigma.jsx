import React from 'react'
import SVGInline from 'react-svg-inline'

export default function  () {
  return (
    <div className=''>
      <span className=''>
        상단바
      </span>
      <span className=''>
        회원님이 알고 있는 새로운 신조어를 등재해주세요
      </span>
      <ScreenTitle_1 />
      <div className='Group351'>
        <div className='Rectangle369' />
        <div className='Group281'>
          <span className=''>
            신조어는 새로 만든 낱말을 의미하며 신조어 또는 신어는 새로 만들거나 생겨난 말 또는 새로 귀화한 외래어를 가리킵니다. ‘신조어 사전’에서는 현재 새로 만들어진 말 뿐만 아니라 과거 유행했던 신조어를 모두 포함합니다.
          </span>
          <div className='Rectangle374' />
          <div className='Group280'>
            <span className=''>
              어떤 것이 신조어인가요?
            </span>
            <Information />
          </div>
        </div>
      </div>
      <div className='Group334'>
        <div className='Rectangle382' />
        <div className='Group297'>
          <span className=''>
            등재할 신조어 
          </span>
          <div className='Group293'>
            <div className='Rectangle120' />
            <span className=''>
              단어를 입력해주세요
            </span>
            <div className='Rectangle120' />
            <span className=''>
              중복 확인
            </span>
            <span className='050'>
              0/50
            </span>
          </div>
        </div>
        <div className='Group288'>
          <div className='Rectangle377' />
          <div className='Rectangle378' />
          <div className='Rectangle370' />
          <span className=''>
            단어를 설명해줄 수 있는 내용을 적어주세요.

*등록시 유의할 점
- 형식은 자유롭게 작성하되, 누구나 알아볼 수 있도록 정리해주세요.
- 사전에 등록되는 것인 만큼 신중하게 내용을 작성해주세요.
- 최대한 정확한 내용을 담도록 노력해주세요.
          </span>
        </div>
        <div className='Group296'>
          <div className='Group291'>
            <span className=''>
              파일 첨부
            </span>
            <span className='0100MB'>
              이미지 제한 (0/10) / 0MB
            </span>
          </div>
          <div className='Group292'>
            <div className='Rectangle379' />
            <div className='Group285'>
              <div className='Group284'>
                <span className=''>
                  원하는 이미지를 이곳에다 끌어다 놓으면 바로 사진을 올릴 수 있어요.
                </span>
                <div className='Group283'>
                  <span className=''>
                    더욱 빠르게 사진 올리기
                  </span>
                  <div className='Group282'>
                    <div className='Rectangle380' />
                    <div className='Rectangle381' />
                  </div>
                </div>
              </div>
              <Button_Plus />
            </div>
          </div>
        </div>
        <div className='Group295'>
          <span className=''>
            유튜브 링크 첨부
          </span>
          <div className='Group290'>
            <div className='Rectangle380' />
            <span className='URL'>
              URL을 등록해주세요
            </span>
          </div>
        </div>
        <span className=''>
          태그
        </span>
        <div className='Group290'>
          <div className='Rectangle380' />
          <span className=''>
            #태그를 입력해주세요
          </span>
        </div>
        <div className='Group294'>
          <div className='Rectangle121' />
          <span className=''>
            신조어 유행 시작 연도
          </span>
          <span className=''>
            연도 선택
          </span>
          <SVGInline svg={'<svg/>'} />
        </div>
        <div className='Group303'>
          <Button_1 />
          <span className=''>
            글 작성시 본인에게 책임이 부여될 수 있음을 인지하고 동의합니다.
          </span>
        </div>
        <span className='010'>
          0/10
        </span>
      </div>
      <Group277 />
      <TopBar_1 />
      <style jsx>{`
        . {
          width: 90rem;
          height: 117.94rem;
          background-color: #ffffff;
        }
        . {
          margin: 43.17rem 1.5rem;
          width: 3.63rem;
          height: 1.88rem;
          color: #aaaaaa;
          font-family: Noto Sans KR, sans-serif;
          font-size: 1.31rem;
          font-weight: 500;
          line-height: 1.54rem;
          text-align-vertical: center;
        }
        . {
          margin: 32.53rem 16.73rem;
          width: 24.94rem;
          height: 1.75rem;
          color: #242424;
          font-family: Noto Sans KR, sans-serif;
          font-size: 1.22rem;
          font-weight: 500;
          line-height: 1.43rem;
          text-align: center;
          text-align-vertical: center;
        }
        .Group351 {
          margin: 21.66rem 21.05rem;
          width: 46.69rem;
          height: 11.11rem;
        }
        .Rectangle369 {
          margin: 46.69rem 11.11rem;
          width: 46.69rem;
          height: 11.11rem;
          background-color: #f5f7ff;
          border-radius: 0.47rem;
        }
        .Group281 {
          margin: 1.64rem 1.87rem;
          width: 43.41rem;
          height: 6.98rem;
        }
        . {
          width: 43.41rem;
          height: 3rem;
          color: #242424;
          font-family: Noto Sans KR, sans-serif;
          font-size: 0.94rem;
          line-height: 1.5rem;
          text-align-vertical: center;
        }
        .Rectangle374 {
          width: 43.41rem;
          height: 0.05rem;
          background-color: #dddddd;
        }
        .Group280 {
          margin: 0rem 0rem;
          width: 13.69rem;
          height: 1.87rem;
        }
        . {
          margin: 2.25rem 0.14rem;
          width: 11.44rem;
          height: 1.63rem;
          color: #222222;
          font-family: Noto Sans KR, sans-serif;
          font-size: 1.13rem;
          font-weight: 700;
          line-height: 1.32rem;
          text-align: center;
          text-align-vertical: center;
        }
        .Group334 {
          margin: 21.66rem 36.37rem;
          width: 46.73rem;
          height: 72.19rem;
        }
        .Rectangle382 {
          width: 46.69rem;
          height: 0.14rem;
          background-color: #edeff2;
        }
        .Group297 {
          margin: 0rem 0rem;
          width: 46.69rem;
          height: 6rem;
        }
        . {
          width: 4.88rem;
          height: 1.25rem;
          color: #666666;
          font-family: Noto Sans KR, sans-serif;
          font-size: 0.84rem;
          font-weight: 500;
          line-height: 0.99rem;
        }
        .Group293 {
          margin: 0rem 1.78rem;
          width: 46.69rem;
          height: 4.22rem;
        }
        .Rectangle120 {
          width: 37.59rem;
          height: 3rem;
          background-color: #ffffff;
          border-color: #dfdfdf;
          border-width: 0.05rem;
          border-radius: 0.19rem;
        }
        . {
          margin: 1.13rem 0.8rem;
          width: 8rem;
          height: 1.38rem;
          color: #c1c1c1;
          font-family: Noto Sans KR, sans-serif;
          font-size: 0.94rem;
          font-weight: 500;
          line-height: 1.1rem;
          text-align-vertical: center;
        }
        .Rectangle120 {
          margin: 46.69rem 0rem;
          width: 8.44rem;
          height: 3rem;
          background-color: #242424;
          border-radius: 0.19rem;
        }
        . {
          margin: 40.64rem 0.8rem;
          width: 3.69rem;
          height: 1.38rem;
          color: #ffffff;
          font-family: Noto Sans KR, sans-serif;
          font-size: 0.94rem;
          font-weight: 500;
          line-height: 1.1rem;
          text-align-vertical: center;
        }
        .050 {
          margin: 35.91rem 3.28rem;
          width: 1.44rem;
          height: 0.94rem;
          color: #999999;
          font-family: Noto Sans KR, sans-serif;
          font-size: 0.66rem;
          font-weight: 500;
          line-height: 0.77rem;
          text-align: right;
          text-align-vertical: center;
        }
        .Group288 {
          margin: 0rem 9.19rem;
          width: 46.69rem;
          height: 15.94rem;
        }
        .Rectangle377 {
          margin: 46.17rem 0rem;
          width: 0.47rem;
          height: 15.94rem;
          background-color: #edeff2;
        }
        .Rectangle378 {
          margin: 46.27rem 0.14rem;
          width: 0.28rem;
          height: 5.3rem;
          background-color: #c0c4c9;
          border-radius: 0.23rem;
        }
        .Rectangle370 {
          width: 46.69rem;
          height: 15.94rem;
          border-color: #dfdfdf;
          border-width: 0.05rem;
          border-radius: 0.19rem;
        }
        . {
          margin: 1.13rem 0.8rem;
          width: 25.88rem;
          height: 8.25rem;
          color: #c1c1c1;
          font-family: Noto Sans KR, sans-serif;
          font-size: 0.94rem;
          font-weight: 500;
          line-height: 1.1rem;
        }
        .Group296 {
          margin: 0rem 26.81rem;
          width: 46.73rem;
          height: 13.03rem;
        }
        .Group291 {
          width: 46.73rem;
          height: 1.25rem;
        }
        . {
          width: 3.31rem;
          height: 1.25rem;
          color: #666666;
          font-family: Noto Sans KR, sans-serif;
          font-size: 0.84rem;
          font-weight: 500;
          line-height: 0.99rem;
        }
        .0100MB {
          margin: 37.55rem 0rem;
          width: 9.19rem;
          height: 1.25rem;
          color: #999999;
          font-family: Noto Sans KR, sans-serif;
          font-size: 0.84rem;
          font-weight: 500;
          line-height: 0.99rem;
          text-align: right;
        }
        .Group292 {
          width: 46.69rem;
          height: 11.25rem;
        }
        .Rectangle379 {
          width: 46.69rem;
          height: 11.25rem;
          background-color: #edeff2;
          border-radius: 0.19rem;
        }
        .Group285 {
          margin: 12.8rem 2.39rem;
          width: 21.06rem;
          height: 6.69rem;
        }
        .Group284 {
          width: 21.06rem;
          height: 6.69rem;
        }
        . {
          width: 21.06rem;
          height: 1.06rem;
          color: #aaaaaa;
          font-family: Noto Sans KR, sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          line-height: 0.88rem;
          text-align: center;
        }
        .Group283 {
          margin: 6.38rem 0rem;
          width: 8.38rem;
          height: 5.19rem;
        }
        . {
          width: 8.38rem;
          height: 1.25rem;
          color: #999999;
          font-family: Noto Sans KR, sans-serif;
          font-size: 0.84rem;
          font-weight: 500;
          line-height: 0.99rem;
          text-align: center;
        }
        .Group282 {
          margin: 2.39rem 0rem;
          width: 3.55rem;
          height: 3.47rem;
        }
        .Rectangle380 {
          width: 2.56rem;
          height: 2.56rem;
          background-color: #c1c1c1;
          border-color: #edeff2;
          border-width: 0.04rem;
          border-radius: 0.42rem;
        }
        .Rectangle381 {
          margin: 0.98rem 0rem;
          width: 2.56rem;
          height: 2.56rem;
          background-color: #c1c1c1;
          border-color: #edeff2;
          border-width: 0.04rem;
          border-radius: 0.42rem;
        }
        .Group295 {
          margin: 0rem 50.2rem;
          width: 46.69rem;
          height: 4.78rem;
        }
        . {
          width: 5.81rem;
          height: 1.25rem;
          color: #666666;
          font-family: Noto Sans KR, sans-serif;
          font-size: 0.84rem;
          font-weight: 500;
          line-height: 0.99rem;
        }
        .Group290 {
          margin: 0rem 1.78rem;
          width: 46.69rem;
          height: 3rem;
        }
        .Rectangle380 {
          width: 46.69rem;
          height: 3rem;
          background-color: #ffffff;
          border-color: #dfdfdf;
          border-width: 0.05rem;
          border-radius: 0.19rem;
        }
        .URL {
          margin: 1.13rem 0.8rem;
          width: 8.13rem;
          height: 1.38rem;
          color: #c1c1c1;
          font-family: Noto Sans KR, sans-serif;
          font-size: 0.94rem;
          font-weight: 500;
          line-height: 1.1rem;
          text-align-vertical: center;
        }
        . {
          width: 1.56rem;
          height: 1.25rem;
          color: #666666;
          font-family: Noto Sans KR, sans-serif;
          font-size: 0.84rem;
          font-weight: 500;
          line-height: 0.99rem;
        }
        .Group290 {
          margin: 0rem 58.45rem;
          width: 46.69rem;
          height: 3rem;
        }
        .Rectangle380 {
          width: 46.69rem;
          height: 3rem;
          background-color: #ffffff;
          border-color: #dfdfdf;
          border-width: 0.05rem;
          border-radius: 0.19rem;
        }
        . {
          margin: 1.13rem 0.8rem;
          width: 8.56rem;
          height: 1.38rem;
          color: #c1c1c1;
          font-family: Noto Sans KR, sans-serif;
          font-size: 0.94rem;
          font-weight: 500;
          line-height: 1.1rem;
          text-align-vertical: center;
        }
        .Group294 {
          margin: 0rem 43.73rem;
          width: 23.91rem;
          height: 4.78rem;
        }
        .Rectangle121 {
          width: 23.91rem;
          height: 3rem;
          background-color: #ffffff;
          border-color: #dfdfdf;
          border-width: 0.05rem;
          border-radius: 0.19rem;
        }
        . {
          width: 7.56rem;
          height: 1.25rem;
          color: #666666;
          font-family: Noto Sans KR, sans-serif;
          font-size: 0.84rem;
          font-weight: 500;
          line-height: 0.99rem;
        }
        . {
          margin: 1.13rem 2.58rem;
          width: 3.69rem;
          height: 1.38rem;
          color: #c1c1c1;
          font-family: Noto Sans KR, sans-serif;
          font-size: 0.94rem;
          font-weight: 500;
          line-height: 1.1rem;
          text-align-vertical: center;
        }
        .Group303 {
          margin: 11.39rem 67.08rem;
          width: 23.91rem;
          height: 5.11rem;
        }
        . {
          margin: 1.88rem 0rem;
          width: 20.25rem;
          height: 1.06rem;
          color: #8b8b8b;
          font-family: Noto Sans KR, sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          line-height: 0.88rem;
          text-align: center;
          text-align-vertical: center;
        }
        .010 {
          margin: 44.91rem 56.67rem;
          width: 1.81rem;
          height: 1.25rem;
          color: #999999;
          font-family: Noto Sans KR, sans-serif;
          font-size: 0.84rem;
          font-weight: 500;
          line-height: 0.99rem;
          text-align: right;
        }
      `}</style>
    </div>
  )
}

function Logo_image_1 () {
  return (
    <div className='Logo_image_1'>
      <div className='Rectangle125' />
      <style jsx>{`
        .Logo_image_1 {
          margin: -46rem -289.69rem;
          width: 9.38rem;
          height: 3.13rem;
        }
        .Rectangle125 {
          width: 100%;
          height: 100%;
          background-color: #dddddd;
        }
      `}</style>
    </div>
  )
}

function ScreenTitle_1 () {
  return (
    <div className='ScreenTitle_1'>
      <span className=''>
        로그인
      </span>
      <style jsx>{`
        .ScreenTitle_1 {
          margin: -32.56rem -289.94rem;
          width: 7.13rem;
          height: 3.69rem;
        }
        . {
          width: 100%;
          height: 100%;
          color: #222222;
          font-family: Noto Sans KR, sans-serif;
          font-size: 2.56rem;
          font-weight: 700;
          line-height: 3rem;
        }
      `}</style>
    </div>
  )
}

function Button_1 () {
  return (
    <div className='Button_1'>
      <div className='Rectangle122' />
      <span className=''>
        로그인
      </span>
      <style jsx>{`
        .Button_1 {
          margin: -46rem -226.87rem;
          width: 31.88rem;
          height: 4.38rem;
          border-radius: 0.75rem;
        }
        .Rectangle122 {
          width: 100%;
          height: 100%;
          background-color: #ff4e4e;
          border-radius: 0.5rem;
        }
        . {
          margin: 14rem 1.44rem;
          width: 11.96%;
          height: 31.43%;
          color: #ffffff;
          font-family: Noto Sans KR, sans-serif;
          font-size: 1.38rem;
          font-weight: 700;
          line-height: 1.61rem;
          text-align: center;
          text-align-vertical: center;
        }
      `}</style>
    </div>
  )
}

function Button_Plus () {
  return (
    <div className='Button_Plus'>
      <div className='Rectangle352' />
      <div className='Group239'>
        <div className='Rectangle354' />
        <div className='Rectangle355' />
      </div>
      <style jsx>{`
        .Button_Plus {
          margin: -6.81rem -212.37rem;
          width: 1.5rem;
          height: 1.5rem;
        }
        .Rectangle352 {
          width: 100%;
          height: 100%;
          background-color: #dfdfdf;
          border-radius: 6.25rem;
        }
        .Group239 {
          margin: 0.35rem 0.35rem;
          width: 54.33%;
          height: 54.33%;
        }
        .Rectangle354 {
          margin: 0.37rem 0rem;
          width: 10%;
          height: 100%;
          background-color: #ffffff;
        }
        .Rectangle355 {
          margin: 0.81rem 0.37rem;
          width: 10%;
          height: 100%;
          background-color: #ffffff;
        }
      `}</style>
    </div>
  )
}

function TopBar_1 () {
  return (
    <div className='TopBar_1'>
      <div className='Rectangle173' />
      <span className=''>
        상단바
      </span>
      <style jsx>{`
        .TopBar_1 {
          margin: -46rem -207.44rem;
          width: 120rem;
          height: 6.56rem;
        }
        .Rectangle173 {
          width: 100%;
          height: 100%;
          background-color: #cccccc;
        }
        . {
          margin: 57.56rem 2rem;
          width: 4.06%;
          height: 39.05%;
          color: #ffffff;
          font-family: Noto Sans KR, sans-serif;
          font-size: 1.75rem;
          font-weight: 500;
          line-height: 2.05rem;
          text-align: center;
          text-align-vertical: center;
        }
      `}</style>
    </div>
  )
}

function Group277 () {
  return (
    <div className='Group277'>
      <div className='Rectangle184' />
      <Logo_image_1 className='Logo_image_1' />
      <div className='Rectangle186' />
      <div className='Group336'>
        <div className='Rectangle128' />
        <span className=''>
          검색어를 입력해주세요
        </span>
        <div className='Rectangle141' />
      </div>
      <div className='Rectangle187' />
      <style jsx>{`
        .Group277 {
          margin: -46rem -123.19rem;
          width: 120rem;
          height: 6.25rem;
          box-shadow: 0rem 0.5rem 1rem rgba(22, 34, 51, 0.08);
        }
        .Rectangle184 {
          width: 100%;
          height: 100%;
          background-color: #ffffff;
        }
        .Logo_image_1 {
          margin: 9rem 1.56rem;
          width: 7.81%;
          height: 50%;
        }
        .Rectangle125 {
          width: 100%;
          height: 100%;
          background-color: #dddddd;
        }
        .Rectangle186 {
          margin: 3.75rem 1.25rem;
          width: 3.13%;
          height: 60%;
          background-color: #c4c4c4;
        }
        .Group336 {
          margin: 39.75rem 1.19rem;
          width: 33.75%;
          height: 62%;
        }
        .Rectangle128 {
          width: 100%;
          height: 100%;
          background-color: #f7f7f7;
          border-color: #f0f0f0;
          border-width: 0.06rem;
          border-radius: 0.38rem;
        }
        . {
          margin: 1.25rem 1.31rem;
          width: 32.1%;
          height: 32.26%;
          color: #c1c1c1;
          font-family: Noto Sans KR, sans-serif;
          font-size: 1.25rem;
          font-weight: 500;
          line-height: 1.46rem;
          text-align-vertical: center;
        }
        .Rectangle141 {
          margin: 36.5rem 0.56rem;
          width: 6.79%;
          height: 70.97%;
          background-color: #c4c4c4;
        }
        .Rectangle187 {
          margin: 112.5rem 1.25rem;
          width: 3.13%;
          height: 60%;
          background-color: #c4c4c4;
        }
      `}</style>
    </div>
  )
}

function Information () {
  return (
    <div className='Information'>
      <div className='Rectangle376' />
      <div className='Group279'>
        <div className='Rectangle375' />
        <span className='i'>
          i
        </span>
      </div>
      <style jsx>{`
        .Information {
          margin: 0.38rem -216.12rem;
          width: 2.5rem;
          height: 2.5rem;
        }
        .Rectangle376 {
          display: none;
          width: 100%;
          height: 100%;
          background-color: #c4c4c4;
        }
        .Group279 {
          margin: 0.25rem 0.31rem;
          width: 77.5%;
          height: 77.5%;
        }
        .Rectangle375 {
          width: 100%;
          height: 100%;
          background-color: #222222;
          border-radius: 1.88rem;
        }
        .i {
          margin: 0.79rem 0.44rem;
          width: 18.06%;
          height: 51.61%;
          color: #ffffff;
          font-family: Noto Sans KR, sans-serif;
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.17rem;
          text-align: center;
          text-align-vertical: center;
        }
      `}</style>
    </div>
  )
}
