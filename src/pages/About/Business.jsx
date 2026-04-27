import React from "react";
import SectionTitle from "../../components/SectionTitle";
import DotList from "../../components/DotList";

import imgBusiness01 from "../../assets/images/sub/img_business01.png";
import imgBusiness02 from "../../assets/images/sub/img_business02.png";

/* ================= DATA ================= */
const businessData = [
  {
    id: 1,
    badge: "차트 솔루션",
    title: "실시간 차트 시스템",
    desc: [
      "고성능 실시간 데이터 처리",
      "다양한 차트 타입 지원",
"커스터마이징 가능한 인터페이스",
"모바일 및 웹 플랫폼 최적화"
    ],
    img: imgBusiness01,
  },
  {
    id: 2,
    badge: "차트 솔루션",
    title: "데이터 분석",
    desc: [
      "HTS / MTS 통합",
      "커스터마이징 가능 구조",
      "확장형 아키텍처",
    ],
    img: imgBusiness02,
  },
];

const Business = () => {
  return (
    <div className="sub-business">
      <div className="inner">

      <SectionTitle
        en="Business Areas"
        title="사업 소개"
        desc={`차트솔루션은 금융 데이터를 효과적으로 시각화하는 기술을 제공합니다.\n실시간 데이터 처리와 안정적인 성능을 기반으로 다양한 환경에서 최적의 차트 서비스를 구현합니다.`}
      />

      <div className="sub-business__list">

        {businessData.map((item) => (
          <div className="sub-business__item" key={item.id}>

            {/* IMAGE */}
            <div className="sub-business__img">
              <img src={item.img} alt={item.title} />
            </div>

            {/* CONTENT */}
            <div className="sub-business__content">

              <div className="sub-business__head">
                <span className="sub-business__badge">
                  {item.badge}
                </span>

                <h3 className="sub-business__title">
                  <span className="sub-business__num">0{item.id}</span>
                  {item.title}
                </h3>
              </div>

              {/* DOT LIST COMPONENT */}
              <DotList items={item.desc} />

            </div>

          </div>
        ))}

      </div>
      </div>
    </div>
  );
};

export default Business;