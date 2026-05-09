import React from "react";
import SectionTitle from "../../components/SectionTitle";
import Button from "../../components/Button";
import img01 from "../../assets/images/sub/img_hts01.png";
import img02 from "../../assets/images/sub/img_hts02.png";
import img03 from "../../assets/images/sub/img_hts03.png";

const PowerChart = () => {
  // 주요 기능
  const mainItem = {
    img: img01,
    features: [
      {
        title:
          "지표 250종, 시그널 160종, 구간 70종, 채움 40종, 패턴 100종, 추세선 60종, 매매전략 50종의 업계 최다 수준 분석 수식 제공",
        desc: "",
      },
      {
        title:
          "수식관리자를 통해 사용자가 직접 지표, 신호등을 제작 분석 할 수 있는 환경 제공",
      },
      {
        title:
          "Script 기반 개발로 공수를 절감할 수 있는 FormDev 연동 폼 차트·폼 그래프 기능",
      },
      {
        title:
          "매매복기, 전광판 차트, 언론에 소개된 홍보용 차트, MarketMap 등 특이차트 지원",
      },
      {
        title: "비교 차트, 다양한 폼 그래프 및 폼 차트",
      },
    ],
  };

  // 추가 특징
  const subItem = {
    img: img02,
    features: [
      {
        title: "FastLight Drawing 기법 기반의 고성능 드로잉",
      },
      {
        title: "선물 만기 틱차트 환경에서도 안정적인 퍼포먼스",
      },
      {
        title: "다양한 분할 프레임 및 차트 간 동기화",
      },
      {
        title:
          "국내주식/선물/지수, 해외주식/선물/지수, FX차트까지 확장 가능한 엔진 구조",
      },
      {
        title: "초급자·고급자 모드 분리로 폭넓은 사용자층 수용",
      },
      {
        title: "프레임 다크 모드, 다양한 차트 스캔 기능",
      },
      {
        title:
          "업계 최고 수준의 100여 가지 차트 속성 제어와 실시간 프리뷰 기능",
      },
    ],
  };

  return (
    <div className="product">
      <div className="inner">
        <SectionTitle
          variant="center"
          centerTop="금융 현장에서 완성된 통합 차트 솔루션"
          title="파워차트 - HTS"
          desc="파워차트 2.5는 국내 주요 증권사·선물사·은행의 실무 환경에서 검증된 HTS 차트 시스템입니다.
        당신이 상상하는 모든 매매 전략의 현실화, 국내 최다 지표,신호,패턴 등의 분석을 통해 급변하는 장세에서도 흔들림 없는 투자 환경을 제공합니다."
        />
      </div>

      {/* ===== 주요 기능 ===== */}
      <div className="product__inner inner">
        <SectionTitle variant="sub" en="CORE FEATURE" title="주요 기능" />

        <div className="product__item">
          <div className="product__img">
            <img src={mainItem.img} alt="" />
          </div>

          <ul className="product__feature-list">
            {mainItem.features.map((item, idx) => (
              <li className="product__feature" key={idx}>
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

      {/* ===== 추가 특징 ===== */}
      <div className="product__extra">
        <div className="product__inner inner">
          <SectionTitle variant="sub" en="more FEATURE" title="추가 특징" />

          <div className="product__item">
            <div className="product__img">
              <img src={subItem.img} alt="" />
            </div>

            <ul className="product__feature-list product__feature-list--extra">
              {subItem.features.map((item, idx) => (
                <li className="product__feature" key={idx}>
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

      <div className="product__inner inner media">
        <div className="product__item">
          <div className="product__img">
            <img src={img03} alt="" />
          </div>

          <div className="media__cont">
            <h4 className="media__cont-title">언론사에 소개 된 차트</h4>
            <p className="media__cont-desc">
              차트연구소의 파워차트 분석 화면이 언론을 통해 소개되었습니다.
              <br></br>실전 매매 환경에 최적화된 차트 구성과 다양한 분석 기능을
              바탕으로,<br></br>투자자가 시장 흐름을 보다 직관적으로 파악할 수
              있도록 지원합니다.
            </p>
          </div>
        </div>
      </div>
      {/* ===== 문의하기 CTA ===== */}
      <div className="product__cta">
        <div className="product__inner inner">
          <p className="product__cta-text">
            지금 바로 HTS 솔루션을 <br></br>
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

export default PowerChart;
