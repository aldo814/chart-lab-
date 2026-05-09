import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";

const RouteEffects = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const mainPage = document.querySelector(".main-page");
    if (mainPage) mainPage.scrollTop = 0;

    const refreshId = window.setTimeout(() => {
      AOS.refreshHard();
    }, 80);

    return () => {
      window.clearTimeout(refreshId);
    };
  }, [pathname]);

  return null;
};

export default RouteEffects;
