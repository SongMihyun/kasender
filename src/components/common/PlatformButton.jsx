import { downloadLatestWindowsVersion } from "../../utils/latestRelease.js";
import { useState } from "react";

function PlatformButton({ name, icon, status }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleClick = async () => {
    if (name !== "Windows") {
      alert(`${name} 버전은 현재 개발중입니다.`);
      return;
    }

    if (status !== "active") {
      alert(`${name} 버전은 현재 개발중입니다.`);
      return;
    }

    try {
      setIsDownloading(true);
      await downloadLatestWindowsVersion();
    } catch (error) {
      console.error(error);
      alert("최신 설치파일 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
      setIsDownloading(false);
    }
  };

  return (
    <button
      className={`platformButton ${status === "active" ? "active" : ""}`}
      onClick={handleClick}
      disabled={isDownloading}
    >
      <span className="platformIcon">{icon}</span>
      <span>{name}</span>
      <small>
        {isDownloading ? "다운로드 준비중" : status === "active" ? "다운로드 가능" : "개발중"}
      </small>
    </button>
  );
}

export default PlatformButton;
