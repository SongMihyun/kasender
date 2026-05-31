import Button from "../components/ui/Button.jsx";
import { useEffect, useState } from "react";
import {
  downloadLatestWindowsVersion,
  fetchLatestRelease,
  formatVersionLabel,
} from "../utils/latestRelease.js";

function HeroSection() {
  const logoSrc = `${import.meta.env.BASE_URL}logo.png`;
  const [versionLabel, setVersionLabel] = useState("최신 버전");

  useEffect(() => {
    let ignore = false;

    fetchLatestRelease()
      .then((release) => {
        if (!ignore) {
          setVersionLabel(formatVersionLabel(release.version, "Beta"));
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleDownload = async () => {
    try {
      await downloadLatestWindowsVersion();
    } catch (error) {
      console.error(error);
      alert("최신 설치파일 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <section id="hero" className="heroSection">
      <div className="heroContent">
        <div className="heroTextArea">
          <div className="heroMeta heroMetaTop">
            <span>{versionLabel}</span>
            <span>Windows 우선 지원</span>
          </div>

          <p className="heroLabel">
            KakaoSender
          </p>

          <h1>
            반복적인 업무 커뮤니케이션을
            <br />
            더 쉽고 효율적으로
          </h1>

          <p className="heroText">
            대상자 관리, 콘텐츠 구성, 운영 이력 관리를 지원하는
            로컬 설치형 생산성 도구입니다.
          </p>

          <div className="heroActions">
            <Button onClick={handleDownload}>
              최신 버전 다운로드
            </Button>

            <Button href="#/manual" variant="secondary">
              사용설명서 보기
            </Button>
          </div>
        </div>

        <div className="heroVisualArea">
          <div className="heroLogoCard">
            <img src={logoSrc} alt="카센더 로고" className="heroMainLogo" />

            <div className="heroFeatureList">
              <div>
                <strong>콘텐츠 관리</strong>
                <span>이미지 및 문구 구성</span>
              </div>
              <div>
                <strong>대상자 관리</strong>
                <span>연락처 및 그룹 관리</span>
              </div>
              <div>
                <strong>운영 이력</strong>
                <span>활동 내역 확인</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
