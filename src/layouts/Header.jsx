import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchLatestRelease, formatVersionLabel } from "../utils/latestRelease.js";

function Header() {
  const logoSrc = `${import.meta.env.BASE_URL}KaSender.png`;
  const [versionLabel, setVersionLabel] = useState("최신 버전");

  useEffect(() => {
    let ignore = false;

    fetchLatestRelease()
      .then((release) => {
        if (!ignore) {
          setVersionLabel(formatVersionLabel(release.version));
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      ignore = true;
    };
  }, []);

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

        <span className="versionBadge">{versionLabel}</span>
      </div>
    </header>
  );
}

export default Header;
