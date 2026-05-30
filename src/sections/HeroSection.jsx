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
            카카오톡 캠페인 발송
            <br />
            더 쉽고 안정적으로
          </h1>

          <p className="heroText">
            이미지 발송, 대상자 관리, 발송 로그 확인을 지원하는
            로컬 설치형 카카오 캠페인 솔루션입니다.
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
                <strong>이미지 발송</strong>
                <span>캠페인 이미지 등록</span>
              </div>
              <div>
                <strong>대상자 관리</strong>
                <span>연락처·그룹 관리</span>
              </div>
              <div>
                <strong>발송 로그</strong>
                <span>결과 확인 및 재시도</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
