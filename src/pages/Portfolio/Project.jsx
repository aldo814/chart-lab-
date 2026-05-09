import React from "react";
import SectionTitle from "../../components/SectionTitle";
import img01 from "../../assets/images/sub/portfoilo_ls.png";
import img02 from "../../assets/images/sub/portfoilo_sh.png";
import img03 from "../../assets/images/sub/portfoilo_u.png";
import img04 from "../../assets/images/sub/portfoilo_yj.png";
import img05 from "../../assets/images/sub/portfoilo_nh.png";

const Project = () => {
  // 프로젝트 리스트 데이터
  const projectList = [
    {
      badge: "LS증권",
      name: "LS증권",
      desc: "프로젝트에 대한 2~3줄 설명이 들어갑니다. 어떤 문제를 해결했는지, 어떤 기능을 구현했는지 등 핵심 포인트만 간결하게 정리됩니다.",
      year: "2026",
      type: "차트 개발",
      img: img01,
    },
    {
      badge: "신한투자증권",
      name: "신한투자증권",
      desc: "프로젝트에 대한 2~3줄 설명이 들어갑니다. 어떤 문제를 해결했는지, 어떤 기능을 구현했는지 등 핵심 포인트만 간결하게 정리됩니다.",
      year: "2026",
      type: "차트 개발",
      img: img02,
    },
    {
      badge: "유안타증권",
      name: "유안타증권",
      desc: "프로젝트에 대한 2~3줄 설명이 들어갑니다. 어떤 문제를 해결했는지, 어떤 기능을 구현했는지 등 핵심 포인트만 간결하게 정리됩니다.",
      year: "2026",
      type: "차트 개발",
      img: img03,
    },
    {
      badge: "유진투자선물",
      name: "유진투자선물",
      desc: "프로젝트에 대한 2~3줄 설명이 들어갑니다. 어떤 문제를 해결했는지, 어떤 기능을 구현했는지 등 핵심 포인트만 간결하게 정리됩니다.",
      year: "2026",
      type: "차트 개발",
      img: img04,
    },
    {
      badge: "NH투자선물",
      name: "NH투자선물",
      desc: "프로젝트에 대한 2~3줄 설명이 들어갑니다. 어떤 문제를 해결했는지, 어떤 기능을 구현했는지 등 핵심 포인트만 간결하게 정리됩니다.",
      year: "2026",
      type: "차트 개발",
      img: img05,
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

                  <div className="project-info">
                    <div className="project-info__item">
                      <span className="project-info__label">YEAR</span>
                      <span className="project-info__value">{item.year}</span>
                    </div>
                    <div className="project-info__item">
                      <span className="project-info__label">TYPE</span>
                      <span className="project-info__value">{item.type}</span>
                    </div>
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
