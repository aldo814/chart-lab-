import { useEffect, useState, useRef } from "react";
import { PortableText } from "@portabletext/react";
import { client } from "../api/sanity";
import { fetchWithTimeout } from "../api/fetchWithTimeout";
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
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const swiperRef = useRef(null);

  const ptComponents = {
    types: {
      image: () => null,
    },
  };

  useEffect(() => {
    let ignore = false;

    const fetchNotices = async () => {
      try {
        setIsLoading(true);
        const pinned = await fetchWithTimeout(
          client.fetch(`
            *[_type == "notice" && isPinned == true]
            | order(createdAt desc)[0..2] {
              _id, title, content, createdAt, isPinned,
              "slug": slug.current
            }
          `)
        );

        const pinnedIds = pinned.map((p) => p._id);
        const normalCount = 6 - pinned.length;

        const normal = await fetchWithTimeout(
          client.fetch(
            `*[_type == "notice" && isPinned != true && !(_id in $ids)]
            | order(createdAt desc)[0..$count] {
              _id, title, content, createdAt, isPinned,
              "slug": slug.current
            }`,
            { ids: pinnedIds, count: normalCount - 1 }
          )
        );

        if (ignore) return;
        const merged = [...pinned, ...normal];
        setList(merged);
        setTotal(merged.length);
      } catch (error) {
        if (ignore) return;
        setList([]);
        setTotal(0);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetchNotices();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="notice-swiper">
      <div className="notice-swiper__header">
        {/* 리스트가 없으면 disabled 처리하여 버튼을 멈춤 */}
        <button
          className={`notice-prev notice-button ${total === 0 ? "is-disabled" : ""}`}
          aria-label="이전"
          disabled={total === 0}
        >
          <CaretLeftIcon size={16} />
        </button>
        <div className="notice-swiper__counter">
          <span className="notice-swiper__current">
            {total === 0 ? "00" : String(activeIndex).padStart(2, "0")}
          </span>
          <span className="notice-swiper__sep"> / </span>
          <span className="notice-swiper__total">
            {String(total).padStart(2, "0")}
          </span>
        </div>
        <button
          className={`notice-next notice-button ${total === 0 ? "is-disabled" : ""}`}
          aria-label="다음"
          disabled={total === 0}
        >
          <CaretRightIcon size={16} />
        </button>
      </div>

      {isLoading ? (
        <div className="notice-empty">데이터를 불러오는 중입니다...</div>
      ) : list.length > 0 ? (
        <Swiper
          modules={[Autoplay, Navigation]}
          slidesPerView={2}
          spaceBetween={20}
          loop={total > 1} // 데이터가 1개뿐일 때는 루프 방지
          autoplay={
            total > 1 ? { delay: 4000, disableOnInteraction: false } : false
          }
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
                  to={`/notice/${item.slug ?? item._id}`}
                  className={`notice-card ${isActive ? "notice-card--active" : ""}`}
                >
                  <span className="notice-card__badge">
                    {item.isPinned ? "공지" : "news"}
                  </span>
                  <h3 className="notice-card__title">{item.title}</h3>
                  <div className="notice-card__desc">
                    {item.content ? (
                      <PortableText
                        value={item.content}
                        components={ptComponents}
                      />
                    ) : (
                      "내용 준비중입니다."
                    )}
                  </div>
                  <time className="notice-card__date">
                    {item.createdAt?.slice(0, 10)}
                  </time>
                </Link>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="notice-empty">게시물이 없습니다.</div>
      )}
    </div>
  );
}

export default MainNotice;
