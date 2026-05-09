import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import DotList from "../../components/DotList";
import ceoImg from "../../assets/images/sub/img_ceo.png";

/* ================= DATA ================= */
const ceoData = {
  title:
    "차트 솔루션의 새로운 기준을 <br><strong>만들어가고 있습니다.</strong>",
  desc: `차트연구소는 2011년에 설립된 금융 차트·그래픽 솔루션 전문 개발 기업입니다.<br><br>
  한 분야에서 최고의 기술력을 갖춘 회사를 목표로 출발한 이후, 국내 주요
  증권사·선물사·은행에 차트 시스템을 성공적으로 납품하며 금융 차트 솔루션 분야에서
  입지를 다져왔습니다.<br>
  차트연구소는 납품을 끝이 아닌 시작으로 생각합니다.<br><br>
  현재도 고객사와 긴밀한 관계를 유지하며 안정적인 유지보수와 지속적인 개선을 이어가고
  있습니다.<br><br>
  앞으로도 끊임없는 연구개발을 통해 국내를 넘어 세계 시장에서도 인정받는 그래픽 솔루션
  전문 기업으로 성장해 나가겠습니다.<br><br>
  감사합니다.`,
  img: ceoImg,
};

const bridgeText = "데이터로 만들어온 <br><strong>성장의 흐름</strong>";

export const historyData = [
  {
    year: "2026",
    list: ["LS 증권 HTS 차트 업그레이드", "LS 증권 MTS 차트 납품"],
  },
  {
    year: "2025",
    list: ["서울 마곡 지점 개설"],
  },
  {
    year: "2024",
    list: [
      "IBK기업은행 외환거래 시스템 IBK FXON 시스템 개발 참여(차트 분야)",
      "유진투자선물 미국주식옵션 시세제공 차트 개발",
    ],
  },
  {
    year: "2022",
    list: [
      "싱가포르 SNC Technology PTE. Ltd 파워차트 납품",
      "(주)피비씨미디어 일본 해외선물 옵션 시스템 차트 납품",
    ],
  },
  {
    year: "2021",
    list: ["SK증권 해외선물 OOO 시스템 개발 참여(차트 분야)"],
  },
  {
    year: "2020",
    list: [
      "NH투자선물 서핑보드 HTS 차트 납품",
      "신한투자증권(구. 신한금융투자) 신한알파 HTS 차트 납품",
    ],
  },
  {
    year: "2019",
    list: [
      "LS증권(구. 이베스트증권) 파워차트 VOC 개선 작업 계약",
      "유안타증권 차트클릭주문 계약",
    ],
  },
  {
    year: "2018",
    list: ["가상화폐차트 납품"],
  },
  {
    year: "2017",
    list: [
      "유진투자선물 챔피언 퓨처스 HTS 차트 납품",
      "유안타증권 티레이더 해외선물옵션 HTS 차트 납품",
      "마곡지구 두산더랜드파크 서울 강서지점 개설",
    ],
  },
  {
    year: "2016",
    list: ["파워차트 2.5 제품 출시", "유안타증권 미국주식 HTS 차트 납품"],
  },
];

/* ================= 유틸 ================= */
// 10년 단위 그룹핑
const groupByDecade = (data) => {
  const grouped = {};

  data.forEach((item) => {
    const decade = Math.floor(Number(item.year) / 10) * 10;
    const key = `${decade}s`;

    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  });

  return grouped;
};

/* ================= COMPONENT ================= */
const History = () => {
  const groupedData = groupByDecade(historyData);
  const decades = Object.keys(groupedData).sort((a, b) => b.localeCompare(a));

  const [activeTab, setActiveTab] = useState(decades[0]);

  return (
    <div className="sub-history">
      {/* CEO */}
      <section className="sub-history__ceo">
        <div className="sub-history__ceo-inner inner">
          <div className="sub-history__ceo-text">
            <h3
              className="sub-history__ceo-title"
              dangerouslySetInnerHTML={{ __html: ceoData.title }}
            />
            <p
              className="sub-history__ceo-desc"
              dangerouslySetInnerHTML={{ __html: ceoData.desc }}
            />
            <div className="sub-history__ceo-name">
              차트연구소 직원 일동 드림
            </div>
          </div>
          <div className="sub-history__ceo-image">
            <img src={ceoData.img} alt="CEO" />
          </div>
        </div>
      </section>

      {/* 브릿지 */}
      <section className="sub-history__bridge">
        <div className="sub-history__bridge-inner inner">
          <p
            className="sub-history__bridge-text"
            dangerouslySetInnerHTML={{ __html: bridgeText }}
          />
        </div>
      </section>

      {/* 연혁 */}
      <section className="sub-history__timeline inner">
        <SectionTitle variant="sub" en="HISTORY" title="연혁" />
        <div className="sub-history__timeline-inner">
          {/* 탭 */}
          <div className="sub-history__tabs">
            <ul className="sub-history__tab-list">
              {decades.map((decade) => (
                <li>
                  <button
                    key={decade}
                    className={`sub-history__tab-item ${
                      activeTab === decade ? "is-active" : ""
                    }`}
                    onClick={() => setActiveTab(decade)}
                  >
                    {decade}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 리스트 */}
          <div className="sub-history__list">
            {groupedData[activeTab].map((item) => (
              <div key={item.year} className="sub-history__item">
                <div className="sub-history__year">{item.year}</div>

                <ul className="sub-history__list">
                  {item.list.map((txt, idx) => (
                    <li key={idx} className="sub-history__list-item">
                      {txt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default History;
