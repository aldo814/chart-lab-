import Header from "./Header";
import { Outlet } from "react-router-dom";
import FixedContact from "../components/FixedContact";
import RouteEffects from "../components/RouteEffects";

function MainLayout() {
  return (
    <div className="wrapper">
      <RouteEffects />
      <Header />
      <main id="container">
        <Outlet />
      </main>
      {/* Main.jsx - > Footer는 직접 렌더링 -> 원스크롤 페이지 이슈 */}
      <FixedContact />
    </div>
  );
}

export default MainLayout;
