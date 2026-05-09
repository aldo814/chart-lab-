import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/common/logo.svg";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const { pathname } = useLocation();

  const headerRef = useRef(null);
  const navBgRef = useRef(null);

  const syncHeaderScroll = () => {
    const header = headerRef.current;
    if (!header) return;

    const wrapperEl = document.querySelector(".wrapper");
    const mainEl = document.querySelector(".main-page");
    const isScrolled =
      window.scrollY > 50 ||
      document.documentElement.scrollTop > 50 ||
      (wrapperEl && wrapperEl.scrollTop > 50) ||
      (mainEl && mainEl.scrollTop > 50);

    header.classList.toggle("is-scroll", Boolean(isScrolled));
  };

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
    const header = headerRef.current;
    const navBg = navBgRef.current;

    if (header) {
      header.classList.remove("is-hover");
      header.style.setProperty("--li-expand-height", "100%");
    }

    if (navBg) {
      navBg.style.height = "0";
      navBg.style.opacity = "0";
    }

    const frameId = requestAnimationFrame(syncHeaderScroll);

    return () => cancelAnimationFrame(frameId);
  }, [pathname]);

  useEffect(() => {
    const header = headerRef.current;
    const navBg = navBgRef.current;
    if (!header || !navBg) return;

    const gnb = header.querySelector(".gnb");
    if (!gnb) return;

    const getMaxDepth2Height = () => {
      let max = 0;
      header.querySelectorAll(".gnb__depth2").forEach((ul) => {
        const originalDisplay = ul.style.display;
        ul.style.display = "flex";
        max = Math.max(max, ul.scrollHeight);
        ul.style.display = originalDisplay;
      });
      return max;
    };

    const handleEnter = () => {
      if (window.innerWidth <= 1024) return;
      const headerH = header.offsetHeight;
      const depth2H = getMaxDepth2Height() + 24;
      const totalH = headerH + depth2H + 80;
      navBg.style.height = `${totalH}px`;
      navBg.style.opacity = "1";
      header.style.setProperty("--li-expand-height", `${totalH}px`);
      header.classList.add("is-hover");
    };

    const handleLeave = () => {
      if (window.innerWidth <= 1024) return;
      navBg.style.height = "0";
      navBg.style.opacity = "0";
      header.style.setProperty("--li-expand-height", "100%");
      header.classList.remove("is-hover");
    };

    gnb.addEventListener("mouseenter", handleEnter);
    gnb.addEventListener("mouseleave", handleLeave);

    return () => {
      gnb.removeEventListener("mouseenter", handleEnter);
      gnb.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleScroll = (e) => {
      const target = e.target;
      const windowScrolled =
        window.scrollY > 50 || document.documentElement.scrollTop > 50;
      const containerScrolled =
        target instanceof HTMLElement && target.scrollTop > 50;

      if (windowScrolled || containerScrolled) {
        header.classList.add("is-scroll");
      } else {
        const anyScrolled =
          window.scrollY > 50 || document.documentElement.scrollTop > 50;
        const wrapperEl = document.querySelector(".wrapper");
        const mainEl = document.querySelector(".main-page");
        const otherScrolled =
          (wrapperEl && wrapperEl.scrollTop > 50) ||
          (mainEl && mainEl.scrollTop > 50);

        if (!anyScrolled && !otherScrolled) {
          header.classList.remove("is-scroll");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    syncHeaderScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  const toggleMenu = (idx, hasChild) => {
    if (!hasChild) return;
    setOpenMenu(openMenu === idx ? null : idx);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
    setOpenMenu(null);
    const header = headerRef.current;
    if (header) {
      header.classList.remove("is-hover");
    }
    requestAnimationFrame(syncHeaderScroll);
  };

  const handleMenuButtonClick = () => {
    setMobileOpen((prev) => {
      if (prev) {
        setOpenMenu(null);
        requestAnimationFrame(syncHeaderScroll);
      }
      return !prev;
    });
  };

  return (
    <header
      className={`header ${mobileOpen ? "m_open" : ""}`}
      ref={headerRef}
      id="header"
    >
      <div className="header__inner">
        <h1 className="header__logo logo">
          <Link to="/" onClick={handleMobileClose}>
            <img src={logo} alt="차트연구소" />
          </Link>
        </h1>

        <nav className="gnb">
          <ul className="gnb__list">
            <li className={`gnb__item ${openMenu === 0 ? "open" : ""}`}>
              <div className="gnb__link" onClick={() => toggleMenu(0, true)}>
                회사소개 <span className="arrow"></span>
              </div>
              <ul className="gnb__depth2">
                <li>
                  <Link to="/about/business" onClick={handleMobileClose}>
                    사업 소개
                  </Link>
                </li>
                <li>
                  <Link to="/about/history" onClick={handleMobileClose}>
                    연혁
                  </Link>
                </li>
                <li>
                  <Link to="/about/location" onClick={handleMobileClose}>
                    오시는 길
                  </Link>
                </li>
              </ul>
            </li>

            <li className={`gnb__item ${openMenu === 1 ? "open" : ""}`}>
              <div className="gnb__link" onClick={() => toggleMenu(1, true)}>
                제품소개 <span className="arrow"></span>
              </div>
              <ul className="gnb__depth2">
                <li>
                  <Link to="/product/powerchart" onClick={handleMobileClose}>
                    파워차트
                  </Link>
                </li>
                <li>
                  <Link to="/product/powergraphics" onClick={handleMobileClose}>
                    파워그래픽스
                  </Link>
                </li>
              </ul>
            </li>

            <li className={`gnb__item ${openMenu === 2 ? "open" : ""}`}>
              <div className="gnb__link" onClick={() => toggleMenu(2, true)}>
                포트폴리오 <span className="arrow"></span>
              </div>
              <ul className="gnb__depth2">
                <li>
                  <Link to="/portfolio/project" onClick={handleMobileClose}>
                    프로젝트 사례
                  </Link>
                </li>
              </ul>
            </li>

            <li className="gnb__item">
              <Link
                to="/notice"
                className="gnb__link"
                onClick={handleMobileClose}
              >
                공지사항
              </Link>
              {!mobileOpen && (
                <ul className="gnb__depth2">
                  <li>
                    <Link to="/notice">공지사항</Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="gnb__item">
              <Link
                to="/contact"
                className="gnb__link"
                onClick={handleMobileClose}
              >
                상담문의
              </Link>
              {!mobileOpen && (
                <ul className="gnb__depth2">
                  <li>
                    <Link to="/contact">상담문의</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        <button
          className={`header__menu-btn menu-btn ${mobileOpen ? "active" : ""}`}
          onClick={handleMenuButtonClick}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className="header__nav-bg" ref={navBgRef}></div>
    </header>
  );
}

export default Header;
