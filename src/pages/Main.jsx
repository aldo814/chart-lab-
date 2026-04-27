import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Button from '../components/Button';
import MainNotice from "../components/MainNotice";
import Footer from "../layouts/Footer";
import { CurrencyCircleDollarIcon, PresentationChartIcon, TrendUpIcon, SquaresFourIcon, NoteIcon } from "@phosphor-icons/react";

import 'swiper/css';
import 'swiper/css/navigation';

import productImg01 from '../assets/images/main/product01.png';
import productImg02 from '../assets/images/main/product02.png';
import icoChart from '../assets/images/main/ico_chart.svg';

import htsIco01 from '../assets/images/main/ico_hts01.svg';
import htsIco02 from '../assets/images/main/ico_hts02.svg';
import htsIco03 from '../assets/images/main/ico_hts03.svg';
import htsIco04 from '../assets/images/main/ico_hts04.svg';

import mtsIco01 from '../assets/images/main/ico_hts01.svg';
import mtsIco02 from '../assets/images/main/ico_hts02.svg';
import mtsIco03 from '../assets/images/main/ico_hts03.svg';
import mtsIco04 from '../assets/images/main/ico_hts04.svg';

import p1 from "../assets/images/main/img_logo01.svg";
import p2 from "../assets/images/main/img_logo02.svg";
import p3 from "../assets/images/main/img_logo03.svg";
import p4 from "../assets/images/main/img_logo04.svg";
import p5 from "../assets/images/main/img_logo05.svg";
import p6 from "../assets/images/main/img_logo06.svg";
import p7 from "../assets/images/main/img_logo07.svg";
import p8 from "../assets/images/main/img_logo08.svg";
import p9 from "../assets/images/main/img_logo09.svg";
import p10 from "../assets/images/main/img_logo10.svg";
import p11 from "../assets/images/main/img_logo11.svg";
import p12 from "../assets/images/main/img_logo12.svg";

