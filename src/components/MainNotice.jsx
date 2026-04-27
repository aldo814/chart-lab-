import { useEffect, useState, useRef } from "react";
import { client } from "../api/sanity";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

import "swiper/css";
import "swiper/css/navigation";

function MainNotice() {
  const [list, setList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const [total, setTotal] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "notice"] | order(isPinned desc, createdAt desc)[0..4]`)
      .then((data) => {
        setList(data);
        setTotal(data.length); // 🔥 핵심 (swiper에서 안 구함)
      });
  }, []);



  return (
    <div className="notice-swiper">

      {/* 상단 컨트롤 */}
      <div className="notice-swiper__header">
        <button className="notice-prev notice-button" aria-label="이전">
          <CaretLeftIcon size={16} />
        </button>
        <div className="notice-swiper__counter">
          <span className="notice-swiper__current">
            {String(activeIndex).padStart(2, "0")}
          </span>
          <span className="notice-swiper__sep"> / </span>
          <span className="notice-swiper__total">
            {String(total).padStart(2, "0")}
          </span>
        </div>
        <button className="notice-next notice-button" aria-label="다음">
          <CaretRightIcon size={16} />
        </button>
      </div>

      {/* 슬라이더 */}
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={2}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".notice-next",
          prevEl: ".notice-prev",
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex + 1);
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
      >
        {list.map((item) => (
          <SwiperSlide key={item._id}>
            {({ isActive }) => (
              <Link
                to="/notice"
                className={`notice-card ${isActive ? "notice-card--active" : ""
                  }`}
              >
                <span className="notice-card__badge">
                  {item.isPinned ? "공지" : "news"}
                </span>

                <h3 className="notice-card__title">
                  {item.title}
                </h3>

                <p className="notice-card__desc">
                  {item.content || "내용 준비중입니다."}
                </p>

                <time className="notice-card__date">
                  {item.createdAt?.slice(0, 10)}
                </time>
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

  );
}

export default MainNotice;