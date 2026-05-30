import { Link } from "react-router-dom";

function Header() {
  const logoSrc = `${import.meta.env.BASE_URL}KaSender.png`;

  return (
    <header className="header">
      <div className="headerInner">
        <Link to="/" className="logo">
          <img src={logoSrc} alt="카센더 로고" className="logoImage" />
        </Link>

        <nav className="nav">
          <Link to="/download">다운로드</Link>
          <Link to="/notice">공지사항</Link>
          <Link to="/faq">자주 묻는 질문</Link>
          <Link to="/manual">사용설명서</Link>
          <Link to="/contact">문의하기</Link>
        </nav>

        <span className="versionBadge">v1.0.6 베타</span>
      </div>
    </header>
  );
}

export default Header;