function Main() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const sectionRefs = useRef([]);
  const mainPageRef = useRef(null);

  const sections = [
    { id: "main", title: "Main", theme: "dark" },
    { id: "hts", title: "HTS", theme: "light" },
    { id: "mts", title: "MTS", theme: "dark" },
    { id: "partners", title: "Partners", theme: "light" },
    { id: "support", title: "Support", theme: "light" },
  ];

  const partnerLogos = [
    { id: 1, src: p4, alt: "LS 증권" },
    { id: 2, src: p2, alt: "신한투자증권" },
    { id: 3, src: p3, alt: "유안타증권" },
    { id: 4, src: p7, alt: "NH 선물" },
    { id: 5, src: p5, alt: "유진투자증권" },
    { id: 6, src: p1, alt: "ibk 기업은행" },
    { id: 7, src: p8, alt: "연합인포맥스" },
    { id: 8, src: p9, alt: "피비씨미디어" },
    { id: 9, src: p10, alt: "비트포인트" },
    { id: 10, src: p11, alt: "계림요업" },
    { id: 11, src: p12, alt: "SNC Technology PTE. Ltd" },
  ];
  const partnerLogosReversed = [...partnerLogos].reverse();

  // Main 페이지에서만 body overflow hidden
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  //  section--info에서 snap 해제 — JS로 직접 클래스 토글
  useEffect(() => {
    const container = mainPageRef.current;
    const infoSection = sectionRefs.current[4];
    if (!container || !infoSection) return;

    const handleScroll = () => {
      // info 섹션 top에 도달했으면 snap 해제해서 footer까지 자유 스크롤
      const infoTop = infoSection.offsetTop;
      if (container.scrollTop >= infoTop - 10) {
        container.style.scrollSnapType = "none";
      } else {
        container.style.scrollSnapType = "y mandatory";
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // .main-page 컨테이너 기준 IntersectionObserver
  useEffect(() => {
    const container = mainPageRef.current;
    if (!container) return;

    const observerList = sectionRefs.current.map((section, index) => {
      if (!section) return null;
      const threshold = index === sectionRefs.current.length - 1 ? 0.2 : 0.6;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setCurrentIdx(index);
          });
        },
        { root: container, rootMargin: "0px", threshold }
      );
      observer.observe(section);
      return observer;
    });

    return () => observerList.forEach((obs) => obs?.disconnect());
  }, []);

  // .main-page 컨테이너 내에서 scrollTop으로 이동
  const moveSection = (idx) => {
    const container = mainPageRef.current;
    const target = sectionRefs.current[idx];
    if (!container || !target) return;

    // 마지막 섹션으로 이동 시 snap 잠깐 켜서 정확히 snap되게
    if (idx < sectionRefs.current.length - 1) {
      container.style.scrollSnapType = "y mandatory";
    }
    container.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  };

  const [isPlaying, setIsPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(1);
  const [totalSlides, setTotalSlides] = useState(0);
  const progressBar = useRef(null);
  const swiperRef = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressBar.current) {
      progressBar.current.style.width = `${(1 - progress) * 100}%`;
    }
  };

  const toggleAutoplay = () => {
    const swiper = swiperRef.current;
    if (!swiper || !swiper.autoplay) return;
    if (swiper.autoplay.running) {
      swiper.autoplay.stop(); setIsPlaying(false);
    } else {
      swiper.autoplay.start(); setIsPlaying(true);
    }
  };

  return (
    <div className="main-page" ref={mainPageRef}>

      {/* 풀페이지 네비게이션 */}
      <nav className={`fp-nav fp-nav--${sections[currentIdx].theme}`}>
        <ul className="fp-nav__list">
          {sections.map((sec, idx) => (
            <li key={idx} className={`fp-nav__item ${currentIdx === idx ? "fp-nav__item--active" : ""}`}>
              <button className="fp-nav__button" onClick={() => moveSection(idx)}>
                <span className="fp-nav__dot">
                  <span className="fp-nav__circle"></span>
                  <span className="fp-nav__label">{sec.title}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* 히어로 섹션 */}
      <section className="section section--hero" ref={(el) => (sectionRefs.current[0] = el)}>
        <div className="hero-control">
          <span className="hero-control__current">{String(activeIndex).padStart(2, '0')}</span>
          <div className="hero-control__progress-wrap">
            <div className="hero-control__progress-bar" ref={progressBar}></div>
          </div>
          <span className="hero-control__total">{String(totalSlides).padStart(2, '0')}</span>
          <div className="hero-control__nav">
            <button className="hero-control__btn hero-control__btn--prev">이전</button>
            <button className="hero-control__btn hero-control__btn--next">다음</button>
            <button
              className={`hero-control__btn hero-control__btn--toggle ${isPlaying ? 'is-play' : ''}`}
              onClick={toggleAutoplay}
            >
              {isPlaying ? "▶" : "⏸"}
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{ nextEl: ".hero-control__btn--next", prevEl: ".hero-control__btn--prev" }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setTotalSlides(swiper.slides.filter(s => !s.classList.contains('swiper-slide-duplicate')).length);
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex + 1)}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="hero-swiper"
        >
          <SwiperSlide className="hero-swiper__slide hero-swiper__slide--01">
            <div className="inner">
              <div className="hero-cont">
                <h2 className="hero-cont__title">오직 차트만, <br></br>깊이 있게
신뢰와 책임으로</h2>
                <p className="hero-cont__desc">
세계 시장을 기준으로
다년간 축적된 기술력</p>
                <Link to="/product/powerchart" className="hero-cont__btn">솔루션 확인하기</Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="hero-swiper__slide hero-swiper__slide--02">
            <div className="inner">
              <div className="hero-cont">
                <h2 className="hero-cont__title">Advanced Charting Systems<br />For Your Business</h2>
                <p className="hero-cont__desc">데이터 시각화의 새로운 기준을 제시합니다.</p>
                <Link to="/product/powerchart" className="hero-cont__btn">솔루션 확인하기</Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="hero-swiper__slide hero-swiper__slide--03">
            <div className="inner">
              <div className="hero-cont">
                <h2 className="hero-cont__title">Experience the Power of<br />Real-time Analytics</h2>
                <p className="hero-cont__desc">빠르고 정확한 실시간 데이터 분석 엔진.</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="hero-swiper__slide hero-swiper__slide--04">
            <div className="inner">
              <div className="hero-cont">
                <h2 className="hero-cont__title">Experience the Power of<br />Real-time Analytics</h2>
                <p className="hero-cont__desc">빠르고 정확한 실시간 데이터 분석 엔진.</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* HTS 섹션 */}
      <section className="section section--product section--light" ref={(el) => (sectionRefs.current[1] = el)}>
        <div className="inner">
          <div className="section__title-wrap">
            <span className="en">product preview</span>
            <h2 className="kr">희소성이 높은 새롭고 <br />
              <b>혁신적 기능의 종합차트 솔루션 제공</b></h2>
          </div>
          <div className="product-item">
            <div className="product-item__img">
              <img src={productImg01} alt="제품 이미지 01" />
            </div>
            <div className="product-item__box">
              <div className="box-content">
                <div className="title">
                  <span className="en">power chart</span>
                  <h3 className="kr">파워 차트 2.5 (HTS)</h3>
                  <p className="desc">
                  선물 만기 틱차트까지 끊김 없이 처리하는 FastLight Drawing 엔진. <br></br>
