import { Link } from "react-router-dom";
import logo from "../assets/images/common/logo.svg";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="inner">
        <h1 className="footer__logo">
          <Link to="/">
            <img src={logo} alt="차트연구소" />
          </Link>
        </h1>
        <div className="footer__cont">
          <div className="footer__info">
            <span className="footer__info-item">(주)차트연구소</span>
            <span className="footer__info-item">사업자등록번호 : 119-86-43383</span>
            <span className="footer__info-item">대표 : 박진우</span>
          </div>
          <div className="footer__info">
            <span className="footer__info-item">주소 : 서울시 강서구 마곡로171 안강프라이빗2차 716호</span>
            <span className="footer__info-item">TEL : 02-2603-8958</span>
            <i className="footer__info-split"></i>
            <span className="footer__info-item">Fax : 02-2179-9208</span>
          </div>
        </div>
        <p className="footer__copyright">Copyright ChartLab Corp. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer