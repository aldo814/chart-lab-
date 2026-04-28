import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { client } from "../../api/sanity";
import { Link } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import { PaperclipIcon } from "@phosphor-icons/react";

function NoticeList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState("title");
  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const perPage = 10;

  useEffect(() => {
    setLoading(true);
    client
      .fetch(
        `
        *[_type == "notice"] 
        | order(isPinned desc, createdAt desc) {
          _id,
          title,
          createdAt,
          isPinned,
          content,
          "slug": slug.current,
          "authorName": author->name,
          "hasAttachment": count(attachment) > 0
        }
      `
      )
      .then((res) => setList(res))
      .finally(() => setLoading(false));
  }, []);

  const pinnedList = list.filter((item) => item.isPinned).slice(0, 3);
  const normalList = list.filter((item) => !item.isPinned);

  const isNew = (date) => {
    if (!date) return false;
    const created = new Date(date);
    const now = new Date();
    const diffDays = (now - created) / (1000 * 60 * 60 * 24);
    return diffDays <= 14;
  };

  const filterFn = (item) => {
    if (!keyword) return true;
    const key = keyword.toLowerCase();
    if (searchType === "title") return item.title?.toLowerCase().includes(key);
    if (searchType === "content")
      return JSON.stringify(item.content || "")
        .toLowerCase()
        .includes(key);
    if (searchType === "all")
      return (
        item.title?.toLowerCase().includes(key) ||
        JSON.stringify(item.content || "")
          .toLowerCase()
          .includes(key)
      );
    return true;
  };

  const filteredPinned = pinnedList.filter(filterFn);
  const filteredNormal = normalList.filter(filterFn);

  const total = filteredPinned.length + filteredNormal.length;
  const totalPages = Math.max(1, Math.ceil(filteredNormal.length / perPage));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * perPage;
  const currentNormalList = filteredNormal.slice(start, start + perPage);
  const pageGroup = Math.floor((safePage - 1) / 5);
  const startPage = pageGroup * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  const changePage = (p) => {
    const next = typeof p === "function" ? p(page) : p;
    setPage(next);
    setSearchParams({ page: String(next) });
  };

  return (
    <div className="notice inner">
      <SectionTitle variant="only" title="공지사항" />

      <div className="notice__inner">
        <div className="notice__search">
          <select
            className="notice__select"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="all">제목+내용</option>
          </select>

          <input
            type="text"
            className="notice__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setKeyword(input);
                changePage(1);
              }
            }}
            placeholder="검색어를 입력해주세요"
          />

          <button
            className="notice__search-btn"
            onClick={() => {
              setKeyword(input);
              changePage(1);
            }}
          >
            검색
          </button>
        </div>

        <div className="notice__total">
          전체 <strong>{total}</strong>건
        </div>

        {loading ? (
          <div className="notice__list">
            {Array.from({ length: 5 }).map((_, i) => (
              <div className="notice__item skeleton" key={i}>
                <span className="notice__num skeleton-box" />
                <span className="notice__title skeleton-box" />
                <span className="notice__author skeleton-box" />
                <span className="notice__date skeleton-box" />
              </div>
            ))}
          </div>
        ) : (
          <div className="notice__list">
            {filteredPinned.map((item) => (
              <Link
                to={`/notice/${item.slug ?? item._id}`}
                className="notice notice__item notice__item--pinned"
                key={`pinned-${item._id}`}
              >
                <span className="notice__num">
                  <em className="notice__badge">공지</em>
                </span>
                <span className="notice__title">
                  {item.title}
                  {isNew(item.createdAt) && (
                    <em className="notice__badge notice__badge--new">NEW</em>
                  )}
                  {item.hasAttachment && (
                    <PaperclipIcon size={14} className="notice__attach-ico" />
                  )}
                </span>
                <span className="notice__author">
                  {item.authorName || "관리자"}
                </span>
                <span className="notice__date">
                  {item.createdAt?.slice(0, 10).replaceAll("-", ".")}
                </span>
              </Link>
            ))}

            {currentNormalList.map((item, idx) => (
              <Link
                to={`/notice/${item.slug ?? item._id}`}
                className="notice__item"
                key={item._id}
              >
                <span className="notice__num">
                  {filteredNormal.length - (start + idx)}
                </span>
                <span className="notice__title">
                  {item.title}
                  {item.hasAttachment && (
                    <PaperclipIcon size={14} className="notice__attach-ico" />
                  )}
                </span>
                <span className="notice__author">
                  {item.authorName || "관리자"}
                </span>
                <span className="notice__date">
                  {item.createdAt?.slice(0, 10).replaceAll("-", ".")}
                </span>
              </Link>
            ))}

            {total === 0 && !loading && keyword === "" ? (
              <div className="notice__empty">등록된 게시물이 없습니다.</div>
            ) : total === 0 && !loading ? (
              <div className="notice__empty">검색 결과가 없습니다.</div>
            ) : null}
          </div>
        )}

        <div className="notice__pagination">
          <button
            className="notice__page-btn-arrow notice__page-btn--first"
            onClick={() => changePage(1)}
            disabled={safePage === 1}
          >
            처음
          </button>
          <button
            className="notice__page-btn-arrow notice__page-btn--prev"
            onClick={() => changePage(Math.max(safePage - 1, 1))}
            disabled={safePage === 1}
          >
            이전
          </button>
          <button
            className="notice__page-btn-arrow"
            onClick={() => changePage(Math.max(startPage - 5, 1))}
            disabled={startPage === 1}
          >
            &lt;
          </button>

          <ul className="notice__page-list">
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
              const p = startPage + i;
              return (
                <li key={p} className="notice__page-item">
                  <button
                    className={`notice__page-btn notice__page-num ${p === safePage ? "notice__page-btn--active" : ""}`}
                    onClick={() => changePage(p)}
                  >
                    {p}
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            className="notice__page-btn-arrow"
            onClick={() => changePage(Math.min(startPage + 5, totalPages))}
            disabled={endPage >= totalPages}
          >
            &gt;
          </button>
          <button
            className="notice__page-btn-arrow notice__page-btn--next"
            onClick={() => changePage(Math.min(safePage + 1, totalPages))}
            disabled={safePage === totalPages}
          >
            다음
          </button>
          <button
            className="notice__page-btn-arrow notice__page-btn--end"
            onClick={() => changePage(totalPages)}
            disabled={safePage === totalPages}
          >
            마지막
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoticeList;
