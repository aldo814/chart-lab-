import React from "react";
import SectionTitle from "../../components/SectionTitle";
import Button from "../../components/Button";
import img01 from "../../assets/images/sub/img_mts01.png";
import img02 from "../../assets/images/sub/img_mts02.png";

const PowerGraphics = () => {
  const mainItem = {
    img: img01,
    features: [
      {
        title:
          "지표 250종, 신호 160종, 구간 70종, 패턴 100종, 채움 40종을 갖춘 HTS급 분석 수식  ",
      },
      {
        title: "17종의 라인 유형 및 40여 종의 추세선 ",
      },
      {
        title: "비교차트, 다양한 폼 차트, 폼 그래프  ",
      },
      {
        title: "업계 최초 모바일용 마켓맵 차트",
      },
      {
        title: "최대 4개 분할을 지원하는 분할 차트",
      },
      {
        title: "매매내역, 평균매매가 기능",
      },
      {
        title: "추세선 감시 기능",
      },
    ],
  };

  const subItem = {
    img: img02,
    features: [
      {
        title:
          "다년간의 차트 개발 경험이 집약된 가볍고 강력한 모바일 전용 엔진",
      },
      {
        title: "업계 최고의 모바일 차트 속성창 기능",
      },
      {
        title: "HTS 차트 설정을 모바일 환경에서도 이어받는 연동 구조",
      },
      {
        title: "App 내 다크 모드 완전 지원",
      },
      {
        title: "세로·가로 모드 전용 UI 분리 설계",
      },
      {
        title: "Android 5.0 / iOS 13.0 이상 지원",
      },
    ],
  };

  return (
    <div className="product">
      <div className="inner" data-aos="fade-up">
        <SectionTitle
          variant="center"
          centerTop="HTS의 강력한 분석력을 모바일의 경험으로"
          title="파워그래픽스 - MTS"
          desc="파워그래픽스 3.0은 다년간 축적된 차트 개발 역량을 모바일 환경에 맞게 재설계한 솔루션입니다.
        업계 최초, HTS와 MTS의 경계를 허무는 연동기술 Android와 iOS 어디서든 당신의 설정을 그대로 불러옵니다."
        />
      </div>

      <div className="product__inner inner">
        <div data-aos="fade-up">
          <SectionTitle variant="sub" en="CORE FEATURE" title="주요 기능" />
        </div>

        <div className="product__item" data-aos="fade-up" data-aos-delay="120">
          <div className="product__img">
            <img src={mainItem.img} alt="" />
          </div>

          <ul className="product__feature-list">
            {mainItem.features.map((item, idx) => (
              <li className="product__feature" key={idx} data-aos="fade-up">
                <span className="product__num">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <div className="product__text">
                  <h4 className="product__title">{item.title}</h4>
                  <p className="product__desc">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="product__extra">
        <div className="product__inner inner">
          <div data-aos="fade-up">
            <SectionTitle variant="sub" en="more FEATURE" title="핵심 강점" />
          </div>

          <div
            className="product__item"
            data-aos="fade-up"
            data-aos-delay="120"
          >
            <div className="product__img">
              <img src={subItem.img} alt="" />
            </div>

            <ul className="product__feature-list product__feature-list--extra">
              {subItem.features.map((item, idx) => (
                <li className="product__feature" key={idx} data-aos="fade-up">
                  <span className="product__num">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div className="product__text">
                    <h4 className="product__title">{item.title}</h4>
                    <p className="product__desc">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="product__cta" data-aos="fade-up">
        <div className="product__inner inner">
          <p className="product__cta-text">
            지금 바로 MTS 솔루션을 <br></br>
            <strong>경험해보세요</strong>
          </p>

          <Button
            variant="arrow-white-green"
            to="/contact"
            className="product__cta-btn"
          >
            문의하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PowerGraphics;
