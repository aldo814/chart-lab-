import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { PhoneIcon, ClockIcon } from "@phosphor-icons/react";
import IcoBus from "../../assets/images/sub/ico_bus.svg";
import IcoSubway from "../../assets/images/sub/ico_subway.svg";

import {
  NavermapsProvider,
  Container as MapDiv,
  NaverMap,
  Marker,
} from "react-naver-maps";

const infoText = [
  {
    enTitle: "LOCATION",
    name: "차트연구소",
    address: "서울 강서구 마곡중앙로 171 \n프라이빗타워 2차 716호",
    enAddress:
      "Room 716, Private Tower 2, 171\n Magokjungang-ro, Gangseo-gu, Seoul",
  },
];

const contactList = [
  {
    icon: <PhoneIcon size={24} weight="bold" />,
    label: "대표번호",
    value: "02-2603-8958",
  },
  {
    icon: <ClockIcon size={24} weight="bold" />,
    label: "운영시간",
    value: "09:00 ~ 18:00",
  },
];

const transportList = [
  {
    icon: IcoSubway,
    title: "지하철 이용",
    routes: [
      "9호선 마곡나루역 3번 출구 도보 5분",
      "공항철도 마곡나루역 도보 7분",
    ],
  },
  {
    icon: IcoBus,
    title: "버스 이용",
    routes: ["마곡역 정류장 하차", "간선버스 601, 605/지선버스 6630"],
  },
];

const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;
const position = { lat: 37.5679, lng: 126.8275 };

const Location = () => {
  return (
    <div className="sub-location">
      <div className="inner">
        <SectionTitle
          variant="default"
          en="LOCATION"
          title="오시는 길"
          desc="차트연구소 본사 위치 및 교통편을 안내드립니다."
        />
      </div>

      <section className="sub-location__map">
        <div className="sub-location__map-inner inner">
          <div className="sub-location__map-box">
            <NavermapsProvider ncpKeyId={NAVER_CLIENT_ID}>
              <MapDiv style={{ width: "100%", height: "500px" }}>
                <NaverMap defaultCenter={position} defaultZoom={17} zoomControl>
                  <Marker
                    defaultPosition={position}
                    title="차트연구소"
                    caption={{
                      text: "차트연구소",
                      align: "center",
                      offset: 10,
                      textStyle: {
                        color: "#111",
                        fontSize: 14,
                        fontWeight: "bold",
                      },
                    }}
                  />
                </NaverMap>
              </MapDiv>
            </NavermapsProvider>

            <a
              href="https://map.naver.com/v5/directions/-/-/126.8275,37.5679,차트연구소"
              target="_blank"
              rel="noopener noreferrer"
              className="map-route-btn"
            >
              길찾기
            </a>
          </div>

          <div className="sub-location__info">
            <div className="sub-location__info-text">
              {infoText.map((txt, idx) => (
                <div key={idx} className="sub-location__addr-group">
                  <span className="sub-location__addr-en-title">
                    {txt.enTitle}
                  </span>
                  <strong className="sub-location__addr-name">
                    {txt.name}
                  </strong>
                  <p className="sub-location__addr-kr">{txt.address}</p>
                  <p className="sub-location__addr-en">{txt.enAddress}</p>
                </div>
              ))}
            </div>

            <ul className="sub-location__contact">
              {contactList.map((item, idx) => (
                <li key={idx} className="sub-location__contact-item">
                  <div className="sub-location__contact-icon">{item.icon}</div>
                  <div className="sub-location__contact-text">
                    <p className="sub-location__contact-label">{item.label}</p>
                    <strong className="sub-location__contact-value">
                      {item.value}
                    </strong>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="sub-location__transport">
        <div className="sub-location__transport-inner inner">
          <h3 className="sub-location-title">대중교통 이용안내</h3>

          {transportList.map((item, idx) => (
            <div key={idx} className="sub-location__transport-item">
              <div className="sub-location__transport-icon">
                <img src={item.icon} alt={item.title} />
              </div>

              <div className="sub-location__transport-content">
                <h4 className="sub-location__transport-title">
                  {item.title}
                </h4>

                <ul className="sub-location__transport-list">
                  {item.routes.map((route, i) => (
                    <li key={i} className="sub-location__transport-list-item">
                      {route}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Location;