230종 지표와 시스템트레이딩, 실시간 이벤트 감시를 하나의 차트에서 통합 운영.
                  </p>
                </div>
                <ul className="ico-list">
                  <li><i className="ico"><img src={htsIco01} alt="" /></i>지표 230종, 시그널 160종. 분석에 필요한 모든 것.</li>
                  <li><i className="ico"><img src={htsIco02} alt="" /></i>증권사 14년 납품 실적의 HTS 차트 엔진</li>
                  <li><i className="ico"><img src={htsIco03} alt="" /></i>FastLight Drawing 기반 고성능 통합 차트</li>
                  <li><i className="ico"><img src={htsIco04} alt="" /></i>한 차트에서 12종목 실시간 이벤트 감시</li>
                </ul>
              </div>
              <div className="box-hover">
                <div className="title">
                  <span className="en">hts</span>
                  <h3 className="kr">파워차트</h3>
                </div>
                <ul className="dot-list">
                  <li>선물 만기 틱차트 환경에서도 안정적인 퍼포먼스</li>
                  <li>강력한 분할 프레임 및 차트 간 동기화</li>
                  <li>초급자·고급자 모드 분리로 폭넓은 사용자층 수용</li>
                  <li>국내 주요 금융기관 다수 납품으로 검증된 안정성</li>
                  </ul>
                <Button variant="arrow-white" to="product/powerchart">자세히보기</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MTS 섹션 */}
      <section className="section section--product section--dark" ref={(el) => (sectionRefs.current[2] = el)}>
        <div className="inner">
          <div className="section__title-wrap">
            <span className="en">product preview</span>
            <h2 className="kr">경쟁사 대비 월등한 성능<br />
              <b>종합 단말 운영사가 채택한 솔루션</b></h2>
          </div>
          <div className="product-item">
            <div className="product-item__img">
              <img src={productImg02} alt="제품 이미지 02" />
            </div>
            <div className="product-item__box">
              <div className="box-content">
                <div className="title">
                  <span className="en">power graphics</span>
                  <h3 className="kr">파워그래픽스 3.0 (MTS)</h3>
                  <div className="desc">
                  데스크톱의 분석 경험을 모바일로 확장. <br></br>
