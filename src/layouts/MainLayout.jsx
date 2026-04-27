import Header from "./Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="wrapper">
      <Header />
      <main id="container">
        <Outlet />
      </main>
      {/* Main.jsx - > Footer는 직접 렌더링 -> 원스크롤 페이지 이슈 */}
    </div>
  );
}

export default MainLayout;