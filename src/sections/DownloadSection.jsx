import SectionBox from "../components/common/SectionBox.jsx";
import SectionTitle from "../components/ui/SectionTitle.jsx";
import PlatformButton from "../components/common/PlatformButton.jsx";
import { platforms } from "../data/platforms.js";
import { useEffect, useState } from "react";
import { fetchLatestRelease } from "../utils/latestRelease.js";

function formatReleaseDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

function DownloadSection() {
  const [latestRelease, setLatestRelease] = useState(null);
  const [releaseError, setReleaseError] = useState("");

  useEffect(() => {
    let ignore = false;

    fetchLatestRelease()
      .then((release) => {
        if (!ignore) {
          setLatestRelease(release);
        }
      })
      .catch((error) => {
        console.error(error);
        if (!ignore) {
          setReleaseError("최신 버전 정보를 불러오지 못했습니다.");
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const releaseDate = formatReleaseDate(latestRelease?.publishedAt);

  return (
    <SectionBox id="download">
      <SectionTitle
        label="Download"
        title="최신 버전 다운로드"
        description="현재는 Windows 버전을 우선 지원합니다."
      />

      <div className="downloadInfo">
        <strong>현재 최신 버전</strong>
        <span>{latestRelease?.version || "확인중"}</span>
        <small>
          {releaseError ||
            (releaseDate ? `배포일: ${releaseDate}` : latestRelease?.fileName || "릴리즈 확인중")}
        </small>
      </div>

      <div className="platformGrid">
        {platforms.map((platform) => (
          <PlatformButton key={platform.name} {...platform} />
        ))}
      </div>
    </SectionBox>
  );
}

export default DownloadSection;