기술력을 쌓아온 HTS 차트 엔진을 모바일 환경에 맞게 재설계한 차세대 솔루션.
                  </div>
                </div>
                <ul className="ico-list">
                  <li><i className="ico">
                    <img src={mtsIco01} alt="" />
                  </i>HTS 차트 설정을 모바일에서 그대로</li>
                  <li><i className="ico">
                    <img src={mtsIco02} alt="" />
                  </i>지표 250종, 패턴 120종. 모바일 전용 엔진</li>
                  <li><i className="ico">
                    <img src={mtsIco03} alt="" />
                  </i>Android·iOS 속성 호환 모바일 차트</li>
                  <li><i className="ico">
                    <img src={mtsIco04} alt="" />
                  </i>추세선 돌파 감지부터 주문 연동까지</li>
                  
                </ul>
              </div>
              <div className="box-hover">
                <div className="title">
                  <span className="en">power graphics</span>
                  <h3 className="kr">파워 그래픽스 3.0 (MTS)</h3>
                </div>
                <ul className="dot-list">
                  <li>다년간 차트 개발 경험이 집약된 모바일 전용 엔진</li>
                  <li>업계 최초 HTS ↔ MTS DB 및 속성 호환 / Android ↔ iOS 속성까지 호환</li>
                  <li>App 내 다크 모드 완전 지원</li>
                  <li>세로·가로 모드 전용 UI 분리 설계</li>
                  <li>Android 5.0 / iOS 13.0 이상 지원</li>
                </ul>
                <Button variant="arrow-blue" to="/product/powergraphics">자세히보기</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 파트너 섹션 */}
      <section className="section section--partners" ref={(el) => (sectionRefs.current[3] = el)}>
        <div className="inner">
          <h2 className="partners__title">
            <b><i><img src={icoChart} alt="" /></i>Chart Labs' partner</b>
            <span>Trusted by Financial Institutions</span>
          </h2>
          <p className="partners__desc">
            금융 시장이 선택한 차트 연구소<br />
            <b>정확한 데이터와 안정적인 기술력</b>을 바탕으로, 신뢰할 수 있는 기업들과 함께 성장합니다
          </p>
        </div>
        <div className="partners__wrap">
          <div className="partners__row">
            <div className="partners__track partners__track--ltr">
              {[...partnerLogos, ...partnerLogos].map((logo, i) => (
                <div className="partners__item" key={i}><img src={logo.src} alt={logo.alt} /></div>
              ))}
            </div>
          </div>
          <div className="partners__row">
            <div className="partners__track partners__track--rtl">
              {[...partnerLogosReversed, ...partnerLogosReversed].map((logo, i) => (
                <div className="partners__item" key={i}><img src={logo.src} alt={logo.alt} /></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 공지사항 + 문의 */}
      <section className="section section--info" ref={(el) => (sectionRefs.current[4] = el)}>
        <div className="inner">
          <div className="info-group">
            <div className="info-group__notice">
              <div className="section__title-wrap">
                <span className="en">Notice</span>
                <h2 className="kr">차트솔루션의<br />
                  <b>새로운 소식을 만나보세요.</b></h2>
                <Button variant="arrow-black" to="/notice">자세히 보기</Button>
              </div>
              <div className="section__noitce">
                <MainNotice />
              </div>
            </div>
          </div>
        </div>
        <div className="info-group__contact">
          <div className="inner">
            <div className="contact__title-wrap">
              <span className="en">Contact us</span>
              <h2 className="kr">궁금한 점이나 도입 문의는 언제든지 편하게 남겨주세요.<br />빠르고 정확한 상담으로 최적의 차트 솔루션을 제안드립니다.</h2>
              <Button variant="arrow-white-green" to="/contact">문의하기</Button>
            </div>
            <div className="contact__list">
              <div className="contact__item">
                <h4 className="contact__title">e-mail</h4>
                <p className="contact__desc"><a href="mailto:chartlab@naver.com">chartlab@naver.com</a></p>
              </div>
              <div className="contact__item">
                <h4 className="contact__title">Tel</h4>
                <p className="contact__desc"><a href="tel:02-2603-8958">02-2603-8958</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
}

export default Main;