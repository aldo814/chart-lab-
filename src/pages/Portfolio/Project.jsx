import React from "react";
import SectionTitle from "../../components/SectionTitle";
import img01 from "../../assets/images/sub/portfoilo_ls.png";
import img02 from "../../assets/images/sub/ls-mts.png";
import img03 from "../../assets/images/sub/portfoilo_sh.png";
import img04 from "../../assets/images/sub/portfoilo_u.png";
import img05 from "../../assets/images/sub/portfoilo_yj.png";
import img06 from "../../assets/images/sub/ls-tuhon.png";

const Project = () => {
  // 프로젝트 리스트 데이터
  const projectList = [
    {
      badge: "LS증권 Tuhon",
      name: "Tuhon HTS",
      desc: "2026년 3월 납품된 파워차트 2.5버전 최고의 성능과 최신의 기능, MTS차트와 연동되는 강력한 분석 차트",
      img: img01,
    },
    {
      badge: "LS증권 Tuhon",
      name: "Tuhon MTS",
      desc: "2026년 3월 납품된 파워그래픽스 3.0버전 국내 주식, 선물, 지수, 해외 주식, 선물, 지수 등 다양한 시장의 모바일 분석 차트",
      img: img02,
    },
    {
      badge: "신한 알파",
      name: "알파 HTS",
      desc: "HTS차트의 업그레이드 파워차트 2.5 버전으로 종합차트, 폼차트, 폼그래프, 전광판차트 등 지원",
      img: img03,
    },
    {
      badge: "유안타 tRadar",
      name: "tRadar HTS",
      desc: "파워차트 2.0버전으로 날씨를 차트에 표현한 햇볕, 안개구간의 종합차트, 폼차트, 폼그래프",
      img: img04,
    },
    {
      badge: "유진 챔피언 퓨처스",
      name: "챔피언 퓨처스 HTS",
      desc: "국내파생, 해외파생 전문 분석 파워차트 2.5버전으로 강력한 분석기능을 탑재한 차트와 시의성을 극대화한 HTS 디자인",
      img: img05,
    },
    {
      badge: "LS증권 Tuhon",
      name: "Tuhon HTS",
      desc: "2026년 3월 납품된 파워차트 2.5버전 최고의 성능과 최신의 기능, MTS차트와 연동되는 강력한 분석 차트",
      img: img06,
    },
  ];

  return (
    <div className="sub-wrapper--about">
      <div className="sub-business project">
        <div className="inner">
          <div data-aos="fade-up">
            <SectionTitle
              variant="left"
              en="PROJECT PORTFOLIO"
              title="프로젝트 사례"
            />
          </div>

          <div className="sub-business__list">
            {projectList.map((item, idx) => (
              <div
                className="sub-business__item"
                key={idx}
                data-aos="fade-up"
                data-aos-delay={(idx % 3) * 100}
              >
                {/* 이미지 영역 */}
                <div className="sub-business__img">
                  <img src={item.img} alt={item.name} />
                </div>

                {/* 컨텐츠 영역 */}
                <div className="sub-business__content">
                  <div className="sub-business__head">
                    <span className="sub-business__badge">{item.badge}</span>

                    <h3 className="sub-business__title">
                      <span className="sub-business__num">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {item.name}
                    </h3>

                    <p className="sub-business__desc">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
